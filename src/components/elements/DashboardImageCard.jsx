import { useState } from "react";
import { Eye, Pencil, Trash2 } from "react-bootstrap-icons";

const DashboardImageCard = ({ image, onEdit, onDelete, onView }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative bg-white rounded-lg shadow-md overflow-hidden group cursor-pointer border border-gray-200 hover:shadow-lg transition-shadow duration-200"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img
                src={image.imageUrl}
                alt={image.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x300/A0A0A0/FFFFFF?text=No+Image" }} // Fallback image
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">{image.title}</h3>
            </div>

            {onEdit && onDelete ? (
                <div className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center space-x-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    <button
                        onClick={(e) => { e.stopPropagation(); onEdit(image.id); }}
                        className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-md transition-colors duration-200"
                        title="Edit Gambar"
                    >
                        <Pencil size={20} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete(image.id); }}
                        className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md transition-colors duration-200"
                        title="Hapus Gambar"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
            ) : (
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={() => onView(image)}>
                    <button
                        className="p-3 bg-white bg-opacity-70 text-gray-800 rounded-full shadow-md hover:bg-opacity-90 transition-colors duration-200"
                        title="Lihat Gambar"
                    >
                        <Eye size={24} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default DashboardImageCard;
