import { useState } from "react";

const LoginPageFragment = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = (e) => {
        e.preventDefault(); 

        if (username === 'user' && password === 'password') {
            setErrorMessage('');
            console.log('Login successful!', { username, password });

            alert('Login Successful!');
        } else {
            setErrorMessage('Invalid username or password.');
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 font-sans text-gray-800 p-4 mt-20">
            <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden">
                <div className="lg:w-1/2 bg-gray-200 flex items-center justify-center p-6 lg:p-10">
                    <img
                        src="https://placehold.co/600x400/A7D9FF/000000?text=Welcome+to+Rijang+Pittu" // Placeholder image
                        alt="Welcome to Rijang Pittu"
                        className="w-full h-auto object-cover rounded-lg shadow-lg max-h-[400px] lg:max-h-full"
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/cccccc/000000?text=Image+Not+Found"; }} // Fallback image
                    />
                </div>

                <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">Login</h2>
                    <p className="text-gray-600 text-center mb-8">Masuk untuk mengakses dashboard Anda.</p>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                placeholder="Masukkan username Anda"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                                placeholder="Masukkan password Anda"
                                required
                            />
                        </div>

                        {errorMessage && (
                            <p className="text-red-600 text-sm text-center">{errorMessage}</p>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-[1.01]"
                        >
                            Login
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-gray-600">
                        <p>&copy; 2025 Rijang Pittu. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoginPageFragment