import { useState, useMemo } from "react";
import useUMKM from "../../hooks/useUMKM";
import UMKMCard from "../elements/UMKMCard";

const itemsPerPage = 9;

const UMKMPageFragment = () => {
    const { umkm, categories, loading, error } = useUMKM();
    const [currentPage, setCurrentPage] = useState(1);

    const enrichedUMKM = useMemo(() => {
        return umkm.map((item) => {
            const category = categories.find(cat => cat.id === item.category_id);
            return {
                ...item,
                image: item.image_url,
                priceMin: item.price_min,
                priceMax: item.price_max,
                openTime: item.open_time?.slice(0, 5),
                closeTime: item.close_time?.slice(0, 5),
                umkmType: {
                    icon: category?.icon || "/icons/default.svg",
                    name: category?.name || "Tidak diketahui"
                }
            };
        });
    }, [umkm, categories]);

    const totalPages = Math.ceil(enrichedUMKM.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const paginatedList = enrichedUMKM.slice(startIdx, startIdx + itemsPerPage);

    const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

    return (
        <section className="bg-gray-50 pt-32 pb-24 px-4 font-poppins">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-red-700 mb-4">UMKM Kelurahan</h2>
                <p className="text-gray-700 mb-8">
                    Berikut adalah daftar UMKM yang ada di Kelurahan Rijang Pittu.
                </p>

                {loading ? (
                    <p className="text-gray-500">Memuat data UMKM...</p>
                ) : error ? (
                    <p className="text-red-500">Gagal memuat data UMKM: {error}</p>
                ) : paginatedList.length === 0 ? (
                    <p className="text-gray-600">Belum ada data UMKM yang tersedia.</p>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {paginatedList.map((umkm) => (
                                <UMKMCard
                                    key={umkm.id}
                                    {...umkm}
                                />
                            ))}
                        </div>

                        <div className="mt-10 flex justify-center items-center space-x-2 text-sm">
                            <button
                                onClick={handlePrev}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 rounded-full border font-semibold transition ${currentPage === 1
                                        ? "text-gray-400 border-gray-300 cursor-not-allowed"
                                        : "text-green-700 border-green-600 hover:bg-green-100"
                                    }`}
                            >
                                ← Sebelumnya
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`w-9 h-9 rounded-full border text-sm font-medium transition ${currentPage === i + 1
                                            ? "bg-green-700 text-white border-green-700"
                                            : "text-green-700 border-green-600 hover:bg-green-100"
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                onClick={handleNext}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-2 rounded-full border font-semibold transition ${currentPage === totalPages
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

export default UMKMPageFragment;