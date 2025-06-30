import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from './Button';
import Drawer from './Drawer';
import ProfileInput from './ProfileInput';
import FileInput from './FileInput';
import { Icon } from '@iconify/react';

import { eventDetails } from '@/utils/event';

const EditEvent = ({ show, handleCloseEvent }) => {
    const [formData, setFormData] =  useState({
        title: "",
        description: "",
        date: "",
        startTime: "",
        endTime: "",
        locationType: "Online",
        locationAddress: "",
        assignees: [],
        attachments: []
    });

    useEffect(() => {
        setFormData(prev => ({
            ...prev, 
            title: eventDetails.title, 
            description: eventDetails.description, 
            date: eventDetails.date,
            locationType: eventDetails.location.type,
            locationAddress: eventDetails.location.link,
            assignees: [...eventDetails.assignees],
            attachments: [...eventDetails.attachments]
        }));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({...prev, [name]: value}));
    }

    return (
        <React.Fragment>            
            <Drawer 
                show={show}
                handleClose={() => handleCloseEvent()}
            >
                <div id='wrapper' className='bg-[var(--mint-green)] rounded-lg p-4 space-y-4'>
                    {/* cancel - draft and publish buttons  */}
                    <div id="cancel-draft-publish" className='justify-end w-full flex gap-2 items-center'>
                        <Button 
                            buttonProps={{onClick: () => console.log("Cancel Event")}}
                            className={'flex gap-2 items-center py-1 bg-red-white text-red-500 border-red-500'}
                        >
                            <Icon icon="heroicons:x-mark-16-solid" 
                                className='rounded-full border-2 text-red-500 border-red-500' width="24" height="24"
                            ></Icon>
                            <p className='hidden sm:inline-block'>Cancel</p>
                        </Button>
                        <Button 
                            buttonProps={{onClick: () => console.log("Edit Event")}}
                            className={'flex gap-2 items-center text-gray-500 border-gray-500'}
                        >
                            <Icon icon="pepicons-pencil:pen-circle" width="24" height="24" />
                            <p className='hidden sm:inline-block'>Draft</p>
                        </Button>
                        <Button 
                            primaryButton 
                            className={"flex items-center py-1 gap-2"} buttonProps={{onClick: () => console.log(formData)}}
                        >
                            <Icon icon="icon-park-outline:success" 
                                className='' width="24" height="24"
                            ></Icon>
                            <p>Publish</p>
                        </Button>
                    </div>

                    <div id="content" className='bg-white text-gray-500 space-y-3 rounded-lg p-4 sm:p-6'>
                        <h1 className='text-lg px-4 py-2 font-extrabold text-gray-700'>Event Flyer</h1>
                        <ProfileInput forEvent={true} />
                        
                        <div id="title" className='space-y-2 px-4'>
                            <h2 className=' text-black'>Title</h2>
                            <input 
                                type="text" 
                                value={formData.title} 
                                name='title'
                                className='w-full py-2 px-3 border-2 outline-none rounded-lg border-gray-300' 
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        
                        <div id="description" className='space-y-2 px-4'>
                            <h2 className=' text-black'>Description</h2>
                            <textarea 
                                type="text" 
                                name='description'
                                onChange={(e) => handleChange(e)}
                                value={formData.description} 
                                className='w-full py-2 px-3 min-h-[12rem] border-2 outline-none rounded-lg border-gray-300' 
                            />
                        </div>

                        <div id="date-time" className='w-full px-4 flex items-center gap-2'>
                            <div id="date" className='space-y-2 w-full'>
                                <h2 className=' text-black'>Date</h2>
                                <input 
                                    onChange={(e) => handleChange(e)}
                                    value={formData.date} 
                                    type='date' 
                                    name='date'
                                    className='w-full py-2 px-3 border-2 outline-none rounded-lg border-gray-300' 
                                />
                            </div>
                            <div id="time" className='space-y-2 w-full'>
                                <h2 className=' text-black'>Time (Start / End)</h2>
                                <div id="start-end-time" className='flex gap-2'>
                                    <input 
                                        type="time" 
                                        name='startTime'
                                        // value={formData.startTime} 
                                        placeholder='Enter Address or Link' 
                                        className='w-full py-2 px-3 border-2 outline-none rounded-lg border-gray-300' 
                                    />
                                    <input 
                                        type="time" 
                                        name='endTime'
                                        // value={formData.endTime} 
                                        placeholder='Enter Address or Link' 
                                        className='w-full py-2 px-3 border-2 outline-none rounded-lg border-gray-300' 
                                    />
                                </div>
                            </div>
                        </div>

                        <div id="location-address" className='w-full px-4 flex items-center gap-2'>
                            <div id="location" className='space-y-2 w-full'>
                                <h2 className=' text-black'>Location Type</h2>
                                <select 
                                    value={formData.locationType} 
                                    name='locationType'
                                    onChange={(e) => handleChange(e)}
                                    className='w-full py-2 px-3 border-2 outline-none rounded-lg border-gray-300'
                                >
                                    <option value="Online">Online Event</option>
                                    <option value="Physical">Physical Event</option>
                                </select>
                            </div>
                            <div id="address" className='space-y-2 w-full'>
                                <h2 className='text-black'>Location Address</h2>
                                <input 
                                    type="text"
                                    name='locationAddress'
                                    value={formData.locationAddress} 
                                    placeholder='Enter Address or Link' className='w-full py-2 px-3 border-2 outline-none rounded-lg border-gray-300' 
                                />
                            </div>
                        </div>

                        <div id="assignees" className='space-y-2 w-full px-4'>
                            <h2 className='text-black'>Assignees</h2>
                            <div id="assignee-listing" className='w-full flex items-center gap-2 py-2 px-3 border-2 outline-none rounded-lg border-gray-300'>
                                {formData.assignees.map((assignee, index) => (
                                    <div id='assignee' key={index} className='rounded-2xl italic bg-[--mint-green] text-gray-500 flex items-center'>
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

                                <Image 
                                    width={24}
                                    height={24}
                                    src={"/images/events/add-assignee.svg"}
                                    alt='Add new assignee'
                                    className='ml-auto cursor-pointer'
                                />
                            </div>
                        </div>

                        <div id='attachments' className='px-4 space-y-2 w-full'>
                            <h2 className='text-black'>Attachments</h2>
                            <FileInput presentFiles={formData.attachments} />
                            {/* <FileInput /> */}
                        </div>
                    </div>
                </div>  
            </Drawer>
        </React.Fragment>
    );
}

export default EditEvent;