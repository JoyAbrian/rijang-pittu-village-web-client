const mainUmkm = {
    name: "Warung Makan Sederhana",
    category: "Kuliner",
    image: "https://placehold.co/800x400/FF5722/FFFFFF?text=Warung+Makan+Sederhana", // Placeholder image
    description: `
      <p class="mb-4">
        Warung Makan Sederhana adalah destinasi kuliner yang menyajikan berbagai hidangan khas Bugis dengan cita rasa otentik. Berlokasi strategis di pusat Kelurahan Rijang Pittu, warung ini menjadi favorit warga lokal maupun pengunjung yang mencari pengalaman makan yang hangat dan ramah di kantong.
      </p>
      <p class="mb-4">
        Menu andalan kami meliputi Coto Makassar, Konro Bakar, Pallubasa, dan aneka kue tradisional yang dibuat segar setiap hari. Kami berkomitmen menggunakan bahan-bahan berkualitas tinggi dari petani lokal untuk memastikan setiap hidangan tidak hanya lezat tetapi juga mendukung ekonomi komunitas.
      </p>
      <p class="mb-4">
        Suasana warung yang nyaman dan pelayanan yang cepat menjadikan Warung Makan Sederhana tempat yang ideal untuk makan siang bersama keluarga, makan malam santai, atau sekadar menikmati kopi dan kue di sore hari. Kami juga menerima pesanan katering untuk berbagai acara.
      </p>
      <p class="mb-4">
        Datang dan rasakan sendiri kelezatan masakan rumahan di Warung Makan Sederhana!
      </p>
    `,
    priceRange: "Rp10.000 - Rp25.000",
    openingHours: "07:00 - 20:00",
    address: "Jl. Raya Rijang Pittu No. 123, Sidenreng Rappang",
    contact: "0812-3456-7890",
    instagram: "https://instagram.com/warungmakansederhana",
    googleMaps: "https://maps.google.com/?q=Warung+Makan+Sederhana+Rijang+Pittu",
};

// Dummy data for suggested UMKM
const suggestedUmkm = [
    {
        id: 1,
        name: "Kedai Kopi Hijau",
        category: "Kafe",
        image: "https://placehold.co/150x100/4CAF50/FFFFFF?text=Kedai+Kopi+Hijau", // Placeholder image
        description: "Tempat nongkrong santai dengan berbagai varian kopi lokal.",
        priceRange: "Rp8.000 - Rp30.000",
        openingHours: "09:00 - 23:00",
    },
    {
        id: 2,
        name: "Toko Oleh-oleh Makassar",
        category: "Oleh-oleh",
        image: "https://placehold.co/150x100/2196F3/FFFFFF?text=Toko+Oleh-oleh", // Placeholder image
        description: "Menjual produk khas Makassar seperti kacang disco dan kue tradisional.",
        priceRange: "Rp15.000 - Rp75.000",
        openingHours: "08:00 - 17:00",
    },
    {
        id: 3,
        name: "Kerajinan Tangan Unik",
        category: "Kerajinan",
        image: "https://placehold.co/150x100/9C27B0/FFFFFF?text=Kerajinan", // Placeholder image
        description: "Berbagai kerajinan tangan lokal yang unik dan menarik.",
        priceRange: "Rp20.000 - Rp150.000",
        openingHours: "10:00 - 18:00",
    },
    {
        id: 4,
        name: "Toko Baju Adat",
        category: "Fashion",
        image: "https://placehold.co/150x100/FFC107/FFFFFF?text=Baju+Adat", // Placeholder image
        description: "Menyediakan pakaian adat Bugis dan Makassar untuk berbagai acara.",
        priceRange: "Rp100.000 - Rp500.000",
        openingHours: "09:00 - 20:00",
    },
];

const UMKMDetailPageFragment = () => {
    return (
        <section className="container mx-auto p-6 mt-20">
            <div className="flex flex-col lg:flex-row gap-10">
                <div className="lg:w-2/3 bg-white p-10 rounded-xl shadow-2xl transform hover:scale-[1.005] transition-transform duration-300 ease-in-out">
                    <div className="flex flex-col md:flex-row items-start md:items-center mb-8">
                        <img
                            src={mainUmkm.image}
                            alt={mainUmkm.name}
                            className="w-full md:w-1/2 h-64 object-cover rounded-lg shadow-lg mb-6 md:mb-0 md:mr-8"
                        />
                        <div className="flex-1">
                            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                                {mainUmkm.category}
                            </span>
                            <h2 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                                {mainUmkm.name}
                            </h2>
                            <div className="text-lg text-gray-700 mb-4 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="font-semibold text-green-700">{mainUmkm.priceRange}</span>
                            </div>
                            <div className="text-lg text-gray-700 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="font-semibold text-purple-700">{mainUmkm.openingHours}</span>
                            </div>
                        </div>
                    </div>

                    <div
                        className="prose prose-lg max-w-none text-gray-800 leading-relaxed border-t pt-8 mt-8 border-gray-200"
                        dangerouslySetInnerHTML={{ __html: mainUmkm.description }}
                    ></div>

                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Informasi Kontak</h3>
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {mainUmkm.address}
                            </li>
                            <li className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                {mainUmkm.contact}
                            </li>
                            <li className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <a href={mainUmkm.instagram} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Instagram</a>
                            </li>
                            <li className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.553-.894L9 7m0 13l6-3m-6 3V7m6 10l4.447 2.223A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4" />
                                </svg>
                                <a href={mainUmkm.googleMaps} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Lihat di Google Maps</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="lg:w-1/3 bg-white p-8 rounded-xl shadow-2xl">
                    <h3 className="text-3xl font-bold text-gray-800 mb-8 border-b-4 pb-4 border-blue-500">
                        UMKM Lainnya
                    </h3>
                    <div className="space-y-8">
                        {suggestedUmkm.map((umkm) => (
                            <div
                                key={umkm.id}
                                className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 p-5 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out cursor-pointer"
                            >
                                <img
                                    src={umkm.image}
                                    alt={umkm.name}
                                    className="w-32 h-24 object-cover rounded-md flex-shrink-0 shadow-sm"
                                />
                                <div className="text-center sm:text-left">
                                    <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-0.5 rounded-full mb-2">
                                        {umkm.category}
                                    </span>
                                    <h4 className="text-xl font-bold text-gray-800 hover:text-blue-600 transition duration-300 mb-1">
                                        <a href="#" className="line-clamp-2">{umkm.name}</a>
                                    </h4>
                                    <p className="text-gray-600 text-sm line-clamp-2 mb-2">{umkm.description}</p>
                                    <div className="flex items-center justify-center sm:justify-start text-gray-500 text-xs space-x-3">
                                        <span className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {umkm.priceRange}
                                        </span>
                                        <span className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {umkm.openingHours}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default UMKMDetailPageFragment;