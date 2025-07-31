import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL + "/people-statistics";

const usePeopleStats = () => {
    const [rawData, setRawData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStats = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_URL}/`);
            const data = await res.json();
            setRawData(data);
        } catch (err) {
            setError("Failed to fetch people statistics");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const updateStats = async ({ id, total_man, total_woman, total_householder }, token) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    total_man,
                    total_woman,
                    total_householder,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.msg || "Failed to update statistics");
            }

            await fetchStats();
            return { success: true, msg: data.msg };
        } catch (err) {
            console.error(err);
            return { success: false, msg: err.message };
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    return { rawData, loading, error, updateStats };
};

export default usePeopleStats;