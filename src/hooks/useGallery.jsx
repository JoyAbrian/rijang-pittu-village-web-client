import { useState, useEffect } from "react";
import { useLoading } from "../contexts/LoadingContext";
import { supabase } from "../contexts/supabase";

const useGallery = () => {
    const [gallery, setGallery] = useState([]);
    const [error, setError] = useState(null);
    const { setIsLoading } = useLoading();

    const fetchGallery = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase
                .from("gallery")
                .select("*")
                .order("id", { ascending: false });

            if (error) throw error;

            setGallery(data);
        } catch (err) {
            console.error("Error fetching gallery:", err);
            setError("Failed to fetch gallery items");
        } finally {
            setIsLoading(false);
        }
    };

    const addGallery = async (newData) => {
        try {
            const { data, error } = await supabase
                .from("gallery")
                .insert([newData])
                .select();

            if (error) throw error;

            await fetchGallery();
            return { success: true, msg: "Gallery item added", data };
        } catch (err) {
            console.error("Error adding gallery item:", err);
            return { success: false, msg: err.message };
        }
    };

    const updateGallery = async (id, updatedData) => {
        try {
            const { data, error } = await supabase
                .from("gallery")
                .update(updatedData)
                .eq("id", id)
                .select();

            if (error) throw error;

            await fetchGallery();
            return { success: true, msg: "Gallery item updated", data };
        } catch (err) {
            console.error("Error updating gallery item:", err);
            return { success: false, msg: err.message };
        }
    };

    const deleteGallery = async (id) => {
        try {
            const { error } = await supabase
                .from("gallery")
                .delete()
                .eq("id", id);

            if (error) throw error;

            await fetchGallery();
            return { success: true, msg: "Gallery item deleted" };
        } catch (err) {
            console.error("Error deleting gallery item:", err);
            return { success: false, msg: err.message };
        }
    };

    const uploadGalleryImage = async (file) => {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `gallery/${fileName}`;

        try {
            const { error: uploadError } = await supabase.storage
                .from("gallery")
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: publicUrlData } = supabase.storage
                .from("gallery")
                .getPublicUrl(filePath);

            return {
                success: true,
                url: publicUrlData.publicUrl,
            };
        } catch (err) {
            console.error("Error uploading gallery image:", err);
            return { success: false, msg: err.message };
        }
    };

    const deleteImage = async (imageUrl) => {
        try {
            const urlParts = imageUrl.split("/");
            const bucketIndex = urlParts.findIndex(part => part === "gallery");
            const filePath = urlParts.slice(bucketIndex + 1).join("/");

            const { error: deleteError } = await supabase.storage
                .from("gallery")
                .remove([filePath]);

            if (deleteError) throw deleteError;

            return { success: true, msg: "Image deleted" };
        } catch (err) {
            console.error("Error deleting image:", err);
            return { success: false, msg: err.message };
        }
    };

    useEffect(() => {
        fetchGallery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        gallery,
        error,
        refetch: fetchGallery,
        addGallery,
        updateGallery,
        deleteGallery,
        uploadGalleryImage,
        deleteImage,
    };
};

export default useGallery;