import { ClockFill, EyeFill, PencilSquare, ShopWindow, TagFill, Trash } from "react-bootstrap-icons";

const DashboardUMKMCard = ({ umkm, handleEditUmkm, handleDeleteUmkm, handleViewUmkm }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-200 hover:scale-[1.02]">
            <img
                src={umkm.image}
                alt={umkm.name}
                className="w-full h-48 object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x400/CCCCCC/333333?text=Gambar+Tidak+Ditemukan"; }}
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate flex items-center">
                    <ShopWindow className="mr-2 text-indigo-600" /> {umkm.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2 flex items-center">
                    <TagFill className="mr-2 text-orange-500" /> {umkm.category}
                </p>
                <p className="text-sm text-gray-600 mb-2 flex items-center">
                    <ClockFill className="mr-2 text-purple-500" /> {umkm.openingHoursStart} - {umkm.openingHoursEnd}
                </p>
                <p className="text-sm text-gray-600 mb-4 flex items-center">
                    <TagFill className="mr-2 text-green-500" /> Rp{umkm.priceRangeStart} - Rp{umkm.priceRangeEnd}
                </p>
                <div className="flex space-x-2 mt-4">
                    <button
                        onClick={() => handleEditUmkm(umkm)}
                        className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200"
                        title="Edit UMKM"
                    >
                        <PencilSquare size={18} />
                    </button>
                    <button
                        onClick={() => handleDeleteUmkm(umkm)}
                        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                        title="Hapus UMKM"
                    >
                        <Trash size={18} />
                    </button>
                    <button
                        onClick={() => handleViewUmkm(umkm)}
                        className="p-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors duration-200"
                        title="Lihat Detail UMKM"
                    >
                        <EyeFill size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardUMKMCard;