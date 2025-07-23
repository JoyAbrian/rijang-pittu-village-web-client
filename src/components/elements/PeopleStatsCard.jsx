const PeopleStatsCard = ({ icon, label, value, color = "text-green-700" }) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-5 flex items-center gap-4">
            <div className="flex-shrink-0">
                <img src={icon} alt={label} className="w-14 h-14" />
            </div>
            <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className={`text-2xl font-bold ${color}`}>{value} <span className="text-gray-600 text-base font-normal">Jiwa</span></p>
            </div>
        </div>
    );
};

export default PeopleStatsCard;