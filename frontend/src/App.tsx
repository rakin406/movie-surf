import { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState();

  useEffect(() => {
    fetch("/api/v1")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(console.error);
  }, []);

  return <div>{message}</div>;
}

export default App;
