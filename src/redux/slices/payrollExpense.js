import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getData } from '../services/user'


const initialState = {

  get_payroll_tile_detailsloading: true,
}

export const fetchget_payroll_tile_details = createAsyncThunk(
  'fetchget_payroll_tile_details',
  async (get_payroll_tile_details, thunkAPI) => {
    get_payroll_tile_details = { ...get_payroll_tile_details, elasticQueryName: "get_payroll_tile_details" }
    const response = await getData(get_payroll_tile_details);
    const [data] = response.data ?? []
    return data.OUTPUT ?? {}
  }
)

export const payrollExpense = createSlice({
  name: 'payrollExpense',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchget_payroll_tile_details.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
      state.get_payroll_tile_detailsloading = false;
    }).addCase(fetchget_payroll_tile_details.pending, (state, action) => {
      state.get_payroll_tile_detailsloading = true;
    })
  }
})


export default payrollExpense.reducer
