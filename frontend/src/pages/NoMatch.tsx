import { Link } from "react-router-dom";
import { Box } from "@mui/material";

function NoMatch() {
  return (
    <Box>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </Box>
  );
}

export default NoMatch;
