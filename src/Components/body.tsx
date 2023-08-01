import { Container, ListItemButton, ImageList } from "@mui/material";
import axios from "axios";

import React from "react";
import BookCard from "./bookCard";
import { Book } from "./types";

interface BodyProps {}

interface BodyState {
  books: Array<Book>;
}

export default class Body extends React.Component<BodyProps, BodyState> {
  constructor(props: BodyProps) {
    super(props);
    this.state = { books: [] };
  }

  async componentDidMount(): Promise<void> {
    const result = (
      await axios.get(`https://backend.rhinestreetpubliclibrary.com/`)
    ).data;

    this.setState({
      books: result.data,
    });
  }

  render() {
    const { books } = this.state;
    const sortedBooks = books.sort((a, b) => (b.available ? 1 : -1));

    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: "2",
        }}
      >
        <ImageList
          sx={{ width: 800, height: 500 }}
          gap={8}
          cols={3}
          rowHeight={265}
          variant="woven"
        >
          {Array.from(sortedBooks).map((book, index) => (
            <ListItemButton>
              <BookCard book={book} />
            </ListItemButton>
          ))}
        </ImageList>
      </Container>
    );
  }
}
