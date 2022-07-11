import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pageNum: 1,
    totalPage: 10,
    limit: 10,
    searchQuery: ""
}

export const homePageSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        setPageNum: (state, action) => {
            state.pageNum = action.payload
        }
    },

});

export const { setPageNum } = homePageSlice.actions;
export default homePageSlice.reducer;