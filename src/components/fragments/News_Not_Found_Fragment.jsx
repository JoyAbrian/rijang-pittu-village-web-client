import { Link } from "react-router-dom";

const NewsNotFoundFragment = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-lg w-full bg-white rounded-2xl mt-16 shadow-xl p-8 sm:p-12 text-center">
                <div className="flex flex-col items-center justify-center mb-6">
                    <svg className="h-24 w-24 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0a2 2 0 012-2h6a2 2 0 012 2m-6 0v2" />
                    </svg>
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">Berita Tidak Ditemukan</h1>
                </div>

                <p className="text-gray-600 mb-8 leading-relaxed">
                    Maaf, artikel berita yang Anda cari tidak ada.
                </p>

                <Link
                    to='/berita'
                    className="inline-block bg-[#0B9553] text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-[#087a42] focus:outline-none focus:ring-2 focus:ring-[#0B9553] focus:ring-opacity-50"
                >
                    Kembali ke Daftar Berita
                </Link>
            </div>
        </div>
    );
};

export default NewsNotFoundFragment;