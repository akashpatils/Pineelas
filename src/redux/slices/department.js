import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getData } from '../services/user'


const initialState = {

  get_overall_departments_info_updatedloading: true,
  department_overlay_detailsloading: true,
  get_department_listloading: true,
  get_department_table_detailsloading: true,
  get_department_tile_detailsloading: true,

}

export const fetchget_overall_departments_info_updated = createAsyncThunk(
  'fetchget_overall_departments_info_updated',
  async (get_overall_departments_info_updated, thunkAPI) => {
    get_overall_departments_info_updated = { ...get_overall_departments_info_updated, elasticQueryName: "get_overall_departments_info_updated" }
    const response = await getData(get_overall_departments_info_updated);
    const [data] = response.data ?? []
    return data.OUTPUT ?? {}
  }
)

export const fetchdepartment_overlay_details = createAsyncThunk(
  'fetchdepartment_overlay_details',
  async (department_overlay_details, thunkAPI) => {
    department_overlay_details = { ...department_overlay_details, elasticQueryName: "department_overlay_details" }
    const response = await getData(department_overlay_details);
    const [data] = response.data ?? []
    return data.OUTPUT ?? {}
  }
)

export const fetchget_department_list = createAsyncThunk(
  'fetchget_department_list',
  async (get_department_list, thunkAPI) => {
    get_department_list = { ...get_department_list, elasticQueryName: "get_department_list" }
    const response = await getData(get_department_list);
    const [data] = response.data ?? []
    return data.OUTPUT ?? {}
  }
)

export const fetchget_department_table_details = createAsyncThunk(
  'fetchget_department_table_details',
  async (get_department_table_details, thunkAPI) => {
    get_department_table_details = { ...get_department_table_details, elasticQueryName: "get_department_table_details" }
    const response = await getData(get_department_table_details);
    const [data] = response.data ?? []
    return data.OUTPUT ?? {}
  }
)

export const fetchget_department_tile_details = createAsyncThunk(
  'fetchget_department_tile_details',
  async (get_department_tile_details, thunkAPI) => {
    get_department_tile_details = { ...get_department_tile_details, elasticQueryName: "get_department_tile_details" }
    const response = await getData(get_department_tile_details);
    const [data] = response.data ?? []
    return data.OUTPUT ?? {}
  }
)

export const department = createSlice({
  name: 'department',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {

    builder.addCase(fetchget_overall_departments_info_updated.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
      state.get_overall_departments_info_updatedloading = false;
    }).addCase(fetchget_overall_departments_info_updated.pending, (state, action) => {
      state.get_overall_departments_info_updatedloading = true;
    })

    builder.addCase(fetchdepartment_overlay_details.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
      state.department_overlay_detailsloading = false;
    }).addCase(fetchdepartment_overlay_details.pending, (state, action) => {
      state.department_overlay_detailsloading = true;
    })

    builder.addCase(fetchget_department_list.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
      state.get_department_listloading = false;
    }).addCase(fetchget_department_list.pending, (state, action) => {
      state.get_department_listloading = true;
    })

    builder.addCase(fetchget_department_table_details.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
      state.get_department_table_detailsloading = false;
    }).addCase(fetchget_department_table_details.pending, (state, action) => {
      state.get_department_table_detailsloading = true;
    })

    builder.addCase(fetchget_department_tile_details.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
      state.get_department_tile_detailsloading = false;
    }).addCase(fetchget_department_tile_details.pending, (state, action) => {
      state.get_department_tile_detailsloading = true;
    })

  }
})


export default department.reducer
