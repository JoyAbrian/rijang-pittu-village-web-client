import { Link } from "react-router-dom";

const UMKMCard = ({ id, image, name, description, priceMin, priceMax, openTime, closeTime, umkmType }) => {
    return (
        <Link to={`/umkm/${id}`}>
            <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition">
                <img src={image} alt={name} className="w-full h-48 object-cover" />
                <div className="p-4 space-y-2">
                    <div className="flex items-center gap-2">
                        {umkmType?.icon && (
                            <img src={umkmType.icon} alt={umkmType.name} className="w-5 h-5" />
                        )}
                        <span className="text-sm font-medium text-green-700">{umkmType?.name}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-green-800">{name}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
                    <div className="flex justify-between text-sm text-gray-700">
                        <span>
                            Rp{priceMin.toLocaleString()} - Rp{priceMax.toLocaleString()}
                        </span>
                        <span>{openTime} - {closeTime}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default UMKMCard;