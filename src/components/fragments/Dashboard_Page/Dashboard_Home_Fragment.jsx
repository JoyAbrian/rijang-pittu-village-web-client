import { useState, useEffect } from "react";

const DashboardHome = () => {
    const [visitors] = useState({
        today: 150,
        month: 4500,
        year: 50000,
    });

    const [peopleStats, setPeopleStats] = useState({
        totalKepalaKeluarga: 0,
        totalLakiLaki: 0,
        totalPerempuan: 0,
        totalPenduduk: 0,
    });

    const [buildingStats, setBuildingStats] = useState({
        totalSekolah: 0,
        totalFasilitasKesehatan: 0,
        totalTempatIbadah: 0,
        totalKantorPelayanan: 0,
    });

    useEffect(() => {
        setPeopleStats((prevStats) => ({
            ...prevStats,
            totalPenduduk: prevStats.totalLakiLaki + prevStats.totalPerempuan,
        }));
    }, [peopleStats.totalLakiLaki, peopleStats.totalPerempuan]);

    const handlePeopleStatsChange = (e) => {
        const { name, value } = e.target;
        setPeopleStats((prevStats) => ({
            ...prevStats,
            [name]: Number(value),
        }));
    };

    const handleBuildingStatsChange = (e) => {
        const { name, value } = e.target;
        setBuildingStats((prevStats) => ({
            ...prevStats,
            [name]: Number(value),
        }));
    };

    useEffect(() => {
        document.title = "Dashboard Rijang Pittu"
    }, [])

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
                        <div>
                            <label htmlFor="totalKepalaKeluarga" className="block text-sm font-medium text-gray-700">Total Kepala Keluarga</label>
                            <input
                                type="number"
                                name="totalKepalaKeluarga"
                                id="totalKepalaKeluarga"
                                value={peopleStats.totalKepalaKeluarga}
                                onChange={handlePeopleStatsChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                min="0"
                            />
                        </div>
                        <div>
                            <label htmlFor="totalLakiLaki" className="block text-sm font-medium text-gray-700">Total Laki-laki</label>
                            <input
                                type="number"
                                name="totalLakiLaki"
                                id="totalLakiLaki"
                                value={peopleStats.totalLakiLaki}
                                onChange={handlePeopleStatsChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                min="0"
                            />
                        </div>
                        <div>
                            <label htmlFor="totalPerempuan" className="block text-sm font-medium text-gray-700">Total Perempuan</label>
                            <input
                                type="number"
                                name="totalPerempuan"
                                id="totalPerempuan"
                                value={peopleStats.totalPerempuan}
                                onChange={handlePeopleStatsChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                min="0"
                            />
                        </div>
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
                        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-200 mt-4">
                            Simpan Data Penduduk
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-3">Statistik Bangunan</h3>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="totalSekolah" className="block text-sm font-medium text-gray-700">Total Sekolah</label>
                            <input
                                type="number"
                                name="totalSekolah"
                                id="totalSekolah"
                                value={buildingStats.totalSekolah}
                                onChange={handleBuildingStatsChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                min="0"
                            />
                        </div>
                        <div>
                            <label htmlFor="totalFasilitasKesehatan" className="block text-sm font-medium text-gray-700">Total Fasilitas Kesehatan</label>
                            <input
                                type="number"
                                name="totalFasilitasKesehatan"
                                id="totalFasilitasKesehatan"
                                value={buildingStats.totalFasilitasKesehatan}
                                onChange={handleBuildingStatsChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                min="0"
                            />
                        </div>
                        <div>
                            <label htmlFor="totalTempatIbadah" className="block text-sm font-medium text-gray-700">Total Tempat Ibadah</label>
                            <input
                                type="number"
                                name="totalTempatIbadah"
                                id="totalTempatIbadah"
                                value={buildingStats.totalTempatIbadah}
                                onChange={handleBuildingStatsChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                min="0"
                            />
                        </div>
                        <div>
                            <label htmlFor="totalKantorPelayanan" className="block text-sm font-medium text-gray-700">Total Kantor Pelayanan</label>
                            <input
                                type="number"
                                name="totalKantorPelayanan"
                                id="totalKantorPelayanan"
                                value={buildingStats.totalKantorPelayanan}
                                onChange={handleBuildingStatsChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                min="0"
                            />
                        </div>
                        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-200 mt-4">
                            Simpan Data Bangunan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardHome;