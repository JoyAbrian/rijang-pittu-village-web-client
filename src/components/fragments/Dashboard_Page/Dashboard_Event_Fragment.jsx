import { useEffect, useState } from "react";
import EventForm from "../../elements/Modal/EventForm";
import ConfirmationModal from "../../elements/Modal/ConfirmationModal";
import { PlusCircle } from "react-bootstrap-icons";
import DashboardEventCard from "../../elements/DashboardEventCard";
import useEvents from "../../../hooks/useEvents";

const DashboardEvent = () => {
    useEffect(() => {
        document.title = "Acara | Dashboard Rijang Pittu"
    }, []);

    const token = localStorage.getItem('token');

    const {
        events,
        error,
        addEvent,
        updateEvent,
        deleteEvent,
    } = useEvents();

    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [currentEventItem, setCurrentEventItem] = useState(null);
    const [eventToDeleteId, setEventToDeleteId] = useState(null);

    const handleAddEvent = () => {
        setCurrentEventItem(null);
        setIsFormModalOpen(true);
    };

    const handleEditEvent = (event) => {
        setCurrentEventItem(event);
        setIsFormModalOpen(true);
    };

    const handleDeleteEvent = (event) => {
        setEventToDeleteId(event.id);
        setCurrentEventItem(event);
        setIsConfirmationModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!eventToDeleteId || !token) {
            alert("Gagal menghapus: ID acara atau token tidak tersedia.");
            setIsConfirmationModalOpen(false);
            return;
        }

        const result = await deleteEvent(eventToDeleteId, token);
        if (!result.success) {
            alert(result.msg);
        }
        setIsConfirmationModalOpen(false);
        setEventToDeleteId(null);
        setCurrentEventItem(null);
    };

    const handleSaveEvent = async (eventDataFromForm) => {
        if (!token) {
            alert("Autentikasi diperlukan untuk menambahkan/mengedit acara.");
            return;
        }

        const payload = {
            name: eventDataFromForm.title,
            location: eventDataFromForm.location,
            event_date: eventDataFromForm.date,
            start_time: eventDataFromForm.openingHoursStart,
            end_time: eventDataFromForm.openingHoursEnd,
        };

        let result;
        if (currentEventItem) {
            result = await updateEvent(currentEventItem.id, payload, token);
        } else {
            result = await addEvent(payload, token);
        }

        if (!result.success) {
            alert(result.msg);
        }

        setIsFormModalOpen(false);
    };

    const formatDateForDisplay = (dateString) => {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            return date.toLocaleDateString('id-ID', options);
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            return dateString;
        }
    };

    if (error) {
        return <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center text-red-600 text-lg">Error: {error}</div>;
    }

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
                        {events.length === 0 ? (
                            <p className="text-gray-600 col-span-full text-center">Belum ada acara.</p>
                        ) : (
                            events.map((event) => (
                                <DashboardEventCard
                                    key={event.id}
                                    event={{
                                        id: event.id,
                                        title: event.name,
                                        location: event.location,
                                        date: formatDateForDisplay(event.event_date),
                                        time: `${event.start_time || ''} - ${event.end_time || ''}`,
                                    }}
                                    handleEditEvent={() => handleEditEvent(event)}
                                    handleDeleteEvent={() => handleDeleteEvent(event)}
                                />
                            ))
                        )}
                    </div>
                </main>
            </div>

            <EventForm
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                title={currentEventItem ? "Edit Acara" : "Tambah Acara Baru"}
                eventData={currentEventItem}
                onSubmit={handleSaveEvent}
            />

            <ConfirmationModal
                isOpen={isConfirmationModalOpen}
                onClose={() => setIsConfirmationModalOpen(false)}
                onConfirm={handleConfirmDelete}
                message={`Apakah Anda yakin ingin menghapus acara "${currentEventItem?.name}" ini?`}
            />
        </div>
    );
};

export default DashboardEvent;