import { EyeFill, PencilSquare, Trash } from "react-bootstrap-icons";

const DashboardNewsCard = ({ news, handleEditNews, handleDeleteNews, handleViewNews }) => {
    return (
        <div key={news.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
                src={news.image}
                alt={news.title}
                className="w-full h-48 object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x400/CCCCCC/333333?text=Image+Not+Found"; }}
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">{news.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{news.date}</p>
                <div className="flex space-x-2">
                    <button
                        onClick={() => handleEditNews(news)}
                        className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200"
                        title="Edit"
                    >
                        <PencilSquare size={18} />
                    </button>
                    <button
                        onClick={() => handleDeleteNews(news)}
                        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                        title="Hapus"
                    >
                        <Trash size={18} />
                    </button>
                    <button
                        onClick={() => handleViewNews(news)}
                        className="p-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors duration-200"
                        title="Lihat Berita"
                    >
                        <EyeFill size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardNewsCard;