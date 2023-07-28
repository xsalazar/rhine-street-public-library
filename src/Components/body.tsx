import {
  Container,
  ListItemButton,
  Typography,
  ImageList,
} from "@mui/material";

import React from "react";
import data from "./../data/books.json";
import BookCard from "./bookCard";

export default class Body extends React.Component {
  render() {
    const sortedBooks = data.books.sort((a, b) => (b.available ? 1 : -1));

    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: "2",
        }}
      >
        <Typography
          variant="body1"
          align="center"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: "1",
          }}
        >
          📚 More books, coming soon!
        </Typography>

        <ImageList
          sx={{ width: 800, height: 500 }}
          gap={8}
          cols={3}
          rowHeight={265}
          variant="woven"
        >
          {Array.from(sortedBooks).map((book, index) => (
            // <Grid item xs={2} sm={4} md={4} key={index}>
            <ListItemButton>
              <BookCard book={book} />
            </ListItemButton>
            // </Grid>
          ))}
        </ImageList>
      </Container>
    );
  }
}
