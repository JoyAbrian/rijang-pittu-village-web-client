const LandingPageHero = () => {
    return (
        <section
            className="relative select-none h-screen bg-cover bg-center bg-no-repeat text-white font-inter"
            style={{
                backgroundImage: 'url(/images/bg-hero-sidenreng-rappang.webp)'
            }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg">
                    Selamat Datang <br />
                    di Website Resmi Rijang Pittu
                </h1>
                <p className="mt-4 text-md sm:text-lg md:text-xl lg:text-2xl font-light drop-shadow-md max-w-3xl">
                    Kelurahan Rijang Pittu, Kecamatan Maritengngae, Kabupaten Sidenreng Rappang
                </p>
            </div>
        </section>
    );
}

export default LandingPageHero;