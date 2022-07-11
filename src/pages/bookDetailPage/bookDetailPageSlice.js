import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../app/apiService";
import { toast } from "react-toastify";

const initialState = {
    addingBook: false,
    book: null,
    status: "idle",
}


export const detailBook = createAsyncThunk(
    'book/detailBook',
    async (bookId) => {
        try {
            const res = await api.get(`/books/${bookId}`);
            return res.data;
        } catch (error) {
            toast.error(error.message);
        }
    }
);

export const addReading = createAsyncThunk(
    'book/addReading',
    async (addingBook) => {
        if (!addingBook) return;
        try {
            await api.post(`/favorites`, addingBook);
            toast.success("The book has been added to the reading list!");
        } catch (error) {
            console.log(error);
        }

    }
);

export const bookDetailPageSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        setAddingBook: (state, action) => {
            state.addingBook = action.payload
        }
    },
    extraReducers: (builder) => {

        builder.addCase(detailBook.pending, (state) => {
            state.status = "loading"
        }).addCase(detailBook.fulfilled, (state, action) => {
            state.status = "idle";
            state.book = action.payload;
        }).addCase(detailBook.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })

        builder.addCase(addReading.pending, (state) => {
            state.status = "loading"
        }).addCase(addReading.fulfilled, (state, action) => {
            state.status = "idle";
        }).addCase(addReading.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
    },

});

export const { setAddingBook } = bookDetailPageSlice.actions;
export default bookDetailPageSlice.reducer;