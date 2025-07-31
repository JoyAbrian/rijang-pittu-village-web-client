import { useState } from "react";

const ProfilePageVisiMisi = () => {
    const [activeSection, setActiveSection] = useState(null);

    const toggleSection = (section) => {
        setActiveSection((prev) => (prev === section ? null : section));
    };

    return (
        <section className="bg-gray-50 pt-32 pb-16 px-4 font-poppins">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-center text-red-700 mb-8">
                    VISI DAN MISI KELURAHAN
                </h2>

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1">
                        <img
                            src="/images/kantor-kelurahan.jpg"
                            alt="Visi Misi"
                            className="w-full h-80 object-cover rounded-xl shadow"
                        />
                    </div>

                    <div className="flex-1 space-y-6">
                        {/* VISI */}
                        <div className="bg-white rounded-xl shadow p-6">
                            <button
                                className="w-full text-left text-lg font-semibold text-green-800 flex justify-between items-center"
                                onClick={() => toggleSection("visi")}
                            >
                                Visi Kelurahan Rijang Pittu
                                <span>{activeSection === "visi" ? "▾" : "▸"}</span>
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-500 ${
                                    activeSection === "visi" ? "max-h-40 mt-4" : "max-h-0"
                                }`}
                            >
                                <p className="text-gray-700 leading-relaxed">
                                    Menjadikan Kelurahan Rijang Pittu sebagai kelurahan
                                    yang maju, mandiri, dan berdaya saing berbasis pelayanan publik
                                    dan partisipasi masyarakat.
                                </p>
                            </div>
                        </div>

                        {/* MISI */}
                        <div className="bg-white rounded-xl shadow p-6">
                            <button
                                className="w-full text-left text-lg font-semibold text-green-800 flex justify-between items-center"
                                onClick={() => toggleSection("misi")}
                            >
                                Misi Kelurahan Rijang Pittu
                                <span>{activeSection === "misi" ? "▾" : "▸"}</span>
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-500 ${
                                    activeSection === "misi" ? "max-h-64 mt-4" : "max-h-0"
                                }`}
                            >
                                <div className="text-gray-700 leading-relaxed space-y-2">
                                    <p>1. Meningkatkan pelayanan publik yang transparan dan akuntabel.</p>
                                    <p>2. Mengembangkan potensi ekonomi lokal melalui UMKM.</p>
                                    <p>3. Mendorong partisipasi aktif masyarakat dalam pembangunan.</p>
                                    <p>4. Memanfaatkan teknologi digital untuk tata kelola kelurahan.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProfilePageVisiMisi;