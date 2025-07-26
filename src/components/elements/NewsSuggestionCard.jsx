import { Link } from "react-router-dom";

const NewsSuggestionCard = ({ slug, image, title, date }) => {
    return (
        <Link to={`/berita/${slug}`} className="block">
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out cursor-pointer shadow-sm">
                <img
                    src={image}
                    alt={title}
                    className="w-24 h-16 object-cover rounded-md flex-shrink-0 shadow-sm"
                />
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition duration-300">
                        <span className="line-clamp-2">{title}</span>
                    </h4>
                    <p className="text-gray-500 text-xs mt-1 flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 mr-1 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        {date}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default NewsSuggestionCard