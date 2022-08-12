import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../types/user";
import { UserState } from "../types/reduxState";

//*Initial state
const initialState: UserState = {
  id: 0,
  email: "",
  lastname: "",
  firstname: "",
  birthday : "",
  isLogged: false,
  profileImage : "",
}

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    //*change logged user
    setLoggedUser(state, action: PayloadAction<UserType>){
      state = {...action.payload, isLogged:true};
      return state;
    },
  },
})

export const userActions = {...user.actions};

export default user;