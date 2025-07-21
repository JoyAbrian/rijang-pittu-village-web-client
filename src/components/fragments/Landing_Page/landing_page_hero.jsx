const LandingPageHero = () => {
    return (
        <section className="relative h-screen bg-cover bg-center bg-no-repeat text-white font-poppins">
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-lg">
                    Selamat Datang <br />
                    di Website Resmi Rijang Pittu
                </h1>
                <p className="mt-4 text-lg md:text-xl font-light drop-shadow-md">
                    Kelurahan Rijang Pittu, Kecamatan Maritengngae, Kabupaten Sidenreng Rappang
                </p>
            </div>
        </section>
    );
}

export default LandingPageHero;