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
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Close, Save, Visibility, VisibilityOff } from "@mui/icons-material";
import { InfoIcon } from "@primer/octicons-react";

interface AdminProps {}

const Admin: React.FC<AdminProps> = () => {
  const [apiKey, setApiKey] = useState("");
  const [books, setBooks] = useState([] as Book[]);
  const [hasError, setHasError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);

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
  }, []);

  const sortedBooks = books.sort((a, b) => (b.available ? 1 : -1));
  const hasApiKey = apiKey !== "";

  return (
    <div style={{ height: "calc(100vh - 200px)" }}>
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

        {/* Books */}
        <ImageList cols={3} gap={16} sx={{ height: "100%", width: "100%" }}>
          {sortedBooks.map((book) => {
            return (
              <ImageListItem key={book.name}>
                <img src={book.url} alt={book.name} loading="lazy" />

                {/* Actions */}
                <ImageListItemBar
                  title={book.name}
                  actionIcon={
                    <IconButton
                      sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                      // onClick={this.handleEdit(book)}
                    >
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </ImageListItem>
            );
          })}
        </ImageList>
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
