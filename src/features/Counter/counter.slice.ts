import { PayloadAction, createSlice, createAsyncThunk, Dispatch } from '@reduxjs/toolkit';

export const incrementByAmountAsync = createAsyncThunk<
  CounterStateValue,
  CounterStateValue,
  { rejectValue: string }
>('counter/incrementByAmountAsync', async (value: CounterStateValue, { rejectWithValue }) => {
  try {
    const response = await new Promise((resolve) => {
      setTimeout(() => resolve(value), 2000);
    });
    return response as CounterStateValue;
  } catch (error) {
    return rejectWithValue('increment by Amount Async error');
  }
});

type CounterStateValue = number;
type State = 'idle' | 'pending' | 'fulfilled' | 'rejected';

interface CounterState {
  value: CounterStateValue;
  state: State;
}

const initialState: CounterState = {
  value: 0,
  state: 'idle',
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<CounterStateValue>) => {
      state.value += action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(incrementByAmountAsync.pending, (state) => {
        state.state = 'pending';
      })
      .addCase(incrementByAmountAsync.fulfilled, (state, action) => {
        state.state = 'fulfilled';
        state.value += action.payload;
      });
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const { reducer } = counterSlice;
export const selectCounter = (state: RootState) => state.counter;

export const alternateAmount = (value: CounterStateValue) => (dispatch: AppDispatch) => {
  setTimeout(() => dispatch(incrementByAmount(value)), 1000);
};
