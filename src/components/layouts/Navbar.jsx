import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    const getTextColor = (scrolled, home) => {
        if (home) {
            return scrolled ? 'text-green-700' : 'text-white';
        }
        return 'text-green-700';
    };

    const getActiveLinkColor = (scrolled, home) => {
        if (home) {
            return scrolled
                ? 'text-green-900 border-b-2 border-green-700 font-semibold'
                : 'text-white border-b-2 border-white font-semibold';
        }
        return 'text-green-900 border-b-2 border-green-700 font-semibold';
    };

    const getHoverLinkColor = (scrolled, home) => {
        if (home) {
            return scrolled ? 'hover:text-green-900' : 'hover:text-white';
        }
        return 'hover:text-green-900';
    };


    return (
        <header
            className={`fixed font-poppins select-none top-0 left-0 w-full z-50 transition-all duration-300 ${
                isHome
                    ? isScrolled
                        ? 'bg-white shadow'
                        : 'bg-transparent'
                    : 'bg-white shadow'
            } ${getTextColor(isScrolled, isHome)}`}
        >
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center">
                    <img src="/images/logo-sidenreng-rappang.png" className="w-14 h-14" alt="Logo Sidenreng Rappang" />
                    <div className="flex flex-col ml-3">
                        <h1 className="text-xl font-bold">Rijang Pittu</h1>
                        <span className="text-sm">Kabupaten Sidenreng Rappang</span>
                    </div>
                </div>

                <nav className="hidden md:flex space-x-6 text-md font-medium">
                    {[
                        { to: '/', label: 'Home' },
                        { to: '/profil', label: 'Profil Kelurahan' },
                        { to: '/infografis', label: 'Infografis' },
                        { to: '/galeri', label: 'Galeri' },
                        { to: '/berita', label: 'Berita' },
                        { to: '/acara', label: 'Acara' },
                        { to: '/umkm', label: 'UMKM' },
                    ].map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `${isActive
                                    ? getActiveLinkColor(isScrolled, isHome)
                                    : getHoverLinkColor(isScrolled, isHome)
                                } transition`
                            }
                        >
                            {label}
                        </NavLink>
                    ))}
                </nav>

                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-current focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        ) : (
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            <div
                className={`md:hidden ${
                    isMenuOpen ? 'block' : 'hidden'
                } ${getTextColor(true, false)} bg-white shadow py-4 transition-all duration-300 ease-in-out`} // Always use white background and green text for mobile menu
            >
                <nav className="flex flex-col items-center space-y-4 text-lg">
                    {[
                        { to: '/', label: 'Home' },
                        { to: '/profil', label: 'Profil Kelurahan' },
                        { to: '/infografis', label: 'Infografis' },
                        { to: '/galeri', label: 'Galeri' },
                        { to: '/berita', label: 'Berita' },
                        { to: '/acara', label: 'Acara' },
                        { to: '/umkm', label: 'UMKM' },
                    ].map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `block w-full text-center py-2 ${
                                    isActive
                                        ? 'text-green-900 border-b-2 border-green-700 font-semibold'
                                        : 'text-green-700 hover:text-green-900'
                                } transition`
                            }
                            onClick={() => setIsMenuOpen(false)}
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