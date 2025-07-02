import { Icon } from "@iconify/react";
import { MenuBoard } from "iconsax-reactjs";
import Image from "next/image";

const ContentCard = ({ type, content, onApprove, onDelete, image }) => {
  const isBlog = type === "blog";
  const icon = isBlog ? (
    <Icon icon={"mdi:rss"} className="mr-2 text-lg" />
  ) : (
    <MenuBoard size={20} className="mr-2" variant="Bold" />
  );
  const label = isBlog ? "Blog" : "Event";
  return (
    <div className="bg-white rounded-xl space-y-6">
      {image ? (
        <Image
          src={image}
          alt={content.title || label}
          width={400}
          height={192}
          className="h-48 w-full object-cover rounded-xl"
        />
      ) : (
        <div className="h-48 bg-gray-300 rounded-md" />
      )}
      <div className="flex items-center justify-between">
        <span
          className={`flex items-center text-sm px-4 py-2 rounded-full ${
            isBlog
              ? "text-orange-600 bg-orange-100"
              : "text-primaryGreen bg-mintGreen"
          }`}
        >
          {icon}
          {label}
        </span>
        <div className="flex items-center space-x-2">
          <button
            className="hover:bg-primaryGreen bg-teal-600 text-white text-md px-4 py-2 rounded-md"
            onClick={onApprove}
          >
            Approve
          </button>
          <button
            className="p-2 text-red-500 hover:text-red-600"
            onClick={onDelete}
          >
            <Icon icon="fluent:delete-24-regular" className="text-xl" />
          </button>
        </div>
      </div>
      <div className="py-5 text-lg font-medium text-gray-800 leading-snug">
        {content.title.length > 60
          ? content.title.slice(0, 57) + "..."
          : content.title}
      </div>
      <div className="flex items-center space-x-3">
        <Image
          src="/images/profile-image.png"
          alt={content.author || "Author"}
          width={40}
          height={40}
          className="w-10 h-10 bg-orange-400 rounded-full"
        />
        <div className="text-base text-gray-800">
          <div className="font-semibold">{content.author}</div>
          {isBlog ? (
            <div className="text-sm text-gray-400">
              {content.role} • {content.readTime}
            </div>
          ) : (
            <div className="text-sm text-gray-400">
              <span>
                {content.date} • {content.platform} • {content.eventTime}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
