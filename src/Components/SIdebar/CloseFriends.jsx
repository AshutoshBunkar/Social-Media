import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";

const CloseFriends = ({ user }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <li className="flex justify-between items-center py-2 px-2 hover:bg-gray-50 rounded-xl transition-colors group">
      <div className="flex items-center gap-3 cursor-pointer">
        {user.profilePicture ? (
          <img
            src={user.profilePicture}
            className="w-10 h-10 rounded-full object-cover border border-gray-100"
            alt="Profile"
          />
        ) : (
          <FaUserCircle className="w-10 h-10 text-gray-400" />
        )}
        <div className="flex flex-col">
          <span className="font-semibold text-gray-800 text-sm group-hover:text-primary-600 transition-colors leading-tight">{user.username}</span>
          <span className="text-xs text-gray-500">{user.userId || "@user"}</span>
        </div>
      </div>

      <button
        className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${isFollowing
            ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
            : "bg-primary-50 text-primary-600 hover:bg-primary-100"
          }`}
        onClick={() => setIsFollowing(!isFollowing)}
      >
        {isFollowing ? "Following" : "Follow"}
      </button>
    </li>
  );
};

export default CloseFriends;
