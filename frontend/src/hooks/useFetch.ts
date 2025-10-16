import { useState, useEffect } from "react";

export function useFetch(url: RequestInfo | URL) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch(console.error);
  }, []);

  return data;
}
