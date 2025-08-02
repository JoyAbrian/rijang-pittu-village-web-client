import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useNewsDetail from "../../hooks/useNewsDetail";
import NewsSuggestionCard from "../elements/NewsSuggestionCard";
import LoadingScreen from "../elements/Global/LoadingScreen";
import NewsNotFoundFragment from "./News_Not_Found_Fragment";

const NewsDetailPageFragment = () => {
    const { id } = useParams();
    const { news, suggestions, loading, error, notFound } = useNewsDetail(id);

    useEffect(() => {
        if (news) {
            document.title = news.title + " | Website Resmi Rijang Pittu";
        }
    }, [news]);

    if (loading) return <p className="mt-20 text-center">Loading...</p>;
    if (notFound) return <NewsNotFoundFragment />;
    if (error) return <p className="mt-20 text-center text-red-500">{error}</p>;
    if (!news) return null;

    return (
        <section className="container mx-auto p-6 mt-20">
            <LoadingScreen />
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3 bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                        {news.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-6 flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-2 text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        {new Date(news.date).toLocaleDateString("id-ID", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                    <img
                        src={news.image_url}
                        alt={news.title}
                        className="w-full h-auto rounded-lg mb-8 object-cover shadow-md"
                    />
                    <div
                        className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: news.content }}
                    ></div>
                </div>

                <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 pb-3 border-blue-500">
                        Berita Lainnya
                    </h3>
                    <div className="space-y-6">
                        {suggestions.map((item) => (
                            <NewsSuggestionCard
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                date={new Date(item.date).toLocaleDateString("id-ID", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                                image={item.image_url}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsDetailPageFragment;