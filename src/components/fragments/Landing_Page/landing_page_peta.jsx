const LandingPagePeta = () => {
    return (
        <section className="bg-gray-50 py-20 px-4 font-poppins">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-red-700 mb-2">Peta Lokasi Kelurahan</h2>
                <p className="text-gray-600 mb-8">Informasi batas wilayah dan letak geografis Kelurahan Rijang Pittu</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-gray-800 text-lg leading-relaxed space-y-4">
                        <div>
                            <strong>🧭 Batas Kelurahan:</strong>
                            <ul className="pl-8 text-md">
                                <li><strong>Utara:</strong> Kelurahan Pangkadjene</li>
                                <li><strong>Selatan:</strong> Desa Tanete</li>
                                <li><strong>Timur:</strong>  </li>
                                <li><strong>Barat:</strong>  </li>
                            </ul>
                        </div>
                        <div>
                            <p><span className="mr-1">📏</span><strong>Luas Kelurahan:</strong> 1.738.600 m²</p>
                        </div>
                        <div>
                            <p><span className="mr-1">👥</span><strong>Jumlah Penduduk:</strong> 7.292 Jiwa</p>
                        </div>
                    </div>

                    <div className="rounded-xl overflow-hidden shadow-sm border border-gray-200">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15921.652565831255!2d119.77873127781807!3d-3.9348660293448297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d95c827ff0bb979%3A0x2d9fc63eb085e16e!2sRijang%20Pitu%2C%20Maritengngae%2C%20Sidenreng%20Rappang%20Regency%2C%20South%20Sulawesi!5e0!3m2!1sen!2sid!4v1753248578021!5m2!1sen!2sid"
                            width="100%"
                            height="100%"
                            className="min-h-[300px] w-full"
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LandingPagePeta;