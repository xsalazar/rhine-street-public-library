import {
  Box,
  Container,
  ImageListItem,
  Typography,
} from "@mui/material";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { Book } from "./types";
import LoadingCard from "./bookCard/loadingCard";
import BookCard from "./bookCard/bookCard";

interface BodyProps { }

const Body: React.FC<BodyProps> = () => {
  const [availableBooks, setAvailableBooks] = useState([] as Book[]);
  const [unavailableBooks, setUnAvailableBooks] = useState([] as Book[]);
  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  const [selectedBookId, setSelectedBookId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `https://backend.rhinestreetpubliclibrary.com/`,
        {
          headers: {
            "Cache-Control": "max-age=31536000",
          },
        }
      );
      const books = result.data.data as Book[]
      setAvailableBooks(books.filter((a) => a.available))
      setUnAvailableBooks(books.filter((a) => !a.available))
      setLoading(false)
    };
    fetchData();

    function handleResize() {
      setIsMobile(window.innerWidth < 600);
      setIsMobileModalOpen(false);
    }
    window.addEventListener("resize", handleResize);
  }, []);


  const toggleModal = (id: string) => {
    if (id !== selectedBookId) {
      setSelectedBookId(id);
      setIsMobileModalOpen(true);
    } else {
      setIsMobileModalOpen(!isMobileModalOpen);
    }
  };


  return (
    <Container
      maxWidth="md"
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        flexGrow: "1",
        justifyContent: "center",
        mt: 1,
        overflowY: "auto",
      }}
    >
      <Typography align="center" variant={isMobile ? "h4" : "h3"}>
        Rhine Street Library
      </Typography>
      <Typography variant="subtitle1" sx={{ pb: 1 }}>
        Your Neighborhood Lending Library
      </Typography>

      <Box
        sx={{
          mt: 2,
          flexGrow: "1",
          overflowY: "scroll",
          justifyItems: "center",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
            },
            gap: 2,
            justifyItems: isMobile ? "center" : "left",
          }}
        >
          <ImageListItem key={"available-header"} cols={isMobile ? 2 : 3}>
            <Typography variant="h6">Available:</Typography>
          </ImageListItem>

          {loading &&
            [1, 2, 3, 4, 5, 6, 7, 8, 9].map((v) => {
              return (
                <LoadingCard isMobile={isMobile} index={v} />
              )
            })
          }
          {availableBooks && availableBooks.map((book) => {
            return (
              <BookCard book={book} isMobile={isMobile} isModalOpen={isMobileModalOpen && selectedBookId === book.id} toggleModal={toggleModal} />
            );
          })}

          <ImageListItem key={`checked-out-header`} cols={isMobile ? 2 : 3}>
            <Typography variant="h6" sx={{ pt: 1 }}>
              Checked out:
            </Typography>
          </ImageListItem>

          {unavailableBooks.map((book) => {
            return (
              <BookCard book={book} isMobile={isMobile} isModalOpen={isMobileModalOpen && selectedBookId === book.id} toggleModal={toggleModal} isUnavailable />
            );
          })}
        </Box>
      </Box>
    </Container>
  );

};

export default Body;
