import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { fileToBase64 } from "../../utils/storage";

const EditProfile = ({ setHandle, handle, Setpage, setShowAlert }) => {
  const [formValues, setFormValues] = useState({
    image: handle.image || "",
    name: handle.name || "",
    bio: handle.bio || "",
  });

  // Handle file input with base64 conversion
  const fileHandle = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setFormValues((prev) => ({ ...prev, image: base64 }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setHandle(formValues); // Parent now persists via updateHandle
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
    Setpage(false);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h2 className="text-xl font-bold font-display text-gray-900">Edit Profile</h2>
        <button
          type="button"
          onClick={() => Setpage(false)}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
        >
          <IoClose className="text-xl" />
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Profile Picture */}
        <div className="flex items-center gap-5">
          <img
            className="w-20 h-20 rounded-full object-cover border-2 border-gray-100 shrink-0"
            src={formValues.image || "/images/s1.png"}
            alt="profile"
          />
          <div className="flex flex-col gap-1">
            <label className="text-primary-600 font-semibold text-sm cursor-pointer hover:underline">
              Change Photo
              <input
                type="file"
                accept="image/*"
                onChange={fileHandle}
                className="hidden"
              />
            </label>
            <span className="text-xs text-gray-400">JPG, PNG. Max 5MB.</span>
          </div>
        </div>

        {/* Name Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Name</label>
          <input
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-300 transition-all"
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formValues.name}
            onChange={handleInputChange}
          />
        </div>

        {/* Bio Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Bio</label>
          <textarea
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-300 transition-all resize-none"
            name="bio"
            placeholder="Tell us about yourself"
            rows={3}
            value={formValues.bio}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">
        <button
          type="button"
          onClick={() => Setpage(false)}
          className="px-5 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 text-sm font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditProfile;
