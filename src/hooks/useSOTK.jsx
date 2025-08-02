import { useState, useEffect } from "react";
import { useLoading } from "../contexts/LoadingContext";

const API_URL = import.meta.env.VITE_API_URL + "/sotk";

const useSOTK = () => {
    const [sotkList, setSotkList] = useState([]);
    const [error, setError] = useState(null);
    const { setIsLoading } = useLoading();

    const fetchSOTK = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_URL}/`);
            if (!res.ok) throw new Error("Failed to fetch SOTK data");
            const data = await res.json();
            setSotkList(data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch SOTK data");
        } finally {
            setIsLoading(false);
        }
    };

    const addSOTK = async (newData, token) => {
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

            if (!res.ok) throw new Error(data.msg || "Failed to add SOTK");

            await fetchSOTK();
            return { success: true, msg: data.msg };
        } catch (err) {
            console.error(err);
            return { success: false, msg: err.message };
        }
    };

    const updateSOTK = async (id, updatedData, token) => {
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

            if (!res.ok) throw new Error(data.msg || "Failed to update SOTK");

            await fetchSOTK();
            return { success: true, msg: data.msg };
        } catch (err) {
            console.error(err);
            return { success: false, msg: err.message };
        }
    };

    const deleteSOTK = async (id, token) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.msg || "Failed to delete SOTK");

            await fetchSOTK();
            return { success: true, msg: data.msg };
        } catch (err) {
            console.error(err);
            return { success: false, msg: err.message };
        }
    };

    const uploadSOTKImage = async (file, token) => {
        const formData = new FormData();
        formData.append("image", file);
    
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/upload/sotk`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });
    
            const data = await res.json();
    
            if (!res.ok) throw new Error(data.msg || "Image upload failed");
    
            return { success: true, url: data.url };
        } catch (err) {
            console.error(err);
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
            console.error(err);
            return { success: false, msg: err.message };
        }
    };
    
    useEffect(() => {
        fetchSOTK();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        sotkList,
        error,
        refetch: fetchSOTK,
        addSOTK,
        updateSOTK,
        deleteSOTK,
        uploadSOTKImage,
        deleteImage,
    };
};

export default useSOTK;