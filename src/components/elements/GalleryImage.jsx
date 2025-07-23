const GalleryImage = ({ src, title }) => {
    return (
        <div className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
            <img
                src={src}
                alt={title}
                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white text-sm font-semibold p-4">{title}</p>
            </div>
        </div>
    );
};

export default GalleryImage;