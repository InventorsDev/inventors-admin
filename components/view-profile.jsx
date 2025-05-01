import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import Button from './Button';

const ViewProfile = ({show, handleCloseProfile}) => {
    return (
        <div id="view-user-profile" className={`${show? "show-profile-slider": "remove-profile-slide"} fixed z-[50] top-0 left-0 w-full h-full`}>
            <div id="backdrop" onClick={() => handleCloseProfile()} className='w-full h-full absolute backdrop-brightness-[.2] z-50 cursor-pointer top-0 left-0'></div>

            <div id="profile-content" className={`${show? "show-profile-slide": "remove-profile-slide"} translate-x-[-100%] w-[55%] p-5 py-0 absolute z-[100] h-full top-0 left-[45%] bg-white`}> 
                <div id="x-button" className='w-full flex py-1 cursor-pointer justify-end' onClick={() => handleCloseProfile()}>
                    <Icon icon="heroicons:x-mark-16-solid" 
                        className='rounded-full border-2 border-black' width="24" height="24"
                    ></Icon>
                </div>

                <div className='bg-green-100 p-4 space-y-3'>
                    <div id="decline-approve" className='w-full flex gap-2 justify-end'>
                        <Button dangerButton className={'flex gap-2 py-2 bg-red-100'}>
                            <Icon icon="heroicons:x-mark-16-solid" 
                                className='rounded-full border-2 border-red-700' width="24" height="24"
                            ></Icon>
                            <p>Decline</p>
                        </Button>
                        <Button primaryButton className={"flex py-2 gap-2"}>
                            <Icon icon="icon-park-outline:success" 
                                className='' width="24" height="24"
                            ></Icon>
                            <p>Approve</p>
                        </Button>
                    </div>

                    <div className="w-full flex gap-4 bg-white p-5 py-3 rounded-lg">
                        <Image
                            src="/images/profile-image.png"
                            alt="Figma Icon"
                            width={160}
                            height={167}
                            className=" rounded-full"
                        />

                        <div id="overview-text" className='space-y-1 text-sm'>
                            <h1 className="font-bold text-lg p-2">Kelvin Doe <span className='text-sm px-2 italic font-normal text-gray-600'>
                                Software Engineer <span className='text-[#00B598]'>@Microsoft</span></span>
                            </h1>
                            <div className='flex gap-2 italic'>
                                <div className='border-r border-gray-400 p-2 space-y-1'>
                                    <p className='text-gray-400'>Email: <span className='text-gray-600 px-2'>Kelvindoe@gmail.com</span></p>
                                    <p className='text-gray-400'>Phone: <span className="text-gray-600 px-2">+234 905 681 7978</span></p>
                                    <p className='text-gray-400'>Location: <span className="text-gray-600 px-2">Lagos, Nigeria.</span></p>
                                </div>
                                <div className='border-gray-400 p-2 space-y-1'>
                                    <p className='text-gray-400'>Experience: <span className="text-gray-600 px-2">2 Years</span></p>
                                    <p className='text-gray-400'>Primary skill: <span className="text-gray-600 px-2">Software Engineer</span> </p>
                                    <p className='text-gray-400'>Secondary skill: <span className="text-gray-600 px-2">Data Analyst</span> </p>
                                </div>
                            </div>
                            <p className='text-gray-400 p-2 italic'>Areas of Interest: <span className='text-gray-600'>{["UI Design", "Product Design"].join(", ")}</span></p>
                        </div>

                    </div>

                    <div id="description-technologies" className='p-5 py-3 bg-white flex w-full gap-2 rounded-lg'>
                        <div id="description" className='space-y-2 border-r basis-[50%] pr-4 border-gray-400'>
                            <h1 className='font-bold'>BIO/SHORT DESCRIPTION</h1>

                            <p className="text-sm text-gray-400">
                                I&apos;m a self taught developer with 6 years experience building amazing digital products that solves users problems. 
                                I&apos;m a self taught developer with 6 years experience building amazing digital products that solves users problems. 
                                I&apos;m a self taught developer with 6 years experience building amazing digital products that solves users problems. 
                            </p>
                        </div>
                        <div id="technologies" className='space-y-2 basis-[50%] px-10'>
                            <h1 className='font-bold'>TECHNOLOGIES/TOOLS</h1>
                            
                            <div className='flex gap-4 flex-wrap'>
                                {["React Js", "Miro", "Click Up", "Java", "C++", "HTML", "CSS", "Vue Js"].map((tech, index) => 
                                    <div key={index} className='rounded-2xl p-2 bg-green-50 text-[#29343D]'>{tech}</div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div id="contact-info" className="w-full p-3 px-5 bg-white rounded-lg space-y-2"> 
                        <h1 className='font-bold'>CONTACT INFO</h1>

                        <div className='flex gap-2 italic w-full text-sm'>
                            <div className='border-r border-gray-400 p-2 space-y-1 basis-[50%]'>
                                <p className='text-gray-400'>Skill Profile URL: <span className='text-gray-600 px-2'>Kelvindoe@gmail.com</span></p>
                                <p className='text-gray-400'>X (Twitter): <span className="text-gray-600 px-2">@daniel_eln</span> </p>
                            </div>
                            <div className='border-gray-400 p-2 space-y-1 basis-[50%]'>
                                <p className='text-gray-400'>LinkedIn: <span className="text-gray-600 px-2">Omoniyi Opemipo</span></p>
                                <p className='text-gray-400'>Facebook: <span className="text-gray-600 px-2">Omoniyi Opemipo</span> </p>
                            </div>
                        </div>
                        <p className='text-gray-400 text-sm px-2'>Personal Website (portfolio): 
                            <Link href={""} className="text-gray-600 px-2">https://daniel-eln-portfolio.vercel.app/</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewProfile;
