import ImageListItem from "@mui/material/ImageListItem";
import Skeleton from "@mui/material/Skeleton";

export default function LoadingCard({
  isMobile,
  index,
}: {
  isMobile: boolean;
  index: number;
}) {
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
}
