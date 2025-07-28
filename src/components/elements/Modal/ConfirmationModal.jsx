import Modal from "./Modal";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Konfirmasi Perubahan">
            <p className="text-gray-700 mb-6">{message}</p>
            <div className="flex justify-end space-x-3">
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors duration-200"
                >
                    Batal
                </button>
                <button
                    onClick={onConfirm}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                    Konfirmasi
                </button>
            </div>
        </Modal>
    );
};

export default ConfirmationModal;