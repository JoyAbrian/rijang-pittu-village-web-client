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
];

const SOTKPageFragment = () => {
    return (
        <section className="bg-gray-50 pt-32 pb-16 px-4 font-poppins">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-red-700 mb-4 text-center">SOTK</h2>
                <p className="text-center text-gray-700 mb-10">Struktur Organisasi dan Tata Kerja Kelurahan Rijang Pittu</p>
                <img
  src="/images/sotk.jpg"
  alt="Struktur Organisasi Kelurahan Rijang Pittu"
  className="mx-auto mb-10 w-full max-w-4xl rounded-xl shadow"
/>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
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