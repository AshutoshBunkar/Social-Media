import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="w-full bg-gray-900 text-gray-400 border-t border-gray-800">
            <div className="max-w-[1600px] mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
                <span className="font-semibold text-gray-300 tracking-wide">SocialApp</span>
                <p>
                    Made with <span className="text-red-400">❤️</span> by <span className="text-gray-200 font-medium">Ashutosh</span> · India · © {new Date().getFullYear()}
                </p>
                <div className="flex items-center gap-3">
                    <a href="#" className="hover:text-white transition-colors"><FaGithub /></a>
                    <a href="#" className="hover:text-blue-400 transition-colors"><FaLinkedin /></a>
                    <a href="#" className="hover:text-sky-400 transition-colors"><FaTwitter /></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
