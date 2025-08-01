import { useMemo } from "react";
import { Link } from "react-router-dom";
import NewsCard from "../../elements/NewsCard";
import useNews from "../../../hooks/useNews";

const LandingPageNews = () => {
    const { newsList, loading, error } = useNews();

    const latestNews = useMemo(() => {
        return [...newsList].sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [newsList]);

    return (
        <section className="bg-gray-50 py-10 sm:py-16 lg:py-20 font-poppins">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center sm:text-left mb-8">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-red-700 mb-2">
                        Berita Kelurahan
                    </h1>
                    <p className="text-base sm:text-lg text-neutral-600">
                        Berita terbaru mengenai Kelurahan Rijang Pittu
                    </p>
                </div>

                {loading ? (
                    <p className="text-center text-gray-500">Memuat berita...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {latestNews.slice(0, 3).map((news) => (
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
                )}

                <div className="mt-8 text-center sm:text-right">
                    <Link
                        to="/berita"
                        className="inline-block px-6 py-3 text-base font-medium bg-green-700 text-white rounded-lg hover:bg-green-800 transition transform hover:-translate-y-1 shadow-md"
                    >
                        Lihat Lebih Banyak &rarr;
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default LandingPageNews;