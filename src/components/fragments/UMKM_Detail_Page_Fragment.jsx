import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import useUMKM from "../../hooks/useUMKM";
import UMKMSuggestionCard from "../elements/UMKMSuggestionCard";
import LoadingScreen from "../elements/Global/LoadingScreen";
import UMKMNotFoundFragment from "./UMKM_Not_Found_Fragment";

const UMKMDetailPageFragment = () => {
    const { id } = useParams();
    const { umkm, categories, loading, error } = useUMKM();

    const currentUMKM = useMemo(() => umkm.find(u => u.id === parseInt(id)), [umkm, id]);

    const category = useMemo(() => {
        return categories.find(cat => cat.id === currentUMKM?.category_id);
    }, [categories, currentUMKM]);

    const suggestions = useMemo(() => {
        return umkm
            .filter(u => u.id !== parseInt(id))
            .slice(0, 4);
    }, [umkm, id]);

    useEffect(() => {
        if (currentUMKM) {
            document.title = currentUMKM.name + " | Website Resmi Rijang Pittu";
        }
    }, [currentUMKM]);

    if (loading) return <div className="pt-32 text-center">Memuat data UMKM...</div>;
    if (error) return <div className="pt-32 text-center text-red-600">{error}</div>;
    if (!currentUMKM) return <UMKMNotFoundFragment />;

    const formatContentForDisplay = (text) => {
        if (!text) return { __html: '' };
        const htmlContent = text.split('\n\n').map(paragraph => `<p class="mb-4">${paragraph.replace(/\n/g, '<br/>')}</p>`).join('');
        return { __html: htmlContent };
    };

    return (
        <section className="container mx-auto p-6 mt-20">
            <LoadingScreen />
            <div className="flex flex-col lg:flex-row gap-10">
                <div className="lg:w-2/3 bg-white p-10 rounded-xl shadow-2xl transform hover:scale-[1.005] transition-transform duration-300 ease-in-out">
                    <div className="flex flex-col md:flex-row items-start md:items-center mb-8">
                        <img
                            src={currentUMKM.image_url}
                            alt={currentUMKM.name}
                            className="w-full md:w-1/2 h-64 object-cover rounded-lg shadow-lg mb-6 md:mb-0 md:mr-8"
                        />
                        <div className="flex-1">
                            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                                {category?.name || "Kategori tidak diketahui"}
                            </span>
                            <h2 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                                {currentUMKM.name}
                            </h2>
                            <div className="text-lg text-gray-700 mb-4 flex items-center">
                                💸 <span className="font-semibold text-green-700 ml-2">Rp{currentUMKM.price_min.toLocaleString()} - Rp{currentUMKM.price_max.toLocaleString()}</span>
                            </div>
                            <div className="text-lg text-gray-700 flex items-center">
                                🕒 <span className="font-semibold text-purple-700 ml-2">{currentUMKM.open_time?.slice(0, 5)} - {currentUMKM.close_time?.slice(0, 5)}</span>
                            </div>
                        </div>
                    </div>

                    <div
                        className="prose prose-lg max-w-none text-gray-800 leading-relaxed border-t pt-8 mt-8 border-gray-200"
                        dangerouslySetInnerHTML={formatContentForDisplay(currentUMKM.description)}
                    ></div>

                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Informasi Kontak</h3>
                        <ul className="space-y-3 text-gray-700">
                            <li>📍 {currentUMKM.address}</li>
                            <li>📞 {currentUMKM.contact}</li>
                            <li>📸 <a href={currentUMKM.instagram} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Instagram</a></li>
                            <li>🗺️ <a href={currentUMKM.google_maps} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Lihat di Google Maps</a></li>
                        </ul>
                    </div>
                </div>

                <div className="lg:w-1/3 bg-white p-8 rounded-xl shadow-2xl">
                    <h3 className="text-3xl font-bold text-gray-800 mb-8 border-b-4 pb-4 border-blue-500">
                        UMKM Lainnya
                    </h3>
                    <div className="space-y-8">
                        {suggestions.map((item) => (
                            <UMKMSuggestionCard
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                category={categories.find(cat => cat.id === item.category_id)?.name || "Kategori"}
                                image={item.image_url}
                                description={item.description.slice(0, 100) + "..."}
                                priceRange={`Rp${item.price_min.toLocaleString()} - Rp${item.price_max.toLocaleString()}`}
                                openingHours={`${item.open_time?.slice(0, 5)} - ${item.close_time?.slice(0, 5)}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UMKMDetailPageFragment;