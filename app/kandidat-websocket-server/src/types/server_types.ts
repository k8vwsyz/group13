
export type RoomAdmin = {
  roomName: Room,
  admin: Admin
}

export type ClientConnectedCount = { client: string, count: number }
export type ClientAdmin = { client: string, admin: Admin }

export type Admin = string
export type Room = string
export type SocketId = string

export type EmitCarEvent = { ev: string, args: any[] }
