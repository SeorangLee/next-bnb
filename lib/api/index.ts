import { Axios } from "../../node_modules/axios/index";

const axios = Axios.create({
  baseURL : process.env.NEXT_PUBLIC_API_URL,
})

export default axios;