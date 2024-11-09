import React from 'react';

const Modal = (props) => {
    return (
        <div className={`modal ${props.hidden? "hidden": ""} top-0 left-0 backdrop-blur-[15px] z-[500] fixed w-screen min-h-[100vh] 
        bg-[#0000001A] flex justify-center items-center`}>
            <div id="content" className='rounded-xl bg-white p-12'>{props.children}</div>
        </div>
    );
}

export default Modal;
