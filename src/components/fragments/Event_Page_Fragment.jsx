import { useState } from "react";
import EventCard from "../elements/EventCard";

const EVENTS_PER_PAGE = 12;

const eventList = [
    {
        id: 1,
        name: "Sosialisasi Kesehatan Masyarakat",
        location: "Kantor Kelurahan Rijang Pittu",
        eventDate: "2025-07-22",
        startTime: "08:00",
        endTime: "10:00",
    },
    {
        id: 2,
        name: "Pelatihan UMKM Digital",
        location: "Balai Warga RW 3",
        eventDate: "2025-07-23",
        startTime: "13:00",
        endTime: "15:00",
    },
    {
        id: 3,
        name: "Jumat Bersih",
        location: "Lingkungan RT 5",
        eventDate: "2025-07-23",
        startTime: "06:00",
        endTime: "09:00",
    },
    {
        id: 4,
        name: "Festival Kuliner Lokal",
        location: "Lapangan Kelurahan",
        eventDate: "2025-07-30",
        startTime: "17:00",
        endTime: "20:00",
    },
];

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
    const [currentPage, setCurrentPage] = useState(1);

    const sortedEvents = [...eventList].sort((a, b) => {
        const statusA = getEventStatus(a.eventDate, a.startTime, a.endTime);
        const statusB = getEventStatus(b.eventDate, b.startTime, b.endTime);
        return statusA - statusB;
    });

    const totalPages = Math.ceil(sortedEvents.length / EVENTS_PER_PAGE);
    const paginatedEvents = sortedEvents.slice(
        (currentPage - 1) * EVENTS_PER_PAGE,
        currentPage * EVENTS_PER_PAGE
    );

    return (
        <section className="px-4 pt-32 pb-20 bg-gray-50 font-poppins">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-red-700 mb-4">Agenda Kegiatan</h2>
                <p className="text-gray-700 mb-8">
                    Jadwal kegiatan terbaru yang akan berlangsung di Kelurahan Rijang Pittu.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedEvents.map((event) => (
                        <EventCard
                            key={event.id}
                            name={event.name}
                            location={event.location}
                            eventDate={event.eventDate}
                            startTime={event.startTime}
                            endTime={event.endTime}
                        />
                    ))}
                </div>

                {/* PAGINATION */}
                <div className="flex justify-center items-center mt-10 gap-2">
                    <button
                        className="px-3 py-1 rounded bg-gray-200 text-gray-800 disabled:opacity-50"
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-3 py-1 rounded ${
                                currentPage === i + 1
                                    ? "bg-green-700 text-white"
                                    : "bg-gray-200 text-gray-800"
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        className="px-3 py-1 rounded bg-gray-200 text-gray-800 disabled:opacity-50"
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </section>
    );
};

export default EventPageFragment;