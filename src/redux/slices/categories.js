import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getData } from '../services/user'


const initialState = {

  get_overall_category_infoloading: true,
  get_category_list_infoloading: true,
  category_overlay_detailsloading: true,
  category_table_detailsloading: true,
  get_category_listloading: true,
  get_category_tile_detailsloading: true,
  get_category_table_detailsloading: true,

}

export const fetchget_overall_category_info = createAsyncThunk(
  'fetchget_overall_category_info',
  async (get_overall_category_info, thunkAPI) => {
    get_overall_category_info = { ...get_overall_category_info, elasticQueryName: "get_overall_category_info" }
    const response = await getData(get_overall_category_info);
    const data = response.data ?? []
    return data ?? []
  }
)
export const fetchget_category_list_info = createAsyncThunk(
  'fetchget_category_list_info',
  async (get_category_list_info, thunkAPI) => {
    get_category_list_info = { ...get_category_list_info, elasticQueryName: "get_category_list_info" }
    const response = await getData(get_category_list_info);
    const [data] = response.data ?? []
    return data.OUTPUT ?? {}
  }
)
export const fetchcategory_overlay_details = createAsyncThunk(
  'fetchcategory_overlay_details',
  async (category_overlay_details, thunkAPI) => {
    category_overlay_details = { ...category_overlay_details, elasticQueryName: "category_overlay_details" }
    const response = await getData(category_overlay_details);
    const [data] = response.data ?? []
    return data.OUTPUT ?? {}
  }
)
export const fetchcategory_table_details = createAsyncThunk(
  'fetchcategory_table_details',
  async (category_table_details, thunkAPI) => {
    category_table_details = { ...category_table_details, elasticQueryName: "category_table_details" }
    const response = await getData(category_table_details);
    const [data] = response.data ?? []
    return data.OUTPUT ?? {}
  }
)
export const fetchget_category_list = createAsyncThunk(
  'fetchget_category_list',
  async (get_category_list, thunkAPI) => {
    get_category_list = { ...get_category_list, elasticQueryName: "get_category_list" }
    const response = await getData(get_category_list);
    const [data] = response.data ?? []
    return data.OUTPUT ?? {}
  }
)
export const fetchget_category_tile_details = createAsyncThunk(
  'fetchget_category_tile_details',
  async (get_category_tile_details, thunkAPI) => {
    get_category_tile_details = { ...get_category_tile_details, elasticQueryName: "get_category_tile_details" }
    const response = await getData(get_category_tile_details);
    const [data] = response.data ?? []
    return data.OUTPUT ?? {}
  }
)
export const fetchget_category_table_details = createAsyncThunk(
  'fetchget_category_table_details',
  async (get_category_table_details, thunkAPI) => {
    get_category_table_details = { ...get_category_table_details, elasticQueryName: "get_category_table_details" }
    const response = await getData(get_category_table_details);
    const [data] = response.data ?? []
    return data.OUTPUT ?? {}
  }
)

export const categories = createSlice({
  name: 'categories',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchget_overall_category_info.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
      state.get_overall_category_infoloading = false;
    }).addCase(fetchget_overall_category_info.pending, (state, action) => {
      state.get_overall_category_infoloading = true;
    })
    builder.addCase(fetchget_category_list_info.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
      state.get_category_list_infoloading = false;
    }).addCase(fetchget_category_list_info.pending, (state, action) => {
      state.get_category_list_infoloading = true;
    })
    builder.addCase(fetchcategory_overlay_details.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
      state.category_overlay_detailsloading = false;
    }).addCase(fetchcategory_overlay_details.pending, (state, action) => {
      state.category_overlay_detailsloading = true;
    })
    builder.addCase(fetchcategory_table_details.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
      state.category_table_detailsloading = false;
    }).addCase(fetchcategory_table_details.pending, (state, action) => {
      state.category_table_detailsloading = true;
    })
    builder.addCase(fetchget_category_list.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
      state.get_category_listloading = false;
    }).addCase(fetchget_category_list.pending, (state, action) => {
      state.get_category_listloading = true;
    })
    builder.addCase(fetchget_category_tile_details.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
      state.get_category_tile_detailsloading = false;
    }).addCase(fetchget_category_tile_details.pending, (state, action) => {
      state.get_category_tile_detailsloading = true;
    })
    builder.addCase(fetchget_category_table_details.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
      state.get_category_table_detailsloading = false;
    }).addCase(fetchget_category_table_details.pending, (state, action) => {
      state.get_category_table_detailsloading = true;
    })


  }
})


export default categories.reducer
