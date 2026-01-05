import { useEffect, useState } from "react";

export default function useTours() {
  const [status, setStatus] = useState("loading");
  const [results, setResults] = useState(0);
  const [tours, setTours] = useState([]);

  useEffect(() => {
    let mounted = true;

    async function loadTours() {
      try {
        const res = await fetch("/api/v1/tours");
        const json = await res.json();
        if (!mounted) return;
        setStatus(json.status || (res.ok ? "success" : "error"));
        setResults(
          json.results || (json.data && json.data.tours ? json.data.tours.length : 0)
        );
        setTours((json.data && json.data.tours) || []);
      } catch (err) {
        console.error("Failed to fetch tours:", err);
        if (!mounted) return;
        setStatus("error");
      }
    }

    loadTours();

    return () => {
      mounted = false;
    };
  }, []);

  return { status, results, tours };
}
