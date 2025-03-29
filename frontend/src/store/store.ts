import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../slices/studentSlice";
import searchReducer from "../slices/searchSlice";

export const store = configureStore({
    reducer: {
        students: studentReducer,
        search: searchReducer,
    },
});

// Lấy kiểu của RootState và AppDispatch để dùng trong TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
