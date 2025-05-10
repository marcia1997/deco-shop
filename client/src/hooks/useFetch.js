import { useEffect, useState } from "react";
import { makeRequest } from "../makeRequest"; // Axios instance

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const token = process.env.REACT_APP_API_TOKEN;

        const headers = token
          ? { Authorization: `Bearer ${token}` }
          : {};

        const res = await makeRequest.get(url, { headers });

        setData(res.data.data);
      } catch (err) {
        console.error("Fetch error:", err.response?.data || err.message); 
      }

      setLoading(false);
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
