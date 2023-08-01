import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ImageListItem,
  Input,
  InputLabel,
  Stack,
} from "@mui/material";
import { Book } from "../types";
import { authorsToArray, formatAuthors } from "../../helpers/formatting";
import { useState } from "react";

interface AdminBookCardProps {
  book: Book;
  isOpen: boolean;
  onClose: () => void;
  onSave: (book: Book) => void;
}
const AdminBookCard: React.FC<AdminBookCardProps> = ({
  book,
  isOpen,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState(book.name);
  const [authors, setAuthors] = useState(formatAuthors(book.authors));
  const [available, setAvailable] = useState(book.available);
  const [url, setUrl] = useState(book.url);
  const handleClose = () => {
    onClose();
  };

  const handleSave = () => {
    onSave({
      name,
      authors: authorsToArray(authors),
      available,
      url,
      id: book.id,
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
        {`Editing ${book.name}`}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <ImageListItem sx={{ height: "20px" }} key={url}>
            <img src={url} loading="lazy" alt={url} />
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
              defaultValue={name}
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
              defaultValue={authors}
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
              defaultChecked={available}
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
};

export default AdminBookCard;
