import { combineReducers, configureStore } from "@reduxjs/toolkit";
import homePageReducer from "../pages/homePage/homePageSlice";
import bookDetailPageReducer from "../pages/bookDetailPage/bookDetailPageSlice";
import readingPageReducer from "../pages/readingPage/readingPageSlice";

export const store = configureStore({
    reducer: combineReducers({
        books: homePageReducer,
        book: bookDetailPageReducer,
        reading: readingPageReducer
    }),
});