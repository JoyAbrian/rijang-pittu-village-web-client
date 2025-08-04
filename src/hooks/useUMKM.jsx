import { useState, useEffect } from "react";
import { useLoading } from "../contexts/LoadingContext";

const API_URL = import.meta.env.VITE_API_URL + "/umkm";
const CATEGORY_API_URL = import.meta.env.VITE_API_URL + "/umkm-category";
const UPLOAD_API_URL = import.meta.env.VITE_API_URL + "/upload";

const useUMKM = () => {
    const [umkm, setUmkm] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const { setIsLoading } = useLoading();

    const fetchUMKM = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_URL}/`);
            if (!res.ok) throw new Error("Failed to fetch UMKM data");
            const data = await res.json();
            setUmkm(data);
        } catch (err) {
            console.error("Error fetching UMKM:", err);
            setError("Failed to fetch UMKM data");
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await fetch(`${CATEGORY_API_URL}/`);
            if (!res.ok) throw new Error("Failed to fetch categories");
            const data = await res.json();
            setCategories(data);
        } catch (err) {
            console.error("Failed to fetch categories:", err);
        }
    };

    const addUMKM = async (newData, token) => {
        try {
            const res = await fetch(`${API_URL}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newData),
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json.msg || "Failed to add UMKM");
            await fetchUMKM();
            return { success: true, msg: json.msg };
        } catch (err) {
            console.error("Error adding UMKM:", err);
            return { success: false, msg: err.message };
        }
    };

    const updateUMKM = async (id, updatedData, token) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedData),
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json.msg || "Failed to update UMKM");
            await fetchUMKM();
            return { success: true, msg: json.msg };
        } catch (err) {
            console.error("Error updating UMKM:", err);
            return { success: false, msg: err.message };
        }
    };

    const deleteUMKM = async (id, token) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json.msg || "Failed to delete UMKM");
            await fetchUMKM();
            return { success: true, msg: json.msg };
        } catch (err) {
            console.error("Error deleting UMKM:", err);
            return { success: false, msg: err.message };
        }
    };

    const uploadUMKMImage = async (file, token) => {
        const formData = new FormData();
        formData.append("image", file); 
        
        try {
            const res = await fetch(`${UPLOAD_API_URL}/umkm`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.msg || "UMKM image upload failed");

            return { success: true, url: data.url };
        } catch (err) {
            console.error("Error uploading UMKM image:", err);
            return { success: false, msg: err.message };
        }
    };

    const deleteImage = async (imageUrl, token) => {
        try {
            const res = await fetch(`${UPLOAD_API_URL}`, {
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
        const loadAll = async () => {
            setIsLoading(true);
            await fetchUMKM();
            await fetchCategories();
            setIsLoading(false);
        };
        loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        umkm,
        categories,
        error,
        addUMKM,
        updateUMKM,
        deleteUMKM,
        refetchUMKM: fetchUMKM,
        refetchCategories: fetchCategories,
        uploadUMKMImage,
        deleteImage,
    };
};

export default useUMKM;