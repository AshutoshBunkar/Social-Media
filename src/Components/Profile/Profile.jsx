import EditProfile from "./EditProfile";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useProfile } from "../../context/ProfileContext";
import Header from "../Header/Header";

const Profile = () => {
  const { profile, updateProfile, updateAvatar } = useProfile();
  const [editPage, Setpage] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) await updateAvatar(file);
  };

  return (
    <>
      <Header />

      {showAlert && (
        <div className="fixed top-20 right-5 z-50 bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-xl shadow-lg flex items-center gap-4">
          <span className="font-medium">Profile updated successfully!</span>
          <button
            onClick={() => setShowAlert(false)}
            className="text-green-500 hover:text-green-800 focus:outline-none font-bold text-xl"
          >
            ×
          </button>
        </div>
      )}

      <div className="w-full max-w-4xl mx-auto mb-8 px-4 md:px-8 pt-6">
        {/* Back to Home */}
        <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 font-semibold mb-6 transition-colors">
          <IoArrowBack className="text-xl" />
          <span>Back to Home</span>
        </Link>

        <div className="bg-surface-light rounded-2xl shadow-soft overflow-hidden border border-gray-100 mb-8 pb-8">
          {/* Header Section (Instagram Style) */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 px-8 pt-10">
            {/* Avatar */}
            <div className="relative shrink-0">
              <img
                src={profile.image}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-sm bg-gray-50 p-1 border border-gray-200"
                alt="Profile Avatar"
              />
              <div className="absolute bottom-1 right-1 bg-white hover:bg-gray-50 text-gray-700 p-2 rounded-full cursor-pointer shadow-md transition-colors flex items-center justify-center border border-gray-200">
                <MdOutlineModeEdit className="text-lg" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  title="Change Avatar"
                />
              </div>
            </div>

            {/* User Info & Stats */}
            <div className="flex-1 flex flex-col items-center md:items-start w-full">
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-5">
                <h1 className="text-2xl font-bold font-display text-gray-900 tracking-tight">{profile.name}</h1>
                <div className="flex gap-2">
                  <button
                    onClick={() => Setpage(true)}
                    className="px-4 py-1.5 bg-gray-100 text-gray-800 font-semibold rounded-lg hover:bg-gray-200 transition-all focus:outline-none text-sm"
                  >
                    Edit Profile
                  </button>
                  <button className="px-4 py-1.5 bg-gray-100 text-gray-800 font-semibold rounded-lg hover:bg-gray-200 transition-all focus:outline-none text-sm">
                    View Archive
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mb-5 text-gray-800">
                <div className="flex gap-1.5 items-center">
                  <span className="font-bold">12</span> <span className="text-gray-600">posts</span>
                </div>
                <div className="flex gap-1.5 items-center cursor-pointer hover:text-black">
                  <span className="font-bold">1.2K</span> <span className="text-gray-600">followers</span>
                </div>
                <div className="flex gap-1.5 items-center cursor-pointer hover:text-black">
                  <span className="font-bold">450</span> <span className="text-gray-600">following</span>
                </div>
              </div>

              {/* Bio */}
              <div className="text-left w-full max-w-md">
                <p className="font-semibold text-gray-900 text-sm">Tech Influencer</p>
                <p className="text-sm text-gray-800 mt-1 whitespace-pre-wrap">{profile.bio}</p>
                <a href="#" className="text-primary-600 hover:underline font-semibold text-sm mt-1 inline-block">linktr.ee/Ashutosh</a>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center border-t border-gray-200 mb-6 sticky top-16 bg-background-light z-40 py-1">
          <button className="flex items-center gap-2 px-6 py-4 border-t-2 border-gray-900 -mt-px text-gray-900 font-bold text-xs tracking-widest uppercase">POSTS</button>
          <button className="flex items-center gap-2 px-6 py-4 border-t-2 border-transparent text-gray-500 hover:text-gray-900 font-semibold text-xs tracking-widest uppercase">SAVED</button>
          <button className="flex items-center gap-2 px-6 py-4 border-t-2 border-transparent text-gray-500 hover:text-gray-900 font-semibold text-xs tracking-widest uppercase">TAGGED</button>
        </div>

        {/* CSS Grid for Posts */}
        <div className="grid grid-cols-3 gap-1 md:gap-4 mb-12">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
            <div key={item} className="aspect-square bg-gray-200 relative group cursor-pointer overflow-hidden rounded-lg">
              <img
                src={`https://picsum.photos/400/400?random=${item}`}
                alt={`Post ${item}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white font-bold">
                <div className="flex items-center gap-2"><span className="text-xl">♥</span> 1.2k</div>
                <div className="flex items-center gap-2"><span className="text-xl">💬</span> 45</div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Overlay */}
        {editPage && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4">
            <EditProfile
              handle={profile}
              setHandle={updateProfile}
              Setpage={Setpage}
              setShowAlert={setShowAlert}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
