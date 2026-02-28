export default function Register() {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-background-light">
            <div className="flex w-[80%] max-w-5xl rounded-2xl bg-surface-light shadow-soft overflow-hidden h-[75%] min-h-[550px] flex-row-reverse">
                {/* Right Side - Info */}
                <div className="basis-1/2 bg-slate-800 text-white p-12 flex flex-col justify-center">
                    <h1 className="text-5xl font-display font-bold mb-6 text-white leading-tight">Join the community.</h1>
                    <p className="text-gray-300 text-lg mb-8">Create an account to start sharing your moments with friends and family today.</p>
                    <button className="bg-white text-slate-900 font-semibold py-3 px-6 rounded-xl w-fit hover:bg-gray-100 transition-colors">Learn More</button>
                </div>

                {/* Left Side - Form */}
                <div className="basis-1/2 p-12 flex flex-col justify-center">
                    <h2 className="text-3xl font-display font-bold text-slate-800 mb-8">Register</h2>
                    <form className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Username"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-slate-500 bg-gray-50 focus:bg-white transition-all"
                        />
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-slate-500 bg-gray-50 focus:bg-white transition-all"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-slate-500 bg-gray-50 focus:bg-white transition-all"
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-slate-500 bg-gray-50 focus:bg-white transition-all"
                        />
                        <button className="w-full bg-slate-800 text-white font-semibold py-3 rounded-xl hover:bg-slate-900 transition-colors shadow-sm mt-4">
                            Sign Up
                        </button>
                        <div className="text-center mt-4">
                            <span className="text-gray-500">Already have an account? </span>
                            <a href="/login" className="text-slate-800 font-medium hover:underline">Login</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
