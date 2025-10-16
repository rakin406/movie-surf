import { useState, useEffect } from "react";

export function useFetch(url: RequestInfo | URL) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  return data;
}
