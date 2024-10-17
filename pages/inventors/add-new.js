import React from 'react';
import { useState } from 'react';
import Image from 'next/image';

import Layout from '@/layouts/main';

import { Icon } from '@iconify/react';

import ProfessionalInfoForm from '@/components/AddInventors/ProfessionalInfoForm';
import ContactInfoForm from '@/components/AddInventors/ContactInfoForm';
import BasicInfoForm from '@/components/AddInventors/BasicInfoForm';

const AddNew = () => {
	const [formData, updateFormData] = useState({
		basicInfo: {},
		professionalInfo: {},
		contactInfo: {},
	});
	const [step, setStep] = useState(1);
	const [isBasicInfoFilled, updateIsBasicInfoFilled] = useState(false);
	const [isPersonalInfoFilled, updateIsPersonalInfoFilled] = useState(false);
	const [isContactInfoFilled, updateIsContactInfoFilled] = useState(false);

	const goToLastStep = () => {
		let lastStep;

		if (step == 1) {
			lastStep = 1;
		} else {
			lastStep = step - 1;
		}

		setStep(lastStep);
	};

	const goToNextStep = () => {
		let nextStep;

		if (step == 3) {
			nextStep = 1;
		} else {
			nextStep = step + 1;
		}

		setStep(nextStep);
	};

	return (
		<div
			id="new-inventors-form"
			className="w-full h-full bg-[#E7F8F5] p-4 rounded-xl"
		>
			<div className="white-background-section w-full h-full bg-white rounded-xl py-6 pb-2 px-14">
				<div
					id="form-steps"
					className="text-[14px] bg-[#F3FBFA] mx-12 flex px-4 py-2 rounded-xl"
				>
					<div
						id="basic-info"
						className="flex flex-col gap-2 font-[400] justify-center items-center text-nowrap cursor-pointer"
						onClick={() => setStep(1)}
					>
						<div className="icon">
							<Icon icon="lets-icons:user" className="text-2xl text-white" />
						</div>
						<h3>Basic Information</h3>
					</div>

					<div className={`line ${step != 1 ? 'active-line' : ''}`}></div>
					<div
						id="personal-info"
						className="flex flex-col gap-2 font-[400] justify-center items-center text-nowrap cursor-pointer"
						onClick={() => setStep(2)}
					>
						<div className="icon">
							<Icon icon="mynaui:briefcase" className="text-2xl text-white" />
						</div>
						<h3>Professional Information</h3>
					</div>
					<div
						className={`line ${step != 2 && step != 1 ? 'active-line' : ''}`}
					></div>
					<div
						id="contact-info"
						className="flex flex-col gap-2 font-[400] justify-center items-center text-nowrap cursor-pointer"
						onClick={() => setStep(3)}
					>
						<div className="icon">
							<Icon icon="solar:phone-linear" className="text-2xl text-white" />
						</div>
						<h3>Contact Information</h3>
					</div>
				</div>

				<div id="new-inventor-form-content" className="mt-10 mb-4 mx-12">
					<header className="flex justify-between">
						{step == 1 && (
							<h3 className="text-[#3C3C3C] text-[18px] leading-[32px] font-extrabold">
								Basic Information
							</h3>
						)}
						{step == 2 && (
							<h3 className="text-[#3C3C3C] text-[18px] leading-[32px] font-extrabold">
								Professsional Information
							</h3>
						)}
						{step == 3 && (
							<h3 className="text-[#3C3C3C] text-[18px] leading-[32px] font-extrabold">
								Contact Information
							</h3>
						)}

						<div id="nav" className="flex gap-5">
							<div
								id="previous"
								className="button border border-[#DEDEDE] flex transition-all duration-300 ease-out hover:scale-[104%] 
                            justify-between gap-4 text-[#4A4A4A] w-fit rounded-lg"
								onClick={goToLastStep}
							>
								<Icon icon="mynaui:arrow-left" className="text-2xl" />
								<span>Previous</span>
							</div>

							{step != 3 ? (
								<div
									id="next"
									className="button bg-[#00977F] flex justify-between ease-transition scale-[102%] gap-[2.9rem] text-white 
                            transition-all duration-300 ease-out hover:scale-[104%] rounded-lg w-fit"
									onClick={goToNextStep}
								>
									<span>Next</span>
									<Icon icon="mynaui:arrow-right" className="text-2xl" />
								</div>
							) : (
								<div
									id="next"
									className="button bg-[#00977F] flex justify-between ease-transition scale-[102%] gap-[2.9rem] text-white 
                                transition-all duration-300 ease-out hover:scale-[104%] rounded-lg w-fit"
								>
									<span>Submit</span>
									<Icon icon="mynaui:arrow-right" className="text-2xl" />
								</div>
							)}
						</div>
					</header>

					{/* Form Content */}
					{step === 1 && (
						<BasicInfoForm updateIsBasicInfoFilled={updateIsBasicInfoFilled} />
					)}
					{step === 2 && (
						<ProfessionalInfoForm
							updateIsPersonalInfoFilled={updateIsPersonalInfoFilled}
						/>
					)}
					{step === 3 && (
						<ContactInfoForm
							updateIsContactInfoFilled={updateIsContactInfoFilled}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default AddNew;

AddNew.getLayout = function getLayout(page) {
	return <Layout>{page}</Layout>;
};
