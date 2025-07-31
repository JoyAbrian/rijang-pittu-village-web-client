import { useEffect, useState } from "react";
import EventForm from "../../elements/Modal/EventForm";
import ConfirmationModal from "../../elements/Modal/ConfirmationModal";
import { PlusCircle } from "react-bootstrap-icons";
import DashboardEventCard from "../../elements/DashboardEventCard";

const DashboardEvent = () => {
    useEffect(() => {
        document.title = "Acara | Dashboard Rijang Pittu"
    }, [])

    const [events, setEvents] = useState([
        {
            id: 'e1',
            title: "Festival Kuliner Lokal",
            location: "Lapangan Kelurahan",
            date: "2025-07-30",
            time: "17:00 - 20:00",
        },
        {
            id: 'e2',
            title: "Sosialisasi Kesehatan Masyarakat",
            location: "Kantor Kelurahan Rijang Pittu",
            date: "2025-07-22",
            time: "08:00 - 10:00",
        },
        {
            id: 'e3',
            title: "Pelatihan UMKM Digital",
            location: "Balai Warga RW 3",
            date: "2025-07-23",
            time: "13:00 - 16:00",
        },
        {
            id: 'e4',
            title: "Jumat Bersih",
            location: "Lingkungan RT 5",
            date: "2025-07-26",
            time: "06:00 - 09:00",
        },
    ]);

    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [currentEventItem, setCurrentEventItem] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        location: '',
        date: '',
        time: '',
        description: '',
    });

    const handleAddEvent = () => {
        setCurrentEventItem(null);
        setFormData({ title: '', location: '', date: '', time: '', description: '' });
        setIsFormModalOpen(true);
    };

    const handleEditEvent = (event) => {
        setCurrentEventItem(event);
        setFormData({
            title: event.title,
            location: event.location,
            date: event.date,
            time: event.time,
            description: event.description,
        });
        setIsFormModalOpen(true);
    };

    const handleDeleteEvent = (event) => {
        setCurrentEventItem(event);
        setIsConfirmationModalOpen(true);
    };

    const handleConfirmDelete = () => {
        setEvents(events.filter(event => event.id !== currentEventItem.id));
        setIsConfirmationModalOpen(false);
        setCurrentEventItem(null);
    };

    const handleSaveEvent = (e) => {
        e.preventDefault();
        if (currentEventItem) {
            setEvents(events.map(event =>
                event.id === currentEventItem.id ? { ...event, ...formData } : event
            ));
        } else {
            const newEvent = {
                id: crypto.randomUUID(),
                ...formData,
            };
            setEvents([...events, newEvent]);
        }
        setIsFormModalOpen(false);
        setFormData({ title: '', location: '', date: '', time: '', description: '' });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const formatDateForDisplay = (dateString) => {
        if (!dateString) return '';
        try {
            const date = new Date(dateString + 'T00:00:00');
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            return date.toLocaleDateString('id-ID', options);
        } catch (error) {
            console.error("Error formatting date:", error);
            return dateString;
        }
    };


    return (
        <div className="flex h-screen bg-gray-100 font-inter">
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">Daftar Acara</h2>
                        <button
                            onClick={handleAddEvent}
                            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors duration-200"
                        >
                            <PlusCircle className="mr-2" size={20} /> Tambah Acara
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map((event) => (
                            <DashboardEventCard
                                key={event.id}
                                event={{ ...event, date: formatDateForDisplay(event.date) }}
                                handleEditEvent={handleEditEvent}
                                handleDeleteEvent={handleDeleteEvent}
                            />
                        ))}
                    </div>
                </main>
            </div>

            <EventForm
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                title={currentEventItem ? "Edit Acara" : "Tambah Acara Baru"}
                formData={formData}
                handleChange={handleChange}
                handleSaveEvent={handleSaveEvent}
            />

            <ConfirmationModal
                isOpen={isConfirmationModalOpen}
                onClose={() => setIsConfirmationModalOpen(false)}
                onConfirm={handleConfirmDelete}
                message={`Apakah Anda yakin ingin menghapus acara "${currentEventItem?.title}" ini?`}
            />
        </div>
    );
};

export default DashboardEvent;