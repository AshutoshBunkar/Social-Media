export default function Login() {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-background-light">
            <div className="flex w-[80%] max-w-5xl rounded-2xl bg-surface-light shadow-soft overflow-hidden h-[70%] min-h-[500px]">
                {/* Left Side - Info */}
                <div className="basis-1/2 bg-primary-500 text-white p-12 flex flex-col justify-center">
                    <h1 className="text-5xl font-display font-bold mb-6 text-white leading-tight">Connect with friends and the world around you.</h1>
                    <p className="text-primary-50 text-lg mb-8">Social Media helps you connect and share with the people in your life.</p>
                    <button className="bg-white text-primary-600 font-semibold py-3 px-6 rounded-xl w-fit hover:bg-primary-50 transition-colors">Know More</button>
                </div>

                {/* Right Side - Form */}
                <div className="basis-1/2 p-12 flex flex-col justify-center">
                    <h2 className="text-3xl font-display font-bold text-slate-800 mb-8">Login</h2>
                    <form className="flex flex-col gap-5">
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-50 focus:bg-white transition-all"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-gray-50 focus:bg-white transition-all"
                        />
                        <button className="w-full bg-primary-600 text-white font-semibold py-3 rounded-xl hover:bg-primary-700 transition-colors shadow-sm mt-2">
                            Log In
                        </button>
                        <div className="text-center mt-4">
                            <span className="text-gray-500">Don't have an account? </span>
                            <a href="/register" className="text-primary-600 font-medium hover:underline">Register</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
