import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { Icon } from "@iconify/react";

import logoDark from "@/public/images/logo-dark.png";

const 
Sidebar = () => {
  const router = useRouter();
  const topMenuItems = [
    {
      title: "Overview",
      link: "/",
      icon: "solar:widget-bold",
    },
    {
      title: "Notification",
      link: "/notification",
      icon: "solar:bell-bold",
    },
    {
      title: "Events",
      link: "/events",
      icon: "solar:calendar-bold",
    },
    {
      title: "Inventors",
      link: "/inventors",
      icon: "solar:user-bold",
    },
    {
      title: "Blog",
      link: "/blog",
      icon: "tabler:rss",
    },
  ];

  const bottomMenuItems = [
    {
      title: "Invite",
      link: "/invite",
      icon: "fa6-solid:user-tag",
      classNames: "bg-orange-50 text-orange-500",
    },
    {
      title: "Settings",
      link: "/settings",
      icon: "mi:filter",
      classNames: "bg-teal-50 text-teal-500",
    },
    {
      title: "Logout",
      link: "/logout",
      icon: "solar:logout-bold-duotone",
      classNames: "text-red-600",
    },
  ];

  return (
    <div className="w-[260px] h-screen overflow-auto px-6 py-8 border-r-2 border-gray-50">
      <div className="h-full flex flex-col">
        <div className="____nav-brand___">
          <Link href="/">
            <Image src={logoDark} className="w-32" alt="Inventors Logo" />
          </Link>
        </div>
        <div className="mt-10 pb-2 border-b border-gray-100 text-lightGray">
          <span className="text-xs ps-4 font-medium">Panel</span>
          <ul className="mt-4 flex flex-col gap-y-2 list-none">
            {topMenuItems.map((menuItem, i) => (
              <li className="text-sm" key={i}>
                <Link
                  className={`flex items-center rounded-xl ps-4 py-3 gap-3 ${router.pathname === menuItem.link
                    ? "bg-primaryGreen text-white shadow-xl shadow-teal-50"
                    : "text-gray-600"
                    }`}
                  href={menuItem.link}
                >
                  <Icon icon={menuItem.icon} className="text-lg" />
                  <span>{menuItem.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-auto pt-2 border-t border-gray-100">
          <ul className="mt-4 flex flex-col gap-y-4 list-none">
            {bottomMenuItems.map((menuItem, i) => (
              <li className="text-sm font-medium" key={i}>
                <Link
                  className={`flex items-center rounded-full ps-4 py-3 gap-3 ${menuItem.classNames}`}
                  href={menuItem.link}
                >
                  <Icon icon={menuItem.icon} className="text-lg" />
                  <span>{menuItem.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
