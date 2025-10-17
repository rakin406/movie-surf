import { useState, useEffect } from "react";

export function useFetch(url: RequestInfo | URL, deps: any = []) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch(console.error);
  }, [deps]);

  return data;
}
