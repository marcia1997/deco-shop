const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Ahora guarda detalles del error

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await makeRequest.get(url);
        setData(res.data.data);
      } catch (err) {
        console.error("Fetch error:", err); // Esto ayuda al debug
        setError(err?.response?.data || err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};
