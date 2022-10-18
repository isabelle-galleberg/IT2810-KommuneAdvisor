import { configureStore } from '@reduxjs/toolkit';
import kommuneReducer from './kommuneReducer';
import countyReducer from './countyReducer';
import filterReducer from './filterReducer';


export const store = configureStore({
  reducer: {
    kommuneInput: kommuneReducer,
    countyInput: countyReducer,
    filterInput: filterReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch