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
    const [step, setStep] = useState(2);
    const [isBasicInfoFilled, updateIsBasicInfoFilled] = useState(false);
    const [isPersonalInfoFilled, updateIsPersonalInfoFilled] = useState(false);
    const [isContactInfoFilled, updateIsContactInfoFilled] = useState(false);

    return (
        <div id='new-inventors-form' className='w-full'>
            <div className='white-background-section'>
                <div id='form-steps'>  
                    <div id="basic-info">
                        <div className="icon">
                            <Image src="/new-inventors-form/user-03.svg" alt="Basic Information Icon" width={20} height={20} />
                        </div>
                        <h3>Basic Information</h3>
                    </div>

                    <div className={`line`}></div>

                    <div id="personal-info">
                        <div className="icon">
                            <Image src="/new-inventors-form/briefcase.svg" alt="Professional Info Icon" width={20} height={20} />
                        </div>
                        <h3>Professional Information</h3>
                    </div>

                    <div className={`line`}></div>

                    <div id="contact-info">
                        <div className="icon">
                            <Image src="/new-inventors-form/phone.svg" alt="Contact Information Icon" width={20} height={20} />
                        </div>
                        <h3>Contact Information</h3>
                    </div>
                </div>

                <div id='new-inventor-form-content'>
                    <header>
                        {step == 1 && <h3>Basic Information</h3>}
                        {step == 2 && <h3>Professsional Information</h3>}
                        {step == 3 && <h3>Contact Information</h3>}

                        <div id="nav" className='bg-pink-500'>
                            
                            <div id="previous">
                                <Image src={"/new-inventors-form/left-arrow.svg"} alt='left arrow' width={20} height={20} />
                                <span>Previous</span>
                            </div>
                            <div id="next">
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
