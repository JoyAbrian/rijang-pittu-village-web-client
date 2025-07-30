import { useState } from "react";
import Modal from "../../elements/Modal/Modal";
import ConfirmationModal from "../../elements/Modal/ConfirmationModal";
import { PlusCircle } from "react-bootstrap-icons";
import DashboardNewsCard from "../../elements/DashboardNewsCard";
import NewsForm from "../../elements/Modal/NewsForm";

const DashboardNews = () => {
    const [newsArticles, setNewsArticles] = useState([
        {
            id: '1',
            title: "Peningkatan Kualitas Pendidikan di Daerah Terpencil Melalui Program Digitalisasi",
            date: "02-10-2025",
            image: "https://placehold.co/800x400/4CAF50/FFFFFF?text=Main+News+Image",
            content: `Pemerintah Kabupaten Sidenreng Rappang terus berkomitmen untuk meningkatkan kualitas pendidikan, terutama di daerah-daerah terpencil. Salah satu inisiatif terbaru adalah peluncuran program digitalisasi pendidikan yang bertujuan untuk menjembatani kesenjangan akses informasi dan teknologi antara wilayah perkotaan dan pedesaan.\n\nProgram ini mencakup penyediaan perangkat keras seperti tablet dan laptop, akses internet gratis di sekolah-sekolah, serta pelatihan bagi guru-guru dalam memanfaatkan teknologi untuk proses belajar mengajar. Diharapkan dengan adanya program ini, siswa-siswa di daerah terpencil dapat memiliki kesempatan yang sama untuk mengakses sumber belajar yang berkualitas dan mengembangkan potensi diri mereka.\n\nKepala Dinas Pendidikan Kabupaten Sidenreng Rappang, Bapak Dr. H. Andi Nur, menyatakan bahwa program digitalisasi ini merupakan langkah strategis untuk mempersiapkan generasi muda menghadapi tantangan di era revolusi industri 4.0. "Kami percaya bahwa pendidikan adalah kunci kemajuan, dan dengan digitalisasi, kami ingin memastikan tidak ada satu pun anak di daerah kami yang tertinggal," ujarnya dalam sambutan peresmian program.\n\nSelain itu, program ini juga akan melibatkan kolaborasi dengan berbagai pihak, termasuk universitas dan komunitas teknologi, untuk mengembangkan konten edukasi digital yang relevan dan menarik. Dengan demikian, diharapkan program ini dapat berkelanjutan dan memberikan dampak positif jangka panjang bagi pendidikan di Kabupaten Sidenreng Rappang.`,
        },
        {
            id: '2',
            title: "Inovasi Pertanian Berbasis Teknologi untuk Ketahanan Pangan",
            date: "03-12-2025",
            image: "https://placehold.co/800x400/2196F3/FFFFFF?text=Agricultural+Innovation",
            content: `Kabupaten Sidenreng Rappang meluncurkan program inovasi pertanian yang memanfaatkan teknologi modern untuk meningkatkan produktivitas dan ketahanan pangan. Program ini mencakup penggunaan drone untuk pemetaan lahan, sensor tanah untuk optimasi irigasi, dan aplikasi mobile untuk pendataan hasil panen.\n\nPetani mendapatkan pelatihan intensif mengenai penggunaan teknologi ini, serta pendampingan dari para ahli pertanian. Diharapkan, dengan adopsi teknologi ini, hasil panen dapat meningkat secara signifikan, biaya produksi dapat ditekan, dan kualitas produk pertanian dapat lebih baik.\n\nInisiatif ini juga bertujuan untuk menarik minat generasi muda agar kembali berkecimpung di sektor pertanian, dengan memperkenalkan sisi modern dan prospektif dari profesi petani.`,
        },
        {
            id: '3',
            title: "Pengembangan Pariwisata Lokal Melalui Peningkatan Infrastruktur",
            date: "04-25-2025",
            image: "https://placehold.co/800x400/FFC107/FFFFFF?text=Tourism+Development",
            content: `Pemerintah daerah fokus pada pengembangan sektor pariwisata dengan meningkatkan infrastruktur pendukung di beberapa destinasi wisata unggulan. Proyek ini meliputi perbaikan akses jalan, pembangunan fasilitas umum, dan promosi destinasi secara digital.\n\nMelalui program ini, diharapkan jumlah wisatawan baik domestik maupun mancanegara dapat meningkat, yang pada gilirannya akan menggerakkan perekonomian lokal dan menciptakan lapangan kerja baru bagi masyarakat. Kolaborasi dengan pelaku usaha pariwisata dan komunitas lokal juga menjadi kunci keberhasilan program ini.`,
        },
    ]);

    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [currentNewsItem, setCurrentNewsItem] = useState(null); // Untuk edit/hapus
    const [viewingNewsItem, setViewingNewsItem] = useState(null); // Untuk melihat berita lengkap

    const [formData, setFormData] = useState({
        title: '',
        date: '',
        image: '',
        content: '',
    });

    const handleAddNews = () => {
        setCurrentNewsItem(null); // Hapus item saat ini untuk menambahkan yang baru
        setFormData({ title: '', date: '', image: '', content: '' });
        setIsFormModalOpen(true);
    };

    const handleEditNews = (news) => {
        setCurrentNewsItem(news);
        setFormData({
            title: news.title,
            date: news.date,
            image: news.image,
            content: news.content,
        });
        setIsFormModalOpen(true);
    };

    const handleDeleteNews = (news) => {
        setCurrentNewsItem(news);
        setIsConfirmationModalOpen(true);
    };

    const handleConfirmDelete = () => {
        setNewsArticles(newsArticles.filter(news => news.id !== currentNewsItem.id));
        setIsConfirmationModalOpen(false);
        setCurrentNewsItem(null);
    };

    const handleViewNews = (news) => {
        setViewingNewsItem(news);
        setIsViewModalOpen(true);
    };

    const handleSaveNews = (e) => {
        e.preventDefault();
        if (currentNewsItem) {
            setNewsArticles(newsArticles.map(news =>
                news.id === currentNewsItem.id ? { ...news, ...formData } : news
            ));
        } else {
            const newNews = {
                id: crypto.randomUUID(),
                ...formData,
            };
            setNewsArticles([...newsArticles, newNews]);
        }
        setIsFormModalOpen(false);
        setFormData({ title: '', date: '', image: '', content: '' });
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
                        <h2 className="text-xl font-semibold text-gray-800">Daftar Berita</h2>
                        <button
                            onClick={handleAddNews}
                            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors duration-200"
                        >
                            <PlusCircle className="mr-2" size={20} /> Tambah Berita
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {newsArticles.map((news) => (
                            <DashboardNewsCard
                                key={news.id}
                                news={news}
                                handleEditNews={handleEditNews}
                                handleDeleteNews={handleDeleteNews}
                                handleViewNews={handleViewNews}
                            />
                        ))}
                    </div>
                </main>
            </div>

            <NewsForm
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                title={currentNewsItem ? "Edit Berita" : "Tambah Berita Baru"}
                formData={formData}
                handleChange={handleChange}
                handleSaveNews={handleSaveNews}
                currentNewsItem={currentNewsItem}
            />

            <ConfirmationModal
                isOpen={isConfirmationModalOpen}
                onClose={() => setIsConfirmationModalOpen(false)}
                onConfirm={handleConfirmDelete}
                message={`Apakah Anda yakin ingin menghapus berita "${currentNewsItem?.title}" ini?`}
            />

            <Modal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                title={viewingNewsItem?.title}
            >
                {viewingNewsItem && (
                    <div className="text-gray-800">
                        <img
                            src={viewingNewsItem.image}
                            alt={viewingNewsItem.title}
                            className="w-full h-64 object-cover rounded-lg mb-4"
                            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x400/CCCCCC/333333?text=Image+Not+Found"; }}
                        />
                        <p className="text-sm text-gray-600 mb-4">{viewingNewsItem.date}</p>
                        <div dangerouslySetInnerHTML={formatContentForDisplay(viewingNewsItem.content)} />
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default DashboardNews;