import { useState, useMemo } from "react";
import NewsCard from "../elements/NewsCard";
import useNews from "../../hooks/useNews";

const ITEMS_PER_PAGE = 9;

const NewsPageFragment = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { newsList, loading, error } = useNews();

    const sortedNews = useMemo(() => {
        return [...newsList].sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [newsList]);
    
    const totalPages = useMemo(() => {
        return Math.ceil(sortedNews.length / ITEMS_PER_PAGE);
    }, [sortedNews]);

    const currentItems = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return sortedNews.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [sortedNews, currentPage]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <section className="bg-gray-50 pt-32 pb-24 px-4 font-poppins">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-red-700 mb-2 text-start">Berita Kelurahan</h1>
                <p className="text-lg text-neutral-600 mb-10">Berita terbaru mengenai Kelurahan Rijang Pittu</p>

                {loading ? (
                    <p className="text-center text-gray-500">Memuat berita...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentItems.map((news) => (
                                <NewsCard
                                    key={news.id}
                                    id={news.id}
                                    imageSrc={news.image_url}
                                    title={news.title}
                                    date={new Date(news.date).toLocaleDateString("id-ID", {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                />
                            ))}
                        </div>

                        <div className="mt-12 flex justify-center items-center space-x-2 text-sm">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 rounded-full border font-semibold transition ${
                                    currentPage === 1
                                        ? "text-gray-400 border-gray-300 cursor-not-allowed"
                                        : "text-green-700 border-green-600 hover:bg-green-100"
                                }`}
                            >
                                ← Sebelumnya
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => handlePageChange(i + 1)}
                                    className={`w-9 h-9 rounded-full border text-sm font-medium transition ${
                                        currentPage === i + 1
                                            ? "bg-green-700 text-white border-green-700"
                                            : "text-green-700 border-green-600 hover:bg-green-100"
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-2 rounded-full border font-semibold transition ${
                                    currentPage === totalPages
                                        ? "text-gray-400 border-gray-300 cursor-not-allowed"
                                        : "text-green-700 border-green-600 hover:bg-green-100"
                                }`}
                            >
                                Selanjutnya →
                            </button>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default NewsPageFragment;