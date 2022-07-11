import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../app/apiService";
import { toast } from "react-toastify";

const initialState = {
    books: [],
    removedBookId: "",
    loading: false,
    status: "idle",
}

export const getReading = createAsyncThunk(
    'reading/getReading',
    async (loading) => {
        (loading = true);
        try {
            const res = await api.get(`/favorites`);
            return res.data;
        } catch (error) {
            toast(error.message);
        }
        (loading = false);
    }
);

export const deleteReading = createAsyncThunk(
    'reading/delateReading',
    async (removedBookId) => {
        try {
            await api.delete(`/favorites/${removedBookId}`);
            toast.success("The book has been removed");
            removedBookId = ""
        } catch (error) {
            toast(error.message);
        }
    }
);

export const readingPageSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        setRemovedBookId: (state, action) => {
            state.removedBookId = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        }
    },
    extraReducers: (builder) => {

        builder.addCase(getReading.pending, (state) => {
            state.status = "loading"
        }).addCase(getReading.fulfilled, (state, action) => {
            state.status = "idle";
            state.books = action.payload;
        }).addCase(getReading.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })

        builder.addCase(deleteReading.pending, (state) => {
            state.status = "loading"
        }).addCase(deleteReading.fulfilled, (state, action) => {
            state.status = "idle";
        }).addCase(deleteReading.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })

    },

});

export const { setRemovedBookId, setLoading } = readingPageSlice.actions;
export default readingPageSlice.reducer;