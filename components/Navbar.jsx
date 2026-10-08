import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import profileIcon from "@/public/images/profile-icon.png";
import Image from "next/image";

import Button from "@/components/Button";
import Sidebar from "./Sidebar";

import { useRouter } from "next/router";

const Navbar = ({ title, showBackButton }) => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // close the drawer whenever the page changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [router.asPath]);

  return (
    <div className="px-6 py-3 flex justify-between items-center border-b-2 border-gray-50">
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
          className="md:hidden -ml-3 cursor-pointer text-2xl text-gray-500 hover:bg-mintGreen p-2 rounded-full transition-colors duration-300"
        >
          <Icon icon="solar:hamburger-menu-linear" />
        </button>
        {showBackButton && (
          <Button
            className={`flex border items-center gap-3`}
            buttonProps={
              {
                onClick: () => router.back(),
              }
            }
          >
            <Icon icon="akar-icons:arrow-left" className="text-lg " />
            Back
          </Button>
        )}
        <h3 className="font-bold">
          {title ? title : <>Hi, <span className="text-gray-500">Funke!</span></>}
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
        {/* sliding sidebar */}
      <div className={`fixed inset-0 z-40 md:hidden ${sidebarOpen ? "" : "pointer-events-none"}`}>
        <div
          onClick={() => setSidebarOpen(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            sidebarOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute left-0 top-0 h-full bg-white transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Navbar;