import { ClientAdmin, ClientConnectedCount, Room, RoomAdmin, SocketId } from "../types/server_types"
import { ClientCreated, RoomCreated, RoomEvent } from "../types/types"

// ==================
// == admin events ==
// ==================

export const roomOwner = (roomEvents: RoomEvent[], roomName: string) => {
  const room = roomEvents.find(r => r.kind === "room_created" && r.room_name === roomName)
  if (room?.kind === "room_created") return room.admin
}

export const listAdminsRooms = (roomEvents: RoomEvent[], admin: string): Room[] => (roomEvents
  .filter((e: RoomEvent) => e.kind === 'room_created' && e.admin === admin) as RoomCreated[])
  .map(e => e.room_name)

export const listAdminsClients = (roomEvents: RoomEvent[], admin: string): Room[] => (roomEvents
  .filter((e: RoomEvent) => e.kind === 'client_created' && e.admin === admin) as ClientCreated[])
  .map(e => e.client_name)

export const countAdminConnectedClients = (roomEvents: RoomEvent[], admin: string): ClientConnectedCount[] => {
  const adminsClients = listAdminsClients(roomEvents, admin).reduce((acc, cur) => {
    return acc.set(cur, 0)
  }, new Map<string, number>())

  const modifyCount = (action: "inc" | "dec", count: Map<string, number>, key: string) => {
    const val = count.get(key)
    if (val !== undefined)
      switch (action) {
        case "inc":
          return count.set(key, val + 1)
        case "dec":
          return count.set(key, val - 1)
      }
    else return count
  }

  const reducer = (acc: Map<string, number>, e: RoomEvent) => {
    if (e.kind === "client_joined")
      return modifyCount("inc", acc, e.client_name)
    else if (e.kind === "client_left")
      return modifyCount("dec", acc, e.client_name)
    else
      return acc
  }
  return Array.from(roomEvents.reduce(reducer, adminsClients)).map(e => ({ client: e[0], count: e[1] }))
}

export const associated = (roomEvents: RoomEvent[], admin: string) => {
  const reducer = (acc: string | undefined, e: RoomEvent) => e.kind === 'associate' && e.admin === admin ? e.socket_id : acc
  return roomEvents.reduce(reducer, undefined)
}

// ===================
// == client events ==
// ===================

export const socketIsConnectedTo = (roomEvents: RoomEvent[], socketId: SocketId) => {
  const reducer = (acc: Set<string>, e: RoomEvent) => {
    if (e.kind === "client_joined" && e.socket_id === socketId)
      return acc.add(e.client_name)
    else if (e.kind === "client_left" && e.socket_id === socketId) {
      acc.delete(e.client_name)
      return acc
    }
    else return acc
  }
  return Array.from(roomEvents.reduce(reducer, new Set()))
}

export const isSocketConnectedToClient = (roomEvents: RoomEvent[], socketId: SocketId, clientName: string) => {
  const relatedEvents = roomEvents.filter(e => {
    switch (e.kind) {
      case "client_joined":
        return e.socket_id === socketId && e.client_name === clientName
      case "client_left":
        return e.socket_id === socketId
      default:
        return false
    }
  })
  return relatedEvents.reduce((_acc: boolean, e: RoomEvent) => e.kind === "client_joined", false)
}

export const clientBelongsToRoom = (roomEvents: RoomEvent[], client: string) =>
  (roomEvents.find(e => e.kind === "client_created" && e.client_name === client) as ClientCreated | undefined)?.admin

// ===============
// == utilities ==
// ===============

export const currentlyInRoom = (roomEvents: RoomEvent[], roomName: string) => {
  const reducer = (acc: string[], cur: RoomEvent) => {
    switch (cur.kind) {
      case "client_joined":
        if (cur.client_name === roomName) acc.push(cur.socket_id)
        return acc
      case "client_left":
        return acc.filter(connected => connected !== cur.socket_id)
      default:
        return acc
    }
  }
  return roomEvents.reduce(reducer, [])
}

export const roomExists = (roomEvents: RoomEvent[], roomName: string) =>
  roomEvents.find(room => room.kind === "room_created" && room.room_name === roomName) ? true : false

export const clientExists = (roomEvents: RoomEvent[], client: string) =>
  roomEvents.find(room => room.kind === "client_created" && room.client_name === client) ? true : false

export const listRooms = (roomEvents: RoomEvent[]) => {
  const reducer = (acc: RoomAdmin[], e: RoomEvent) => {
    if (e.kind === "room_created") { acc.push({ roomName: e.room_name, admin: e.admin }); return acc }
    else return acc
  }
  return roomEvents.reduce(reducer, [])
}

export const listClients = (roomEvents: RoomEvent[]) => {
  const reducer = (acc: string[], e: RoomEvent) => {
    if (e.kind === "client_created") { acc.push(e.client_name); return acc }
    else return acc
  }
  return roomEvents.reduce(reducer, [])
}

export const listClientsAndOwner = (roomEvents: RoomEvent[]) => {
  const reducer = (acc: ClientAdmin[], e: RoomEvent) => {
    if (e.kind === "client_created") { acc.push({ client: e.client_name, admin: e.admin }); return acc }
    else return acc
  }
  return roomEvents.reduce(reducer, [])
}

export const clientsOwners = (roomEvents: RoomEvent[], clients: string[]) => {
  const clientSet = clients.reduce((acc, c) => acc.add(c), new Set<string>())
  return listClientsAndOwner(roomEvents).filter(co => clientSet.has(co.client))
}
