import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ImageListItem from "@mui/material/ImageListItem";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { authorsToArray, formatAuthors } from "../../helpers/formatting";
import { Book } from "../types";

interface AdminBookCardProps {
  book: Book;
  isOpen: boolean;
  onClose: () => void;
  onSave: (book: Book) => void;
  isAvailable?: boolean;
  newId: string;
}
export default function AdminBookCard({
  book,
  isOpen,
  onClose,
  onSave,
  isAvailable,
  newId,
}: AdminBookCardProps) {
  const [name, setName] = useState(book.name);
  const [authors, setAuthors] = useState(formatAuthors(book.authors));
  const [available, setAvailable] = useState(book.available);
  const [url, setUrl] = useState(book.url);
  const [id, setId] = useState(newId || book.id);

  useEffect(() => {
    if (newId !== "") {
      setName("");
      setAuthors("");
      setAvailable(true);
      setUrl("");
      setId(newId);
    }
  }, [newId]);

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    onClose();
  };

  const handleSave = () => {
    onSave({
      name,
      authors: authorsToArray(authors),
      available,
      url,
      id,
    } as Book);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {book.name ? `Editing ${book.name}` : "Add New Book"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <ImageListItem sx={{ height: "20px" }} key={url}>
            <img
              src={
                url ||
                "https://images.squarespace-cdn.com/content/50cf32ece4b07366e9267386/1573479458734-QHBFZ1IDCOANR4ABVO7M/happy_cow.jpg?format=1500w&content-type=image%2Fjpeg"
              }
              loading="lazy"
              alt={url}
            />
          </ImageListItem>

          <Stack
            sx={{ marginY: "1rem" }}
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
            width="100%"
          >
            {/* API Key */}
            <InputLabel>Name</InputLabel>
            <Input
              size="small"
              sx={{ flex: 1 }}
              onChange={(e) => setName(e.target.value)}
              defaultValue={book.name}
              placeholder="Cows are Amazing"
            />
          </Stack>
          <Stack
            sx={{ marginY: "1rem" }}
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
            width="100%"
          >
            {/* API Key */}
            <InputLabel>Authors</InputLabel>

            <Input
              size="small"
              sx={{ flex: 1 }}
              onChange={(e) => setAuthors(e.target.value)}
              defaultValue={book.authors}
              placeholder="Betsy Moovington"
            />
          </Stack>
          <Stack
            sx={{ marginY: "1rem" }}
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
            width="100%"
          >
            {/* API Key */}
            <InputLabel>Available:</InputLabel>
            <Checkbox
              defaultChecked={isAvailable}
              onChange={(e) => {
                return setAvailable(e.target.checked);
              }}
            />
          </Stack>
          <Stack
            sx={{ marginY: "1rem" }}
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
            width="100%"
          >
            {/* API Key */}
            <InputLabel>Image URL:</InputLabel>
            <Input
              size="small"
              sx={{ flex: 1 }}
              onChange={(e) => setUrl(e.target.value)}
              defaultValue={book.url}
              placeholder="https://cowsrcool.com/cow.png"
            />
          </Stack>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave} autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
