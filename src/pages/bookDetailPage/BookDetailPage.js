import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useParams } from "react-router-dom";

import { Container, Button, Box, Grid, Stack, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { addReading, detailBook, setAddingBook } from "./bookDetailPageSlice";

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const BookDetailPage = () => {
  const [loading, setLoading] = useState(false);
  const { book, addingBook } = useSelector((state) => state.book)
  const dispatch = useDispatch()
  const params = useParams();
  const bookId = params.id


  useEffect(() => {
    setLoading(true);
    dispatch(detailBook(bookId))
    setLoading(false);
  }, [dispatch, bookId])

  const addToReadingList = (book) => {
    dispatch(setAddingBook(book));
  };

  useEffect(() => {
    setLoading(true);

    dispatch(addReading(addingBook))
    setLoading(false);
  }, [dispatch, addingBook])


  return (
    <Container>
      {loading ? (
        <Box sx={{ textAlign: "center", color: "primary.main" }} >
          <ClipLoader color="#inherit" size={150} loading={true} />
        </Box>
      ) : (
        <Grid container spacing={2} p={4} mt={5} sx={{ border: "1px solid black" }}>
          <Grid item md={4}>
            {book && (
              <img
                width="100%"
                src={`${BACKEND_API}/${book.imageLink}`}
                alt=""
              />
            )}
          </Grid>
          <Grid item md={8}>
            {book && (
              <Stack>
                <h2>{book.title}</h2>
                <Typography variant="body1">
                  <strong>Author:</strong> {book.author}
                </Typography>
                <Typography variant="body1">
                  <strong>Year:</strong> {book.year}
                </Typography>
                <Typography variant="body1">
                  <strong>Country:</strong> {book.country}
                </Typography>
                <Typography variant="body1">
                  <strong>Pages:</strong> {book.pages}
                </Typography>
                <Typography variant="body1">
                  <strong>Language:</strong> {book.language}
                </Typography>
                <Button variant="outlined" sx={{ width: "fit-content" }} onClick={() => addToReadingList(book)}>
                  Add to Reading List
                </Button>
              </Stack>
            )}
          </Grid>
        </Grid>
      )
      }
    </Container >
  );
};

export default BookDetailPage;
