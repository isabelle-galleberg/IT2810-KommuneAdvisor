import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface FilterState {
  filter: string;
}

const initialState: FilterState = {
  filter: '',
};

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

// Brukes denne?
export const selectFilter = (state: RootState) => state.filterInput.filter;

export default filterSlice.reducer;
