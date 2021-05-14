import express from 'express'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import cors from 'cors'
import { constructEmit } from './utils/socket'
import { generateMeta, relevant } from './utils/event'
import { associated, clientBelongsToRoom, clientExists, clientsOwners, countAdminConnectedClients, roomExists, roomOwner, socketIsConnectedTo } from './projections/room'
import { CarEvent, CarMetaEvent, RoomEvent } from './types/types'
import { projectInfotainment } from './projections/infotainment'
import { AlertInfoContent, Car, LaneChange, NotificationDropdown } from './types/client_types'

const options = {
  cors: {
    origin: true
  }
}

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const httpServer = createServer(app)
const io = new Server(httpServer, options)

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.get('/rooms', (req, res) => {
  const admin: string = req.body['admin']
  if (admin) {
    res.status(200)
  }
  else {
    res.status(400)
    res.json()
  }
})

app.post('/client', (req, res) => {
  const admin: string = req.body['admin']
  const client: string = req.body['client']
  console.log('availability check', 'admin:', admin, 'client:', client)
  if (admin == undefined || client == undefined)
    res.sendStatus(400).end() // admin and client are required
  else if (clientExists(roomEvents, client))
    res.sendStatus(409).end() // client name already in use
  else {
    console.log('client created', 'admin', admin, 'client', client)
    roomEvents.push({ kind: "client_created", admin, client_name: client })
    res.sendStatus(200).end()
  }
})

// =========== 
// == State ==
// ===========

let carMetaEvents: CarMetaEvent[] = []
let roomEvents: RoomEvent[] = []

// ====================
// == Socket section ==
// ====================

const pushEmitPayload = (socket: Socket, admin: string, roomName: string, carEvent: CarEvent) => {
  if (roomExists(roomEvents, roomName)) {
    const meta = generateMeta(0, admin, roomName)
    const metaEvent = { carEvent, meta }
    carMetaEvents.push(metaEvent)
    const toEmit = constructEmit(carEvent)
    socket.to(admin).emit(toEmit.ev, ...toEmit.args)
  }
}

io.on('connection', (socket: Socket) => {
  console.log(`a user connected with id ${socket.id}`)

  // ==================
  // == admin events ==
  // ==================

  socket.on('associate', (admin: string) => {
    // if this is the first time that this 'admin' is seen
    if (!roomExists(roomEvents, admin))
      roomEvents.push({ kind: 'room_created', admin, room_name: admin })

    console.log(`${admin} is now associated with ${socket.id}`)
    roomEvents.push({ kind: 'associate', admin, socket_id: socket.id })

    socket.join(admin)
    // syncs admin new session
    sendConnectedClients(admin) // sends connected client to admin
    const relevant_events = relevant(admin, carMetaEvents)
    socket.emit('latest_state', projectInfotainment(relevant_events)) // send latest infotainmanet state to admin
  })

  socket.on('client_created', (admin: string, client_name: string) => {
    console.log(`client ${client_name} created by ${admin}`)
    if (!clientExists(roomEvents, client_name)) {
      roomEvents.push({ kind: "client_created", admin, client_name })
    }
  })

  socket.on('car_added', (admin: string, room_name: string, payload: Car) => pushEmitPayload(socket, admin, room_name, { kind: "car_added", payload }))
  socket.on('car_moved', (admin: string, room_name: string, payload: Car) => pushEmitPayload(socket, admin, room_name, { kind: "car_moved", payload }))
  socket.on('notification_played', (admin: string, room_name: string, payload: NotificationDropdown) => pushEmitPayload(socket, admin, room_name, { kind: "notification_played", payload }))
  socket.on('lanes_expanded', (admin: string, room_name: string, payload: boolean) => pushEmitPayload(socket, admin, room_name, { kind: "lanes_expanded", payload }))
  socket.on('lanes_zoomed_out', (admin: string, room_name: string, payload: boolean) => pushEmitPayload(socket, admin, room_name, { kind: "lanes_zoomed_out", payload }))
  socket.on('notification_text_updated', (admin: string, room_name: string, payload: string) => pushEmitPayload(socket, admin, room_name, { kind: "notification_text_updated", payload }))
  socket.on('alert_info_updated', (admin: string, room_name: string, payload: boolean) => pushEmitPayload(socket, admin, room_name, { kind: "alert_info_updated", payload }))
  socket.on('alert_info_content_updated', (admin: string, room_name: string, payload: AlertInfoContent) => pushEmitPayload(socket, admin, room_name, { kind: "alert_info_content_updated", payload }))
  socket.on('lane_change_updated', (admin: string, room_name: string, payload: LaneChange) => pushEmitPayload(socket, admin, room_name, { kind: "lane_change_updated", payload }))
  socket.on('lane_change_cleared', (admin: string, room_name: string) => pushEmitPayload(socket, admin, room_name, { kind: "lane_change_cleared" }))
  socket.on('cars_removed', (admin: string, room_name: string) => pushEmitPayload(socket, admin, room_name, { kind: "cars_removed" }))
  socket.on('car_removed', (admin: string, room_name: string, payload: string) => pushEmitPayload(socket, admin, room_name, { kind: "car_removed", payload }))
  socket.on('duration_changed', (admin: string, room_name: string, car_id: string, duration: number) => pushEmitPayload(socket, admin, room_name, { kind: "duration_changed", payload: { id: car_id, duration } }))

  // ===================
  // == client events ==
  // ===================

  socket.on('client_joined', (client_name: string) => {
    const roomName = clientBelongsToRoom(roomEvents, client_name)
    if (roomName) {
      console.log(`a client with socket id "${socket.id}" has joined the room \"${roomName}\"`)
      roomEvents.push({ kind: "client_joined", client_name: client_name, socket_id: socket.id })
      socket.join(roomName)

      const relevantEvents = relevant(roomName, carMetaEvents)
      socket.emit('latest_state', projectInfotainment(relevantEvents))

      const room_owner = roomOwner(roomEvents, roomName)
      console.log(`room owner > ${room_owner}`)
      if (room_owner)
        sendConnectedClients(room_owner)
    }
    else {
      console.log(`${roomName} does not exist.`)
    }
  })

  socket.on('disconnect', () => {
    const clientsSocketWasConnectedTo = socketIsConnectedTo(roomEvents, socket.id)
    clientsSocketWasConnectedTo.forEach(client_name => roomEvents.push({ kind: "client_left", client_name, socket_id: socket.id }))
    clientsOwners(roomEvents, clientsSocketWasConnectedTo).forEach(ca => sendConnectedClients(ca.admin))
  })
})

const sendConnectedClients = (admin: string) => {
  const adminsClients = countAdminConnectedClients(roomEvents, admin)
  const assoc = associated(roomEvents, admin)
  console.log(`sending ${adminsClients} to ${assoc}`)
  if (assoc)
    io.to(assoc).emit('connected_clients', adminsClients)
}

httpServer.listen(5000)
