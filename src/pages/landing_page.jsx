import { NavLink } from 'react-router-dom';

const LandingPage = () => {
    return (
        <>
            <header class="bg-gray-50 shadow font-poppins">
                <div class="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div class="flex">
                        <img src="images/logo-sidenreng-rappang.png" className="w-14 h-14" />
                        <div className="flex flex-col ml-3">
                            <h1 class="text-xl font-bold text-green-700">Rijang Pittu</h1>
                            <span class="text-sm text-green-700">Kabupaten Sidenreng Rappang</span>
                        </div>
                    </div>
                    <nav className="flex space-x-6 text-md font-medium text-green-700">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? "text-green-900 border-green-700 font-semibold border-b-2" : "hover:text-green-900 transition"
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/profil"
                            className={({ isActive }) =>
                                isActive ? "text-green-900 border-green-700 font-semibold border-b-2" : "hover:text-green-900 transition"
                            }
                        >
                            Profil Kelurahan
                        </NavLink>
                        <NavLink
                            to="/berita"
                            className={({ isActive }) =>
                                isActive ? "text-green-900 border-green-700 font-semibold border-b-2" : "hover:text-green-900 transition"
                            }
                        >
                            Berita
                        </NavLink>
                        <NavLink
                            to="/acara"
                            className={({ isActive }) =>
                                isActive ? "text-green-900 border-green-700 font-semibold border-b-2" : "hover:text-green-900 transition"
                            }
                        >
                            Acara
                        </NavLink>
                        <NavLink
                            to="/umkm"
                            className={({ isActive }) =>
                                isActive ? "text-green-900 border-green-700 font-semibold border-b-2" : "hover:text-green-900 transition"
                            }
                        >
                            UMKM
                        </NavLink>
                    </nav>
                </div>
            </header>
            <section class="bg-blue-50 py-20">
                <div class="container mx-auto px-4 text-center">
                    <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                        Welcome to <span class="text-blue-600">MyBrand</span>
                    </h1>
                    <p class="text-lg text-gray-600 mb-8">
                        We provide the best solutions to help you grow your business.
                    </p>
                    <a href="#" class="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
                        Get Started
                    </a>
                </div>
            </section>
        </>
    );
}

export default LandingPage