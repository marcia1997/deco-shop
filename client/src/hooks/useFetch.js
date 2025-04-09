import { useEffect, useState } from "react";
import { makeRequest } from "../makeRequest"; // Importing a custom function for making requests

const useFetch = (url) => {
  const [data, setData] = useState(null); // Stores fetched data
  const [loading, setLoading] = useState(false); // Tracks loading state
  const [error, setError] = useState(false); // Tracks error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading state to true
        const res = await makeRequest.get(url, {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`, // Include the authorization header
          },
        });
        setData(res.data.data); // Set the fetched data into the 'data' state
      } catch (err) {
        setError(true); // Set error state to true if there's an error
      }
      setLoading(false); // Set loading state back to false
    };

    fetchData(); // Call the fetchData function to initiate data fetching
  }, [url]); // Depend on 'url' so that the effect runs when 'url' changes

  return { data, loading, error }; // Return an object containing the fetched 'data', loading state, and error state
};

export default useFetch; // Export the custom hook
