import Header from "../Header/Header";
import Sidebar from "../SIdebar/Sidebar";
import Feed from "../Feed/Feed";
import Rightbar from "../Rightbar/Rightbar";
import Footer from "../Footer/Footer";

export default function Home() {
  return (
    <div className="bg-background-light min-h-screen flex flex-col">
      <Header />

      <div className="flex w-full max-w-[1600px] mx-auto justify-center flex-1">
        {/* Left Sidebar - Hidden on smaller screens */}
        <div className="hidden lg:block w-[280px] xl:w-[320px] shrink-0">
          <Sidebar />
        </div>

        {/* Main Feed */}
        <div className="flex-1 w-full max-w-3xl">
          <Feed />
        </div>

        {/* Right Sidebar - Hidden on md screens */}
        <div className="hidden md:block w-[300px] xl:w-[350px] shrink-0">
          <Rightbar />
        </div>
      </div>

      <Footer />
    </div>
  );
}
