import { Icon } from "@iconify/react";
import profileIcon from "@/public/images/profile-icon.png";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="px-6 py-3 flex justify-between items-center border-b-2 border-gray-50">
      <div>
        <h3 className="font-bold">
          Hi, <span className="text-gray-500">Funke!</span>
        </h3>
      </div>
      <div>
        <ul className="flex items-center md:gap-x-2 gap-x-1">
          <li className="cursor-pointer text-xl text-gray-500 hover:bg-mintGreen p-3 rounded-full transition-colors duration-300">
            <Icon icon="solar:moon-line-duotone" />
          </li>
          <li className="cursor-pointer text-xl text-gray-500 hover:bg-mintGreen p-3 rounded-full transition-colors duration-300">
            <Icon icon="solar:bell-bing-line-duotone" />
          </li>
          <li className="p-3">
            <Image src={profileIcon} className="w-9" alt="Profile Icon" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
