## init

### 1. 터미널에 명령어를 순서대로 작성

```
nvm use 14.15.5
yarn init -y
yarn add react react-dom next
 ```

### 2. package.json

```
"scripts": {
  "start": "next"
  "build": "next build"
},
```

## pages 폴더 생성
pages 폴더 생성해서 index.tsx 파일 만들기

## scss loader 설정
```
yarn add classnames sass --save --dev
```
[파일명].module.scss

## typescript
### 1. 루트 디렉토리에 next-env.d.ts 파일을 만들기

### 2. package 설치
```
yarn add --dev typescript @types/react @types/node
```
### 3. 파일들을 .tsx 파일로 변경 후 프로젝트를 실행 시켰던 터미널에서 프로젝트 실행을 중지시키고 다시 실행(tsconfig.json을 자동으로 생성해 주고, 자동으로 setting까지 다 해줌)

## alias
tsconfig
```
{
  "compilerOptions": {
   ...,
   "baseUrl": "./src",
   "paths": {
     "@src/*": [
       "./*"
     ],
   },
  },
 ...
}
```

## reset.css
_app.tsx
```js
import { AppProps } from 'next/app'
import '/public/assets/css/common.css';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default App
```

## 이미지 절대 경로로 접근(Static File 접근)
루트 디렉토리에 public이라는 폴더 만들고 이미지 넣어서 사용
```
public
 ㄴ assets
  ㄴ img
   ㄴ test.png
```
```js
import Image from 'next/image'

function Avatar() {
  return <Image src="/assets/img/test.png" alt="me" width="64" height="64" />
}

export default Avatar
```

## Redux
```
yarn add react-redux redux @reduxjs/toolkit redux-thunk next-redux-wrapper axios --save --dev
```

store.ts

```js
import {
  combineReducers
} from 'redux';
import HomeReducer from '../reducers/HomeReducer';
import { Action, configureStore, getDefaultMiddleware, EnhancedStore } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { MakeStore, createWrapper } from "next-redux-wrapper";

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
const makeStore: MakeStore = (context) => setupStore(context);

export const wrapper = createWrapper(makeStore, {
  debug: devTools,
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export type AppDispatch = typeof store.dispatch;

```
_app.tsx
```js
import { AppProps } from 'next/app'
import '/public/assets/css/common.css';
import { wrapper } from '../../config/store';

function App({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  );
}

export default wrapper.withRedux(App);
```

homeReducer.ts
```js
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
```


## api proxy
next.config.js
```js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://~~/api/:path*' // Proxy to Backend
      }
    ]
  }
}
```