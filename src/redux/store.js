import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import department from "./slices/department";
import globalSlice from "./slices/global";
import  vendor from "./slices/vendor";
import categories from "./slices/categories";
import payrollExpense from "./slices/payrollExpense";


const rootReducer = combineReducers({
  global: globalSlice,
  department: department,
  vendor: vendor,
  categories: categories,
  payrollExpense: payrollExpense
});


export const store = configureStore({
  reducer: rootReducer,
});


