import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface PageState {
  page: number;
}

const initialState: PageState = {
  page: 1,
};

export const pageSlice = createSlice({
  name: 'pageInput',
  initialState,
  reducers: {
    updatePage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const { updatePage: updatePage } = pageSlice.actions;

export default pageSlice.reducer;
