import React from 'react';
import Image from 'next/image';
import { countries } from '../data';
import { useRef } from 'react';

const BasicInfoForm = ({updateIsBasicInfoFilled}) => {
    const fileNameRef = useRef(null);
    const profileImgRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        fileNameRef.current.textContent = file.name;
        profileImgRef.current.src = URL.createObjectURL(file);
    }

    return (
        <div id='basic-info-form' className=''>
            <div id="profile-image" className='flex gap-4 my-2'>
                <div className='p-1 bg-[#F2EBF3] rounded-full'>
                    <Image 
                        src={"/new-inventors-form/avatar.svg"} 
                        ref={profileImgRef} alt='Selected Profile Picture' 
                        className='object-cover w-[98px] h-[105px] rounded-full' priority width={98} height={105}/>
                </div>
                <div id="text-choose-file" className='flex flex-col gap-2 text-sm'>
                    <h4 className='text-[#0B0B0B]'>User Profile Image</h4>

                    {/* Custom File input */}
                    <input type="file" id="profile-pic-input" name="profile-pic" onChange={handleFileChange} className='hidden' accept=".png, .jpg, .jpeg" max={5000} />
                    <div className='my-3'>
                        {/* HTMLfor the input ID */}
                        <label htmlFor="profile-pic-input" className='text-[13px] bg-[#00B598] text-white cursor-pointer p-4 py-3 rounded'>Choose File</label>
                        <span className='bg-[#E7F8F5] py-3 text-black px-2 pr-32' ref={fileNameRef}>Upload File</span>
                    </div>

                    <p className='text-[#6B6B6B] text-sm'>Max. File Size: 5mb</p>
                </div>
            </div>

            <div className='horizontal-rule'></div>

            <form action="submit" className='text-[14px] leading-[24px] flex flex-col gap-1 font-[400] text-[#29343D] pt-4'>
                <div className="name flex w-full gap-4">
                    <div id="first-name-div" className='label-input'>
                        <label htmlFor="first-name">First Name</label>
                        <input type="name" id="first-name" placeholder="Enter your first name" name="first-name" className='form-input' required />
                    </div>

                    <div id="last-name-div" className='label-input'>
                        <label htmlFor="first-name">Last Name</label>
                        <input type="name" id="last-name" name="last-name" placeholder="Enter your last name" className='form-input' required />
                    </div>
                </div>
                
                <div className="email-password flex gap-4">
                    <div id="email-div" className='label-input'>
                        <label htmlFor="email">Email address</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email address" className='form-input' required />
                    </div>

                    <div id="password-div" className='label-input'>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter password" className='form-input' required />
                    </div>
                </div>

                <div className="description-country-city flex gap-4">
                    <div id="bio-description" className='label-input'>
                        <label htmlFor="description">Bio/Short Description</label>
                        <textarea name="bio-description" id="bio-description" placeholder='Tell us about you' className='form-input h-[150%]'></textarea>
                    </div>

                    <section className='flex flex-col w-full'>
                        <div id="Phone" className='label-input'>
                            <label htmlFor="phone">Phone</label>
                            <input type="tel" name="phone" id="phone" placeholder="Enter your phone number" className='form-input' />
                        </div>

                        <div id="country" className='label-input'>
                            <label htmlFor="country">Country</label>
                            <select name="country" id="country" className='form-input text-black'>
                                <option value="">-- Select a country --</option>
                                {countries.map((country) => (
                                    <option key={country} value={country} className='text-black'>{country}</option>
                                ))}
                            </select>
                        </div>
                    </section>
                </div>
            </form>
        </div>
    );
}

export default BasicInfoForm;
