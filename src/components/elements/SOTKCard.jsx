const SOTKCard = ({ photo, name, position }) => {
    return (
        <div className="rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition">
            <img
                src={photo}
                alt={name}
                className="w-full h-64 object-cover"
            />
            <div className="bg-green-800 text-white py-4 text-center">
                <h3 className="text-xl font-semibold">{name}</h3>
                <p className="text-sm opacity-90">{position}</p>
            </div>
        </div>
    );
};

export default SOTKCard;