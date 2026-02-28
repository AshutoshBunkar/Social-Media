import { FcGallery } from "react-icons/fc";
import { FaTag } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { BsEmojiHeartEyesFill } from "react-icons/bs";
import { useState } from "react";
import { fileToBase64 } from "../../utils/storage";
import { useProfile, CURRENT_USER_ID } from "../../context/ProfileContext";

const Share = ({ addPost }) => {
  const { profile } = useProfile();
  const [desc, setDesc] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [showPhotoInput, setShowPhotoInput] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      const base64 = await fileToBase64(file);
      setPhotoPreview(base64);
    }
  };

  const handleShare = () => {
    if (desc || photoPreview) {
      const newPost = {
        id: Date.now(),
        desc: desc || null,
        photo: photoPreview || null,
        date: new Date().toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
        userId: CURRENT_USER_ID,
        like: 0,
        comment: 0,
        comments: [],
        isLiked: false,
      };
      addPost(newPost);
      setDesc("");
      setPhoto(null);
      setPhotoPreview(null);
      setShowPhotoInput(false);
    } else {
      alert("Please provide a description or photo!");
    }
  };

  return (
    <div className="w-full bg-surface-light rounded-2xl shadow-soft overflow-hidden border border-gray-100">
      <div className="p-5">
        <div className="flex items-center gap-4">
          <img
            className="w-12 h-12 rounded-full object-cover shadow-sm border border-gray-100"
            src={profile.image}
            alt={profile.name}
          />
          <input
            className="flex-1 bg-gray-50 hover:bg-gray-100 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100 placeholder-gray-500 font-medium px-5 py-3 rounded-full transition-all duration-200"
            placeholder="What's on your mind?"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleShare(); }}
          />
        </div>

        {showPhotoInput && (
          <div className="mt-4 p-4 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
            <input
              className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 cursor-pointer"
              type="file"
              accept="image/*"
              onChange={handleFile}
            />
            {photoPreview && (
              <div className="mt-3 rounded-lg overflow-hidden border border-gray-200">
                <img src={photoPreview} alt="Preview" className="w-full max-h-48 object-contain bg-white" />
              </div>
            )}
          </div>
        )}

        <hr className="my-5 border-gray-100" />

        <div className="flex justify-between items-center px-2">
          <div className="flex gap-2 sm:gap-6">
            <div
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors group"
              onClick={() => setShowPhotoInput(!showPhotoInput)}
            >
              <FcGallery className="text-2xl group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold text-gray-600 group-hover:text-gray-900 hidden sm:block">Photo / Video</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors group">
              <FaTag className="text-xl text-blue-600 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold text-gray-600 group-hover:text-gray-900 hidden sm:block">Tag</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors group">
              <FaLocationDot className="text-xl text-green-600 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold text-gray-600 group-hover:text-gray-900 hidden sm:block">Location</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors group">
              <BsEmojiHeartEyesFill className="text-xl text-yellow-500 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold text-gray-600 group-hover:text-gray-900 hidden sm:block">Feeling</span>
            </div>
          </div>

          <button
            className="bg-primary-600 text-white font-semibold px-6 py-2 rounded-xl shadow-sm hover:bg-primary-700 hover:shadow transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleShare}
            disabled={!desc && !photoPreview}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Share;
