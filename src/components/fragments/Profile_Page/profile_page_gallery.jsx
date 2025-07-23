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
        <section className="bg-gray-50 py-24 px-4 font-poppins">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-red-700 mb-2">
                    GALERI
                </h2>
                <p className="text-gray-700 mb-10">
                    Menampilkan foto-foto kegiatan dan lingkungan di sekitar Kelurahan Rijang Pittu
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {galleryItems.map((item, index) => (
                        <GalleryImage key={index} src={item.src} title={item.title} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProfilePageGallery;