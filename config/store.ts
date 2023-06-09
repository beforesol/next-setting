import {
  combineReducers
} from 'redux';
import HomeReducer from '../reducers/HomeReducer';
import { Action, configureStore, getDefaultMiddleware, EnhancedStore } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { createWrapper } from "next-redux-wrapper";

const rootReducer = combineReducers({
  home: HomeReducer
});

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
  }
}

const devTools =
  process.env.NODE_ENV === 'development' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : (f: any) => f;

const store = configureStore({
  reducer: rootReducer,
  devTools,
  middleware: getDefaultMiddleware()
});

const setupStore = (context: any): EnhancedStore => store;
const makeStore = (context) => setupStore(context);

export const wrapper = createWrapper(makeStore, {
  debug: devTools,
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export type AppDispatch = typeof store.dispatch;
