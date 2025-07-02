import React, { useRef } from 'react';
import Image from 'next/image';

const ProfileInput = ({ forEvent = false }) => {
    const fileNameRef = useRef(null);
    const profileImgRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        fileNameRef.current.textContent = file.name;
        profileImgRef.current.src = URL.createObjectURL(file);
    }

    return (
        <div id="profile-image" className='flex flex-col text-center sm:text-start sm:flex-row items-center gap-4 my-2'>
            <div className='p-1 bg-[#F2EBF3] rounded-full'>
                <Image
                    src={"/images/new-inventors-form/avatar.svg"}
                    ref={profileImgRef} alt='Selected Profile Picture'
                    className='object-cover w-[110px] h-[110px] rounded-full' priority width={98} height={105} 
                />
            </div>
            <div id="text-choose-file" className='flex flex-col gap-2 text-sm'>
                {!forEvent && <h4 className='text-[#0B0B0B]'>User Profile Image</h4>}

                {/* Custom File input */}
                <input type="file" id="profile-pic-input" name="profile-pic" onChange={handleFileChange} className='hidden' accept=".png, .jpg, .jpeg" max={5000} />
                <div className='my-3 flex flex-col gap-2 sm:block'>
                    {/* HTMLfor the input ID */}
                    <label htmlFor="profile-pic-input" className='text-[13px] bg-[#00B598] text-white cursor-pointer p-4 py-3 rounded'>Choose File</label>
                    <span className='bg-[#E7F8F5] py-3 text-black px-2 pr-32' ref={fileNameRef}>Upload File</span>
                </div>

                <p className='text-[#6B6B6B] text-sm'>Max. File Size: 5mb</p>
            </div>
        </div>
    );
}

export default ProfileInput;
