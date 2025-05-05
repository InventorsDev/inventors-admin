import React from 'react';
import Image from 'next/image';
import Button from './Button';

import { Icon } from '@iconify/react';

const ApprovalModal = ({ isApproval, userName, picture, handleCloseApprovalModal }) => {
    return (
        <div className='w-full fixed z-[200] p-6 flex justify-center items-center flex-col gap-4 top-0 left-0 h-full '>
            <div id="backdrop" onClick={() => handleCloseApprovalModal()} className='w-full h-full absolute backdrop-blur-md z-50 cursor-pointer top-0 left-0'></div>
            
            <div id="modal" className='rounded-3xl max-w-sm z-[200] w-fit flex flex-col items-center justify-center gap-4 bg-white p-6'>
                <Image 
                    src={picture? picture: "/images/profile-image.png"}
                    width={120}
                    height={130}
                    className='rounded-full'
                    alt='Profile Image'
                />

                <h1 className='text-gray-700 font-bold w-fit text-center sm:text-xl'>Are you sure you want to {`${isApproval? "approve": "decline"}`} this application?</h1>
                <p className='text-sm text-gray-400'>You&apos;re about to {`${isApproval? "approve": "decline"}`} {userName}</p>

                <div className='flex gap-2 text-sm flex-col xs:flex-row xs:text-base items-center w-full'>
                    <Button buttonProps={{
                        onClick: () => handleCloseApprovalModal()
                    }} className="hover:bg-gray-200 w-full">Cancel</Button>
                    {isApproval ?
                        <Button mintGreenBtn className="w-full flex items-center justify-center gap-1">
                            <Icon 
                                icon={"mdi:success-circle-outline"}
                                width={24}
                                height={24}
                            />
                            <p>Yes, approve</p>
                        </Button>
                        :<Button bgRedBtn className="w-full justify-center flex items-center gap-1">
                            <Icon 
                                icon={"ix:error"}
                                width={24}
                                height={24}
                            />
                            <p>Yes, decline</p>
                        </Button>
                    }
                </div>
            </div>
        </div>
    );
}

export default ApprovalModal;
