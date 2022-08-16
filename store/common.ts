import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommonState } from "../types/reduxState";

//*initial state
const initialState: CommonState = {
  validateMode: false,
}

const common = createSlice({
  name: "common",
  initialState,
  reducers: {
    //*change validateMode
    setValidateMode(state, action: PayloadAction<boolean>) {
      state.validateMode = action.payload;
    },
  },
});

export const commonActions = {...common.actions};
export default common;