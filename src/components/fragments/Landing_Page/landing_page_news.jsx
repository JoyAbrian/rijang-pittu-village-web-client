import { Link } from "react-router-dom";
import NewsCard from "../../elements/NewsCard";

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
];

const LandingPageNews = () => {
    return (
        <section className="bg-gray-50 py-16 px-4 font-poppins">
            <div className="container mx-5">
                <h1 className="text-4xl font-bold text-red-700 mb-2 text-start">Berita Kelurahan</h1>
                <p className="text-lg text-neutral-600">Berita terbaru mengenai Kelurahan Rijang Pittu</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-6 mt-3">
                {newsData.map((news) => (
                    <NewsCard
                        key={news.id}
                        imageSrc={news.imageSrc}
                        title={news.title}
                        date={news.date}
                        link={news.link}
                    />
                ))}
            </div>
            <div className="mt-8 flex justify-end">
                    <Link
                        to="/berita"
                        className="px-5 py-2 text-sm font-medium bg-green-700 text-white rounded hover:bg-green-800 transition"
                    >
                        Lihat Lebih Banyak →
                    </Link>
                </div>
        </section>
    );
}

export default LandingPageNews;