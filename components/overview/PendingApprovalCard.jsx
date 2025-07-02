import { Icon } from "@iconify/react";
import { Profile } from "iconsax-reactjs";

const PendingApprovalCard = ({
  name,
  email,
  role,
  department,
  onApprove,
  onDelete,
}) => {
  return (
    <div className="border-2 rounded-xl flex flex-col justify-between items-center border-gray-300 p-4 space-y-6 h-full">
      <div>
        <div className="rounded-full h-28 w-28 flex items-center justify-center bg-gray-300"></div>
        <div className="mt-7">
          <span className="flex items-center justify-center text-base p-2 rounded-full text-amber-600 bg-amber-100">
            <Profile size={20} className="mr-2" variant="Bold" />
            {role}
          </span>
        </div>
      </div>
      <div>
        <p className="text-2xl font-semibold text-center">{name}</p>
        <div className="text-sm text-gray-400 text-center">
          {department} • {email}
        </div>
      </div>
      <div className="flex items-center gap-2 w-full">
        <button
          className="flex-1 flex items-center justify-center bg-teal-600 hover:bg-primaryGreen text-white text-base font-medium px-4 py-3 rounded-md transition"
          onClick={onApprove}
        >
          <Icon icon="solar:verified-check-linear" className="mr-3 text-2xl" />
          Approve
        </button>
        <button
          className="p-2 text-red-500 hover:text-red-600 transition"
          onClick={onDelete}
          aria-label="Delete"
        >
          <Icon icon="fluent:delete-24-regular" className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default PendingApprovalCard;
