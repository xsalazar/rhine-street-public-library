import React, { useEffect, useState } from "react";
import axios from "axios";

import { Book } from "../types";
import {
  Container,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Snackbar,
  Stack,
  ImageListItem,
  ImageListItemBar,
  Box,
  Button,
  Backdrop,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import LoadingButton from "@mui/lab/LoadingButton";
import { Close, Save, Visibility, VisibilityOff } from "@mui/icons-material";
import AdminBookCard from "./adminBookCard";
import { CheckIcon } from "@primer/octicons-react";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

// import { v4 as uuid } from "uuid";
import { v4 as uuidv4 } from "uuid";

interface AdminProps {}

const emptyBook = {
  name: "",
  authors: [],
  available: true,
  url: "",
} as Book;

const Admin: React.FC<AdminProps> = () => {
  const [apiKey, setApiKey] = useState("");
  const [books, setBooks] = useState([] as Book[]);
  const [hasError, setHasError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [newId, setNewId] = useState("");
  const [open, setOpen] = useState(false);
  const [editedBook, setEditedBook] = useState(emptyBook);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  function handleShowApiKey() {
    setShowApiKey(!showApiKey);
  }

  function handleApiKeyInput(e: React.ChangeEvent<HTMLInputElement>) {
    setApiKey(e.target.value);
  }
  // Handler for closing error toast
  function handleErrorClose() {
    setHasError(false);
  }

  async function handleSaveLibraryData() {
    setIsSaving(true);
    try {
      const res = (
        await axios.put(
          `https://backend.rhinestreetpubliclibrary.com/`,
          {
            data: books,
          },
          {
            params: { token: apiKey },
          }
        )
      ).data;
      setBooks(res.data);
    } catch (e) {
      setHasError(true);
    }
    setIsSaving(false);
  }

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

  const hasApiKey = apiKey !== "";

  const handleClickOpen = (book: Book) => {
    setEditedBook(book);
    setOpen(true);
  };

  const handleClose = () => {
    setNewId("");
    setOpen(false);
  };

  const handleSave = (book: Book) => {
    setNewId("");
    setOpen(false);
    const isNewBook = books.filter((b) => b.id === book.id).length === 0;

    if (isNewBook) {
      const replacementBooks = books.filter((b) => b.id !== book.id);
      replacementBooks.unshift(book);
      setBooks(replacementBooks);
    } else {
      setBooks(
        books.map((b) => {
          if (book.id === b.id) {
            return book;
          }
          return b;
        })
      );
    }
  };

  const flipAvailable = (book: Book) => {
    const newBook = {
      name: book.name,
      authors: book.authors,
      available: !book.available,
      url: book.url,
      id: book.id,
    } as Book;
    setBooks(
      books.map((b) => {
        if (book.id === b.id) {
          return newBook;
        }
        return b;
      })
    );
  };

  const addNewBook = () => {
    setNewId(uuidv4());
    setEditedBook(emptyBook);
    setOpen(true);
  };

  return (
    <div style={{ height: "calc(100vh - 200px)" }}>
      <AdminBookCard
        isOpen={open && newId !== ""}
        book={emptyBook}
        onClose={handleClose}
        onSave={handleSave}
        isAvailable={true}
        newId={newId}
      />
      <Container
        maxWidth="md"
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          mt: 2,
        }}
      >
        {/* Top-level admin controls */}
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
          width="100%"
        >
          {/* API Key */}
          <InputLabel>API Key</InputLabel>
          <Input
            size="small"
            sx={{ flex: 1 }}
            type={showApiKey ? "text" : "password"}
            onChange={handleApiKeyInput}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleShowApiKey}>
                  {showApiKey ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />

          {isMobile ? (
            <Button variant="contained" color="success" onClick={addNewBook}>
              <AddIcon />
            </Button>
          ) : (
            <LoadingButton
              startIcon={<AddIcon />}
              loading={isSaving}
              loadingPosition="start"
              onClick={addNewBook}
              variant="contained"
              color="success"
              sx={{ margin: 0 }}
            >
              Add Book
            </LoadingButton>
          )}
          {/* Save Button */}
          <LoadingButton
            disabled={!hasApiKey}
            startIcon={<Save />}
            loading={isSaving}
            loadingPosition="start"
            onClick={handleSaveLibraryData}
            variant="contained"
          >
            Save Changes
          </LoadingButton>
        </Stack>

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
            {books.map((book) => {
              return (
                <ImageListItem key={book.name} sx={{ aspectRatio: "1" }}>
                  <img
                    src={book.url}
                    alt={book.name}
                    loading="lazy"
                    style={{ objectFit: "cover" }}
                    height={300}
                    width={300}
                  />

                  <Backdrop
                    sx={{
                      position: "absolute",
                      backgroundColor: book.available
                        ? "rgba(50, 50, 50, 0.0)"
                        : "rgba(50, 50, 50, 0.75)",
                      color: "#fff",
                      justifyContent: "end",
                      marginTop: 0,
                    }}
                    open={true}
                  >
                    <IconButton
                      aria-label="edit"
                      size="large"
                      color="info"
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        height: 30,
                        width: 30,
                        mt: 1,
                        mr: 1,
                        backgroundColor: book.available
                          ? "rgba(92, 116, 87)"
                          : "rgba(136, 41, 47)",
                        color: "rgba(255, 255, 255, 0.9)",
                        borderRadius: 10,

                        border: "2px solid rgba(240, 247, 238)",
                      }}
                      onClick={() => {
                        flipAvailable(book);
                      }}
                    >
                      {book.available ? <CheckIcon /> : <CloseIcon />}
                    </IconButton>
                  </Backdrop>

                  {/* Actions */}
                  <ImageListItemBar
                    title={book.name}
                    actionIcon={
                      <IconButton
                        aria-label="edit"
                        size="large"
                        sx={{
                          color: "rgba(255, 255, 255, 0.9)",
                        }}
                        onClick={() => {
                          handleClickOpen(book);
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    }
                  />

                  <AdminBookCard
                    isOpen={open && book.id === editedBook.id}
                    book={book}
                    onClose={handleClose}
                    onSave={handleSave}
                    isAvailable={book.available}
                    newId={""}
                  />
                </ImageListItem>
              );
            })}
          </Box>
        </Box>
      </Container>

      {/* Error Toast */}
      <Snackbar
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleErrorClose}
          >
            <Close fontSize="small" />
          </IconButton>
        }
        open={hasError}
        onClose={handleErrorClose}
        autoHideDuration={4000}
        message="🙈 Uh oh, something went wrong -- sorry! Try again soon"
      />
    </div>
  );
};

export default Admin;
