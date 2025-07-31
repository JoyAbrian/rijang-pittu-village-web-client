import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL + "/building-statistics";

const useBuildingStats = () => {
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
            setError("Failed to fetch building statistics");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const updateStats = async ({ id, total_school, total_hospital, total_religious_places, total_office }, token) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    total_school,
                    total_hospital,
                    total_religious_places,
                    total_office,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.msg || "Failed to update building statistics");
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

export default useBuildingStats;