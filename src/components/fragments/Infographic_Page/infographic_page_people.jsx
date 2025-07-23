import PeopleStatsCard from "../../elements/PeopleStatsCard";

const peopleData = [
    {
        icon: "/images/icons/people-group.png",
        label: "Total Penduduk",
        value: "1.322",
        color: "text-red-700",
    },
    {
        icon: "/images/icons/family.png",
        label: "Kepala Keluarga",
        value: "377",
        color: "text-green-700",
    },
    {
        icon: "/images/icons/woman.png",
        label: "Perempuan",
        value: "679",
        color: "text-pink-600",
    },
    {
        icon: "/images/icons/man.png",
        label: "Laki-laki",
        value: "643",
        color: "text-blue-600",
    },
];

const InfographicPagePeople = () => {
    return (
        <section className="bg-gray-50 pt-32 pb-24 px-4 font-poppins">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-red-700 mb-2">Jumlah Penduduk</h2>
                <p className="text-gray-700 mb-10">Informasi terbaru mengenai statistik penduduk Kelurahan Rijang Pittu.</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {peopleData.map((item, index) => (
                        <PeopleStatsCard
                            key={index}
                            icon={item.icon}
                            label={item.label}
                            value={item.value}
                            color={item.color}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InfographicPagePeople;