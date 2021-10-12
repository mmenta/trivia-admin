import {combineReducers, configureStore } from "@reduxjs/toolkit";
import counterSlice from './reducers/global';

const rootReducer = combineReducers({
  global: counterSlice
})

export const store = configureStore({
  reducer: rootReducer
})
