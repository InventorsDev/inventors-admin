"use client";
import { useState } from 'react';

export default function CustomCheckbox(props) {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
  };

  return (
    <div className="flex items-center absolute top-6 right-6 ease-transition hover:scale-[115%]">
      <input
        type="checkbox"
        id="remember-me"
        name="remember-me"
        checked={checked}
        onChange={(e) => {handleCheckboxChange(); props.handleCheckedState(e, checked)}}
        className="hidden"
      />
      <div
        className={`w-6 h-6 border-2 border-[#EFF2F7] rounded flex items-center justify-center cursor-pointer ${
          checked ? 'bg-[#00B598] border-[#00B598]' : 'bg-[#EFF2F7]'
        }`}
        onClick={(e) => {handleCheckboxChange(e); props.handleCheckedState(e, checked)}}
      >
        {checked && (
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      {/* <label htmlFor="remember-me" className="ml-2 text-gray-700">
        Remember Me
      </label> */}
    </div>
  );
}
