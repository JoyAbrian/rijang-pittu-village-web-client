import { useEffect, useState } from "react";
import usePeopleStats from "../../../hooks/usePeopleStats";
import useBuildingStats from "../../../hooks/useBuildingStats";

const DashboardHome = () => {
    const [visitors] = useState({
        today: 150,
        month: 4500,
        year: 50000,
    });

    const { rawData: peopleRaw, updateStats: updatePeople } = usePeopleStats();
    const { rawData: buildingRaw, updateStats: updateBuilding } = useBuildingStats();

    const [peopleStats, setPeopleStats] = useState({
        id: null,
        totalKepalaKeluarga: 0,
        totalLakiLaki: 0,
        totalPerempuan: 0,
        totalPenduduk: 0,
    });

    const [buildingStats, setBuildingStats] = useState({
        id: null,
        totalSekolah: 0,
        totalFasilitasKesehatan: 0,
        totalTempatIbadah: 0,
        totalKantorPelayanan: 0,
    });

    useEffect(() => {
        if (peopleRaw.length > 0) {
            const stats = peopleRaw[0];
            setPeopleStats({
                id: stats.id,
                totalKepalaKeluarga: stats.total_householder || 0,
                totalLakiLaki: stats.total_man || 0,
                totalPerempuan: stats.total_woman || 0,
                totalPenduduk: (stats.total_man || 0) + (stats.total_woman || 0),
            });
        }
    }, [peopleRaw]);

    useEffect(() => {
        if (buildingRaw.length > 0) {
            const stats = buildingRaw[0];
            setBuildingStats({
                id: stats.id,
                totalSekolah: stats.total_school || 0,
                totalFasilitasKesehatan: stats.total_hospital || 0,
                totalTempatIbadah: stats.total_religious_places || 0,
                totalKantorPelayanan: stats.total_office || 0,
            });
        }
    }, [buildingRaw]);

    useEffect(() => {
        document.title = "Dashboard Rijang Pittu";
    }, []);

    const handlePeopleStatsChange = (e) => {
        const { name, value } = e.target;
        const newStats = {
            ...peopleStats,
            [name]: Number(value),
        };
        newStats.totalPenduduk = newStats.totalLakiLaki + newStats.totalPerempuan;
        setPeopleStats(newStats);
    };

    const handleBuildingStatsChange = (e) => {
        const { name, value } = e.target;
        setBuildingStats((prevStats) => ({
            ...prevStats,
            [name]: Number(value),
        }));
    };

    const handleSavePeopleStats = async () => {
        const token = localStorage.getItem("token");
        if (!token || !peopleStats.id) return alert("Unauthorized");

        const result = await updatePeople({
            id: peopleStats.id,
            total_man: peopleStats.totalLakiLaki,
            total_woman: peopleStats.totalPerempuan,
            total_householder: peopleStats.totalKepalaKeluarga,
        }, token);

        alert(result.msg);
    };

    const handleSaveBuildingStats = async () => {
        const token = localStorage.getItem("token");
        if (!token || !buildingStats.id) return alert("Unauthorized");

        const result = await updateBuilding({
            id: buildingStats.id,
            total_school: buildingStats.totalSekolah,
            total_hospital: buildingStats.totalFasilitasKesehatan,
            total_religious_places: buildingStats.totalTempatIbadah,
            total_office: buildingStats.totalKantorPelayanan,
        }, token);

        alert(result.msg);
    };

    return (
        <div className="p-6 space-y-8">
            <h2 className="text-2xl font-semibold text-gray-800">Statistik Pengunjung</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Pengunjung Hari Ini</h3>
                    <p className="text-5xl font-bold text-indigo-600">{visitors.today.toLocaleString()}</p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Pengunjung Bulan Ini</h3>
                    <p className="text-5xl font-bold text-green-600">{visitors.month.toLocaleString()}</p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Pengunjung Tahun Ini</h3>
                    <p className="text-5xl font-bold text-yellow-600">{visitors.year.toLocaleString()}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-3">Statistik Penduduk</h3>
                    <div className="space-y-4">
                        {["totalKepalaKeluarga", "totalLakiLaki", "totalPerempuan"].map((field) => (
                            <div key={field}>
                                <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                                    {field === "totalKepalaKeluarga" ? "Total Kepala Keluarga" :
                                        field === "totalLakiLaki" ? "Total Laki-laki" : "Total Perempuan"}
                                </label>
                                <input
                                    type="number"
                                    name={field}
                                    id={field}
                                    value={peopleStats[field]}
                                    onChange={handlePeopleStatsChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                    min="0"
                                />
                            </div>
                        ))}
                        <div>
                            <label htmlFor="totalPenduduk" className="block text-sm font-medium text-gray-700">Total Penduduk</label>
                            <input
                                type="number"
                                name="totalPenduduk"
                                id="totalPenduduk"
                                value={peopleStats.totalPenduduk}
                                className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm sm:text-sm p-2"
                                disabled
                            />
                        </div>
                        <button onClick={handleSavePeopleStats} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-200 mt-4">
                            Simpan Data Penduduk
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-3">Statistik Bangunan</h3>
                    <div className="space-y-4">
                        {[{ id: "totalSekolah", label: "Total Sekolah" },
                        { id: "totalFasilitasKesehatan", label: "Total Fasilitas Kesehatan" },
                        { id: "totalTempatIbadah", label: "Total Tempat Ibadah" },
                        { id: "totalKantorPelayanan", label: "Total Kantor Pelayanan" },
                        ].map(({ id, label }) => (
                            <div key={id}>
                                <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
                                <input
                                    type="number"
                                    name={id}
                                    id={id}
                                    value={buildingStats[id]}
                                    onChange={handleBuildingStatsChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                    min="0"
                                />
                            </div>
                        ))}
                        <button onClick={handleSaveBuildingStats} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-200 mt-4">
                            Simpan Data Bangunan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;