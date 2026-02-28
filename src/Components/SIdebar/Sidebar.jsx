import React, { useState } from "react";
import { MdRssFeed, MdSlowMotionVideo, MdEventNote } from "react-icons/md";
import { IoIosChatbubbles } from "react-icons/io";
import { FaUserGroup, FaRegBookmark } from "react-icons/fa6";
import { PiBagSimple } from "react-icons/pi";
import { GoQuestion } from "react-icons/go";
import { Users } from "../../dummyData";
import CloseFriends from "./CloseFriends";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [dropdown, setDropdown] = useState(false);

  const dropdownHandle = () => {
    setDropdown(!dropdown);
  };

  // Mocking paths for functionality demonstration
  const menuItems = [
    { icon: <MdRssFeed className="text-xl" />, text: "Feed", path: "/" },
    { icon: <IoIosChatbubbles className="text-xl" />, text: "Chats", path: "/chats" },
    { icon: <MdSlowMotionVideo className="text-xl" />, text: "Videos", path: "/videos" },
    { icon: <FaUserGroup className="text-xl" />, text: "Groups", path: "/groups" },
    { icon: <FaRegBookmark className="text-xl" />, text: "Bookmarks", path: "/bookmarks" },
    { icon: <PiBagSimple className="text-xl" />, text: "Jobs", path: "/jobs" },
    { icon: <MdEventNote className="text-xl" />, text: "Events", path: "/events" },
    { icon: <GoQuestion className="text-xl" />, text: "Questions", path: "/questions" },
  ];

  return (
    <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto px-6 py-8 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
      <ul className="space-y-2 mb-8 border-b border-gray-100 pb-8">
        {menuItems.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl cursor-pointer transition-all font-medium group ${isActive
                  ? "bg-primary-50 text-primary-700 font-bold"
                  : "text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                }`
              }
            >
              <div className="text-gray-500 group-hover:text-primary-500 transition-colors">
                {item.icon}
              </div>
              <span>{item.text}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="w-full mb-6 px-4 py-3 font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-xl transition-colors flex justify-center items-center"
        onClick={dropdownHandle}
      >
        {dropdown ? "Hide Suggestions" : "Show Suggestions"}
      </button>

      <div className="ShowMore">
        {dropdown && (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-500 text-sm uppercase tracking-wider mb-4 px-2">People you may know</h4>
            <ul>
              {Users.slice(0, 5).map((u) => (
                <CloseFriends key={u.id} user={u} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
