import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@iconify/react';

import Button from './Button';
import SkeletonLoader from './SkeletonLoader';
import ApprovalModal from './ApprovalModal';

import { inventorsLeads } from '@/utils/leads';

const ViewProfile = ({show, handleCloseProfile, idOfLeadToShow}) => {
    const [userDetails, setUserDetails] = useState();
    const [showApprovalModal, setShowApprovalModal] = useState({state: false, isApproval: false});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (show) {
            setLoading(true);

            // simulate the fetching of the data of user
            setTimeout(() => {
                setLoading(false);
            }, 2000);
    
            // fetch user specific data
            const user = inventorsLeads.find(lead => lead.id == idOfLeadToShow);
            setUserDetails(user);

        }
    }, [show]);

    return (
        <div id="view-user-profile" className={`${show? "show-profile-slider": "remove-profile-slide"} fixed z-[50] top-0 left-0 w-full h-full`}>
            {showApprovalModal.state && 
                <ApprovalModal 
                    handleCloseApprovalModal={() => setShowApprovalModal({state: false, isApproval: false})} 
                    isApproval={showApprovalModal.isApproval} userName={userDetails?.name?.split(" ")[0]}
                />
            }
            <div id="backdrop" onClick={() => handleCloseProfile()} className='hidden sm:block w-full h-full absolute backdrop-brightness-[.2] z-50 cursor-pointer top-0 left-0'></div>

            <div id="profile-content" className={`${show? "show-profile-slide": "remove-profile-slide"} overflow-y-scroll translate-x-[-100%] w-full lg:w-[55%] p-2 sm:p-5 py-0 absolute z-[100] h-full top-0 left-0 lg:left-[45%] bg-white`}> 
                <div id="x-button" 
                    className={`w-full flex py-2 cursor-pointer justify-end ${(userDetails?.status == "Approved" || userDetails?.status == "Declined") && "py-6"}`} 
                    onClick={() => handleCloseProfile()}
                >
                    <Icon icon="heroicons:x-mark-16-solid" 
                        className='rounded-full border-2 border-black' width="24" height="24"
                    ></Icon>
                </div>

                <div className='bg-green-100 p-4 space-y-3'>
                    {/* Only Get the chance to decline or approve if user's status is neither   */}
                    {!(userDetails?.status == "Approved" || userDetails?.status == "Declined") && 
                        <div id="decline-approve" className='w-full flex gap-2 justify-end'>
                            <Button 
                                dangerButton buttonProps={{onClick: () => setShowApprovalModal({state: true, isApproval: false})}}
                                className={'flex gap-2 py-2 bg-red-100'}
                            >
                                <Icon icon="heroicons:x-mark-16-solid" 
                                    className='rounded-full border-2 border-red-700' width="24" height="24"
                                ></Icon>
                                <p>Decline</p>
                            </Button>
                            <Button 
                                primaryButton 
                                className={"flex py-2 gap-2"} buttonProps={{onClick: () => setShowApprovalModal({state: true, isApproval: true})}}
                            >
                                <Icon icon="icon-park-outline:success" 
                                    className='' width="24" height="24"
                                ></Icon>
                                <p>Approve</p>
                            </Button>
                        </div>
                    }

                    {!loading? <div className="w-full flex flex-col sm:flex-row gap-4 bg-white p-5 py-3 rounded-lg">
                        <Image
                            src="/images/profile-image.png"
                            alt="Figma Icon"
                            width={160}
                            height={167}
                            className=" rounded-full self-center sm:self-start max-h-fit"
                        />

                        <div id="overview-text" className='space-y-1 text-sm'>
                            <h1 className="font-bold text-lg p-2">{userDetails.name} <span className='text-sm px-2 italic font-normal text-gray-600'>
                                {userDetails.position} <span className='text-[#00B598]'>@{userDetails.company}</span></span>
                            </h1>
                            <div className='flex flex-col md:flex-row gap-2 italic'>
                                <div className='border-b pb-4 md:pb-0 md:border-b-0 md:border-r border-gray-400 p-2 space-y-1'>
                                    <p className='text-gray-400'>Email: <span className='text-gray-600 px-2'>{userDetails.email}</span></p>
                                    <p className='text-gray-400'>Phone: <span className="text-gray-600 px-2">{userDetails.phone}</span></p>
                                    <p className='text-gray-400'>Location: <span className="text-gray-600 px-2">{userDetails.location}.</span></p>
                                </div>
                                <div className='border-gray-400 p-2 space-y-1'>
                                    <p className='text-gray-400'>Experience: <span className="text-gray-600 px-2">{userDetails.experience}</span></p>
                                    <p className='text-gray-400'>Primary skill: <span className="text-gray-600 px-2">{userDetails.primarySkill}</span> </p>
                                    <p className='text-gray-400'>Secondary skill: <span className="text-gray-600 px-2">{userDetails.secondarySkill}</span> </p>
                                </div>
                            </div>
                            <p className='text-gray-400 p-2 italic'>Areas of Interest: <span className='text-gray-600'>{userDetails.interests.join(", ")}</span></p>
                        </div>

                    </div>: <SkeletonLoader isOverviewText />}

                    <div id="description-technologies" className='p-5 py-3 bg-white flex flex-col md:flex-row w-full gap-4 md:gap-2 rounded-lg'>
                        <div id="description" className='space-y-2 border-b pb-4 md:border-b-0 md:pb-0 md:border-r basis-[50%] pr-4 border-gray-400'>
                            <h1 className='font-bold'>BIO/SHORT DESCRIPTION</h1>

                            {!loading ? <p className="text-sm text-gray-400">
                                {userDetails.bio}
                            </p>: <SkeletonLoader isDescription />}
                        </div>
                        <div id="technologies" className='space-y-2 basis-[50%] md:px-10'>
                            <h1 className='font-bold'>TECHNOLOGIES/TOOLS</h1>
                            
                            {!loading? <div className='flex gap-4 flex-wrap'>
                                {userDetails.tools.map((tech, index) => 
                                    <div key={index} className='rounded-2xl p-2 bg-green-50 text-[#29343D]'>{tech}</div>
                                )}
                            </div>: <SkeletonLoader isTechOrContactInfo />}
                        </div>
                    </div>

                    <div id="contact-info" className="w-full p-3 px-5 bg-white rounded-lg space-y-2"> 
                        <h1 className='font-bold'>CONTACT INFO</h1>

                        {!loading ? 
                        (<><div className='flex flex-col md:flex-row gap-2 italic w-full text-sm'>
                                <div className='border-b pb-4 md:pb-0 md:border-b-0 md:border-r border-gray-400 p-2 space-y-1 basis-[50%]'>
                                    <p className='text-gray-400 xs:flex'>
                                        <p>Skill Profile URL: </p>
                                        <Link href={userDetails.links.profile} className='text-gray-600 text-xs xs:text-sm px-2'>{userDetails.links.profile}</Link>
                                    </p>
                                    <p className='text-gray-400 xs:flex'>
                                        <p>X (Twitter):</p> 
                                        <Link href={userDetails.links.twitter} className="text-gray-600 text-xs xs:text-sm px-2">{userDetails.links.twitter}</Link> 
                                    </p>
                                </div>
                                <div className='border-gray-400 p-2 space-y-1 basis-[50%]'>
                                    <p className='text-gray-400 xs:flex'>
                                        <p>LinkedIn:</p>
                                        <Link href={userDetails.links.linkedin} className="text-gray-600 text-xs xs:text-sm px-2">{userDetails.links.linkedin}</Link>
                                    </p>
                                    <p className='text-gray-400 xs:flex'>
                                        <p>Facebook:</p> 
                                        <Link href={userDetails.links.facebook} className="text-gray-600 text-xs xs:text-sm px-2">{userDetails.links.facebook}</Link> 
                                    </p>
                                </div>
                            </div>
                            <p className='text-gray-400 text-sm px-2 xs:flex'>
                                <p>Personal Website (portfolio):</p> 
                                <Link href={userDetails.links.portfolio} className="text-gray-600 text-xs xs:text-sm px-2">{userDetails.links.portfolio}</Link>
                            </p>
                        </>): <SkeletonLoader />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewProfile;
