import Modal from "./Modal";

const EventForm = ({ isOpen, onClose, title, formData, handleChange, handleSaveEvent }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
        >
            <form onSubmit={handleSaveEvent}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Judul Acara</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
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
                        value={formData.location}
                        onChange={handleChange}
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
                        value={formData.date}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="time" className="block text-gray-700 text-sm font-bold mb-2">Waktu</label>
                    <input
                        type="text"
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Contoh: 09:00 - 12:00"
                        required
                    />
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