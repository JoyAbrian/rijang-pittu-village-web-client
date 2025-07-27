const LandingPageSambutan = () => {
    return (
        <section className="bg-gray-50 py-10 px-4 font-poppins">
            <div className="flex justify-center">
                <div className="flex flex-col md:flex-row items-center gap-10 w-full max-w-5xl text-center md:text-left">
                    <div className="flex-shrink-0 mb-8 md:mb-0">
                        <img
                            src="/images/logo-sidenreng-rappang.png"
                            alt="Logo Kelurahan"
                            className="bg-white w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-md rounded-full mx-auto" // Center image on mobile
                        />
                    </div>

                    <div className="flex-1">
                        <h2 className="text-3xl sm:text-4xl font-bold text-red-700 mb-2">Sambutan Kepala Kelurahan</h2>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 tracking-wider">HAIRUDDIN</h3>
                        <p className="text-sm sm:text-base font-medium text-gray-600 mb-4">Kepala Kelurahan Rijang Pittu</p>
                        <p className="font-semibold mb-2 text-base sm:text-lg">Assalamu Alaikum Warohmatullahi Wabarakatuh.</p>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione dolor vitae autem animi,
                            praesentium reprehenderit obcaecati quae laboriosam ducimus provident, magnam repellat,
                            sunt voluptatibus explicabo adipisci voluptas amet laborum sit mollitia culpa at.
                            Molestias, doloribus suscipit labore, soluta repudiandae tenetur eaque cupiditate magnam
                            vero laborum debitis, voluptatibus aliquam? Esse, sed!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LandingPageSambutan;