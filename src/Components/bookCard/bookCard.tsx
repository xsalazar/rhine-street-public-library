import { Typography, ImageListItem, Backdrop, ImageListItemBar, Stack } from "@mui/material";

import React from "react";
import { Book } from "../types";

import { formatAuthors } from "../../helpers/formatting";

const BookCard: React.FC<{
  book: Book,
  isMobile: boolean,
  isModalOpen: boolean,
  toggleModal: (id: string) => void,
  isUnavailable?: boolean
}> = ({
  book,
  isMobile,
  isModalOpen = false,
  toggleModal,
  isUnavailable = false
}) => {
    const toggleMobileModal = () => {
      toggleModal?.(book.id || "")
    };


    return (
      <ImageListItem
        key={`${isUnavailable ? "checked-out" : "available"}-${book.id || book.url}`}
        sx={{
          backgroundColor: "black",
          aspectRatio: isMobile ? "1" : "auto",
          p: 0.5,
          position: "relative",
        }}
      >
        <Backdrop
          sx={{
            position: "absolute",
            color: "#fff",
            backgroundColor: isUnavailable ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.7)",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={isModalOpen}
          onClick={toggleMobileModal}
        >
          <Stack direction="column" alignItems="center" spacing={1}>
            <Typography
              variant="h5"
              align="center"
              sx={{ pb: 1, mr: 1.5, ml: 1.5 }}
            >
              {book.name}
            </Typography>
            <Typography variant="subtitle1" align="center">
              {formatAuthors(book.authors)}
            </Typography>
          </Stack>
        </Backdrop>
        <img
          src={book.url}
          alt={book.name}
          style={{ objectFit: "cover" }}
          height={isMobile ? 200 : 500}
          width={300}
          onClick={() =>
            isMobile ? toggleMobileModal() : null
          }
        />

        {isUnavailable && (
          <ImageListItemBar
            sx={{
              backgroundColor: "rgba(50, 50, 50, 0.75)",
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
            }}
            onClick={() =>
              isMobile ? toggleMobileModal() : null
            }
          />
        )
        }
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
  };

export default BookCard;
