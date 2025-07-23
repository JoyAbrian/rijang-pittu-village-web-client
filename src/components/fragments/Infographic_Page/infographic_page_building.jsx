import BuildingStatsCard from "../../elements/BuildingStatsCard";

const buildingData = [
    {
        icon: "/images/icons/school.png",
        label: "Sekolah",
        value: 7,
        bgColor: "bg-blue-100",
        iconColor: "text-blue-600",
    },
    {
        icon: "/images/icons/hospital.png",
        label: "Fasilitas Kesehatan",
        value: 3,
        bgColor: "bg-pink-100",
        iconColor: "text-pink-600",
    },
    {
        icon: "/images/icons/mosque.png",
        label: "Tempat Ibadah",
        value: 8,
        bgColor: "bg-yellow-100",
        iconColor: "text-yellow-600",
    },
    {
        icon: "/images/icons/office.png",
        label: "Kantor Pelayanan",
        value: 2,
        bgColor: "bg-green-100",
        iconColor: "text-green-700",
    },
];

const InfographicPageBuilding = () => {
    return (
        <section className="bg-gray-50 pt-16 pb-24 px-4 font-poppins">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-red-700 mb-2">Statistik Bangunan</h2>
                <p className="text-gray-700 mb-10">Menampilkan jumlah bangunan penting di Kelurahan Rijang Pittu</p>

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