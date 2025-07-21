const LandingPage = () => {
    return (
        <>
            <header class="bg-white shadow">
            <div class="container mx-auto px-4 py-4 flex justify-between items-center">
                <div class="text-2xl font-bold text-blue-600 flex">
                    <img src="images/logo-sidenreng-rappang.png" className="w-14 h-14"/>
                </div>
                <nav class="space-x-6 hidden md:flex">
                <a href="#" class="text-gray-600 hover:text-blue-600">Home</a>
                <a href="#" class="text-gray-600 hover:text-blue-600">About</a>
                <a href="#" class="text-gray-600 hover:text-blue-600">Services</a>
                <a href="#" class="text-gray-600 hover:text-blue-600">Contact</a>
                </nav>
                <div class="md:hidden">
                <button id="mobile-menu-button" class="text-gray-600 hover:text-blue-600">
                    ☰
                </button>
                </div>
            </div>
            </header>
            <section class="bg-blue-50 py-20">
                <div class="container mx-auto px-4 text-center">
                    <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                    Welcome to <span class="text-blue-600">MyBrand</span>
                    </h1>
                    <p class="text-lg text-gray-600 mb-8">
                    We provide the best solutions to help you grow your business.
                    </p>
                    <a href="#" class="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
                    Get Started
                    </a>
                </div>
            </section>
        </>
    );
}

export default LandingPage