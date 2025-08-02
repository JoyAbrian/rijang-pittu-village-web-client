import { useState, useEffect } from "react";
import { useLoading } from "../contexts/LoadingContext";

const API_URL = import.meta.env.VITE_API_URL + "/news";

const useNewsDetail = (id) => {
    const [news, setNews] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const { setIsLoading } = useLoading();

    useEffect(() => {
        const fetchNews = async () => {
            setIsLoading(true);
            setError(null);
            setNotFound(false);

            try {
                const res = await fetch(`${API_URL}/${id}`);

                if (res.status === 404) {
                    setNotFound(true);
                    return;
                }

                if (!res.ok) throw new Error("Failed to fetch news detail");

                const newsData = await res.json();
                setNews(newsData);

                const allRes = await fetch(`${API_URL}`);
                if (!allRes.ok) throw new Error("Failed to fetch all news");

                const allNews = await allRes.json();
                const otherNews = allNews.filter(item => item.id !== Number(id));
                setSuggestions(otherNews.slice(0, 4));
            } catch (err) {
                setError(err.message || "Something went wrong");
            } finally {
                setIsLoading(false);
            }
        };

        fetchNews();
    }, [id, setIsLoading]);

    return { news, suggestions, error, notFound };
};

export default useNewsDetail;