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
];

const ProfilePageSOTK = () => {
    return (
        <section className="bg-gray-50 py-16 px-4 font-poppins">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-red-700 mb-4 text-center">SOTK</h2>
                <p className="text-center text-gray-700 mb-10">Struktur Organisasi dan Tata Kerja Kelurahan Rijang Pittu</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
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

export default ProfilePageSOTK;