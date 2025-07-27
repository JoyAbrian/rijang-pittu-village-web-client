const SOTKCard = ({ photo, name, position }) => {
    return (
        <div className="rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 flex flex-col">
            <img
                src={photo}
                alt={name}
                className="w-full h-48 sm:h-56 md:h-64 object-cover flex-shrink-0"
            />
            <div className="bg-green-800 text-white py-4 text-center flex-grow flex flex-col justify-center"> {/* Added flex-grow and flex-col justify-center */}
                <h3 className="text-lg sm:text-xl font-semibold px-2">{name}</h3>
                <p className="text-xs sm:text-sm opacity-90 px-2">{position}</p>
            </div>
        </div>
    );
};

export default SOTKCard;