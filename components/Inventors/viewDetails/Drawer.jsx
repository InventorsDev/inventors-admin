"use client";

import { useState } from "react";
import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import ProfileImage from "../../../public/images/demo-pics.png";

export default function LeadDetailsModal({ open, onClose, lead }) {
  if (!lead) return null;

  const handleAction = (action) => {
    console.log(`Lead ${action}:`, lead.name);
    onClose();
  };

  const renderTextWithLabel = (label, text, fallback) => (
    <div className="flex text-md gap-1">
      <p className="text-[#909090]">{label}:</p>
      <p className="text-gray-800">{text || fallback}</p>
    </div>
  );

  const renderLinkWithLabel = (label, url, fallback) => (
    <div className="flex text-md gap-1">
      <p className="text-[#909090]">{label}:</p>
      <p className="text-gray-800">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {url || fallback}
        </a>
      </p>
    </div>
  );

  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-15 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden ">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex w-[65%] pl-10 ">
            <DialogPanel
              transition
              className="pointer-events-auto relative bg-white p-5 transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700 w-full"
            >
              <TransitionChild>
                <div className="absolute right-0 top-0 flex pt-4 duration-500 ease-in-out data-[closed]:opacity-0 ">
                  <button
                    type="button"
                    onClick={onClose}
                    className="relative text-gray-300 mr-5 border-2 rounded-full border-black w-fit hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                    aria-label="Close panel"
                  >
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Close panel</span>
                    <XMarkIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-black"
                    />
                  </button>
                </div>
              </TransitionChild>
              <div className="bg-[#E7F8F5] mt-10">
                <div className="flex h-full flex-col overflow-y-scroll w-full py-6">
                  <div className="px-4 sm:px-6 flex gap-3 justify-end">
                    <Button
                      onClick={() => handleAction("declined")}
                      className="border border-destructive text-destructive flex gap-1 py-3 px-5 rounded-md"
                    >
                      Decline
                    </Button>
                    <Button
                      onClick={() => handleAction("approved")}
                      className="bg-[#00977F] text-white flex gap-1 py-3 px-5 rounded-md"
                    >
                      Approve
                    </Button>
                  </div>

                  <div className="relative py-5 px-10 flex-1 space-y-5">
                    <div className="bg-white p-5 w-full flex gap-5 items-center rounded-lg">
                      <Image
                        src={lead.profileImage || ProfileImage}
                        width={230}
                        height={230}
                        alt={lead.name}
                        className="rounded-full"
                        onError={(e) => {
                          e.target.src = ProfileImage;
                        }}
                      />
                      <div>
                        <div className="flex items-center gap-3">
                          <h2 className="text-2xl font-semibold">
                            {lead.name}
                          </h2>
                          <p className="text-gray-500 flex gap-1">
                            {lead.position || "No Job Title"}
                            <span className="text-primary">
                              @ {lead.company || "No Company"}
                            </span>
                          </p>
                        </div>
                        <div className="flex italic justify-between">
                          <div className="space-y-1 mt-2">
                            {renderTextWithLabel(
                              "Email",
                              lead.email,
                              "No Email"
                            )}
                            {renderTextWithLabel(
                              "Phone number",
                              lead.phone,
                              "No Phone Number"
                            )}
                            {renderTextWithLabel(
                              "Location",
                              lead.location,
                              "No Location"
                            )}
                            <div className="flex text-md gap-1 mt-10">
                              <p className="text-[#909090]">
                                Areas of Interest:
                              </p>
                              <p className="text-gray-800">
                                {lead.interests || "No Interests"}
                              </p>
                            </div>
                          </div>
                          <div className="border h-14 border-y-4"></div>
                          <div className="space-y-1 mt-2">
                            {renderTextWithLabel(
                              "Experience",
                              lead.experience,
                              "No Experience"
                            )}
                            {renderTextWithLabel(
                              "Primary skill",
                              lead.primarySkill,
                              "No Primary Skill"
                            )}
                            {renderTextWithLabel(
                              "Secondary skill",
                              lead.secondarySkill,
                              "No Secondary Skill"
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-full h-auto bg-white px-6 py-8 rounded-lg">
                      <div className="flex items-start gap-2 w-[100%]">
                        <div className="space-y-5 w-[50%]">
                          <h2 className="font-semibold uppercase text-xl">
                            Bio/Short Description
                          </h2>
                          <p className="italic text-[#6B6B6B]">
                            {lead.bio || "No bio available"}
                          </p>
                        </div>
                        <div className="border mx-5 h-24 border-y-4"></div>
                        <div className="w-[50%] pl-5">
                          <h2 className="text-xl font-semibold mb-4 ">
                            TECHNOLOGIES/TOOLS
                          </h2>
                          <div className="flex flex-wrap gap-7">
                            {lead.technologies?.length ? (
                              lead.technologies.map((tech, index) => (
                                <span
                                  key={index}
                                  className="px-4 py-2 bg-[#E0F7F1] rounded-full text-gray-700"
                                >
                                  {tech}
                                </span>
                              ))
                            ) : (
                              <p className="text-gray-500">
                                No technologies listed
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-full h-auto bg-white px-6 py-8 rounded-lg space-y-5">
                      <h2 className="font-semibold text-xl uppercase">
                        Contact Info
                      </h2>
                      <div className="flex italic justify-between">
                        <div className="space-y-1 mt-2">
                          {renderLinkWithLabel(
                            "Skill Profile URL",
                            lead.skillProfileURL,
                            "No URL"
                          )}
                          {renderLinkWithLabel(
                            "Personal website (Portfolio)",
                            lead.personalWebsite,
                            "No URL"
                          )}
                          {renderLinkWithLabel(
                            "X (Twitter)",
                            lead.twitter,
                            "No Twitter"
                          )}
                        </div>
                        <div className="border mx-5 h-14 border-y-4"></div>
                        <div className="space-y-1 mt-2">
                          {renderLinkWithLabel(
                            "LinkedIn",
                            lead.linkedin,
                            "No LinkedIn"
                          )}
                          {renderLinkWithLabel(
                            "Facebook",
                            lead.facebook,
                            "No Facebook"
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
