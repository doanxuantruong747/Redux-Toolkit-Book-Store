import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { Container, Alert, Box, Card, Stack, CardMedia, CardActionArea, Typography, CardContent } from "@mui/material";
import { FormProvider } from "../../form";
import { useForm } from "react-hook-form";
import SearchForm from "../../components/SearchForm";
import { useSelector } from "react-redux";
import PaginationBar from "../../components/PaginationBar";
import api from "../../app/apiService";
const BACKEND_API = process.env.REACT_APP_BACKEND_API;


const HomePage = () => {
  const { pageNum, limit, searchQuery } = useSelector((state) => state.books)

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let url = `/books?_page=${pageNum}&_limit=${limit}`;
        if (query) url += `&q=${query}`;
        const res = await api.get(url);
        setBooks(res.data);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false);
    };
    fetchData();
  }, [pageNum, limit, query]);

  //--------------form
  const methods = useForm({ searchQuery });
  const { handleSubmit } = methods;
  const onSubmit = (data) => {
    setQuery(data.searchQuery);
  };
  //-------------ClickDetail
  const navigate = useNavigate()
  const handleClickBook = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  return (
    <Container>
      <Stack sx={{ display: "flex", alignItems: "center", m: "2rem" }}>
        <Typography variant="h3" sx={{ textAlign: "center" }}>Book Store</Typography>
        {errorMessage && <Alert severity="danger">{errorMessage}</Alert>}
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

          <Stack spacing={2} direction={{ xs: "column", sm: "row" }}
            alignItems={{ sm: "center" }} justifyContent="space-between" mb={2} >

            <SearchForm />
          </Stack>
        </FormProvider>

        <PaginationBar />

      </Stack>
      <div>
        {loading ? (
          <Box sx={{ textAlign: "center", color: "primary.main" }} >
            <ClipLoader color="inherit" size={150} loading={true} />
          </Box>
        ) : (
          <Stack direction="row" spacing={2} justifyContent="space-around" flexWrap="wrap">
            {books.map((book) => (
              <Card
                key={book.id} onClick={() => handleClickBook(book.id)}
                sx={{ width: "12rem", height: "27rem", marginBottom: "2rem", }}>

                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={`${BACKEND_API}/${book.imageLink}`}
                    alt={`${book.title}`} />

                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {`${book.title}`}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Stack>
        )}
      </div>
    </Container>
  )
}

export default HomePage;
