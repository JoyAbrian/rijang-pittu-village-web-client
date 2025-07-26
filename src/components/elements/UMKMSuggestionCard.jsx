import { Link } from "react-router-dom";

const UMKMSuggestionCard = ({ id, image, name, category, description, priceRange, openingHours }) => {
    return (
        <Link to={`/umkm/${id}`} className="block">
            <div
                className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 p-5 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out cursor-pointer"
            >
                <img
                    src={image}
                    alt={name}
                    className="w-32 h-24 object-cover rounded-md flex-shrink-0 shadow-sm"
                />
                <div className="text-center sm:text-left">
                    <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-2 py-0.5 rounded-full mb-2">
                        {category}
                    </span>
                    <h4 className="text-xl font-bold text-gray-800 hover:text-blue-600 transition duration-300 mb-1">
                        {/* No <a> tag needed inside Link, Link itself renders an <a> */}
                        <span className="line-clamp-2">{name}</span>
                    </h4>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-2">{description}</p>
                    <div className="flex items-center justify-center sm:justify-start text-gray-500 text-xs space-x-3">
                        <span className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {priceRange}
                        </span>
                        <span className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {openingHours}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default UMKMSuggestionCard