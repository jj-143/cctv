import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit"

const URL_CCTV = `http://apis.data.go.kr/6260000/CctvInfoService/getItsCctvInfoList?serviceKey=OJW0MRmGQd9eUmoOVh%2Fdk%2FXyd%2FM53%2FWpZf4b8wUEqR4tUaPNyYGgUBzhu1xJyoZNyHpCsj8r42trJzWAxi9B7Q%3D%3D&pageNo=1&numOfRows=100&resultType=json`
// const URL_CCTV = `http://localhost:9191/mock2.json`

const cctvAdapter = createEntityAdapter({
  selectId: e => e.ID,
})

const initialState = cctvAdapter.getInitialState({
  selectedCCTV: null,
  watching: null,
})

export const fetchCCTVs = createAsyncThunk("cctvs/fetchCCTVs", async () => {
  let response
  try {
    // CORS error
    response = await fetch(URL_CCTV).then(d => d.json())
  } catch {
    // fallback
    console.log("using fallback data")
    response = await import("./mock2.json")
  }

  return response.getItsCctvInfoList.item
})

export const cctvSlice = createSlice({
  name: "cctv",
  initialState,
  reducers: {
    setSelectedCCTV: (state, action) => {
      state.selectedCCTV = action.payload
    },
    viewCCTV: (state, action) => {
      state.watching = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchCCTVs.fulfilled, (state, action) => {
      cctvAdapter.setAll(state, action.payload)
    })
  },
})

export const {
  selectAll: selectAllCCTVs,
  selectById: selectCCTVById,
  selectIds: selectCCTVIds,
} = cctvAdapter.getSelectors(state => state.cctvs)

export const { setSelectedCCTV, viewCCTV } = cctvSlice.actions

export default cctvSlice.reducer
