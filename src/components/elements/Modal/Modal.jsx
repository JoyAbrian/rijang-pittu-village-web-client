import { XCircle } from "react-bootstrap-icons";

const Modal = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4 font-inter">
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative transform transition-all sm:my-8 sm:w-full">
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors duration-200 rounded-full p-1"
                        aria-label="Close modal"
                    >
                        <XCircle size={24} />
                    </button>
                </div>

                <div className="max-h-[70vh] overflow-y-auto pr-2">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;