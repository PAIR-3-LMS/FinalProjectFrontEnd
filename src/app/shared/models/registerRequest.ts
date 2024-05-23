import { UserForRegisterDto } from "./userForRegisterDto"

export interface registerRequest {
  userForRegisterDto: UserForRegisterDto
  name: string
  surname: string
  phoneNumber: string
  address: string
}