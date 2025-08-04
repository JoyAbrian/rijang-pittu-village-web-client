import { useEffect, useState } from "react";
import Modal from "./Modal";

const UMKMForm = ({ isOpen, onClose, title, umkmData, onSubmit, categories }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [priceRangeStart, setPriceRangeStart] = useState('');
    const [priceRangeEnd, setPriceRangeEnd] = useState('');
    const [openingHoursStart, setOpeningHoursStart] = useState('');
    const [openingHoursEnd, setOpeningHoursEnd] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');
    const [instagramUsername, setInstagramUsername] = useState('');
    const [googleMaps, setGoogleMaps] = useState('');

    const [existingImageUrl, setExistingImageUrl] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [imageError, setImageError] = useState('');

    const [googleMapsError, setGoogleMapsError] = useState('');

    useEffect(() => {
        if (isOpen) {
            if (umkmData) {
                setName(umkmData.name || '');
                const categoryName = categories.find(cat => cat.id === umkmData.category_id)?.name || '';
                setCategory(categoryName);
                setDescription(umkmData.description || '');
                setPriceRangeStart(umkmData.price_min || '');
                setPriceRangeEnd(umkmData.price_max || '');
                setOpeningHoursStart(umkmData.open_time || '');
                setOpeningHoursEnd(umkmData.close_time || '');
                setAddress(umkmData.address || '');
                setContact(umkmData.contact || '');
                setInstagramUsername(umkmData.instagram || '');
                setGoogleMaps(umkmData.Maps || '');

                setExistingImageUrl(umkmData.image_url || ''); 
                setImagePreview(umkmData.image_url || '');
                setImageFile(null);
            } else {
                setName('');
                setCategory('');
                setDescription('');
                setPriceRangeStart('');
                setPriceRangeEnd('');
                setOpeningHoursStart('');
                setOpeningHoursEnd('');
                setAddress('');
                setContact('');
                setInstagramUsername('');
                setGoogleMaps('');

                setExistingImageUrl('');
                setImageFile(null);
                setImagePreview('');
            }
            setImageError('');
            setGoogleMapsError('');
        }
    }, [isOpen, umkmData, categories]); 

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!validTypes.includes(file.type)) {
                setImageError('Tipe file tidak disupport. Harap unggah file JPG, PNG, atau JPEG.');
                setImageFile(null);
                setImagePreview('');
                return;
            }

            const maxSize = 5 * 1024 * 1024;
            if (file.size > maxSize) {
                setImageError('Ukuran Gambar Melebihi 5MB.');
                setImageFile(null);
                setImagePreview('');
                return;
            }

            setImageError('');
            setImageFile(file);
            setExistingImageUrl('');

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImageFile(null);
            setImagePreview(umkmData?.image_url || '');
            setExistingImageUrl(umkmData?.image_url || '');
            setImageError('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name.trim() || !category.trim() || !description.trim() ||
            !priceRangeStart.trim() || !priceRangeEnd.trim() ||
            !openingHoursStart.trim() || !openingHoursEnd.trim() ||
            !address.trim() || !contact.trim()) {
            alert('Semua bidang wajib diisi (kecuali Instagram dan Google Maps).');
            return;
        }
        
        onSubmit({
            id: umkmData?.id || null,
            name,
            category,
            description,
            priceRangeStart,
            priceRangeEnd,
            openingHoursStart,
            openingHoursEnd,
            address,
            contact,
            instagramUsername,
            googleMaps,
            imageFile,
            imageUrl: imageFile ? '' : existingImageUrl,
        });
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
        >
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nama UMKM</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Kategori</label>
                    <select
                        id="category"
                        name="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Pilih Kategori</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.type_name}>{cat.type_name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Unggah Gambar</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/jpeg, image:png, image:jpg"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-700
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100"
                    />
                    {imageError && <p className="text-red-500 text-xs mt-1">{imageError}</p>}
                    {(imagePreview || (umkmData && umkmData.image_url && !imageFile)) && ( // Use umkmData.image_url here
                        <div className="mt-4">
                            <p className="text-sm text-gray-600 mb-2">Pratinjau Gambar:</p>
                            <img
                                src={imagePreview || umkmData.image_url} // Use umkmData.image_url as fallback
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
                            value={priceRangeStart}
                            onChange={(e) => setPriceRangeStart(e.target.value)}
                            className="shadow appearance-none border rounded-lg w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Harga Awal (Rp)"
                            required
                        />
                        <input
                            type="number"
                            id="priceRangeEnd"
                            name="priceRangeEnd"
                            value={priceRangeEnd}
                            onChange={(e) => setPriceRangeEnd(e.target.value)}
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
                            value={openingHoursStart}
                            onChange={(e) => setOpeningHoursStart(e.target.value)}
                            className="shadow appearance-none border rounded-lg w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <input
                            type="time"
                            id="openingHoursEnd"
                            name="openingHoursEnd"
                            value={openingHoursEnd}
                            onChange={(e) => setOpeningHoursEnd(e.target.value)}
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
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        rows="2"
                        className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Tulis alamat lengkap UMKM di sini."
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="contact" className="block text-gray-700 text-sm font-bold mb-2">Kontak (Telepon/WhatsApp)</label>
                    <input
                        type="tel"
                        id="contact"
                        name="contact"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
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
                            value={instagramUsername}
                            onChange={(e) => setInstagramUsername(e.target.value)}
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
                        value={googleMaps}
                        onChange={(e) => setGoogleMaps(e.target.value)}
                        className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Contoh: https://maps.app.goo.gl/abcdefg"
                    />
                    {googleMapsError && <p className="text-red-500 text-xs mt-1">{googleMapsError}</p>}
                </div>
                <div className="mb-6">
                    <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Deskripsi UMKM</label>
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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