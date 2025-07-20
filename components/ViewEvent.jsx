import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from './Button';
import SkeletonLoader from './SkeletonLoader';
import Drawer from './Drawer';
import Toast from './ui/Toast';
import { Icon } from '@iconify/react';

import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import { formatDateTime } from '@/utils/helpers/formatDateTime';

const ViewEvent = ({ show, handleCloseEvent }) => {
    const [eventDetails, setEventDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState(null);
    const [error, setError] = useState("");

    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    useEffect(() => {
        if (id == "" || typeof id === null) {
            setError("Oops, Event ID is missing ... close this slider and try again.");
            return;
        }
    }, []);

    useEffect(() => {
        const id = searchParams.get("id");
        if (id !== "" && id !== null) setError("");

        if (show && id) {
            fetchEventDetails();
        }
    }, [show, id]);

    const fetchEventDetails = async () => {
        const id = searchParams.get("id");
        setLoading(true);

        try {
            const response = await fetch(`/api/events/${id}`);
            const data = await response.json();

            setEventDetails(data);
            console.log(data);
        } catch (error) {
            setError(error.message || "Oops, failed to fetch event data ... Please Check your network and try again");
        } finally {
            setLoading(false);
        }
    }

    const getStatusStyle = (status) => {
        switch(status) {
            case "approved":
                return "bg-[var(--mint-green)] text-[var(--primary-green)]"
            default: // (default case is pending)
                return "bg-orange-100 text-orange-500"
        };
    }

    const copyLinkToClipboard = (link) => {
        navigator.clipboard.writeText(link);
        setToast({ message: "Link copied to clipboard.", type: "success" });
    }

    if (error && error !== "") {
        return (
            <Drawer 
                show={show}
                handleClose={() => handleCloseEvent()}
            >
                <div className='w-full h-[90%] flex justify-center items-center text-red-500 rounded-md bg-red-100'>{error}</div>
            </Drawer>
        )
    }

    return (
        <React.Fragment>            
            <Drawer 
                show={show}
                handleClose={() => handleCloseEvent()}
            >
                {toast && (
                    <Toast
                        message={toast.message}
                        type={toast.type}
                        onClose={() => setToast(null)}
                    />
                )}

                <div id="edit-delete" className='w-full text-xs py-2 flex gap-2 justify-end'>
                    {eventDetails?.status?.toLowerCase() == "approved"? 
                        <>
                            <Button 
                                buttonProps={{onClick: () => { 
                                    const params = new URLSearchParams(searchParams.toString());
                                    params.set("view", "edit");
                                    router.push(`?${params}`);
                                }}}
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
                                dangerButton buttonProps={{onClick: () => console.log("Decline")}}
                                className={'flex gap-2 items-center py-1 bg-red-100'}
                            >
                                <Icon icon="heroicons:x-mark-16-solid" 
                                    className='rounded-full border-2 border-red-700' width="24" height="24"
                                ></Icon>
                                <p>Decline</p>
                            </Button>
                            <Button 
                                primaryButton 
                                className={"flex items-center py-1 gap-2"} buttonProps={{onClick: () => console.log("Approval")}}
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
                    {!loading? <div className="w-full items-center flex flex-col md:flex-row lg:flex-col xl:flex-row gap-4 bg-white p-5 py-3 rounded-lg">
                        <Image
                            src={eventDetails.photo}
                            alt="Event Flyer"
                            width={160}
                            height={180}
                            className=" rounded-lg w-full md:w-fit min-w-[45%] self-center min-h-full"
                        />

                        <div id="overview-text" className='space-y-4 font-semibold text-gray-500  text-sm'>
                            <h1 className='text-2xl sm:text-3xl text-black font-extrabold'>{eventDetails.title}</h1>
                            <div className="status flex items-center gap-4">
                                <label htmlFor="status" className='flex gap-2 text-gray-600 items-center'>
                                    <Image 
                                        src={"/images/events/status.svg"}
                                        height={24}
                                        width={24}
                                        alt='status'
                                    />

                                    <p>Status:</p>   
                                </label>
                                <span id='status' className={`p-1 w-fit px-2 rounded-2xl ${getStatusStyle(eventDetails.status.toLowerCase())}`}>
                                    {eventDetails.status}
                                </span>
                            </div>

                            <div className="date flex items-start sm:flex-row sm:items-center gap-4">
                                <label htmlFor="date" className='flex text-gray-600 gap-2 items-center'>
                                    <Image 
                                        src={"/images/events/calender.svg"}
                                        height={24}
                                        width={24}
                                        alt='time-icon'
                                    />
                                    <p>Date:</p>   
                                </label>
                                <div id='date' className='flex flex-col sm:flex-row items-center gap-2'>
                                    <p>{formatDateTime(eventDetails.eventDate).date}</p>
                                    <div id='time' className='gap-2 hidden sm:flex self-start items-center'>
                                        <Image 
                                            src={"/images/events/date.svg"}
                                            height={24}
                                            width={24}
                                            alt='date-icon'
                                        />
                                        <p>{formatDateTime(eventDetails.eventDate).timeWithExtension}</p>
                                    </div>
                                </div>
                            </div>

                            <div id='time-for-small-screens' className='gap-2 flex self-start items-center sm:hidden'>
                                <label htmlFor="date" className='flex text-gray-600 gap-2 items-center'>
                                    <Image 
                                        src={"/images/events/date.svg"}
                                        height={24}
                                        width={24}
                                        alt='date-icon'
                                    />
                                    <p>Time:</p>   
                                </label>
                                <p>{formatDateTime(eventDetails.eventDate).timeWithExtension}</p>
                            </div>

                            <div className="assignee flex items-center flex-wrap gap-2">
                                <label htmlFor="assignees" className='flex text-gray-600 gap-2 items-center'>
                                    <Image 
                                        src={"/images/events/assignee.svg"}
                                        height={24}
                                        width={24}
                                        alt='assignee-icon'
                                    />

                                    <p>Co-Hosts:</p>   
                                </label>
                                <div id='assignees' className='flex items-center gap-2'>
                                    {eventDetails.coHost.map((assignee, index) => (
                                        <div id='assignee' key={index} className='rounded-2xl italic bg-[--mint-green] text-gray-500 flex items-center'>
                                            <Image 
                                                // not provided by API
                                                src={assignee.profile || "/images/profile-icon.png"}
                                                height={24}
                                                width={24}
                                                className='rounded-full'
                                                alt='Assignee Profile Picture'
                                            />
                                            <p className='p-1 px-2 text-sm sm:text-base'>{assignee}</p>
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
                                        alt='location-icon'
                                    />

                                    <p>Location:</p>   
                                </label>

                                <div id='location' className='flex items-center gap-2'>
                                    <p>{eventDetails.location} ({eventDetails.joinMethod})</p>
                                    <button 
                                        onClick={() => copyLinkToClipboard(eventDetails.link)} 
                                        id='copy-link' 
                                        className='gap-2 text-[#00B598] flex items-center'
                                    >
                                        <Image 
                                            src={"/images/events/copy.svg"}
                                            height={24}
                                            width={24}
                                            alt='copy-icon'
                                        />
                                        <p className='hidden sm:inline-block'>{toast ? "Copied!" :"Copy Link"}</p>
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

                    <div id="Attachments" className="w-full min-h-[20vh] p-3 px-5 bg-white rounded-lg space-y-2"> 
                        <header className='flex items-center justify-between w-full'>
                            <h1 className='font-bold'>ATTACHMENTS ({eventDetails["attachments"]?.length || 0})</h1>

                            <button id="download-all" className='flex gap-2 items-center text-[var(--primary-green)]'>
                                <Image 
                                    src={"/images/events/download.svg"}
                                    height={24}
                                    width={24}
                                    alt='download-icon'
                                />
                                <p className='hidden sm:inline-block'>Download all</p>
                            </button>
                        </header>

                        {!loading ? (
                            <div id='attachments-listing' aria-disabled className='flex opacity min-h-[20px] cursor-not-allowed flex-col md:flex-row gap-4'>
                                {/* API Doesn't take any attachments */}
                                {/* {EventsPage.attachments.map((attachment, index) => (
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
                                                {attachment.size}
                                            </div>
                                        </div>
                                    </div>
                                ))} */}
                            </div>
                            ): <SkeletonLoader />
                        }
                    </div>
                </div>  
            </Drawer>
        </React.Fragment>
    );
}

export default ViewEvent;
