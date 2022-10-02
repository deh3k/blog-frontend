import { IAuthUser } from "./IUser"

export interface AuthResponse {
  user: IAuthUser
  accessToken: string
}