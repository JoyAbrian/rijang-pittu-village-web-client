const BuildingStatsCard = ({ icon, label, value, bgColor = "bg-green-100", iconColor = "text-green-700" }) => {
    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-start space-y-4">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${bgColor}`}>
                <img src={icon} alt={label} className="w-7 h-7" />
            </div>
            <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className={`text-2xl font-bold ${iconColor}`}>{value} Unit</p>
            </div>
        </div>
    );
};

export default BuildingStatsCard;