import React from 'react';
import { Icon } from '@iconify/react';


const Drawer = ({ show, children, handleClose}) => {
    return (
        <div id="view-drawer" className={`${show? "show-profile-slider": "remove-profile-slide"} fixed z-[50] top-0 left-0 w-full h-full`}>
            <div id="backdrop" onClick={() => handleClose()} className='hidden sm:block w-full h-full absolute backdrop-brightness-[.2] z-50 cursor-pointer top-0 left-0'></div>

            <div id="main-content" className={`${show? "show-profile-slide": "remove-profile-slide"} overflow-y-scroll translate-x-[-100%] w-full lg:w-[55%] p-2 sm:p-5 py-0 md:pt-2 absolute z-[100] h-full top-0 left-0 lg:left-[45%] bg-white`}> 
                <div id="x-button" 
                    className={`w-full flex py-2 cursor-pointer justify-end`} 
                    onClick={() => handleClose()}
                >
                    <Icon icon="heroicons:x-mark-16-solid" 
                        className='rounded-full border-2 border-black' width="24" height="24"
                    ></Icon>
                </div>

                {children}
            </div>
        </div>
    );
}

export default Drawer;
