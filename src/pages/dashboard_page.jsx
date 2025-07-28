import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import DashboardSidebar from "../components/layouts/DashboardSidebar";
import DashboardHeader from "../components/layouts/DashboardHeader";

const DashboardPage = () => {
    const location = useLocation();
    const [activeMenuItem, setActiveMenuItem] = useState('');

    useEffect(() => {
        switch (location.pathname) {
            case '/':
                setActiveMenuItem('Dashboard');
                break;
            case '/analytics':
                setActiveMenuItem('Analytics');
                break;
            case '/reports':
                setActiveMenuItem('Reports');
                break;
            case '/settings':
                setActiveMenuItem('Settings');
                break;
            default:
                setActiveMenuItem('Not Found'); 
        }
    }, [location.pathname]);

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
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