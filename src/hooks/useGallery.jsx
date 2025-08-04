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
            if (!res.ok) throw new Error("Failed to fetch gallery items");
            const data = await res.json();
            setGallery(data);
        } catch (err) {
            console.error("Error fetching gallery:", err);
            setError("Failed to fetch gallery items");
        } finally {
            setIsLoading(false);
        }
    };

    const addGallery = async (newData, token) => {
        try {
            const res = await fetch(`${API_URL}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newData),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.msg || "Failed to add gallery item");

            await fetchGallery();
            return { success: true, msg: data.msg };
        } catch (err) {
            console.error("Error adding gallery item:", err);
            return { success: false, msg: err.message };
        }
    };

    const updateGallery = async (id, updatedData, token) => {
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

            if (!res.ok) throw new Error(data.msg || "Failed to update gallery item");

            await fetchGallery();
            return { success: true, msg: data.msg };
        } catch (err) {
            console.error("Error updating gallery item:", err);
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

            if (!res.ok) throw new Error(data.msg || "Failed to delete gallery item");

            await fetchGallery();
            return { success: true, msg: data.msg };
        } catch (err) {
            console.error("Error deleting gallery item:", err);
            return { success: false, msg: err.message };
        }
    };


    const uploadGalleryImage = async (file, token) => {
        const formData = new FormData();
        formData.append("image", file);
        
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/upload/gallery`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.msg || "Gallery image upload failed");

            return { success: true, url: data.url };
        } catch (err) {
            console.error("Error uploading gallery image:", err);
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
            console.error("Error deleting image:", err);
            return { success: false, msg: err.message };
        }
    };


    useEffect(() => {
        fetchGallery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        gallery,
        error,
        refetch: fetchGallery,
        addGallery,
        updateGallery,
        deleteGallery,
        uploadGalleryImage,
        deleteImage,
    };
};

export default useGallery;