import {
  Box,
  Container,
  ImageListItem,
  ImageListItemBar,
  Typography,
  Backdrop,
  Stack,
} from "@mui/material";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { Book } from "./types";
import { formatAuthors } from "../helpers/formatting";

interface BodyProps {}

const Body: React.FC<BodyProps> = () => {
  const [books, setBooks] = useState([] as Book[]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  const [selectedBookId, setSelectedBookId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        `https://backend.rhinestreetpubliclibrary.com/`
      );
      setBooks(result.data.data);
    };
    fetchData();

    function handleResize() {
      setIsMobile(window.innerWidth < 600);
    }
    window.addEventListener("resize", handleResize);
  }, []);

  const openMobileModal = (id: string) => {
    setIsMobileModalOpen(true);
    setSelectedBookId(id);
  };

  const closeMobileModal = () => {
    setIsMobileModalOpen(false);
    setSelectedBookId("");
  };

  const availableBooks = books.filter((a) => a.available);
  const unavailableBooks = books.filter((a) => !a.available);

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
      <Typography variant={isMobile ? "h5" : "h3"} sx={{}}>
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
              xs: "repeat(1, 1fr)",
              sm: "repeat(3, 1fr)",
            },
            gap: 2,
            justifyItems: isMobile ? "center" : "left",
          }}
        >
          <ImageListItem key={"available"} cols={isMobile ? 1 : 3}>
            <Typography variant="h6">Available:</Typography>
          </ImageListItem>
          {availableBooks.map((book) => {
            return (
              <ImageListItem
                key={book.url}
                sx={{
                  backgroundColor: "black",
                  aspectRatio: isMobile ? "1" : "auto",
                  p: 0.5,
                  position: "relative",
                }}
              >
                <Backdrop
                  sx={{
                    position: "absolute",
                    color: "#fff",
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={isMobileModalOpen && selectedBookId === book.id}
                  onClick={closeMobileModal}
                >
                  <Stack direction="column" alignItems="center" spacing={1}>
                    <Typography variant="h4" align="center" sx={{ pb: 2 }}>
                      {book.name}
                    </Typography>
                    <Typography variant="h6" align="center">
                      {formatAuthors(book.authors)}
                    </Typography>
                  </Stack>
                </Backdrop>
                <img
                  src={book.url}
                  alt={book.name}
                  style={{ objectFit: "cover" }}
                  height={isMobile ? 300 : 500}
                  width={300}
                  onClick={() =>
                    isMobile ? openMobileModal(book.id || "") : null
                  }
                />
                {/* Actions */}
                {!isMobile && (
                  <ImageListItemBar
                    sx={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
                    title={book.name}
                    subtitle={formatAuthors(book.authors)}
                  />
                )}
              </ImageListItem>
            );
          })}
          <ImageListItem key={"available"} cols={isMobile ? 1 : 3}>
            <Typography variant="h6" sx={{ pt: 1 }}>
              Checked out:
            </Typography>
          </ImageListItem>
          {unavailableBooks.map((book) => {
            return (
              <ImageListItem
                key={book.url}
                sx={{
                  backgroundColor: "black",
                  aspectRatio: isMobile ? "1" : "auto",
                  p: 0.5,
                  position: "relative",
                }}
              >
                <Backdrop
                  sx={{
                    position: "absolute",
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={isMobileModalOpen && selectedBookId === book.id}
                  onClick={closeMobileModal}
                >
                  <Stack direction="column" alignItems="center" spacing={1}>
                    <Typography variant="h4" align="center" sx={{ pb: 2 }}>
                      {book.name}
                    </Typography>
                    <Typography variant="h6" align="center">
                      {formatAuthors(book.authors)}
                    </Typography>
                  </Stack>
                </Backdrop>
                <img
                  src={book.url}
                  alt={book.name}
                  style={{ objectFit: "cover" }}
                  height={isMobile ? 300 : 500}
                  width={300}
                />
                <ImageListItemBar
                  sx={{
                    backgroundColor: "rgba(50, 50, 50, 0.75)",
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                  }}
                  onClick={() =>
                    isMobile ? openMobileModal(book.id || "") : null
                  }
                />

                {/* Actions */}
                {!isMobile && (
                  <ImageListItemBar
                    sx={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
                    title={book.name}
                    subtitle={formatAuthors(book.authors)}
                  />
                )}
              </ImageListItem>
            );
          })}
        </Box>
      </Box>
    </Container>
  );
};

export default Body;
