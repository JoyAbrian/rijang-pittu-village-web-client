import { useState, useEffect } from "react";
import { useLoading } from "../contexts/LoadingContext";

const API_URL = import.meta.env.VITE_API_URL + "/gallery";

const useGallery = () => {
    const [gallery, setGallery] = useState([]);
    const [error, setError] = useState(null);
    const { setIsLoading } = useLoading();

    const fetchGallery = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_URL}/`);
            const data = await res.json();
            setGallery(data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch gallery items");
        } finally {
            setIsLoading(false);
        }
    };

    const addGallery = async ({ title, image_url }, token) => {
        try {
            const res = await fetch(`${API_URL}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title, image_url }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.msg || "Failed to add gallery item");
            }

            await fetchGallery();
            return { success: true, msg: data.msg };
        } catch (err) {
            console.error(err);
            return { success: false, msg: err.message };
        }
    };

    const updateGallery = async ({ id, title, image_url }, token) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title, image_url }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.msg || "Failed to update gallery item");
            }

            await fetchGallery();
            return { success: true, msg: data.msg };
        } catch (err) {
            console.error(err);
            return { success: false, msg: err.message };
        }
    };

    const deleteGallery = async (id, token) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.msg || "Failed to delete gallery item");
            }

            await fetchGallery();
            return { success: true, msg: data.msg };
        } catch (err) {
            console.error(err);
            return { success: false, msg: err.message };
        }
    };

    useEffect(() => {
        fetchGallery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setIsLoading]);

    return {
        gallery,
        error,
        addGallery,
        updateGallery,
        deleteGallery,
        refetch: fetchGallery,
    };
};

export default useGallery;