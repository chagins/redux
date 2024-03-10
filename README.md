# Adding Redux to a React Project:
1. Add the @reduxjs/toolkit and react-redux packages
2. Create a Redux store using RTK's configureStore API
```typescript
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```
3. Create at least one slice using RTK's createSlice API
```typescript
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface SomeFeatureState {
  value: number;
}

const initialState: SomeFeatureState = {
  value: 0,
};

const someFeatureSlice = createSlice({
  name: 'someFeature',
  initialState,
  reducers: {
    someAction: (state) => {
      state.value += 1;
    },
    otherSomeAction: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { someAction, otherSomeAction } = counterSlice.actions;
export const { reducer: someFeatureReducer } = someFeatureSlice;
```
5. Pass to store a reducer function
```typescript
import { configureStore } from '@reduxjs/toolkit';
import { someFeatureReducer } from 'features/SomeFeature';

export const store = configureStore({
  reducer: {
    someFeature: someFeatureReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```
6. Declare store types
```typescript
declare type RootState = import('./store').RootState;
declare type AppDispatch = import('./store').AppDispatch;
```
6. Add typed redux hooks
```typescript
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```
7. Wrap your root React component with the <Provider> component from React-Redux, like:
```typescript
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';
import { App } from 'App';

import './index.scss';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
```
