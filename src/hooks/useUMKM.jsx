import { useEffect, useState } from "react";
import { useLoading } from "../contexts/LoadingContext";
import { supabase } from "../contexts/supabase";

const useUMKM = () => {
    const [umkm, setUmkm] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const { setIsLoading } = useLoading();

    const fetchUMKM = async () => {
        setIsLoading(true);
        setError(null);
        const { data, error } = await supabase
            .from("umkm")
            .select("*");
        if (error) {
            setError(error.message);
            console.error("Fetch UMKM error:", error);
        } else {
            setUmkm(data);
        }
        setIsLoading(false);
    };

    const fetchCategories = async () => {
        const { data, error } = await supabase
            .from("umkm_categories")
            .select("*");
        if (error) {
            console.error("Fetch categories error:", error);
        } else {
            setCategories(data);
        }
    };

    const addUMKM = async (newData) => {
        const { error } = await supabase
            .from("umkm")
            .insert(newData);
        if (error) {
            console.error("Add UMKM error:", error);
            return { success: false, msg: error.message };
        }
        await fetchUMKM();
        return { success: true, msg: "UMKM added successfully" };
    };

    const updateUMKM = async (id, updatedData) => {
        const { error } = await supabase
            .from("umkm")
            .update(updatedData)
            .eq("id", id);
        if (error) {
            console.error("Update UMKM error:", error);
            return { success: false, msg: error.message };
        }
        await fetchUMKM();
        return { success: true, msg: "UMKM updated successfully" };
    };

    const deleteUMKM = async (id) => {
        const { error } = await supabase
            .from("umkm")
            .delete()
            .eq("id", id);
        if (error) {
            console.error("Delete UMKM error:", error);
            return { success: false, msg: error.message };
        }
        await fetchUMKM();
        return { success: true, msg: "UMKM deleted successfully" };
    };

    const uploadUMKMImage = async (file) => {
        const filename = `${Date.now()}_${file.name}`;
        const { error } = await supabase
            .storage
            .from("umkm")
            .upload(filename, file);

        if (error) {
            console.error("Upload image error:", error);
            return { success: false, msg: error.message };
        }

        const { data: publicUrl } = supabase
            .storage
            .from("umkm")
            .getPublicUrl(filename);

        return { success: true, url: publicUrl.publicUrl };
    };

    const deleteImage = async (imageUrl) => {
        const path = imageUrl.split("/").slice(-1)[0];
        const { error } = await supabase
            .storage
            .from("umkm")
            .remove([path]);

        if (error) {
            console.error("Delete image error:", error);
            return { success: false, msg: error.message };
        }
        return { success: true, msg: "Image deleted successfully" };
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