import { Container, Typography, ImageListItem } from "@mui/material";

import React from "react";
import { Book } from "./types";
import StatusCard from "./statusCard";

const BookCard: React.FC<{ book: Book }> = ({ book }) => {
  return (
    <Container sx={{ padding: "0.1em" }}>
      <ImageListItem sx={{ height: "220px" }} key={book.url}>
        <img src={book.url} loading="lazy" alt={book.name} />
      </ImageListItem>

      <Typography
        variant="subtitle1"
        align="center"
        sx={{ height: "2em", paddingBottom: "25px" }}
      >
        {book.name}
      </Typography>
      <Typography
        variant="body2"
        align="center"
        sx={{ height: "2em", paddingBottom: "25px" }}
      >
        {Array.from(book.authors).map((author, index) =>
          index === book.authors.length - 1 ? author : `${author}, `
        )}
      </Typography>
      <StatusCard available={book.available} />
    </Container>
  );
};

export default BookCard;
