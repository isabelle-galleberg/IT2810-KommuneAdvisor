import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface CountyState {
  county: string;
}

const initialState: CountyState = {
  county: '',
};

export const countySlice = createSlice({
  name: 'countyInput',
  initialState,
  reducers: {
    updateCounty: (state, action: PayloadAction<string>) => {
      state.county = action.payload;
    },
  },
});

export const { updateCounty } = countySlice.actions;

// Brukes denne?
export const selectCounty = (state: RootState) => state.countyInput.county;

export default countySlice.reducer;
