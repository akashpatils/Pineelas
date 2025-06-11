import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getData } from '../services/user'


const initialState = {

  get_agency_list_with_fiscal_yearloading: true,
  get_fiscal_yearloading: true,

}

export const fetchget_agency_list_with_fiscal_year = createAsyncThunk(
  'fetchget_agency_list_with_fiscal_year',
  async (get_agency_list_with_fiscal_year, thunkAPI) => {
    get_agency_list_with_fiscal_year = { ...get_agency_list_with_fiscal_year, elasticQueryName: "get_agency_list_with_fiscal_year" }
    const response = await getData(get_agency_list_with_fiscal_year);
    const [data] = response.data ?? []
    return data.OUTPUT ?? {}
  }
)

export const fetchget_fiscal_year = createAsyncThunk(
  'fetchget_fiscal_year',
  async (get_fiscal_year, thunkAPI) => {
    get_fiscal_year = { ...get_fiscal_year, elasticQueryName: "get_fiscal_year" }
    const response = await getData(get_fiscal_year);
    const [data] = response.data ?? []
    return data.OUTPUT ?? {}
  }
)

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchget_agency_list_with_fiscal_year.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
      state.get_agency_list_with_fiscal_yearloading = false;
    }).addCase(fetchget_agency_list_with_fiscal_year.pending, (state, action) => {
      state.get_agency_list_with_fiscal_yearloading = true;
    })

    builder.addCase(fetchget_fiscal_year.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
      state.get_fiscal_yearloading = false;
    }).addCase(fetchget_fiscal_year.pending, (state, action) => {
      state.get_fiscal_yearloading = true;
    })

  }
})


export default globalSlice.reducer
