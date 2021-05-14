import { createContext } from 'react'
import socketio from 'socket.io-client'

export const address = 'http://localhost:5000'
export const socket = socketio(address)
export const SocketContext = createContext(socket)