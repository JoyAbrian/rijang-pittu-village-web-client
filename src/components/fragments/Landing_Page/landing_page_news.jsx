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
];

const LandingPageNews = () => {
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {newsData.slice(0, 4).map((news) => (
                        <NewsCard
                            key={news.id}
                            imageSrc={news.imageSrc}
                            title={news.title}
                            date={news.date}
                            link={news.link}
                        />
                    ))}
                </div>

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
}

export default LandingPageNews;