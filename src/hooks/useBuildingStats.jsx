import { useEffect, useState } from "react";
import { useLoading } from "../contexts/LoadingContext";

const API_URL = import.meta.env.VITE_API_URL + "/building-statistics";

const useBuildingStats = () => {
    const [rawData, setRawData] = useState([]);
    const [error, setError] = useState(null);
    const { setIsLoading } = useLoading();

    const fetchStats = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_URL}/`);
            const data = await res.json();
            setRawData(data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch building statistics");
        } finally {
            setIsLoading(false);
        }
    };

    const updateStats = async ({ id, total_school, total_hospital, total_religious_places, total_office }, token) => {
        setIsLoading(true);
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
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        rawData,
        error,
        updateStats,
        refetch: fetchStats,
    };
};

export default useBuildingStats;