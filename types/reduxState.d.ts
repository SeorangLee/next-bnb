import { UserType } from "./user";

//* user redux state
export type UserState = UserType & {
  isLogged: boolean;
}