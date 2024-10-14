import React from 'react';
import { useState } from 'react';
import Image from 'next/image';

import ProfessionalInfoForm from '@/components/new-inventors-form/ProfessionalInfoForm/ProfessionalInfoForm';
import ContactInfoForm from '@/components/new-inventors-form/ContactInfoForm/ContactInfoForm';
import BasicInfoForm from '@/components/new-inventors-form/BasicInfoForm/BasicInfoForm';

const NewInventorsForm = () => {
    const [formData, updateFormData] = useState({
        basicInfo: {},
        professionalInfo: {},
        contactInfo: {},
    });
    const [step, setStep] = useState(1);
    const [isBasicInfoFilled, updateIsBasicInfoFilled] = useState(false);
    const [isPersonalInfoFilled, updateIsPersonalInfoFilled] = useState(false);
    const [isContactInfoFilled, updateIsContactInfoFilled] = useState(false);

    return (
        <div id='new-inventors-form' className='w-full h-full bg-[#E7F8F5] p-4 rounded-xl'>
            <div className='white-background-section w-full h-full bg-white rounded-xl py-6 pb-2 px-14'>
                <div id='form-steps' className='text-[14px] bg-[#F3FBFA] mx-12 flex px-4 py-2 rounded-xl'>  
                    <div id="basic-info" className='flex flex-col gap-2 font-[400] justify-center items-center text-nowrap'>
                        <div className="icon">
                            <Image src="/new-inventors-form/user-03.svg" alt="Basic Information Icon" width={20} height={20} />
                        </div>
                        <h3>Basic Information</h3>
                    </div>

                    <div className={`line`}></div>

                    <div id="personal-info" className='flex flex-col gap-2 font-[400] justify-center items-center text-nowrap'>
                        <div className="icon">
                            <Image src="/new-inventors-form/briefcase.svg" alt="Professional Info Icon" width={20} height={20} />
                        </div>
                        <h3>Professional Information</h3>
                    </div>

                    <div className={`line`}></div>

                    <div id="contact-info" className='flex flex-col gap-2 font-[400] justify-center items-center text-nowrap'>
                        <div className="icon">
                            <Image src="/new-inventors-form/phone.svg" alt="Contact Information Icon" width={20} height={20} />
                        </div>
                        <h3>Contact Information</h3>
                    </div>
                </div>

                <div id='new-inventor-form-content' className='mt-8 mb-4 mx-12'>
                    <header className='flex justify-between'>
                        {step == 1 && <h3 className='text-[#3C3C3C] text-[18px] font-extrabold'>Basic Information</h3>}
                        {step == 2 && <h3 className='text-[#3C3C3C] text-[18px] font-extrabold'>Professsional Information</h3>}
                        {step == 3 && <h3 className='text-[#3C3C3C] text-[18px] font-extrabold'>Contact Information</h3>}

                        <div id="nav" className='flex gap-3'>
                            <div id="previous" className='button border border-[#DEDEDE] flex transition-all duration-300 ease-out hover:scale-[104%] 
                            justify-between gap-4 text-[#4A4A4A] w-fit rounded-lg'>
                                <Image src={"/new-inventors-form/left-arrow.svg"} alt='left arrow' width={20} height={20} />
                                <span>Previous</span>
                            </div>
                            <div id="next" className='button bg-[#00977F] flex justify-between ease-transition scale-[102%] gap-[2.9rem] text-white 
                            transition-all duration-300 ease-out hover:scale-[104%] rounded-lg w-fit'>
                                <span>Next</span>
                                <Image src={"/new-inventors-form/right-arrow.svg"} alt='right arrow' width={20} height={20} />
                            </div>
                        </div>
                    </header>

                    {/* Form Content */}
                    {step === 1 && <BasicInfoForm updateIsBasicInfoFilled={updateIsBasicInfoFilled} />}
                    {step === 2 && <ProfessionalInfoForm updateIsPersonalInfoFilled={updateIsPersonalInfoFilled} />}
                    {step === 3 && <ContactInfoForm updateIsContactInfoFilled={updateIsContactInfoFilled} />}
                </div>
            </div>
        </div>
    );
}

export default NewInventorsForm;
