import { useNavigate } from "react-router-dom";

const DashboardHeader = ({ activeMenuItem }) => {
    const navigate = useNavigate();

    const onLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm rounded-bl-lg">
            <h1 className="text-3xl font-bold text-gray-900">
                {activeMenuItem}
            </h1>
            <div className="flex items-center space-x-4">
                <span className="text-gray-700">Selamat datang, Admin!</span>
                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition-colors duration-200" onClick={onLogout}>
                    Logout
                </button>
            </div>
        </header>
    );
}

export default DashboardHeader;