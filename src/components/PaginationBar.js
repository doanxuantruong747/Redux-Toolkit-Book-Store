import React from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from "react-redux";
import { setPageNum } from "../pages/homePage/homePageSlice";


const PaginationBar = () => {

  const dispatch = useDispatch();
  const { totalPage, pageNum } = useSelector((state) => state.books)

  const handleChange = (event, value) => {
    dispatch(setPageNum(value));
  };
  return (
    <Stack spacing={2}>
      <Pagination count={totalPage} page={pageNum} onChange={handleChange} showFirstButton showLastButton />
    </Stack>
  );
};

export default PaginationBar;

