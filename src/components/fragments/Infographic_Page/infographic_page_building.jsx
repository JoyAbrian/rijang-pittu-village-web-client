import useBuildingStats from "../../../hooks/useBuildingStats";
import BuildingStatsCard from "../../elements/BuildingStatsCard";

const InfographicPageBuilding = () => {
    const { rawData, loading, error } = useBuildingStats();
    const stats = rawData.length > 0 ? rawData[0] : null;

    const buildingData = stats ? [
        {
            icon: "/images/icons/school.png",
            label: "Sekolah",
            value: stats.total_school,
            bgColor: "bg-blue-100",
            iconColor: "text-blue-600",
        },
        {
            icon: "/images/icons/hospital.png",
            label: "Fasilitas Kesehatan",
            value: stats.total_hospital,
            bgColor: "bg-pink-100",
            iconColor: "text-pink-600",
        },
        {
            icon: "/images/icons/mosque.png",
            label: "Tempat Ibadah",
            value: stats.total_religious_places,
            bgColor: "bg-yellow-100",
            iconColor: "text-yellow-600",
        },
        {
            icon: "/images/icons/office.png",
            label: "Kantor Pelayanan",
            value: stats.total_office,
            bgColor: "bg-green-100",
            iconColor: "text-green-700",
        },
    ] : [];

    return (
        <section className="bg-gray-50 pt-16 pb-24 px-4 font-poppins">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-red-700 mb-2">Statistik Bangunan</h2>
                <p className="text-gray-700 mb-10">Menampilkan jumlah bangunan penting di Kelurahan Rijang Pittu</p>

                {loading && <p className="text-gray-500">Loading...</p>}
                {error && <p className="text-red-600">{error}</p>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {buildingData.map((item, index) => (
                        <BuildingStatsCard
                            key={index}
                            icon={item.icon}
                            label={item.label}
                            value={item.value}
                            bgColor={item.bgColor}
                            iconColor={item.iconColor}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InfographicPageBuilding;