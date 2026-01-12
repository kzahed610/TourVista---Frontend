import { useState, useEffect } from "react";
import axios from "axios";

export default function useTours() {
  const [status, setStatus] = useState("loading");
  const [results, setResults] = useState(0);
  const [tours, setTours] = useState([]);

  useEffect(() => {
    let mounted = true;

    async function loadTours() {
      try {
        const res = await axios.get("/api/v1/tours");
        if (!mounted) return;

        setTours(res.data.data.tours || []);
        setResults(res.data.results || 0);
        setStatus("success");
      } catch (err) {
        if (!mounted) return;
        setStatus("error");
      }
    }

    loadTours();

    return () => {
      mounted = false;
    };
  }, []); // 👈 fetch once, empty deps

  return { status, results, tours };
}
