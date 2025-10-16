import { useState, useEffect } from "react";
import Container from "@mui/material/Container";

function App() {
  const [message, setMessage] = useState();

  useEffect(() => {
    fetch("/api/v1")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(console.error);
  }, []);

  return <Container maxWidth="sm">{message}</Container>;
}

export default App;
