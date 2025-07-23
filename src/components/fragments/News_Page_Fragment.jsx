import { useState } from "react";
import NewsCard from "../elements/NewsCard";

const newsData = [
    {
        id: 1,
        imageSrc: "https://placehold.co/600x400/FF5733/FFFFFF?text=News+Image+1",
        title: "KKN Tematik (KKNT) 113 Kel./Desa Tanah Jaya Unihas, Adakan Sosialisasi Teknologi Biopori",
        date: "Sabtu, 8 Februari 2025",
        link: "#",
    },
    {
        id: 2,
        imageSrc: "https://placehold.co/600x400/33FF57/FFFFFF?text=News+Image+2",
        title: "Peningkatan Kualitas Pendidikan di Daerah Terpencil Melalui Program Digitalisasi",
        date: "Senin, 10 Februari 2025",
        link: "#",
    },
    {
        id: 3,
        imageSrc: "https://placehold.co/600x400/3357FF/FFFFFF?text=News+Image+3",
        title: "Inovasi Pertanian Modern: Solusi Ketahanan Pangan di Era Globalisasi",
        date: "Rabu, 12 Februari 2025",
        link: "#",
    },
    {
        id: 4,
        imageSrc: "https://placehold.co/600x400/FF33A1/FFFFFF?text=News+Image+4",
        title: "Pemberdayaan UMKM Lokal Melalui Pelatihan Pemasaran Digital dan Keuangan",
        date: "Jumat, 14 Februari 2025",
        link: "#",
    },
    {
        id: 5,
        imageSrc: "https://placehold.co/600x400/33FFD1/FFFFFF?text=News+Image+5",
        title: "Pengembangan Infrastruktur Pariwisata Berbasis Komunitas untuk Peningkatan Ekonomi Lokal",
        date: "Minggu, 16 Februari 2025",
        link: "#",
    },
    {
        id: 6,
        imageSrc: "https://placehold.co/600x400/FFD133/FFFFFF?text=News+Image+6",
        title: "Sosialisasi Pentingnya Vaksinasi Booster untuk Mencegah Penyebaran Penyakit Menular",
        date: "Selasa, 18 Februari 2025",
        link: "#",
    },
    {
        id: 7,
        imageSrc: "https://placehold.co/600x400/6610f2/ffffff?text=News+Image+7",
        title: "Rapat Koordinasi Persiapan Pemilu 2025",
        date: "Kamis, 20 Februari 2025",
        link: "#",
    },
    {
        id: 8,
        imageSrc: "https://placehold.co/600x400/10f27a/ffffff?text=News+Image+8",
        title: "Pelatihan Literasi Digital untuk Remaja",
        date: "Sabtu, 22 Februari 2025",
        link: "#",
    },
    {
        id: 9,
        imageSrc: "https://placehold.co/600x400/f21010/ffffff?text=News+Image+9",
        title: "Pembagian Bantuan Sosial Tahap I",
        date: "Senin, 24 Februari 2025",
        link: "#",
    },
    {
        id: 10,
        imageSrc: "https://placehold.co/600x400/20a1ff/ffffff?text=News+Image+10",
        title: "Pemilihan Ketua RT Secara Demokratis",
        date: "Rabu, 26 Februari 2025",
        link: "#",
    },
];

const ITEMS_PER_PAGE = 9;

const NewsPageFragment = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(newsData.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentItems = newsData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentItems.map((news) => (
                        <NewsCard
                            key={news.id}
                            imageSrc={news.imageSrc}
                            title={news.title}
                            date={news.date}
                            link={news.link}
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
            </div>
        </section>
    );
};

export default NewsPageFragment;