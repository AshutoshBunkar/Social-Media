import { IoGift } from "react-icons/io5";
import { Users } from "../../dummyData";
import OnlineUser from "./OnlineUser";
import { Adimg } from "../../dummyData";
import { useEffect, useState } from "react";

const Rightbar = () => {
  const [inx, setInx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setInx((prev) => (prev === Adimg.length - 1 ? 0 : prev + 1));
    }, 3000); // Changed to 3s for less aggressive flashing
    return () => clearInterval(interval);
  }, [Adimg.length]);

  return (
    <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto px-4 py-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
      <div className="flex flex-col gap-6">

        {/* Birthday Notification */}
        <div className="bg-surface-light p-4 rounded-xl shadow-soft border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer">
          <IoGift className="text-orange-500 text-4xl shrink-0 animate-bounce" />
          <span className="text-sm text-gray-700 leading-snug">
            <b className="text-gray-900">Ashutosh</b> and <b className="text-gray-900">3 other friends</b> have a birthday today.
          </span>
        </div>

        {/* Ad Image */}
        <div className="rounded-xl overflow-hidden shadow-soft border border-gray-100 relative group cursor-pointer">
          <img
            className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
            src={Adimg[inx].img}
            alt={`Sponsored Content ${inx}`}
          />
          <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-md uppercase tracking-wider">
            Sponsored
          </div>
        </div>

        {/* Online Friends */}
        <div className="bg-surface-light rounded-xl shadow-soft border border-gray-100 p-5 mt-2">
          <h4 className="text-lg font-bold text-gray-800 mb-4 font-display">Online Friends</h4>
          <ul className="space-y-4">
            {Users.map((u) => (
              <OnlineUser key={u.id} user={u} />
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Rightbar;
