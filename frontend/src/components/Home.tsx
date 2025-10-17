import { CircularProgress, Box } from "@mui/material";
import { useFetch } from "../hooks/useFetch";

function Home() {
  const trending = useFetch("http://localhost:3000/api/v1/trending");

  return trending ? (
    trending
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
