import { useState, useEffect } from "react";
import { useLoading } from "../contexts/LoadingContext";
import { supabase } from "../contexts/supabase";

const useNewsDetail = (id) => {
    const [news, setNews] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const { setIsLoading } = useLoading();

    useEffect(() => {
        const fetchNews = async () => {
            setIsLoading(true);
            setError(null);
            setNotFound(false);

            try {
                const { data: newsData, error: newsError } = await supabase
                    .from("news")
                    .select("*")
                    .eq("id", id)
                    .single();

                if (newsError) {
                    if (newsError.code === "PGRST116") {
                        setNotFound(true);
                        return;
                    }
                    throw newsError;
                }

                setNews(newsData);

                const { data: allNews, error: allNewsError } = await supabase
                    .from("news")
                    .select("*")
                    .neq("id", id)
                    .order("created_at", { ascending: false })
                    .limit(4);

                if (allNewsError) throw allNewsError;

                setSuggestions(allNews);
            } catch (err) {
                console.error(err);
                setError(err.message || "Something went wrong");
            } finally {
                setIsLoading(false);
            }
        };

        fetchNews();
    }, [id, setIsLoading]);

    return { news, suggestions, error, notFound };
};

export default useNewsDetail;