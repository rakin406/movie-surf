import { useState, useEffect } from "react";
import { CircularProgress, Container } from "@mui/material";

function App() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState();

  useEffect(() => {
    fetch("/api/v1")
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "98vh",
      }}
    >
      {loading ? <CircularProgress size="3rem" /> : message}
    </Container>
  );
}

export default App;
