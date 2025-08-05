import { useEffect, useState } from "react";
import { supabase } from "../contexts/supabase";

const usePeopleStats = () => {
    const [rawData, setRawData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStats = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase
                .from("people_statistics")
                .select("*");

            if (error) throw error;

            setRawData(data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch people statistics");
        } finally {
            setLoading(false);
        }
    };

    const updateStats = async ({ id, total_man, total_woman, total_householder }) => {
        try {
            const { data, error } = await supabase
                .from("people_statistics")
                .update({
                    total_man,
                    total_woman,
                    total_householder,
                })
                .eq("id", id)
                .select();

            if (error) throw error;

            await fetchStats();
            return { success: true, msg: "Update successful", data };
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