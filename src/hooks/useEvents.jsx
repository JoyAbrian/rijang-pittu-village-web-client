import { useState, useEffect } from "react";
import { useLoading } from "../contexts/LoadingContext";
import { supabase } from "../contexts/supabase";

const useEvents = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const { setIsLoading } = useLoading();

    const fetchEvents = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase
                .from("events")
                .select("*")
                .order("event_date", { ascending: true });

            if (error) throw error;

            setEvents(data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch events");
        } finally {
            setIsLoading(false);
        }
    };

    const addEvent = async (eventData) => {
        try {
            const { data, error } = await supabase
                .from("events")
                .insert([eventData])
                .select();

            if (error) throw error;

            await fetchEvents();
            return { success: true, msg: "Event added successfully", data };
        } catch (err) {
            console.error(err);
            return { success: false, msg: err.message };
        }
    };

    const updateEvent = async (id, eventData) => {
        try {
            const { data, error } = await supabase
                .from("events")
                .update(eventData)
                .eq("id", id)
                .select();

            if (error) throw error;

            await fetchEvents();
            return { success: true, msg: "Event updated successfully", data };
        } catch (err) {
            console.error(err);
            return { success: false, msg: err.message };
        }
    };

    const deleteEvent = async (id) => {
        try {
            const { error } = await supabase
                .from("events")
                .delete()
                .eq("id", id);

            if (error) throw error;

            await fetchEvents();
            return { success: true, msg: "Event deleted successfully" };
        } catch (err) {
            console.error(err);
            return { success: false, msg: err.message };
        }
    };

    useEffect(() => {
        fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        events,
        error,
        addEvent,
        updateEvent,
        deleteEvent,
        refetch: fetchEvents,
    };
};

export default useEvents;