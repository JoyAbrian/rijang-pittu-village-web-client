import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL + "/events";

const useEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEvents = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_URL}/`);
            const data = await res.json();
            setEvents(data);
        } catch (err) {
            setError("Failed to fetch events");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const addEvent = async (eventData, token) => {
        try {
            const res = await fetch(`${API_URL}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(eventData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.msg || "Failed to add event");
            }

            await fetchEvents();
            return { success: true, msg: data.msg };
        } catch (err) {
            console.error(err);
            return { success: false, msg: err.message };
        }
    };

    const updateEvent = async (id, eventData, token) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(eventData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.msg || "Failed to update event");
            }

            await fetchEvents();
            return { success: true, msg: data.msg };
        } catch (err) {
            console.error(err);
            return { success: false, msg: err.message };
        }
    };

    const deleteEvent = async (id, token) => {
        try {
            const res = await fetch(`${API_URL}/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.msg || "Failed to delete event");
            }

            await fetchEvents();
            return { success: true, msg: data.msg };
        } catch (err) {
            console.error(err);
            return { success: false, msg: err.message };
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return {
        events,
        loading,
        error,
        addEvent,
        updateEvent,
        deleteEvent,
        refetch: fetchEvents,
    };
};

export default useEvents;