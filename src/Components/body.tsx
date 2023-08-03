import {
  Box,
  Container,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { Book } from "./types";
import { formatAuthors } from "../helpers/formatting";

interface BodyProps {}

const Body: React.FC<BodyProps> = () => {
  const [books, setBooks] = useState([] as Book[]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

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
      <Typography variant="h3" sx={{}}>
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
                <img
                  src={book.url}
                  alt={book.name}
                  style={{ objectFit: "cover" }}
                  height={isMobile ? 300 : 500}
                  width={300}
                />
                {!book.available && (
                  <ImageListItemBar
                    sx={{
                      backgroundColor: "rgba(50, 50, 50, 0.75)",
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                )}
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
                  // color: "#575b6e",
                  // border: "6px solid #8080806e",
                  aspectRatio: isMobile ? "1" : "auto",
                  p: 0.5,
                  position: "relative",
                  // height: 256,
                }}
              >
                <img
                  src={book.url}
                  alt={book.name}
                  style={{ objectFit: "cover" }}
                  height={isMobile ? 300 : 500}
                  width={300}
                />
                {!book.available && (
                  <ImageListItemBar
                    sx={{
                      backgroundColor: "rgba(50, 50, 50, 0.75)",
                      position: "absolute",
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                )}
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
