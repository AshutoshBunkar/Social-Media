import { FaCircle } from "react-icons/fa";

const OnlineUser = ({ user }) => {
  return (
    <li
      className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
      onClick={() => alert(`Opening chat with ${user.username}...`)}
      title={`Message ${user.username}`}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            className="w-10 h-10 rounded-full object-cover border-2 border-transparent group-hover:border-primary-100 transition-colors"
            src={user.profilePicture || "/images/s1.png"}
            alt={user.username}
          />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        <span className="font-medium text-gray-700 group-hover:text-primary-600 transition-colors">{user.username}</span>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="bg-primary-50 text-primary-600 text-xs font-semibold px-2 py-1 rounded-md">Chat</span>
      </div>
    </li>
  );
};

export default OnlineUser;
