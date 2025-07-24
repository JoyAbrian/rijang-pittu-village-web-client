import { useState } from "react";
import GalleryImage from "../elements/GalleryImage";

const galleryItems = [
    { src: "/images/galeri1.jpg", title: "Pemandangan Kantor Kelurahan" },
    { src: "/images/galeri2.jpg", title: "Kegiatan Sosialisasi Warga" },
    { src: "/images/galeri3.jpg", title: "Peringatan Hari Kemerdekaan" },
    { src: "/images/galeri4.jpg", title: "Gotong Royong Bersama" },
    { src: "/images/galeri5.jpg", title: "Seminar Program Kerja KKN 114 UNHAS" },
    { src: "/images/galeri6.jpg", title: "Jumat Bersih" },
    { src: "/images/galeri7.jpg", title: "Penghijauan Kelurahan" },
    { src: "/images/galeri8.jpg", title: "Pembuatan Lubang Biopori" },
    { src: "/images/galeri9.jpg", title: "Pembangunan Poskamling" },
    { src: "/images/galeri10.jpg", title: "Pelatihan Digitalisasi UMKM" },
    { src: "/images/galeri11.jpg", title: "Hari Jadi Kelurahan Rijang Pittu" },
    { src: "/images/galeri12.jpg", title: "Senam Bersama Warga" },
    { src: "/images/galeri13.jpg", title: "Penyemprotan Disinfektan" },
    { src: "/images/galeri14.jpg", title: "Festival Budaya Kelurahan" },
];

const ITEMS_PER_PAGE = 12;

const GalleryPageFragment = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(galleryItems.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentItems = galleryItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <section className="bg-gray-50 pt-32 pb-24 px-4 font-poppins">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-red-700 mb-2">
                    GALERI
                </h2>
                <p className="text-gray-700 mb-10">
                    Menampilkan foto-foto kegiatan dan lingkungan di sekitar Kelurahan Rijang Pittu
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
                    {currentItems.map((item, index) => (
                        <GalleryImage key={index} src={item.src} title={item.title} />
                    ))}
                </div>

                <div className="flex justify-center items-center space-x-2 text-sm">
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

export default GalleryPageFragment;