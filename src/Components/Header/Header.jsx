import { IoMdSearch } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import { IoIosChatbubbles } from "react-icons/io";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useProfile } from "../../context/ProfileContext";

const Header = () => {
  const { profile } = useProfile();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Searching for: ${searchQuery}`);
      setSearchQuery("");
    }
  };

  // Close all dropdowns when clicking outside
  const closeAll = () => {
    setShowProfileMenu(false);
    setShowNotifications(false);
    setShowMessages(false);
  };

  return (
    <div className="sticky top-0 w-full flex justify-between items-center bg-white/90 backdrop-blur-md h-16 z-50 border-b border-gray-100 shadow-sm px-6 transition-all">
      <div className="left flex items-center gap-4">
        <Link to="/" className="app-name text-2xl font-bold font-display text-primary-600 tracking-tight">SocialApp</Link>
      </div>

      {/* Middle part - Search */}
      <div className="mid hidden md:flex flex-1 justify-center px-8 max-w-2xl">
        <form onSubmit={handleSearch} className="input flex items-center bg-gray-100/80 hover:bg-gray-100 rounded-full w-full px-4 py-2 transition-colors border border-transparent focus-within:border-primary-300 focus-within:bg-white focus-within:shadow-sm">
          <IoMdSearch className="text-xl text-gray-500 mr-2" />
          <input
            className="bg-transparent w-full outline-none text-gray-700 placeholder-gray-400 font-medium"
            type="text"
            placeholder="Search for friends, posts or videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      {/* Right part - Interactions */}
      <div className="right flex items-center gap-6">
        <div className="links hidden lg:flex items-center gap-6 text-sm font-semibold text-gray-600">
          <Link to="/" className="hover:text-primary-600 transition-colors">Homepage</Link>
        </div>

        <div className="icons flex items-center gap-4 relative">

          {/* Messages */}
          <div className="relative cursor-pointer text-gray-600 hover:text-primary-600 transition-colors"
            onClick={() => { setShowMessages(!showMessages); setShowNotifications(false); setShowProfileMenu(false); }}>
            <IoIosChatbubbles className="text-2xl" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">2</span>

            {showMessages && (
              <div className="absolute top-10 right-[-60px] w-64 bg-white rounded-xl shadow-lg border border-gray-100 p-4 z-50 cursor-default" onClick={e => e.stopPropagation()}>
                <h4 className="font-bold text-gray-800 mb-2 border-b pb-2">Messages</h4>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg cursor-pointer transition-colors">
                    <img src="/images/p1.png" className="w-8 h-8 rounded-full object-cover" alt="user" />
                    <div className="text-sm">
                      <p className="font-semibold">Safak Kocaoglu</p>
                      <p className="text-gray-500 text-xs truncate w-40">Hey, how are you doing?</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg cursor-pointer transition-colors">
                    <img src="/images/p2.png" className="w-8 h-8 rounded-full object-cover" alt="user" />
                    <div className="text-sm">
                      <p className="font-semibold">Janell Shrum</p>
                      <p className="text-gray-500 text-xs truncate w-40">See you tomorrow!</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative cursor-pointer text-gray-600 hover:text-primary-600 transition-colors"
            onClick={() => { setShowNotifications(!showNotifications); setShowMessages(false); setShowProfileMenu(false); }}>
            <IoIosNotifications className="text-2xl" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">1</span>

            {showNotifications && (
              <div className="absolute top-10 right-[-20px] w-64 bg-white rounded-xl shadow-lg border border-gray-100 p-4 z-50 cursor-default" onClick={e => e.stopPropagation()}>
                <h4 className="font-bold text-gray-800 mb-2 border-b pb-2">Notifications</h4>
                <div className="flex flex-col gap-2">
                  <div className="text-sm text-gray-600 p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <b>Alex Durden</b> liked your post.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile Menu - Shows actual profile picture */}
          <div className="relative transition-colors cursor-pointer ml-2"
            onClick={() => { setShowProfileMenu(!showProfileMenu); setShowNotifications(false); setShowMessages(false); }}>
            <img
              src={profile.image}
              alt={profile.name}
              className="w-9 h-9 rounded-full object-cover border-2 border-transparent hover:border-primary-300 transition-all"
            />

            {showProfileMenu && (
              <div className="absolute top-12 right-0 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 flex flex-col cursor-default">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
                  <img src={profile.image} className="w-10 h-10 rounded-full object-cover" alt={profile.name} />
                  <div>
                    <p className="font-bold text-sm text-gray-900">{profile.name}</p>
                    <p className="text-xs text-gray-500">View your profile</p>
                  </div>
                </div>
                <Link to="/profile/me" className="px-4 py-2 hover:bg-gray-50 text-gray-700 font-medium transition-colors text-sm">My Profile</Link>
                <button onClick={() => alert("Settings opened")} className="px-4 py-2 hover:bg-gray-50 text-gray-700 font-medium text-left transition-colors cursor-pointer text-sm">Settings</button>
                <hr className="my-1 border-gray-100" />
                <button onClick={() => window.location.href = '/login'} className="px-4 py-2 hover:bg-red-50 text-red-600 font-medium text-left transition-colors cursor-pointer text-sm">Logout</button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Header;
