import { useEffect, useState } from "react";

export const useFetch = (url, options = {}, dependancies = []) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect( () => {
    setLoading(true);
    let fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const dataResponse = await response.json();
        if (!response.ok) {
          throw new Error(`Error ${response.statusText},${response.status}`);
        }
        setData(dataResponse);
        setError();
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    }, dependancies);

  return { data, error, loading };
};
