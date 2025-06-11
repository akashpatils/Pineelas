import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getData } from '../services/user'


const initialState = {

  get_overall_vendors_chartloading: true,
  get_vendors_tile_infoloading: true,
  vendor_overlay_detailsloading: true,
  get_vendors_listloading: true,
  get_vendor_tile_detailsloading: true,
  get_vendor_table_details: true,

}

export const fetchget_overall_vendors_chart = createAsyncThunk(
  'fetchget_overall_vendors_chart',
  async (get_overall_vendors_chart, thunkAPI) => {
    get_overall_vendors_chart = { ...get_overall_vendors_chart, elasticQueryName: "get_overall_vendors_chart" }
    const response = await getData(get_overall_vendors_chart);
    const [data] = response.data ?? []
    return data.OUTPUT ?? {}
  }
)
export const fetchget_vendors_tile_info = createAsyncThunk(
  'fetchget_vendors_tile_info',
  async (get_vendors_tile_info, thunkAPI) => {
    get_vendors_tile_info = { ...get_vendors_tile_info, elasticQueryName: "get_vendors_tile_info" }
    const response = await getData(get_vendors_tile_info);
    const [data] = response.data ?? []
    return data.OUTPUT ?? {}
  }
)
export const fetchvendor_overlay_details = createAsyncThunk(
  'fetchvendor_overlay_details',
  async (vendor_overlay_details, thunkAPI) => {
    vendor_overlay_details = { ...vendor_overlay_details, elasticQueryName: "vendor_overlay_details" }
    const response = await getData(vendor_overlay_details);
    const [data] = response.data ?? []
    return data.OUTPUT ?? {}
  }
)
export const fetchget_vendors_list = createAsyncThunk(
  'fetchget_vendors_list',
  async (get_vendors_list, thunkAPI) => {
    get_vendors_list = { ...get_vendors_list, elasticQueryName: "get_vendors_list" }
    const response = await getData(get_vendors_list);
    const [data] = response.data ?? []
    return data.OUTPUT ?? {}
  }
)
export const fetchget_vendor_tile_details = createAsyncThunk(
  'fetchget_vendor_tile_details',
  async (get_vendor_tile_details, thunkAPI) => {
    get_vendor_tile_details = { ...get_vendor_tile_details, elasticQueryName: "get_vendor_tile_details" }
    const response = await getData(get_vendor_tile_details);
    const [data] = response.data ?? []
    return data.OUTPUT ?? {}
  }
)
export const fetchget_vendor_table_details = createAsyncThunk(
  'fetchget_vendor_table_details',
  async (get_vendor_table_details, thunkAPI) => {
    get_vendor_table_details = { ...get_vendor_table_details, elasticQueryName: "get_vendor_table_details" }
    const response = await getData(get_vendor_table_details);
    const [data] = response.data ?? []
    return data.OUTPUT ?? {}
  }
)


export const vendor = createSlice({
  name: 'vendor',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchget_overall_vendors_chart.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
      state.get_overall_vendors_chartloading = false;
    }).addCase(fetchget_overall_vendors_chart.pending, (state, action) => {
      state.get_overall_vendors_chartloading = true;
    })
    builder.addCase(fetchget_vendors_tile_info.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
      state.get_vendors_tile_infoloading = false;
    }).addCase(fetchget_vendors_tile_info.pending, (state, action) => {
      state.get_vendors_tile_infoloading = true;
    })
    builder.addCase(fetchvendor_overlay_details.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
      state.vendor_overlay_detailsloading = false;
    }).addCase(fetchvendor_overlay_details.pending, (state, action) => {
      state.vendor_overlay_detailsloading = true;
    })
    builder.addCase(fetchget_vendors_list.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
      state.get_vendors_listloading = false;
    }).addCase(fetchget_vendors_list.pending, (state, action) => {
      state.get_vendors_listloading = true;
    })
    builder.addCase(fetchget_vendor_tile_details.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
      state.get_vendor_tile_detailsloading = false;
    }).addCase(fetchget_vendor_tile_details.pending, (state, action) => {
      state.get_vendor_tile_detailsloading = true;
    })
    builder.addCase(fetchget_vendor_table_details.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
      state.get_vendor_table_detailsloading = false;
    }).addCase(fetchget_vendor_table_details.pending, (state, action) => {
      state.get_vendor_table_detailsloading = true;
    })


  }
})


export default vendor.reducer
