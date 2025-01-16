import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/auth/authSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiSlice } from "./api/apiSlice";
import { studentApiSlice } from "./api/student";
import { classesApiSlice } from "./api/classes";
import { teacherApiSlice } from "./api/teacher";
import { subjectApiSlice } from "./api/subject";
import { resultApiSlice } from "./api/result";
import { feeApiSlice } from "./api/fee";
import { blogApiSlice } from "./api/blog";


const store = configureStore({
    reducer: {
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        [classesApiSlice.reducerPath]: classesApiSlice.reducer,
        [studentApiSlice.reducerPath]: studentApiSlice.reducer,
        [teacherApiSlice.reducerPath]: teacherApiSlice.reducer,
        [subjectApiSlice.reducerPath]: subjectApiSlice.reducer,
        [resultApiSlice.reducerPath]: resultApiSlice.reducer,
        [feeApiSlice.reducerPath]:feeApiSlice.reducer,
        [blogApiSlice.reducerPath]:blogApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                warnAfter: 64, // Increase the warning threshold to 64ms
            },
        }).concat(
            apiSlice.middleware,
            classesApiSlice.middleware,
            studentApiSlice.middleware,
            teacherApiSlice.middleware,
            subjectApiSlice.middleware,
            resultApiSlice.middleware,
            feeApiSlice.middleware,
            blogApiSlice.middleware,
        ),
    devTools: true,
});

// Set up listeners for RTK Query
setupListeners(store.dispatch);

export default store;
