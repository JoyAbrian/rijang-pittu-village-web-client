import { useState, useEffect } from "react";
import { useLoading } from "../contexts/LoadingContext";
import { supabase } from "../contexts/supabase";

const useSOTK = () => {
    const [sotkList, setSotkList] = useState([]);
    const [error, setError] = useState(null);
    const { setIsLoading } = useLoading();

    const fetchSOTK = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase
                .from("sotk")
                .select("*")
                .order("id", { ascending: true });

            if (error) throw error;
            setSotkList(data);
        } catch (err) {
            console.error("Error fetching SOTK:", err);
            setError("Failed to fetch SOTK data");
        } finally {
            setIsLoading(false);
        }
    };

    const addSOTK = async (newData) => {
        try {
            const { error } = await supabase
                .from("sotk")
                .insert([newData])
                .select();

            if (error) throw error;

            await fetchSOTK();
            return { success: true, msg: "SOTK added" };
        } catch (err) {
            console.error("Error adding SOTK:", err);
            return { success: false, msg: err.message };
        }
    };

    const updateSOTK = async (id, updatedData) => {
        try {
            const { error } = await supabase
                .from("sotk")
                .update(updatedData)
                .eq("id", id)
                .select();

            if (error) throw error;

            await fetchSOTK();
            return { success: true, msg: "SOTK updated" };
        } catch (err) {
            console.error("Error updating SOTK:", err);
            return { success: false, msg: err.message };
        }
    };

    const deleteSOTK = async (id) => {
        try {
            const { error } = await supabase
                .from("sotk")
                .delete()
                .eq("id", id);

            if (error) throw error;

            await fetchSOTK();
            return { success: true, msg: "SOTK deleted" };
        } catch (err) {
            console.error("Error deleting SOTK:", err);
            return { success: false, msg: err.message };
        }
    };

    const uploadSOTKImage = async (file) => {
        const ext = file.name.split(".").pop();
        const fileName = `${Date.now()}.${ext}`;
        const filePath = `sotk/${fileName}`;

        try {
            const { error: uploadError } = await supabase
                .storage
                .from("sotk")
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: publicData } = supabase
                .storage
                .from("sotk")
                .getPublicUrl(filePath);

            return { success: true, url: publicData.publicUrl };
        } catch (err) {
            console.error("Error uploading image:", err);
            return { success: false, msg: err.message };
        }
    };

    const deleteImage = async (imageUrl) => {
        try {
            const parts = imageUrl.split("/");
            const bucketIndex = parts.findIndex((p) => p === "sotk");
            const filePath = parts.slice(bucketIndex + 1).join("/");

            const { error } = await supabase
                .storage
                .from("sotk")
                .remove([filePath]);

            if (error) throw error;

            return { success: true, msg: "Image deleted" };
        } catch (err) {
            console.error("Error deleting image:", err);
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