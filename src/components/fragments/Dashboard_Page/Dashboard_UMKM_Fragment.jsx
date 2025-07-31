import { useState } from "react";
import { ClockFill, GeoAltFill, Instagram, Map, PlusCircle, TagFill, TelephoneFill } from "react-bootstrap-icons";
import DashboardUMKMCard from "../../elements/DashboardUMKMCard";
import UMKMForm from "../../elements/Modal/UMKMForm";
import ConfirmationModal from "../../elements/Modal/ConfirmationModal";
import Modal from "../../elements/Modal/Modal";

const DashboardUMKM = () => {
    const [umkmList, setUmkmList] = useState([
        {
            id: 'u1',
            name: "Warung Makan Sederhana",
            category: "Kuliner",
            image: "https://placehold.co/800x400/FF5722/FFFFFF?text=Warung+Makan+Sederhana",
            description: `Warung Makan Sederhana adalah destinasi kuliner yang menyajikan berbagai hidangan khas Bugis dengan cita rasa otentik. Berlokasi strategis di pusat Kelurahan Rijang Pittu, warung ini menjadi favorit warga lokal maupun pengunjung yang mencari pengalaman makan yang hangat dan ramah di kantong.\n\nMenu andalan kami meliputi Coto Makassar, Konro Bakar, Pallubasa, dan aneka kue tradisional yang dibuat segar setiap hari. Kami berkomitmen menggunakan bahan-bahan berkualitas tinggi dari petani lokal untuk memastikan setiap hidangan tidak hanya lezat tetapi juga mendukung ekonomi komunitas.\n\nSuasana warung yang nyaman dan pelayanan yang cepat menjadikan Warung Makan Sederhana tempat yang ideal untuk makan siang bersama keluarga, makan malam santai, atau sekadar menikmati kopi dan kue di sore hari. Kami juga menerima pesanan katering untuk berbagai acara.\n\nDatang dan rasakan sendiri kelezatan masakan rumahan di Warung Makan Sederhana!`,
            priceRangeStart: "10.000",
            priceRangeEnd: "25.000",
            openingHoursStart: "07:00",
            openingHoursEnd: "20:00",
            address: "Jl. Raya Rijang Pittu No. 123, Sidenreng Rappang",
            contact: "0812-3456-7890",
            instagramUsername: "warungmakansederhana",
            googleMaps: "https://maps.google.com/?q=Warung+Makan+Sederhana+Rijang+Pittu",
        },
        {
            id: 'u2',
            name: "Kedai Kopi Hijau",
            category: "Kuliner",
            image: "https://placehold.co/800x400/8BC34A/FFFFFF?text=Kedai+Kopi+Hijau",
            description: `Kedai Kopi Hijau adalah tempat nongkrong santai dengan berbagai varian kopi lokal dan internasional. Kami menawarkan suasana yang nyaman untuk bekerja, bertemu teman, atau sekadar menikmati secangkir kopi berkualitas.\n\nSelain kopi, kami juga menyajikan aneka camilan dan makanan ringan yang cocok untuk menemani waktu santai Anda. Biji kopi kami berasal dari petani lokal pilihan, menjamin kesegaran dan cita rasa terbaik.`,
            priceRangeStart: "8.000",
            priceRangeEnd: "30.000",
            openingHoursStart: "09:00",
            openingHoursEnd: "23:00",
            address: "Jl. Kopi Sejati No. 5, Sidenreng Rappang",
            contact: "0856-7890-1234",
            instagramUsername: "kedaikopihijau",
            googleMaps: "https://maps.google.com/?q=Kedai+Kopi+Hijau+Sidenreng+Rappang",
        },
        {
            id: 'u3',
            name: "Toko Oleh-oleh Makassar",
            category: "Oleh-oleh",
            image: "https://placehold.co/800x400/FFC107/FFFFFF?text=Toko+Oleh-oleh+Makassar",
            description: `Toko Oleh-oleh Makassar menyediakan berbagai macam produk khas Makassar dan Sulawesi Selatan. Mulai dari kue tradisional, kerajinan tangan, hingga kain tenun, semua tersedia di sini.\n\nKami adalah pilihan tepat untuk mencari buah tangan berkualitas tinggi untuk keluarga dan teman. Produk-produk kami dipilih dengan cermat untuk memastikan kualitas dan keasliannya.`,
            priceRangeStart: "15.000",
            priceRangeEnd: "75.000",
            openingHoursStart: "08:00",
            openingHoursEnd: "17:00",
            address: "Jl. Kenangan Indah No. 7, Sidenreng Rappang",
            contact: "0878-1234-5678",
            instagramUsername: "tokooleholehmakassar",
            googleMaps: "https://maps.google.com/?q=Toko+Oleh-oleh+Makassar+Sidenreng+Rappang",
        },
    ]);

    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [currentUmkmItem, setCurrentUmkmItem] = useState(null);
    const [viewingUmkmItem, setViewingUmkmItem] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        category: '',
        image: '',
        description: '',
        priceRangeStart: '',
        priceRangeEnd: '',
        openingHoursStart: '',
        openingHoursEnd: '',
        address: '',
        contact: '',
        instagramUsername: '',
        googleMaps: '',
    });

    const handleAddUmkm = () => {
        setCurrentUmkmItem(null);
        setFormData({
            name: '',
            category: '',
            image: '',
            description: '',
            priceRangeStart: '',
            priceRangeEnd: '',
            openingHoursStart: '',
            openingHoursEnd: '',
            address: '',
            contact: '',
            instagramUsername: '',
            googleMaps: '',
        });
        setIsFormModalOpen(true);
    };

    const handleEditUmkm = (umkm) => {
        setCurrentUmkmItem(umkm);
        setFormData({
            name: umkm.name,
            category: umkm.category,
            image: umkm.image,
            description: umkm.description,
            priceRangeStart: umkm.priceRangeStart,
            priceRangeEnd: umkm.priceRangeEnd,
            openingHoursStart: umkm.openingHoursStart,
            openingHoursEnd: umkm.openingHoursEnd,
            address: umkm.address,
            contact: umkm.contact,
            instagramUsername: umkm.instagramUsername,
            googleMaps: umkm.googleMaps,
        });
        setIsFormModalOpen(true);
    };

    const handleDeleteUmkm = (umkm) => {
        setCurrentUmkmItem(umkm);
        setIsConfirmationModalOpen(true);
    };

    const handleConfirmDelete = () => {
        setUmkmList(umkmList.filter(umkm => umkm.id !== currentUmkmItem.id));
        setIsConfirmationModalOpen(false);
        setCurrentUmkmItem(null);
    };

    const handleViewUmkm = (umkm) => {
        setViewingUmkmItem(umkm);
        setIsViewModalOpen(true);
    };

    const handleSaveUmkm = (e) => {
        e.preventDefault();
        if (currentUmkmItem) {
            setUmkmList(umkmList.map(umkm =>
                umkm.id === currentUmkmItem.id ? { ...umkm, ...formData } : umkm
            ));
        } else {
            const newUmkm = {
                id: crypto.randomUUID(),
                ...formData,
            };
            setUmkmList([...umkmList, newUmkm]);
        }
        setIsFormModalOpen(false);
        setFormData({
            name: '',
            category: '',
            image: '',
            description: '',
            priceRangeStart: '',
            priceRangeEnd: '',
            openingHoursStart: '',
            openingHoursEnd: '',
            address: '',
            contact: '',
            instagramUsername: '',
            googleMaps: '',
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const formatContentForDisplay = (text) => {
        if (!text) return { __html: '' };
        const htmlContent = text.split('\n\n').map(paragraph => `<p class="mb-4">${paragraph.replace(/\n/g, '<br/>')}</p>`).join('');
        return { __html: htmlContent };
    };

    return (
        <div className="flex h-screen bg-gray-100 font-inter">
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">Daftar UMKM</h2>
                        <button
                            onClick={handleAddUmkm}
                            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors duration-200"
                        >
                            <PlusCircle className="mr-2" size={20} /> Tambah UMKM
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {umkmList.map((umkm) => (
                            <DashboardUMKMCard
                                key={umkm.id}
                                umkm={umkm}
                                handleEditUmkm={handleEditUmkm}
                                handleDeleteUmkm={handleDeleteUmkm}
                                handleViewUmkm={handleViewUmkm}
                            />
                        ))}
                    </div>
                </main>
            </div>

            <UMKMForm
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                title={currentUmkmItem ? "Edit UMKM" : "Tambah UMKM Baru"}
                formData={formData}
                handleChange={handleChange}
                handleSaveUmkm={handleSaveUmkm}
            />

            <ConfirmationModal
                isOpen={isConfirmationModalOpen}
                onClose={() => setIsConfirmationModalOpen(false)}
                onConfirm={handleConfirmDelete}
                message={`Apakah Anda yakin ingin menghapus UMKM "${currentUmkmItem?.name}" ini?`}
            />

            <Modal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                title={viewingUmkmItem?.name}
            >
                {viewingUmkmItem && (
                    <div className="text-gray-800">
                        <img
                            src={viewingUmkmItem.image}
                            alt={viewingUmkmItem.name}
                            className="w-full h-64 object-cover rounded-lg mb-4"
                            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x400/CCCCCC/333333?text=Gambar+Tidak+Ditemukan"; }}
                        />
                        <p className="text-sm text-gray-600 mb-2 flex items-center">
                            <TagFill className="mr-2 text-orange-500" /> Kategori: {viewingUmkmItem.category}
                        </p>
                        <p className="text-sm text-gray-600 mb-2 flex items-center">
                            <TagFill className="mr-2 text-green-500" /> Harga: Rp{viewingUmkmItem.priceRangeStart} - Rp{viewingUmkmItem.priceRangeEnd}
                        </p>
                        <p className="text-sm text-gray-600 mb-2 flex items-center">
                            <ClockFill className="mr-2 text-purple-500" /> Jam Buka: {viewingUmkmItem.openingHoursStart} - {viewingUmkmItem.openingHoursEnd}
                        </p>
                        <p className="text-sm text-gray-600 mb-2 flex items-center">
                            <GeoAltFill className="mr-2 text-blue-500" /> Alamat: {viewingUmkmItem.address}
                        </p>
                        <p className="text-sm text-gray-600 mb-2 flex items-center">
                            <TelephoneFill className="mr-2 text-teal-500" /> Kontak: {viewingUmkmItem.contact}
                        </p>
                        {viewingUmkmItem.instagramUsername && (
                            <p className="text-sm text-gray-600 mb-2 flex items-center">
                                <Instagram className="mr-2 text-pink-500" /> Instagram: <a href={`https://www.instagram.com/${viewingUmkmItem.instagramUsername}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">@{viewingUmkmItem.instagramUsername}</a>
                            </p>
                        )}
                        {viewingUmkmItem.googleMaps && (
                            <p className="text-sm text-gray-600 mb-4 flex items-center">
                                <Map className="mr-2 text-red-500" /> Google Maps: <a href={viewingUmkmItem.googleMaps} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Lihat di Peta</a>
                            </p>
                        )}
                        <h4 className="text-md font-semibold text-gray-900 mb-2">Deskripsi:</h4>
                        <div dangerouslySetInnerHTML={formatContentForDisplay(viewingUmkmItem.description)} />
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default DashboardUMKM;