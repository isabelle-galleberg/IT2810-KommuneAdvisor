import { configureStore } from '@reduxjs/toolkit';
import kommuneReducer from './kommuneReducer';
import countyReducer from './countyReducer';
import filterReducer from './filterReducer';
import pageReducer from './pageReducer';

export const store = configureStore({
  reducer: {
    kommuneInput: kommuneReducer,
    countyInput: countyReducer,
    filterInput: filterReducer,
    pageInput: pageReducer,
  },
});

// infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
