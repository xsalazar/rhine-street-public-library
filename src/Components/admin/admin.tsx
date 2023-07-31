import React from "react";
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

interface AdminState {
  apiKey: string;
  books: Array<Book>;
  hasError: boolean;
  isSaving: boolean;
  showApiKey: boolean;
}

export default class Admin extends React.Component<AdminProps, AdminState> {
  constructor(props: AdminProps) {
    super(props);

    this.state = {
      apiKey: "",
      books: [],
      hasError: false,
      isSaving: false,
      showApiKey: false,
    };

    this.handleApiKeyInput = this.handleApiKeyInput.bind(this);
    this.handleErrorClose = this.handleErrorClose.bind(this);
    this.handleShowApiKey = this.handleShowApiKey.bind(this);
    this.handleSaveLibraryData = this.handleSaveLibraryData.bind(this);
  }

  async componentDidMount(): Promise<void> {
    const result = (
      await axios.get(`https://backend.rhinestreetpubliclibrary.com/`)
    ).data;

    this.setState({
      books: result.books,
    });
  }
  render() {
    const { apiKey, books, hasError, isSaving, showApiKey } = this.state;

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
              onChange={this.handleApiKeyInput}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={this.handleShowApiKey}>
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
              onClick={this.handleSaveLibraryData}
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
                      <IconButton sx={{ color: "rgba(255, 255, 255, 0.54)" }}>
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
              onClick={this.handleErrorClose}
            >
              <Close fontSize="small" />
            </IconButton>
          }
          open={hasError}
          onClose={this.handleErrorClose}
          autoHideDuration={4000}
          message="🙈 Uh oh, something went wrong -- sorry! Try again soon"
        />
      </div>
    );
  }

  handleShowApiKey() {
    const { showApiKey } = this.state;
    this.setState({ showApiKey: !showApiKey });
  }

  handleApiKeyInput(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ apiKey: e.target.value });
  }

  async handleSaveLibraryData() {
    const { apiKey, books } = this.state;

    this.setState({ isSaving: true });

    try {
      const res = (
        await axios.patch(
          `https://backend.rhinestreetpubliclibrary.com/`,
          {
            data: books,
          },
          {
            params: { token: apiKey },
          }
        )
      ).data;

      this.setState({ isSaving: false, books: res.data });
    } catch (e) {
      this.setState({ hasError: true, isSaving: false });
    }
  }

  // Handler for closing error toast
  handleErrorClose() {
    this.setState({
      hasError: false,
    });
  }
}
