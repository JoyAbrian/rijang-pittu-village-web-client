import { Link } from "react-router-dom";
import { useLoading } from "../../../contexts/LoadingContext";
import useSOTK from "../../../hooks/useSOTK";
import SOTKCard from "../../elements/SOTKCard";

const ProfilePageSOTK = () => {
    const { sotkList, error } = useSOTK();
    const { isLoading } = useLoading();
    const limitedList = sotkList.slice(0, 5);

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

                {isLoading ? (
                    <p className="text-center text-gray-500 text-lg">Memuat data pegawai...</p>
                ) : error ? (
                    <p className="text-center text-red-500 text-lg">{error}</p>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8">
                        {limitedList.map((pegawai) => (
                            <SOTKCard
                                key={pegawai.id}
                                photo={pegawai.photo_url}
                                name={pegawai.name}
                                position={pegawai.role}
                            />
                        ))}
                    </div>
                )}

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