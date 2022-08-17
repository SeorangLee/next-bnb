import axios from "axios";
import React from "react";
import { Container } from "react-dom";
import { UserType } from "../../types/user";

//*sign up body
interface SignUpAPIBody {
  email: string;
  firstname :string;
  lastname: string;
  password: string;
  birthday : string;
}

//*sign up api
export const signupAPI = (body: SignUpAPIBody) =>
axios.post("/api/auth/signup", body);

//*log in api
export const loginAPI = (body: {email: string; password: string}) => 
  axios.post<UserType>("/api/auth/login", body);

//*get user information of cookie's access_token
export const meAPI = () => axios.get<UserType>("/api/auth/me");