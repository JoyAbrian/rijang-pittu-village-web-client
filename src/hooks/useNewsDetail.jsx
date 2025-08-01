import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL + "/news";

const useNewsDetail = (id) => {
    const [news, setNews] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await fetch(`${API_URL}/${id}`);
                if (!res.ok) throw new Error("Failed to fetch news detail");
                const newsData = await res.json();
                setNews(newsData);

                const allRes = await fetch(`${API_URL}`);
                if (!allRes.ok) throw new Error("Failed to fetch all news");
                const allNews = await allRes.json();
                const otherNews = allNews.filter((item) => item.id !== Number(id));
                setSuggestions(otherNews.slice(0, 4));
            } catch (err) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [id]);

    return { news, suggestions, loading, error };
};

export default useNewsDetail;