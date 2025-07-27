import { Link } from "react-router-dom"; // Link might not be needed if this is a full page
import SOTKCard from "../../elements/SOTKCard"; // Assuming SOTKCard is already responsive

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
        nama: "Dewi Lestari", // Changed for uniqueness
        jabatan: "Kepala Seksi Pemerintahan",
        foto: "/images/pegawai4.jpg", // Assuming unique image
    },
    {
        nama: "Budi Santoso",
        jabatan: "Kepala Seksi Kesejahteraan Sosial",
        foto: "/images/pegawai5.jpg", // Assuming unique image
    },
    {
        nama: "Siti Aminah",
        jabatan: "Kepala Seksi Pemberdayaan Masyarakat",
        foto: "/images/pegawai6.jpg", // Assuming unique image
    },
    {
        nama: "Rian Hidayat",
        jabatan: "Staf Umum dan Kepegawaian",
        foto: "/images/pegawai7.jpg", // Assuming unique image
    },
    {
        nama: "Fitriani",
        jabatan: "Staf Perencanaan dan Keuangan",
        foto: "/images/pegawai8.jpg", // Assuming unique image
    },
    {
        nama: "Agus Salim",
        jabatan: "Staf Pelayanan Publik",
        foto: "/images/pegawai9.jpg", // Assuming unique image
    },
];

const SOTKPageFragment = () => {
    return (
        <section className="bg-gray-50 pt-24 pb-16 px-4 font-poppins sm:pt-32 lg:pt-40"> {/* Adjusted top padding */}
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8 sm:mb-10">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-red-700 mb-2">
                        SOTK
                    </h2>
                    <p className="text-base sm:text-lg text-gray-700">
                        Struktur Organisasi dan Tata Kerja Kelurahan Rijang Pittu
                    </p>
                </div>

                <img
                    src="/images/sotk.jpg"
                    alt="Struktur Organisasi Kelurahan Rijang Pittu"
                    className="mx-auto mb-10 w-full max-w-4xl rounded-xl shadow-md"
                />

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8">
                    {pegawaiList.map((pegawai, index) => (
                        <SOTKCard
                            key={index}
                            photo={pegawai.foto}
                            name={pegawai.nama}
                            position={pegawai.jabatan}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SOTKPageFragment;