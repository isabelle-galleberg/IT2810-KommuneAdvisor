import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CountyState {
  county: string;
}

const initialState: CountyState = {
  county: '',
};

// global state for county, can be updated with updateCounty
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

export default countySlice.reducer;
