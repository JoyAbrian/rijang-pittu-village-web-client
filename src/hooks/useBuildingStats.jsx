import { useEffect, useState } from "react";
import { supabase } from "../contexts/supabase";
import { useLoading } from "../contexts/LoadingContext";

const useBuildingStats = () => {
    const [rawData, setRawData] = useState([]);
    const [error, setError] = useState(null);
    const { setIsLoading } = useLoading();

    const fetchStats = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase
                .from("building_statistics")
                .select("*");

            if (error) throw error;

            setRawData(data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch building statistics");
        } finally {
            setIsLoading(false);
        }
    };

    const updateStats = async ({ id, total_school, total_hospital, total_religious_places, total_office }) => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from("building_statistics")
                .update({
                    total_school,
                    total_hospital,
                    total_religious_places,
                    total_office,
                })
                .eq("id", id)
                .select(); 

            if (error) throw error;

            await fetchStats();

            return { success: true, msg: "Update successful", data };
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