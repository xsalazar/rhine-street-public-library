import { MapOutlined, OpenInNew } from "@mui/icons-material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import movieMadness from "../assets/movie-madness.png";
import multCoLib from "../assets/multco-lib.png";
import musicMillennium from "../assets/music-millennium.png";
import varietyRecords from "../assets/variety-records.png";

export default function Body() {
  const localStores: Array<{
    description: string;
    name: string;
    image: string;
    link?: string;
    address?: string;
  }> = [
    {
      address: "4320 SE Belmont St, Portland, OR 97215",
      description:
        "Portland’s iconic independent video store, with 95,000+ rental titles and counting. Plus beer & wine, a film prop museum, a Miniplex, merch, & more!",
      name: "Movie Madness",
      image: movieMadness,
      link: "https://www.moviemadness.org/",
    },
    {
      address: "3158 E Burnside, Portland, OR 97214",
      description:
        "The oldest record store in existence in the Pacific Northwest. Stocked with the ever-evolving gamut of formats including LP, 45, reel-to-reel, 8-track, cassette, DAT, compact disc, mini-disc, DCC and CD-ROM.",
      name: "Music Millennium",
      image: musicMillennium,
      link: "https://musicmillennium.com/",
    },
    {
      address: "4932 SE Foster Rd, Portland, OR 97206",
      description:
        "Operating since 2005, Variety Records has a large selection of vinyl records, rare and hard to find DVDs, VHS, CDs, and cassette tapes. Open daily, with the occasional sidewalk sale outside, weather permitting.",
      name: "Variety Records",
      image: varietyRecords,
    },
    {
      description:
        "Multnomah County Library is the oldest public library on the west coast, with a history that dates back to 1864. Today, Central Library and 18 other neighborhood libraries make up a library system that offers more than 3.1 million books and other library materials. As Oregon's largest public library, Multnomah County Library serves nearly one-fifth of the state's population.",
      name: "Multnomah County Public Library",
      image: multCoLib,
      link: "https://multcolib.org/",
    },
  ];
  return (
    <Container
      maxWidth="md"
      sx={{
        alignItems: "center",
        display: "flex",
        flex: "auto",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: 4,
      }}
    >
      <Typography variant="h5" align="center">
        Rhine Street Public Library
      </Typography>

      <Typography variant="body1" color="textSecondary" align="center" pb={8}>
        Your neighborhood stop for physical media
      </Typography>

      <Container>
        <Typography variant="body1" gutterBottom>
          Consider supporting the following local businesses:
        </Typography>

        <Grid container spacing={2}>
          {localStores.map((store) => {
            return (
              <Grid size={{ sm: 12, md: 6 }}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Image */}
                  <CardMedia sx={{ height: 140 }} image={store.image} />

                  {/* Title, description, and optional info */}
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* Title */}
                    <Typography variant="h5" gutterBottom>
                      {store.name}
                    </Typography>

                    {/* Description */}
                    <Typography variant="body2" gutterBottom>
                      {store.description}
                    </Typography>

                    {/* Link */}
                    {store.link && (
                      <Stack direction="row" spacing={1}>
                        <OpenInNew fontSize="small" />
                        <Typography variant="caption">
                          <Link
                            href={`${store.link}`}
                            target="_blank"
                            rel="noopener"
                          >
                            {store.link}
                          </Link>
                        </Typography>
                      </Stack>
                    )}

                    {/* Address */}
                    {store.address && (
                      <Stack direction="row" spacing={1}>
                        <MapOutlined fontSize="small" />
                        <Typography variant="caption">
                          {store.address}
                        </Typography>
                      </Stack>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Container>
  );
}
