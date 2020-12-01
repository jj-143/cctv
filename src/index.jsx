import React from "react"
import ReactDOM from "react-dom"
import Main from "./pages/Main"

import { Provider } from "react-redux"
import { store } from "./data/store"
import { fetchCCTVs } from "./data/cctvSlice"

store.dispatch(fetchCCTVs())

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById("app"),
)
