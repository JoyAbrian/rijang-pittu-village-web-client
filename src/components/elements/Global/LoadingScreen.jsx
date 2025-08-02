import { useLoading } from "../../../contexts/LoadingContext";

const LoadingScreen = () => {
    const { isLoading } = useLoading();

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-600 mb-4"></div>
                <p className="text-gray-700 font-semibold">Memuat data...</p>
            </div>
        </div>
    );
};

export default LoadingScreen;