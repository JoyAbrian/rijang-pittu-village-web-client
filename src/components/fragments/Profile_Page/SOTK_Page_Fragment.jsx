import { useLoading } from "../../../contexts/LoadingContext";
import useSOTK from "../../../hooks/useSOTK";
import LoadingScreen from "../../elements/Global/LoadingScreen";
import SOTKCard from "../../elements/SOTKCard";

const SOTKPageFragment = () => {
    const { sotkList, error } = useSOTK();
    const { isLoading } = useLoading();

    return (
        <section className="bg-gray-50 pt-24 pb-16 px-4 font-poppins sm:pt-32 lg:pt-40">
            <LoadingScreen/>
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

                {isLoading ? (
                    <p className="text-center text-gray-500 text-lg">Memuat data pegawai...</p>
                ) : error ? (
                    <p className="text-center text-red-500 text-lg">{error}</p>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8">
                        {sotkList.map((pegawai) => (
                            <SOTKCard
                                key={pegawai.id}
                                photo={pegawai.photo_url}
                                name={pegawai.name}
                                position={pegawai.role}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default SOTKPageFragment;