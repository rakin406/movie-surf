import { styled } from "@mui/material/styles";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Tooltip, {
  type TooltipProps,
  tooltipClasses,
} from "@mui/material/Tooltip";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { useFetch } from "../hooks/useFetch";

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

function Home() {
  const trending = useFetch("http://localhost:3000/api/v1/trending");

  return trending ? (
    // TODO: Avoid using "any" for type.
    <ImageList cols={3} gap={10} sx={{ width: "100%", height: "100%" }}>
      {trending["movies"].map((movie: any) => (
        <HtmlTooltip title={movie.overview}>
          <ImageListItem key={movie.poster}>
            <img src={movie.poster} alt={movie.title} loading="lazy" />
            <ImageListItemBar
              sx={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.7) 0%, " +
                  "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                textAlign: "center",
              }}
              title={movie.title}
            />
          </ImageListItem>
        </HtmlTooltip>
      ))}
    </ImageList>
  ) : (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "98vh",
      }}
    >
      <CircularProgress size="3rem" />
    </Box>
  );
}

export default Home;
