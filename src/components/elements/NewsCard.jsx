const NewsCard = ({ imageSrc, title, date, link }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300">
            <img src={imageSrc} alt={title} className="w-full h-48 object-cover"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/600x400/E0E0E0/333333?text=Image+Not+Found";
                }}
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 leading-tight">
                    {title}
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 inline-block mr-1 -mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                    {date}
                </p>
                <a
                    href={link}
                    className="inline-flex items-center px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                > Baca Selengkapnya
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </a>
            </div>
        </div>
    );
}

export default NewsCard;