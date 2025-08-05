import { useState, useMemo } from "react";
import useEvents from "../../hooks/useEvents";
import EventCard from "../elements/EventCard";
import LoadingScreen from "../elements/Global/LoadingScreen";

const EVENTS_PER_PAGE = 12;

const getEventStatus = (eventDate, startTime, endTime) => {
    const now = new Date();
    const start = new Date(`${eventDate}T${startTime}`);
    const end = new Date(`${eventDate}T${endTime}`);
    const today = now.toISOString().split("T")[0];

    if (eventDate < today) return 3;
    if (eventDate === today && now >= start && now <= end) return 0;
    if (eventDate === today && now < start) return 1;
    if (eventDate > today) return 2;
    return 4;
};

const EventPageFragment = () => {
    const { events, loading, error } = useEvents();
    const [currentPage, setCurrentPage] = useState(1);

    const sortedEvents = useMemo(() => {
        return [...events].sort((a, b) => {
            const statusA = getEventStatus(a.event_date, a.start_time, a.end_time);
            const statusB = getEventStatus(b.event_date, b.start_time, b.end_time);
            return statusA - statusB;
        });
    }, [events]);

    const totalPages = Math.ceil(sortedEvents.length / EVENTS_PER_PAGE);
    const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;
    const paginatedEvents = sortedEvents.slice(startIndex, startIndex + EVENTS_PER_PAGE);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <section className="px-4 pt-32 pb-20 bg-gray-50 font-poppins">
            <LoadingScreen />
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-red-700 mb-4">Agenda Kegiatan</h2>
                <p className="text-gray-700 mb-8">
                    Jadwal kegiatan terbaru yang akan berlangsung di Kelurahan Rijang Pittu.
                </p>

                {loading ? (
                    <p className="text-center text-gray-500">Memuat data kegiatan...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginatedEvents.map((event) => (
                                <EventCard
                                    key={event.id}
                                    name={event.name}
                                    location={event.location}
                                    eventDate={new Date(event.event_date).toLocaleDateString("id-ID", {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                    startTime={event.start_time}
                                    endTime={event.end_time}
                                />
                            ))}
                        </div>

                        <div className="mt-10 flex justify-center items-center space-x-2 text-sm">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 rounded-full border font-semibold transition ${currentPage === 1
                                        ? "text-gray-400 border-gray-300 cursor-not-allowed"
                                        : "text-green-700 border-green-600 hover:bg-green-100"
                                    }`}
                            >
                                ← Sebelumnya
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => handlePageChange(i + 1)}
                                    className={`w-9 h-9 rounded-full border text-sm font-medium transition ${currentPage === i + 1
                                            ? "bg-green-700 text-white border-green-700"
                                            : "text-green-700 border-green-600 hover:bg-green-100"
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-2 rounded-full border font-semibold transition ${currentPage === totalPages
                                        ? "text-gray-400 border-gray-300 cursor-not-allowed"
                                        : "text-green-700 border-green-600 hover:bg-green-100"
                                    }`}
                            >
                                Selanjutnya →
                            </button>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default EventPageFragment;