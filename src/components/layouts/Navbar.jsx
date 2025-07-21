import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    const isHome = location.pathname === '/';
    useEffect(() => {
        if (!isHome) return;

        const onScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [isHome]);

    return (
        <header
            className={`fixed select-none top-0 left-0 w-full z-50 transition-all duration-300 ${isHome
                    ? isScrolled
                        ? 'bg-white shadow text-green-700'
                        : 'bg-transparent text-white'
                    : 'bg-white shadow text-green-700'
                }`}
        >
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center">
                    <img src="/images/logo-sidenreng-rappang.png" className="w-14 h-14" />
                    <div className="flex flex-col ml-3">
                        <h1 className="text-xl font-bold">Rijang Pittu</h1>
                        <span className="text-sm">Kabupaten Sidenreng Rappang</span>
                    </div>
                </div>

                <nav className="flex space-x-6 text-md font-medium">
                    {[
                        { to: '/', label: 'Home' },
                        { to: '/profil', label: 'Profil Kelurahan' },
                        { to: '/infografis', label: 'Infografis' },
                        { to: '/berita', label: 'Berita' },
                        { to: '/acara', label: 'Acara' },
                        { to: '/umkm', label: 'UMKM' },
                    ].map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `${isActive
                                    ? isHome && !isScrolled
                                        ? 'text-white border-b-2 border-white font-semibold'
                                        : 'text-green-900 border-b-2 border-green-700 font-semibold'
                                    : isHome && !isScrolled
                                        ? 'hover:text-white transition'
                                        : 'hover:text-green-900 transition'
                                }`
                            }
                        >
                            {label}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;