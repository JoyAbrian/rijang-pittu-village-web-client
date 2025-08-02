import { Link } from "react-router-dom";

const NotFoundFragment = () => {
    return (
        <section className="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8 mt-16 sm:p-12 text-center">
                <div className="flex flex-col items-center justify-center mb-6">
                    <svg className="h-24 w-24 text-red-500 mb-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.398 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <h1 className="text-6xl sm:text-8xl font-extrabold text-gray-800">404</h1>
                </div>

                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">Halaman Tidak Ditemukan</h2>

                <p className="text-gray-600 mb-8 leading-relaxed">
                    Maaf, halaman yang Anda cari tidak ada.
                </p>

                <Link
                    to="/"
                    className="inline-block bg-[#0B9553] text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-[#087a42] focus:outline-none focus:ring-2 focus:ring-[#0B9553] focus:ring-opacity-50"
                >
                    Kembali ke Halaman Utama
                </Link>
            </div>
        </section>
    );
}

export default NotFoundFragment