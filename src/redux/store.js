import {combineReducers, configureStore } from "@reduxjs/toolkit";
import globalReducers from './reducers/global';

const rootReducer = combineReducers({
  global: globalReducers
})

export const store = configureStore({
  reducer: rootReducer
})
