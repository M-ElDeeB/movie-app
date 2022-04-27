import axios from "axios";
import { useEffect, useState } from "react";

const useFetchData = (url) => {
  const [result, setResult] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        setIsLoading(true);
        let { data } = await axios.get(url);
        if (mounted) {
          setResult(data.results);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        setError(error);
      }
    };
    fetchData();
    return () => (mounted = false);
  }, [url]);

  return { isLoading, error, result };
};

export default useFetchData;
