import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../app/apiService";

const initialState = {
    books: [],
    query: "",
    pageNum: 1,
    totalPage: 10,
    limit: 10,
    searchQuery: "",
    errorMessage: "",
    status: "idle"
}
export const getBooks = createAsyncThunk(
    'booking/getBooks',
    async (pageNum, limit, query, errorMessage) => {
        try {
            let url = `/books?_page=${pageNum}&_limit=${limit}`;
            if (query) url += `&q=${query}`;
            const res = await api.get(url);
            return res.data
        } catch (error) {
            errorMessage(error.message);
        }
    }
)

export const homePageSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        setPageNum: (state, action) => {
            state.pageNum = action.payload
        },
        setQuery: (state, action) => {
            state.query = action.payload
        }
    },
    extraReducers: (builder) => {

        builder.addCase(getBooks.pending, (state) => {
            state.status = "loading"
        }).addCase(getBooks.fulfilled, (state, action) => {
            state.status = "idle";
            state.books = action.payload;
        }).addCase(getBooks.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })


    },

});

export const { setPageNum, setQuery } = homePageSlice.actions;
export default homePageSlice.reducer;