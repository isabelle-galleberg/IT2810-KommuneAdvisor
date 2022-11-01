import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  filter: string;
}

const initialState: FilterState = {
  filter: '',
};

// global state for filter, can be updated with updateFilter
export const filterSlice = createSlice({
  name: 'filterInput',
  initialState,
  reducers: {
    updateFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
  },
});

export const { updateFilter } = filterSlice.actions;

export default filterSlice.reducer;
