import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import APIs from '@src/api/APIs';
import { IHomeData } from 'next-ts-setting';

type HomeState = {
  data: IHomeData | null;
}

const homeState: HomeState = {
  data: null
};

export const fetchHomeData = createAsyncThunk<any, any, any>(
  'home/fetchHomeData',
  async ({ id }, thunkAPI) => {
    try {
      const response = await APIs.test(id);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue('Something went wrong.');
    }
  }
);

export const slice = createSlice({
  name: 'home',
  initialState: homeState,
  reducers: {
    resetHomeData(state: HomeState) {
      state.data = null;
    }
  },
  extraReducers: {
    [fetchHomeData.fulfilled.type]: (state: HomeState, action) => {
      const { payload } = action;

      state.data = payload;
    },
    [fetchHomeData.rejected.type]: (state: HomeState, _action) => {
      state.data = null;
    },
  },
});

export const {
  resetHomeData
} = slice.actions;

const HomeReducer = slice.reducer;
export default HomeReducer;
