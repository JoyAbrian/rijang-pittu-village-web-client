import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL + "/umkm";

const useUMKM = () => {
    const [umkm, setUmkm] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUMKM = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_URL}`);
            const data = await res.json();
            setUmkm(data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch UMKM");
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await fetch(`${API_URL}-category/`);
            const data = await res.json();
            setCategories(data);
        } catch (err) {
            console.error("Failed to fetch categories", err);
        }
    };

    const addUMKM = async (data, token) => {
        try {
            const res = await fetch(`${API_URL}/umkm/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json.msg || "Failed to add UMKM");
            await fetchUMKM();
            return { success: true, msg: json.msg };
        } catch (err) {
            console.error(err);
            return { success: false, msg: err.message };
        }
    };

    const updateUMKM = async (id, data, token) => {
        try {
            const res = await fetch(`${API_URL}/umkm/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json.msg || "Failed to update UMKM");
            await fetchUMKM();
            return { success: true, msg: json.msg };
        } catch (err) {
            console.error(err);
            return { success: false, msg: err.message };
        }
    };

    const deleteUMKM = async (id, token) => {
        try {
            const res = await fetch(`${API_URL}/umkm/${id}`, {
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
            console.error(err);
            return { success: false, msg: err.message };
        }
    };

    useEffect(() => {
        fetchUMKM();
        fetchCategories();
    }, []);

    return {
        umkm,
        categories,
        loading,
        error,
        addUMKM,
        updateUMKM,
        deleteUMKM,
        refetch: fetchUMKM,
    };
};

export default useUMKM;