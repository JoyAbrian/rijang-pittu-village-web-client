import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import {
    HouseDoorFill,
    Diagram3Fill,
    ImageFill,
    Newspaper,
    CalendarEventFill,
    Shop
} from 'react-bootstrap-icons';

const DashboardSidebar = () => {
    const location = useLocation();

    const menuItems = [
        { path: '/dashboard/', name: 'Dashboard', icon: HouseDoorFill },
        { path: '/dashboard/sotk', name: 'SOTK', icon: Diagram3Fill },
        { path: '/dashboard/galeri', name: 'Galeri', icon: ImageFill },
        { path: '/dashboard/berita', name: 'Berita', icon: Newspaper },
        { path: '/dashboard/acara', name: 'Acara', icon: CalendarEventFill },
        { path: '/dashboard/umkm', name: 'UMKM', icon: Shop },
    ];

    const isActive = (path) => location.pathname === path || (path === '/dashboard/' && location.pathname === '/dashboard');

    return (
        <aside className="w-64 bg-gray-800 text-white flex flex-col rounded-r-lg shadow-lg overflow-hidden">
            <div className="p-6 text-2xl font-bold text-center border-b border-gray-700">
                Admin Panel
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
                {menuItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center w-full px-4 py-2 rounded-lg transition-colors duration-200 ${isActive(item.path)
                                    ? 'bg-indigo-600 text-white shadow-md'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}
                        >
                            <IconComponent className="w-5 h-5 mr-3" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
            <div className="p-6 border-t border-gray-700 text-sm text-gray-400">
                © 2025 Rijang Pittu. All rights reserved.
            </div>
        </aside>
    );
};

export default DashboardSidebar;