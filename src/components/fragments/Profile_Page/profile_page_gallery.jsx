import { Link } from "react-router-dom";
import GalleryImage from "../../elements/GalleryImage";
import useGallery from "../../../hooks/useGallery";

const ProfilePageGallery = () => {
    const { gallery, loading, error } = useGallery();
    const limitedItems = [...gallery]
                            .sort((a, b) => b.id - a.id)
                            .slice(0, 6);

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

                {loading ? (
                    <p className="text-center text-gray-500">Memuat galeri...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                        {limitedItems.map((item, index) => (
                            <GalleryImage key={item.id || index} src={item.image_url} title={item.title} />
                        ))}
                    </div>
                )}

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