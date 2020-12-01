import { configureStore } from "@reduxjs/toolkit"

import cctvReducer from "./cctvSlice"

export const store = configureStore({
  reducer: {
    cctvs: cctvReducer,
  },
})
