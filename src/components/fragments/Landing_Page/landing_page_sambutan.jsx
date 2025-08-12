const LandingPageSambutan = () => {
    return (
        <section className="bg-gray-50 py-10 px-4 font-poppins">
            <div className="flex justify-center">
                <div className="flex flex-col md:flex-row items-center gap-10 w-full max-w-5xl text-center md:text-left">
                    <div className="flex-shrink-0 mb-8 md:mb-0">
                        <img
                            src="/images/kepala-kelurahan.png"
                            alt="Logo Kelurahan"
                            className="bg-white w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-md rounded-full mx-auto" // Center image on mobile
                        />
                    </div>

                    <div className="flex-1">
                        <h2 className="text-3xl sm:text-4xl font-bold text-red-700 mb-2">Sambutan Kepala Kelurahan</h2>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 tracking-wider">Hairuddin, S.A.B</h3>
                        <p className="text-sm sm:text-base font-medium text-gray-600 mb-4">Kepala Kelurahan Rijang Pittu</p>
                        <p className="font-semibold mb-2 text-base sm:text-lg">Assalamu’alaikum Warahmatullahi Wabarakatuh,</p>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                            Selamat datang di Website Resmi Kelurahan Rijang Pittu.
                            Website ini hadir sebagai sarana informasi dan layanan bagi seluruh warga, sekaligus media transparansi kegiatan pemerintahan di tingkat kelurahan.
                            Kami berharap website ini dapat bermanfaat dan menjadi jembatan komunikasi antara pemerintah dan masyarakat.
                            Terima kasih atas dukungan semua pihak. Mari bersama membangun kelurahan yang lebih baik.                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LandingPageSambutan;