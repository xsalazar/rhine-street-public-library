import {
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import axios from "axios";

import React from "react";
import { Book } from "./types";
import { formatAuthors } from "../helpers/formatting";

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
        <div style={{ height: "calc(100vh - 200px)" }}>
          <Typography
            variant="h4"
            align="center"
            sx={{ height: "1em", paddingBottom: "10px" }}
          >
            Rhine Street Public Library 📚
          </Typography>
          <ImageList cols={3} gap={24} sx={{ height: "100%", width: "100%" }}>
            {sortedBooks.map((book) => {
              return (
                <ImageListItem
                  key={book.url}
                  sx={{
                    backgroundColor: "black",
                    color: "#575b6e",
                    border: "6px solid #8080806e",
                    height: "20px",
                  }}
                >
                  <img src={book.url} alt={book.name} loading="lazy" />
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
                  <ImageListItemBar
                    sx={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
                    title={book.name}
                    subtitle={formatAuthors(book.authors)}
                  />
                </ImageListItem>
              );
            })}
          </ImageList>
        </div>

        {/* {Array.from(sortedBooks).map((book, index) => (
            <ListItemButton>
              <BookCard book={book} />
            </ListItemButton>
          ))} */}
        {/* </ImageList> */}
      </Container>
    );
  }
}
