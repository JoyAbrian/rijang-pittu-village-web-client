import { useState, useEffect } from "react";
import { useLoading } from "../contexts/LoadingContext";

const API_URL = import.meta.env.VITE_API_URL + "/news";

const useNews = () => {
    const [newsList, setNewsList] = useState([]);
    const [error, setError] = useState(null);
    const { setIsLoading } = useLoading();

    const fetchNews = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_URL}/`);
            const data = await res.json();
            setNewsList(data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch news");
        } finally {
            setIsLoading(false);
        }
    };

    const addNews = async (newsData, token) => {
        setIsLoading(true);
        try {
            const res = await fetch(`${API_URL}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newsData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.msg || "Failed to add news");
            }

            await fetchNews();
            return { success: true, msg: data.msg };
        } catch (err) {
            console.error(err);
            return { success: false, msg: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    const updateNews = async (id, updatedData, token) => {
        setIsLoading(true);
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.msg || "Failed to update news");
            }

            await fetchNews();
            return { success: true, msg: data.msg };
        } catch (err) {
            console.error(err);
            return { success: false, msg: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    const deleteNews = async (id, token) => {
        setIsLoading(true);
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.msg || "Failed to delete news");
            }

            await fetchNews();
            return { success: true, msg: data.msg };
        } catch (err) {
            console.error(err);
            return { success: false, msg: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        newsList,
        error,
        fetchNews,
        addNews,
        updateNews,
        deleteNews,
    };
};

export default useNews;