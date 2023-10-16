import { ImageListItem, Skeleton } from "@mui/material";
import React from "react";

const LoadingCard: React.FC<{
  isMobile: boolean;
  index: number;
}> = ({ isMobile, index }) => {
  return (
    <ImageListItem
      key={`loading-card-${index}`}
      sx={{
        aspectRatio: isMobile ? "1" : "auto",
        p: 0.5,
        position: "relative",
      }}
    >
      <Skeleton
        variant="rectangular"
        height={isMobile ? 260 : 450}
        width={260}
      />
    </ImageListItem>
  );
};

export default LoadingCard;
