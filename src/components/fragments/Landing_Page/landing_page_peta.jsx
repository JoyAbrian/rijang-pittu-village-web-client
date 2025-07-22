const LandingPagePeta = () => {
    return (
        <section className="bg-gray-50 py-16 px-4 font-poppins">
            <div className="container mx-auto">
                <h1 className="text-4xl font-bold text-red-700 mb-6 text-start">Peta Lokasi Desa</h1>
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-1/2">
                        <div className="bg-white shadow-lg rounded-lg p-6">
                            <h3 className="text-xl font-semibold mb-4">Batas Desa:</h3>
                            <div className="grid grid-cols-2 gap-y-2 mb-6">
                                <div><p className="font-medium">Utara:</p><p>Kelurahan Kadidi</p></div>
                                <div><p className="font-medium">Timur:</p><p>Kelurahan Macorawalie</p></div>
                                <div><p className="font-medium">Selatan:</p><p>Kelurahan Timoreng Panua</p></div>
                                <div><p className="font-medium">Barat:</p><p>Kelurahan Bulo</p></div>
                            </div>
                            <h3 className="text-xl font-semibold mb-4">Luas Desa:</h3>
                            <p className="mb-6">1.738.600 m²</p>
                            <h3 className="text-xl font-semibold mb-4">Jumlah Penduduk:</h3>
                            <p>7.292 Jiwa</p>
                        </div>
                    </div>
                    <div className="lg:w-1/2">
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15921.652155435524!2d119.78903104999999!3d-3.9348875000000008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d95c827ff0bb979%3A0x2d9fc63eb085e16e!2sRijang%20Pitu%2C%20Maritengngae%2C%20Sidenreng%20Rappang%20Regency%2C%20South%20Sulawesi!5e0!3m2!1sen!2sid!4v1753165266396!5m2!1sen!2sid"
                                width="100%"
                                height="380"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Rijang Pittu Map"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LandingPagePeta;