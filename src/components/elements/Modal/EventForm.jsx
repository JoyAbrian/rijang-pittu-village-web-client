import { useEffect, useState } from "react";
import Modal from "./Modal";

const EventForm = ({ isOpen, onClose, title, eventData, onSubmit }) => {
    const [eventTitle, setEventTitle] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [openingHoursStart, setOpeningHoursStart] = useState('');
    const [openingHoursEnd, setOpeningHoursEnd] = useState('');

    useEffect(() => {
        if (isOpen) {
            if (eventData) {
                setEventTitle(eventData.name || '');
                setLocation(eventData.location || '');
                setDate(eventData.event_date || '');
                setOpeningHoursStart(eventData.start_time || '');
                setOpeningHoursEnd(eventData.end_time || '');
            } else {
                setEventTitle('');
                setLocation('');
                setDate('');
                setOpeningHoursStart('');
                setOpeningHoursEnd('');
            }
        }
    }, [isOpen, eventData]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!eventTitle.trim() || !location.trim() || !date.trim() ||
            !openingHoursStart.trim() || !openingHoursEnd.trim()) {
            alert('Semua bidang wajib diisi.');
            return;
        }

        onSubmit({
            title: eventTitle,
            location,
            date,
            openingHoursStart,
            openingHoursEnd,
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
        >
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Judul Acara</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={eventTitle}
                        onChange={(e) => setEventTitle(e.target.value)}
                        className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">Lokasi</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Contoh: Lapangan Kelurahan"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">Tanggal</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Waktu</label>
                    <div className="flex space-x-2">
                        <input
                            type="time"
                            id="openingHoursStart"
                            name="openingHoursStart"
                            value={openingHoursStart}
                            onChange={(e) => setOpeningHoursStart(e.target.value)}
                            className="shadow appearance-none border rounded-lg w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <input
                            type="time"
                            id="openingHoursEnd"
                            name="openingHoursEnd"
                            value={openingHoursEnd}
                            onChange={(e) => setOpeningHoursEnd(e.target.value)}
                            className="shadow appearance-none border rounded-lg w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>
                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors duration-200"
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                        Simpan
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default EventForm;