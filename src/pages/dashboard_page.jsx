import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import DashboardSidebar from "../components/layouts/DashboardSidebar";
import DashboardHeader from "../components/layouts/DashboardHeader";

const DashboardPage = () => {
    const location = useLocation();
    const [activeMenuItem, setActiveMenuItem] = useState('');

    useEffect(() => {
        switch (location.pathname) {
            case '/dashboard':
            case '/dashboard/':
                setActiveMenuItem('Home');
                break;
            case '/dashboard/sotk':
                setActiveMenuItem('SOTK');
                break;
            case '/dashboard/galeri':
                setActiveMenuItem('Galeri');
                break;
            case '/dashboard/berita':
                setActiveMenuItem('Berita');
                break;
            case '/dashboard/acara':
                setActiveMenuItem('Acara');
                break;
            case '/dashboard/umkm':
                setActiveMenuItem('UMKM');
                break;
            default:
                setActiveMenuItem('Not Found');
        }
    }, [location.pathname]);

    return (
        <div className="flex h-screen bg-gray-100 font-poppins">
            <DashboardSidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardHeader activeMenuItem={activeMenuItem} />

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6 rounded-br-lg">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default DashboardPage;