import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
    searchKey: string;
}

const initialState: SearchState = {
    searchKey: "",
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchKey: (state, action: PayloadAction<string>) => {
            state.searchKey = action.payload;
        },
        clearSearchKey: (state) => {
            state.searchKey = "";
        },
    },
});

export const { setSearchKey, clearSearchKey } = searchSlice.actions;
export default searchSlice.reducer;
