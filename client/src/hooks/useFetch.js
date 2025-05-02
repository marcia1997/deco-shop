import { useEffect, useState } from "react";
import { makeRequest } from "../makeRequest"; // Custom Axios instance or API utility

const useFetch = (url) => {
  // State to store API data, loading status, and error flag
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Define async function for fetching data
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true before request

        // Send GET request to the provided URL with authorization
        const res = await makeRequest.get(url, {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`, // Get token from environment variable
          },
        });

        // Save the response data
        setData(res.data.data);
      } catch (err) {
        // Set error state if request fails
        setError(true);
      }

      // Set loading to false after request completes (success or failure)
      setLoading(false);
    };

    fetchData(); // Trigger data fetch on component mount or when URL changes
  }, [url]); // Dependency array ensures hook re-runs if URL changes

  // Return the current state values to the component
  return { data, loading, error };
};

export default useFetch;
