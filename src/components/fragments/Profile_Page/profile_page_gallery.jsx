import { Link } from "react-router-dom";
import GalleryImage from "../../elements/GalleryImage";

const galleryItems = [
    { src: "/images/galeri1.jpg", title: "Pemandangan Kantor Kelurahan" },
    { src: "/images/galeri2.jpg", title: "Kegiatan Sosialisasi Warga" },
    { src: "/images/galeri3.jpg", title: "Peringatan Hari Kemerdekaan" },
    { src: "/images/galeri4.jpg", title: "Gotong Royong Bersama" },
    { src: "/images/galeri5.jpg", title: "Seminar Program Kerja KKN 114 UNHAS" },
    { src: "/images/galeri6.jpg", title: "Jumat Bersih" },
];

const ProfilePageGallery = () => {
    return (
        <section className="bg-gray-50 py-10 sm:py-16 lg:py-20 px-4 font-poppins">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8 sm:mb-10">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-red-700 mb-2">
                        GALERI
                    </h2>
                    <p className="text-base sm:text-lg text-gray-700">
                        Menampilkan foto-foto kegiatan dan lingkungan di sekitar Kelurahan Rijang Pittu
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                    {galleryItems.map((item, index) => (
                        <GalleryImage key={index} src={item.src} title={item.title} />
                    ))}
                </div>

                <div className="mt-8 sm:mt-12 text-center">
                    <Link
                        to="/galeri"
                        className="inline-block px-6 py-3 text-base font-medium bg-green-700 text-white rounded-lg hover:bg-green-800 transition transform hover:-translate-y-1 shadow-md"
                    >
                        Lihat Lebih Banyak &rarr;
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ProfilePageGallery;