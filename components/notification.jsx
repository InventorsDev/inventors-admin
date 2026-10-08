"use client";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Image from "next/image";
import Bell from "@/public/images/bell.png";

const notifications = [
  {
    id: 1,
    highlight: true,
    message: (
      <>
        A new tech event titled '<span className="font-bold text-red-700">Color pyschology</span>' has been
        successfully added to the schedule
      </>
    ),
    time: "30 mins ago",
    button: "Confirm event",
  },
  {
    id: 2,
    highlight: true,
    message: "A new lead 'Omolola Adedayo' has added on the platform.",
    time: "1 hr ago",
    button: "View Lead details",
  },
  { id: 3, message: "You have a new message.", time: "1 hr ago" },
  { id: 4, message: "A new blog post titled '[UX design guide]' has been published on the platform", time: "04:05Pm" },
  { id: 5, message: "The blog post '[UX design guide]' has been updated. View the latest content", time: "09:05PM" },
  { id: 6, message: "A new blog post titled '[Pair programming]' is awaiting approval.", time: "09:05PM" },
  { id: 7, message: "The tech event '[Business strategy with UX]' has been updated. Check out the latest details.", time: "09:05PM" },
  { id: 8, message: "The blog post 'Designers Management' has been unapproved. Please review", time: "09:05PM" },
];

const getTodayLabel = () => {
  const d = new Date();
  const month = d.toLocaleString("en-GB", { month: "long" });
  return `Today, ${d.getDate()} ${month}, ${d.getFullYear()}`;
};

function Notification() {
  const isEmpty = notifications.length === 0;
  const [todayLabel, setTodayLabel] = useState("");

  useEffect(() => {
    setTodayLabel(getTodayLabel());
  }, []);

  useEffect(() => {
    document.title = "Notifications";
  }, []);

  return (
    <div className="flex h-screen">
      <div className="hidden md:flex shrink-0">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1 min-w-0">
        <Navbar className="w-full" />

        <div className="flex flex-1 min-h-0 sm:p-4">
          <section className="flex flex-1 flex-col min-h-0 sm:rounded-2xl bg-white sm:shadow-sm">
            <header className="shrink-0 px-6 pt-6 ">
              <div className="flex items-start justify-between">
                <h1 className="flex items-center gap-1.5 text-2xl font-semibold text-gray-900">
                  Notification
                  <svg width="24" height="24" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <circle cx="8" cy="8" r="7" stroke="#00B393" strokeWidth="1.5" />
                    <path d="M6.4 6.3a1.7 1.7 0 1 1 2.4 1.5c-.5.3-.8.6-.8 1.2M8 11.2v.1" stroke="#00B393" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </h1>
                <button
                  type="button"
                  // onClick={() => ()}
                  aria-label="Close notifications"
                  className="flex h-8 p-1 w-8 items-center justify-center rounded-[10px] bg-gray-100 text-gray-800 hover:bg-gray-200"
                >
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M1 1l12 12M13 1L1 13" stroke="#272727" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              {!isEmpty && <p className="mt-4 text-[16px] text-gray-700">{todayLabel}</p>}
            </header>

            <div className="flex flex-1 min-h-0 flex-col overflow-y-auto px-6 pb-6 pt-5">
              {isEmpty ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-3">
                  <Image src={Bell} alt="bell" width={150} height={150} />
                  <div className="bg-white w-[366px] max-w-full p-6 text-center">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">No notification</h2>
                    <p className="text-gray-600">
                      Your notification is empty. Once you receive a notification, it will appear here.
                    </p>
                  </div>
                </div>
              ) : (
                <ul className="gap-4 flex flex-col">
                  {notifications.map((n) => (
                    <li
                      key={n.id}
                      className={
                        n.highlight
                          ? "mb-3 rounded-[4px] bg-[#EEF8F6] p-4"
                          : "border-b border-gray-200 py-4 last:border-b-0"
                      }
                    >
                      <p className={`text-[16px] font-normal leading-relaxed ${n.highlight ? "text-gray-900" : "text-[#606060]"}`}>
                        {n.message}
                      </p>
                      <p className="mt-3 text-[14px] font-bold text-gray-900">{n.time}</p>
                      {n.button && (
                        <button
                          type="button"
                          className="mt-4 rounded-lg bg-[#00B598] px-20 py-4 text-xs font-semibold text-white hover:bg-[#009c80]"
                        >
                          {n.button}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Notification;