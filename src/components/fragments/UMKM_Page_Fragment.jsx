import UMKMCard from "../elements/UMKMCard";
import { useState } from "react";

const umkmList = [
    {
        id: 1,
        name: "Warung Makan Sederhana",
        image: "/images/umkm/warung1.jpg",
        description: "Menyediakan masakan khas Bugis dan berbagai menu rumahan.",
        priceMin: 10000,
        priceMax: 25000,
        openTime: "07:00",
        closeTime: "20:00",
        umkmType: {
            icon: "/icons/food.svg",
            name: "Kuliner"
        }
    },
    {
        id: 2,
        name: "Kedai Kopi Hijau",
        image: "/images/umkm/kopi1.jpg",
        description: "Tempat nongkrong santai dengan berbagai varian kopi lokal.",
        priceMin: 8000,
        priceMax: 30000,
        openTime: "09:00",
        closeTime: "23:00",
        umkmType: {
            icon: "/icons/cafe.svg",
            name: "Kafe"
        }
    },
    {
        id: 3,
        name: "Toko Oleh-oleh Makassar",
        image: "/images/umkm/oleholeh1.jpg",
        description: "Menjual produk khas Makassar seperti kacang disco dan kue tradisional.",
        priceMin: 15000,
        priceMax: 75000,
        openTime: "08:00",
        closeTime: "17:00",
        umkmType: {
            icon: "/icons/shop.svg",
            name: "Oleh-oleh"
        }
    },
];

const itemsPerPage = 9;

const UMKMPageFragment = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(umkmList.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const paginatedList = umkmList.slice(startIdx, startIdx + itemsPerPage);

    const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

    return (
        <section className="bg-gray-50 pt-32 pb-24 px-4 font-poppins">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-red-700 mb-4">UMKM Kelurahan</h2>
                <p className="text-gray-700 mb-8">
                    Berikut adalah daftar UMKM yang ada di Kelurahan Rijang Pittu.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedList.map((umkm) => (
                        <UMKMCard
                            key={umkm.id}
                            {...umkm}
                        />
                    ))}
                </div>

                <div className="mt-10 flex justify-center items-center gap-4">
                    <button
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                        className="px-4 py-2 text-sm bg-green-700 text-white rounded disabled:opacity-50"
                    >
                        Sebelumnya
                    </button>
                    <span className="text-sm text-gray-700">
                        Halaman {currentPage} dari {totalPages}
                    </span>
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 text-sm bg-green-700 text-white rounded disabled:opacity-50"
                    >
                        Selanjutnya
                    </button>
                </div>
            </div>
        </section>
    );
};

export default UMKMPageFragment;