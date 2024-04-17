
// export type AppStore = ReturnType<typeof makeStore>;
// export type RootState = ReturnType<AppStore['getState']>;
// export type AppDispatch = AppStore['dispatch'];
import { configureStore } from '@reduxjs/toolkit';
import useReducer from '../redux/userSlice';
import pageReducer from '../redux/pageSlice';

export const store = configureStore({
    reducer: {
        user: useReducer,
        page: pageReducer,
    },
});