import React, { useState, useLayoutEffect } from 'react';
import Image from 'next/image';
import Button from './Button';
import SkeletonLoader from './SkeletonLoader';
import Drawer from './Drawer';
import { Icon } from '@iconify/react';

import { eventDetails } from '@/utils/event';

const EditEvent = ({ show, handleCloseEvent }) => {
    const [loading, setLoading] = useState(true);

    useLayoutEffect(() => {
        if (show) {
            setLoading(true);

            // simulate the fetching of the data of user
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        }
    }, [show]);

    const getStatusStyle = (status) => {
        switch(status) {
            case "approved":
                return "bg-[var(--mint-green)] text-[var(--primary-green)]"
            default: // (default case is Unapproved)
                return "bg-orange-100 text-orange-500"
        };
    }

    return (
        <React.Fragment>            
            <Drawer 
                show={show}
                handleClose={() => handleCloseEvent()}
            >
                <div id="edit-delete" className='w-full text-xs py-2 flex gap-2 justify-end'>
                    {eventDetails.status.toLowerCase() == "approved"? 
                        <>
                            <Button 
                                buttonProps={{onClick: () => console.log("Edit Event")}}
                                className={'flex gap-2 items-center text-gray-500 border-gray-500'}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                                <p>Edit Event Details</p>
                            </Button>
                            <Button 
                                dangerButton 
                                className={"flex items-center gap-2"} 
                                buttonProps={{onClick: () => console.log("Delete Event")}}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
                                </svg>
                                <p>Delete</p>
                            </Button>
                        </>
                        : <>
                            <Button 
                                dangerButton buttonProps={{onClick: () => setShowApprovalModal({state: true, isApproval: false})}}
                                className={'flex gap-2 items-center py-1 bg-red-100'}
                            >
                                <Icon icon="heroicons:x-mark-16-solid" 
                                    className='rounded-full border-2 border-red-700' width="24" height="24"
                                ></Icon>
                                <p>Decline</p>
                            </Button>
                            <Button 
                                primaryButton 
                                className={"flex items-center py-1 gap-2"} buttonProps={{onClick: () => setShowApprovalModal({state: true, isApproval: true})}}
                            >
                                <Icon icon="icon-park-outline:success" 
                                    className='' width="24" height="24"
                                ></Icon>
                                <p>Approve</p>
                            </Button>
                        </>
                    }
                </div>
                <div id='content' className='bg-[var(--mint-green)] p-4 space-y-4'>
                    {!loading? <div className="w-full flex flex-col sm:flex-row gap-4 bg-white p-5 py-3 rounded-lg">
                        <Image
                            src={eventDetails.flyer}
                            alt="Event Flyer"
                            width={160}
                            height={127}
                            className=" rounded-2xl self-center sm:self-start"
                        />

                        <div id="overview-text" className='space-y-4 font-semibold text-gray-500  text-sm'>
                            <h1 className='text-2xl sm:text-3xl text-black font-extrabold'>{eventDetails.title}</h1>
                            <div className="status flex items-center gap-4">
                                <label htmlFor="status" className='flex gap-2 text-gray-600 items-center'>
                                    <Image 
                                        src={"/images/events/status.svg"}
                                        height={24}
                                        width={24}
                                    />

                                    <p>Status:</p>   
                                </label>
                                <span id='status' className={`p-1 w-fit px-2 rounded-2xl ${getStatusStyle(eventDetails.status.toLowerCase())}`}>
                                    {eventDetails.status}
                                </span>
                            </div>

                            <div className="date flex items-center gap-4">
                                <label htmlFor="date" className='flex text-gray-600 gap-2 items-center'>
                                    <Image 
                                        src={"/images/events/date.svg"}
                                        height={24}
                                        width={24}
                                    />

                                    <p>Date:</p>   
                                </label>
                                <div id='date' className='flex items-center gap-2'>
                                    <p>{eventDetails.date}</p>
                                    <div id='time' className='gap-2 flex items-center'>
                                        <Image 
                                            src={"/images/events/calender.svg"}
                                            height={24}
                                            width={24}
                                        />
                                        <p>{eventDetails.time.start} - {eventDetails.time.end}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="assignee flex items-center gap-2">
                                <label htmlFor="assignees" className='flex text-gray-600 gap-2 items-center'>
                                    <Image 
                                        src={"/images/events/assignee.svg"}
                                        height={24}
                                        width={24}
                                    />

                                    <p>Assignee:</p>   
                                </label>
                                <div id='assignees' className='flex items-center gap-2'>
                                    {eventDetails.assignees.map((assignee, index) => (
                                        <div id='assignee' key={index} className='rounded-2xl bg-[--mint-green] text-gray-500 flex items-center'>
                                            <Image 
                                                src={assignee.profile}
                                                height={24}
                                                width={24}
                                                className='rounded-full'
                                                alt='Assignee Profile Picture'
                                            />
                                            <p className='p-1 px-2'>{assignee.name}</p>
                                        </div>
                                    ))}
                                    <button className='text-white p-1 rounded-full bg-[var(--primary-green)]'>
                                        <Icon icon="ri:add-line" width="24" height="24" />
                                    </button>
                                </div>
                            </div> 

                            <div className="location flex items-center gap-2">
                                <label htmlFor="location" className='flex text-gray-600 gap-2 items-center'>
                                    <Image 
                                        src={"/images/events/location.svg"}
                                        height={24}
                                        width={24}
                                    />

                                    <p>Location:</p>   
                                </label>

                                <div id='location' className='flex items-center gap-2'>
                                    <p>{eventDetails.location.platform}</p>
                                    <button id='copy-link' className='gap-2 text-[#00B598] flex items-center'>
                                        <Image 
                                            src={"/images/events/copy.svg"}
                                            height={24}
                                            width={24}
                                        />
                                        <p>Copy Link</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>: <SkeletonLoader isOverviewText />}

                    <div id="description" className='p-5 bg-white flex flex-col w-full gap-4 md:gap-2 rounded-lg'>
                        <h1 className='font-bold'>EVENT DESCRIPTION</h1>

                        {!loading ? <p className="text-sm text-gray-400 italic leading-6">
                            {eventDetails.description}
                        </p>: <SkeletonLoader isDescription />}
                    </div>

                    <div id="Attachments" className="w-full min-h-[30vh] p-3 px-5 bg-white rounded-lg space-y-2"> 
                        <header className='flex items-center justify-between w-full'>
                            <h1 className='font-bold'>ATTACHMENTS ({eventDetails["attachments"].length})</h1>

                            <button id="download-all" className='flex gap-2 items-center text-[var(--primary-green)]'>
                                <Image 
                                    src={"/images/events/download.svg"}
                                    height={24}
                                    width={24}
                                />
                                <p>Download all</p>
                            </button>
                        </header>

                        {!loading ? (
                            <div id='attachments-listing' className='flex gap-4'>
                                {eventDetails.attachments.map((attachment, index) => (
                                    <div id="attachment" key={index} className='flex gap-2 p-2 rounded-md border-2 border-gray-200'>
                                        <Image 
                                            width={37}
                                            height={37}
                                            src={attachment.type == "pdf" ? "/images/events/PDF-file.svg": "/images/events/AI-file.svg"}
                                            alt={`${attachment.type} logo`}
                                        />

                                        <div id="text" className='space-y-2'>
                                            <h3 className='font-semibold text-gray-600'>{attachment.filename}</h3>
                                            <div className='text-gray-400 font-semibold'>
                                                {attachment.size}  •  <button className='font-normal text-[var(--primary-green)]'>Download</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            ): <SkeletonLoader />
                        }
                    </div>
                </div>  
            </Drawer>
        </React.Fragment>
    );
}

export default EditEvent;