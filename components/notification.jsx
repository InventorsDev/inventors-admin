import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Image from "next/image";
import Bell from "@/public/images/bell.png";

function Notification() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar className="w-full" />
        
        <div className="flex-1 flex flex-col items-center justify-center gap-3">
          <Image src={Bell} alt="bell" width={150} height={150} />
          <div className="bg-white w-[366px] p-6 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">No notification</h2>
            <p className="text-gray-600">
              Your notification is empty. Once you receive a notification, it will appear here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notification;
