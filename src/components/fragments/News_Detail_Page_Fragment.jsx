import NewsSuggestionCard from "../elements/NewsSuggestionCard";

const mainNewsArticle = {
    title: "Peningkatan Kualitas Pendidikan di Daerah Terpencil Melalui Program Digitalisasi",
    date: "Senin, 10 Februari 2025",
    image: "https://placehold.co/800x400/4CAF50/FFFFFF?text=Main+News+Image", // Placeholder image for the main article
    content: `
      <p class="mb-4">
        Pemerintah Kabupaten Sidenreng Rappang terus berkomitmen untuk meningkatkan kualitas pendidikan, terutama di daerah-daerah terpencil. Salah satu inisiatif terbaru adalah peluncuran program digitalisasi pendidikan yang bertujuan untuk menjembatani kesenjangan akses informasi dan teknologi antara wilayah perkotaan dan pedesaan.
      </p>
      <p class="mb-4">
        Program ini mencakup penyediaan perangkat keras seperti tablet dan laptop, akses internet gratis di sekolah-sekolah, serta pelatihan bagi guru-guru dalam memanfaatkan teknologi untuk proses belajar mengajar. Diharapkan dengan adanya program ini, siswa-siswa di daerah terpencil dapat memiliki kesempatan yang sama untuk mengakses sumber belajar yang berkualitas dan mengembangkan potensi diri mereka.
      </p>
      <p class="mb-4">
        Kepala Dinas Pendidikan Kabupaten Sidenreng Rappang, Bapak Dr. H. Andi Nur, menyatakan bahwa program digitalisasi ini merupakan langkah strategis untuk mempersiapkan generasi muda menghadapi tantangan di era revolusi industri 4.0. "Kami percaya bahwa pendidikan adalah kunci kemajuan, dan dengan digitalisasi, kami ingin memastikan tidak ada satu pun anak di daerah kami yang tertinggal," ujarnya dalam sambutan peresmian program.
      </p>
      <p class="mb-4">
        Selain itu, program ini juga akan melibatkan kolaborasi dengan berbagai pihak, termasuk universitas dan komunitas teknologi, untuk mengembangkan konten edukasi digital yang relevan dan menarik. Dengan demikian, diharapkan program ini dapat berkelanjutan dan memberikan dampak positif jangka panjang bagi pendidikan di Kabupaten Sidenreng Rappang.
      </p>
    `,
};

const newsSuggestions = [
    {
        id: 1,
        title: "KKN Tematik (KKNT) 113 Kel. Desa Tanah Jaya Unihas, Adakan Sosialisasi Teknologi Biopori",
        date: "Sabtu, 8 Februari 2025",
        image: "https://placehold.co/150x100/FF5722/FFFFFF?text=News+Image+1",
    },
    {
        id: 2,
        title: "Inovasi Pertanian Modern: Solusi Ketahanan Pangan di Era Globalisasi",
        date: "Rabu, 12 Februari 2025",
        image: "https://placehold.co/150x100/2196F3/FFFFFF?text=News+Image+3",
    },
    {
        id: 3,
        title: "Peningkatan Ekonomi Lokal Melalui UMKM Digital",
        date: "Jumat, 14 Februari 2025",
        image: "https://placehold.co/150x100/9C27B0/FFFFFF?text=News+Image+4",
    },
    {
        id: 4,
        title: "Pengembangan Pariwisata Berbasis Komunitas di Sidenreng Rappang",
        date: "Minggu, 16 Februari 2025",
        image: "https://placehold.co/150x100/FFC107/FFFFFF?text=News+Image+5",
    },
];

const NewsDetailPageFragment = () => {
    return (
        <section className="container mx-auto p-6 mt-20">
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3 bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                        {mainNewsArticle.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-6 flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-2 text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        {mainNewsArticle.date}
                    </p>
                    <img
                        src={mainNewsArticle.image}
                        alt={mainNewsArticle.title}
                        className="w-full h-auto rounded-lg mb-8 object-cover shadow-md"
                    />
                    <div
                        className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: mainNewsArticle.content }}
                    ></div>
                </div>

                <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 pb-3 border-blue-500">
                        Berita Lainnya
                    </h3>
                    <div className="space-y-6">
                        {newsSuggestions.map((news) => (
                            <NewsSuggestionCard
                                key={news.id}
                                id={news.id}
                                slug={news.slug}
                                title={news.title}
                                date={news.date}
                                image={news.image}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default NewsDetailPageFragment;