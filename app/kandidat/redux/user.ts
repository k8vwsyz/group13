import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { address } from "../components/client_socket";
import { RootThunk } from "./genericThunk";
import { RootState } from "./store";

export type Client = {
  clientName: string,
  connected: number,
}

export type UserSlice = {
  clients: Client[],
  clientCreationError: string | null,
  admin: string,
}

const initialState: UserSlice = {
  clients: [],
  clientCreationError: null,
  admin: '',
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clientsReceived: (state, action: PayloadAction<Client[]>) => { state.clients = action.payload },
    clientAdded: (state, action: PayloadAction<Client>) => { state.clients.push(action.payload) },
    clientAddedFailed: (state, action: PayloadAction<string>) => { state.clientCreationError = action.payload },
    clientAddedSuccess: (state) => { state.clientCreationError = null },
    adminChanged: (state, action: PayloadAction<string>) => { state.admin = action.payload },
  }
})

export default userSlice.reducer
export const { clientsReceived, clientAdded, clientAddedFailed, clientAddedSuccess, adminChanged } = userSlice.actions
export const selectClients = (state: RootState) => state.user.clients
export const selectClientError = (state: RootState) => state.user.clientCreationError
export const selectAdmin = (state: RootState) => state.user.admin

const postClientAddedToServer = (admin: string, client: string) => {
  const newClient = { admin, client }
  return fetch(`${address}/client`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;chartset=utf-8'
    },
    body: JSON.stringify(newClient)
  })
}

export const clientAdded_ = (
  client: string,
): RootThunk => async (dispatch, getState) => {
  const admin = getState().user.admin
  const response = await postClientAddedToServer(admin, client)
  if (response.status === 200) {
    dispatch(clientAdded({ clientName: client, connected: 0 }))
    dispatch(clientAddedSuccess())
  } else {
    dispatch(clientAddedFailed('client name already in use'))
  }
}
