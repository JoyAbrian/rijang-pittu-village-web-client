import usePeopleStats from "../../../hooks/usePeopleStats";
import PeopleStatsCard from "../../elements/PeopleStatsCard";

const InfographicPagePeople = () => {
    const { rawData, loading, error } = usePeopleStats();

    const formattedStats = rawData.length > 0 ? (() => {
        const stats = rawData[0];
        return [
            {
                icon: "/images/icons/people-group.png",
                label: "Total Penduduk",
                value: (parseInt(stats.total_man) + parseInt(stats.total_woman)).toString(),
                color: "text-red-700",
            },
            {
                icon: "/images/icons/family.png",
                label: "Kepala Keluarga",
                value: stats.total_householder.toString(),
                color: "text-green-700",
            },
            {
                icon: "/images/icons/woman.png",
                label: "Perempuan",
                value: stats.total_woman.toString(),
                color: "text-pink-600",
            },
            {
                icon: "/images/icons/man.png",
                label: "Laki-laki",
                value: stats.total_man.toString(),
                color: "text-blue-600",
            },
        ];
    })() : [];

    return (
        <section className="bg-gray-50 pt-32 pb-24 px-4 font-poppins">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold text-red-700 mb-2">Jumlah Penduduk</h2>
                <p className="text-gray-700 mb-10">Informasi terbaru mengenai statistik penduduk Kelurahan Rijang Pittu.</p>

                {loading && <p className="text-gray-500">Loading...</p>}
                {error && <p className="text-red-600">{error}</p>}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {formattedStats.map((item, index) => (
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