import { useEffect, useState } from "react";
import Modal from "./Modal";

const UMKMForm = ({ isOpen, onClose, title, formData, handleChange, handleSaveUmkm }) => {
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [imageError, setImageError] = useState('');
    const [googleMapsError, setGoogleMapsError] = useState('');

    const categories = ["Kuliner", "Kerajinan", "Fashion", "Jasa", "Pertanian", "Lain-lain"]; // Dummy categories
    const googleMapsRegex = /^(https?:\/\/(www\.)?google\.com\/maps\/|https?:\/\/maps\.google\.com\/)\S*$/;


    useEffect(() => {
        if (isOpen) {
            if (formData.image) {
                setImagePreview(formData.image);
            } else {
                setImagePreview('');
            }
            setImageError('');
            setImageFile(null);
            setGoogleMapsError('');
        }
    }, [isOpen, formData.image]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!validTypes.includes(file.type)) {
                setImageError('Tipe file tidak disupport. Harap unggah file JPG, PNG, atau JPEG.');
                setImageFile(null);
                setImagePreview('');
                handleChange({ target: { name: 'image', value: '' } });
                return;
            }

            const maxSize = 5 * 1024 * 1024; // 5 MB
            if (file.size > maxSize) {
                setImageError('Ukuran Gambar Melebihi 5MB.');
                setImageFile(null);
                setImagePreview('');
                handleChange({ target: { name: 'image', value: '' } });
                return;
            }

            setImageError('');
            setImageFile(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                handleChange({ target: { name: 'image', value: reader.result } });
            };
            reader.readAsDataURL(file);
        } else {
            setImageFile(null);
            setImagePreview(formData.image || '');
            setImageError('');
            handleChange({ target: { name: 'image', value: formData.image || '' } });
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Validasi Google Maps URL sebelum menyimpan
        if (formData.googleMaps && !googleMapsRegex.test(formData.googleMaps)) {
            setGoogleMapsError('Format URL Google Maps tidak valid. Contoh: https://maps.google.com/?q=Lokasi');
            return;
        }
        setGoogleMapsError('');
        handleSaveUmkm(e);
    };


    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
        >
            <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nama UMKM</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Kategori</label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Pilih Kategori</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Unggah Gambar</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/jpeg, image/png, image/jpg"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-700
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100"
                    />
                    {imageError && <p className="text-red-500 text-xs mt-1">{imageError}</p>}
                    {imagePreview && (
                        <div className="mt-4">
                            <p className="text-sm text-gray-600 mb-2">Pratinjau Gambar:</p>
                            <img
                                src={imagePreview}
                                alt="Pratinjau"
                                className="w-full h-48 object-cover rounded-lg border border-gray-300"
                                onError={(e) => {
                                    console.error("Gagal memuat pratinjau gambar:", e.target.src);
                                    e.target.onerror = null;
                                    e.target.src = "https://placehold.co/800x400/CCCCCC/333333?text=Gambar+Tidak+Ditemukan";
                                    setImageError("Gambar tidak dapat dimuat. Mungkin rusak atau URL tidak valid.");
                                }}
                            />
                        </div>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                        Maksimal 5MB. Format: JPG, PNG, JPEG.
                    </p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Rentang Harga</label>
                    <div className="flex space-x-2">
                        <input
                            type="number"
                            id="priceRangeStart"
                            name="priceRangeStart"
                            value={formData.priceRangeStart}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded-lg w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Harga Awal (Rp)"
                            required
                        />
                        <input
                            type="number"
                            id="priceRangeEnd"
                            name="priceRangeEnd"
                            value={formData.priceRangeEnd}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded-lg w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Harga Akhir (Rp)"
                            required
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Jam Buka</label>
                    <div className="flex space-x-2">
                        <input
                            type="time"
                            id="openingHoursStart"
                            name="openingHoursStart"
                            value={formData.openingHoursStart}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded-lg w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <input
                            type="time"
                            id="openingHoursEnd"
                            name="openingHoursEnd"
                            value={formData.openingHoursEnd}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded-lg w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Alamat</label>
                    <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows="2"
                        className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="contact" className="block text-gray-700 text-sm font-bold mb-2">Kontak (Telepon/WhatsApp)</label>
                    <input
                        type="tel"
                        id="contact"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Contoh: 0812-3456-7890"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="instagramUsername" className="block text-gray-700 text-sm font-bold mb-2">Instagram</label>
                    <div className="flex items-center shadow border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                        <span className="px-3 py-2 bg-gray-100 text-gray-600 border-r">www.instagram.com/</span>
                        <input
                            type="text"
                            id="instagramUsername"
                            name="instagramUsername"
                            value={formData.instagramUsername}
                            onChange={handleChange}
                            className="flex-1 py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                            placeholder="nama_pengguna"
                        />
                    </div>
                </div>
                <div className="mb-6">
                    <label htmlFor="googleMaps" className="block text-gray-700 text-sm font-bold mb-2">Google Maps URL</label>
                    <input
                        type="url"
                        id="googleMaps"
                        name="googleMaps"
                        value={formData.googleMaps}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Contoh: https://maps.google.com/?q=Lokasi"
                    />
                    {googleMapsError && <p className="text-red-500 text-xs mt-1">{googleMapsError}</p>}
                </div>
                <div className="mb-6">
                    <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Deskripsi UMKM</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="6"
                        className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Tulis deskripsi UMKM di sini. Gunakan baris kosong untuk paragraf baru."
                        required
                    ></textarea>
                    <p className="text-xs text-gray-500 mt-1">
                        Gunakan dua baris kosong untuk membuat paragraf baru.
                    </p>
                </div>
                <div className="flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors duration-200"
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                        Simpan
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default UMKMForm;