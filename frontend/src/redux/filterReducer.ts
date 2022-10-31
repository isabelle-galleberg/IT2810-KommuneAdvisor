import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  sortBy: string;
  sortDirection: string;
}

const initialState: FilterState = {
  sortBy: 'name',
  sortDirection: 'ascending',
};

export const filterSlice = createSlice({
  name: 'filterInput',
  initialState,
  reducers: {
    updateFilter: (state, action: PayloadAction<string>) => {
      switch (action.payload) {
        case 'Befolkning høy-lav':
          state.sortBy = 'population';
          state.sortDirection = 'descending';
          break;
        case 'Befolkning lav-høy':
          state.sortBy = 'population';
          state.sortDirection = 'ascending';
          break;
        case 'Areal høy-lav':
          state.sortBy = 'area';
          state.sortDirection = 'descending';
          break;
        case 'Areal lav-høy':
          state.sortBy = 'area';
          state.sortDirection = 'ascending';
          break;
        case 'Rangering høy-lav':
          state.sortBy = 'rating';
          state.sortDirection = 'descending';
          break;
        case 'Rangering lav-høy':
          state.sortBy = 'rating';
          state.sortDirection = 'ascending';
          break;
        default:
          state.sortBy = 'name';
          state.sortDirection = 'ascending';
      }
    },
  },
});

export const { updateFilter } = filterSlice.actions;

export default filterSlice.reducer;
