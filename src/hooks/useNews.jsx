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
            if (!res.ok) throw new Error("Failed to fetch news");
            const data = await res.json();
            setNewsList(data);
        } catch (err) {
            console.error("Error fetching news:", err);
            setError("Failed to fetch news");
        } finally {
            setIsLoading(false);
        }
    };

    const addNews = async (newsData, token) => {
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
            console.error("Error adding news:", err);
            return { success: false, msg: err.message };
        }
    };

    const updateNews = async (id, updatedData, token) => {
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
            console.error("Error updating news:", err);
            return { success: false, msg: err.message };
        }
    };

    const deleteNews = async (id, token) => {
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
            console.error("Error deleting news:", err);
            return { success: false, msg: err.message };
        }
    };

    const uploadNewsImage = async (file, token) => {
        const formData = new FormData();
        formData.append("image", file);
        
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/upload/news`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.msg || "News image upload failed");

            return { success: true, url: data.url };
        } catch (err) {
            console.error("Error uploading news image:", err);
            return { success: false, msg: err.message };
        }
    };

    const deleteImage = async (imageUrl, token) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ image_url: imageUrl }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.msg || "Image deletion failed");

            return { success: true, msg: data.msg };
        } catch (err) {
            console.error("Error deleting image file:", err);
            return { success: false, msg: err.message };
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
        uploadNewsImage,
        deleteImage,
    };
};

export default useNews;