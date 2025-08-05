import { useState, useEffect } from "react";
import { useLoading } from "../contexts/LoadingContext";
import { supabase } from "../contexts/supabase";

const useNews = () => {
    const [newsList, setNewsList] = useState([]);
    const [error, setError] = useState(null);
    const { setIsLoading } = useLoading();

    const fetchNews = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase
                .from("news")
                .select("*")
                .order("date", { ascending: false });

            if (error) throw error;
            setNewsList(data);
        } catch (err) {
            console.error("Error fetching news:", err);
            setError("Failed to fetch news");
        } finally {
            setIsLoading(false);
        }
    };

    const addNews = async (newsData) => {
        try {
            const { data, error } = await supabase
                .from("news")
                .insert([newsData])
                .select();

            if (error) throw error;

            await fetchNews();
            return { success: true, msg: "News added", data };
        } catch (err) {
            console.error("Error adding news:", err);
            return { success: false, msg: err.message };
        }
    };

    const updateNews = async (id, updatedData) => {
        try {
            const { data, error } = await supabase
                .from("news")
                .update(updatedData)
                .eq("id", id)
                .select();

            if (error) throw error;

            await fetchNews();
            return { success: true, msg: "News updated", data };
        } catch (err) {
            console.error("Error updating news:", err);
            return { success: false, msg: err.message };
        }
    };

    const deleteNews = async (id) => {
        try {
            const { error } = await supabase
                .from("news")
                .delete()
                .eq("id", id);

            if (error) throw error;

            await fetchNews();
            return { success: true, msg: "News deleted" };
        } catch (err) {
            console.error("Error deleting news:", err);
            return { success: false, msg: err.message };
        }
    };

    const uploadNewsImage = async (file) => {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `news/${fileName}`;

        try {
            const { error: uploadError } = await supabase.storage
                .from("news")
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: publicData } = supabase.storage
                .from("news")
                .getPublicUrl(filePath);

            return { success: true, url: publicData.publicUrl };
        } catch (err) {
            console.error("Error uploading news image:", err);
            return { success: false, msg: err.message };
        }
    };

    const deleteImage = async (imageUrl) => {
        try {
            const urlParts = imageUrl.split("/");
            const bucketIndex = urlParts.findIndex(part => part === "news");
            const filePath = urlParts.slice(bucketIndex + 1).join("/");

            const { error } = await supabase.storage
                .from("news")
                .remove([filePath]);

            if (error) throw error;

            return { success: true, msg: "Image deleted" };
        } catch (err) {
            console.error("Error deleting image file:", err);
            return { success: false, msg: err.message };
        }
    };

    useEffect(() => {
        fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        newsList,
        error,
        fetchNews,
        addNews,
        updateNews,
        deleteNews,
        uploadNewsImage,
        deleteImage,
    };
};

export default useNews;