import { Link } from 'react-router-dom';

const exploreItems = [
    {
        title: "PROFIL KELURAHAN",
        icon: "/images/icons/icon-profil.png",
        route: "/profil"
    },
    {
        title: "GALERI",
        icon: "/images/icons/icon-galeri.png",
        route: "/galeri"
    },
    {
        title: "UMKM",
        icon: "/images/icons/icon-umkm.png",
        route: "/umkm"
    },
    {
        title: "BERITA",
        icon: "/images/icons/icon-berita.png",
        route: "/berita"
    }
];

const LandingPageJelajahi = () => {
    return (
        <section className="bg-gray-50 py-16 font-poppins">
            <div className="max-w-7xl mx-auto px-4 flex items-center min-h-[80vh]">
                <div className="w-1/2 pr-8">
                    <h1 className="text-4xl font-bold text-red-700 mb-4">JELAJAHI KELURAHAN</h1>
                    <p className="text-lg text-neutral-600">
                        Melalui website ini Anda dapat menjelajahi segala hal yang terkait dengan kelurahan.
                        Profil, infografis, UMKM, berita, dan acara terkait dengan kelurahan.
                    </p>
                </div>

                <div className="w-1/2 grid grid-cols-2 gap-x-6 gap-y-8">
                    {exploreItems.map((item, index) => (
                        <Link
                            to={item.route}
                            key={index}
                            className={`bg-white rounded-xl shadow p-6 flex flex-col items-center text-center hover:shadow-lg hover:translate-y-1 transition ${index >= 2 ? 'mt-4 ml-6' : ''
                                }`}
                        >
                            <img src={item.icon} alt={item.title} className="w-14 h-14 mb-4" />
                            <span className="text-green-800 tracking-wide font-semibold">{item.title}</span>
                        </Link>
                    ))}

                </div>
            </div>
        </section>
    );
}

export default LandingPageJelajahi;