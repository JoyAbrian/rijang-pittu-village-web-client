import { Link } from "react-router-dom";
import SOTKCard from "../../elements/SOTKCard";

const pegawaiList = [
    {
        nama: "Hairuddin",
        jabatan: "Lurah",
        foto: "/images/pegawai1.jpg",
    },
    {
        nama: "Andi Sari",
        jabatan: "Sekretaris",
        foto: "/images/pegawai2.jpg",
    },
    {
        nama: "Sudirman",
        jabatan: "Bendahara",
        foto: "/images/pegawai3.jpg",
    },
    {
        nama: "Dewi Lestari",
        jabatan: "Kepala Seksi Pemerintahan",
        foto: "/images/pegawai4.jpg",
    },
    {
        nama: "Budi Santoso",
        jabatan: "Kepala Seksi Kesejahteraan Sosial",
        foto: "/images/pegawai5.jpg",
    },
    {
        nama: "Siti Aminah",
        jabatan: "Kepala Seksi Pemberdayaan Masyarakat",
        foto: "/images/pegawai6.jpg",
    },
];

const ProfilePageSOTK = () => {
    return (
        <section className="bg-gray-50 py-10 sm:py-16 lg:py-20 px-4 font-poppins">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8 sm:mb-10">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-red-700 mb-2">
                        SOTK
                    </h2>
                    <p className="text-base sm:text-lg text-gray-700">
                        Struktur Organisasi dan Tata Kerja Kelurahan Rijang Pittu
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                    {pegawaiList.slice(0, 4).map((pegawai, index) => (
                        <SOTKCard
                            key={index}
                            photo={pegawai.foto}
                            name={pegawai.nama}
                            position={pegawai.jabatan}
                        />
                    ))}
                </div>

                <div className="mt-8 sm:mt-12 text-center">
                    <Link
                        to="/profil/sotk"
                        className="inline-block px-6 py-3 text-base font-medium bg-green-700 text-white rounded-lg hover:bg-green-800 transition transform hover:-translate-y-1 shadow-md"
                    >
                        Lihat Selengkapnya &rarr;
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ProfilePageSOTK;