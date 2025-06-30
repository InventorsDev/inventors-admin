import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

import { formatFileSize } from '@/utils/helpers/formatFileSize';

const FileInput = ({ presentFiles = [] }) => {
    const [files, setFiles] = useState([]);
    const [error, setError] = useState("");
    const [dragging, setDragging] = useState(false);

    const fileInputRef = useRef(null);
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'application/pdf'];

    useEffect(() => console.log(files), [files]);

    const handleFilechange = (selectedFilesInput) => {
        setError("");
        const limit = 5 * (1048576); // Make sure file is less than 5 MB (unit in bytes)
        let selectedFiles = Array.from(selectedFilesInput);

        for (let file of selectedFiles) {
            if (!allowedTypes.includes(file.type)) {
                setError("Only images and PDF files are allowed.");
                return;
            }
    
            if (Number(file.size) > limit) {
                setError("The document you selected is too large. Select another < 5MB.");
                return;
            }
        };

        setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
    }

    if (presentFiles.length > 0 || files.length > 0) {
        return (
            <div id="attachments" className='flex h-fit flex-wrap gap-3'>
                {[...presentFiles, ...files].map((attachment, index) => (
                    <div id="attachment" key={index} className='flex items-center h-fit gap-2 p-2 rounded-md border-2 border-gray-200'>
                        <Image 
                            width={37}
                            height={37}
                            src={ attachment.type.includes("pdf") ? 
                                    "/images/events/PDF-file.svg" 
                                : attachment.type.includes("ai") ? 
                                    "/images/events/AI-file.svg" 
                                : URL.createObjectURL(attachment)
                            }
                            alt={`${attachment.type} logo`}
                            className='h-fit'
                        />

                        <div id="text" className='space-y-1'>
                            <h3 className='font-semibold text-gray-600'>{attachment.filename || attachment.name}</h3>
                            <div className='text-gray-400 font-normal'>
                                {typeof attachment.size == "number" ? formatFileSize(Number(attachment.size)): attachment.size}
                            </div>
                        </div>
                    </div>
                ))}

                <button 
                    onClick={() => fileInputRef.current.click()}
                    className='flex items-center justify-center gap-2 px-3 p-2 rounded-md border-2 border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed'
                    disabled={[...presentFiles, ...files].length == 5} 
                    id='add-new-attachment' 
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>

                {error !== "" && <p className='text-red-500'>{error}</p>}

                {/* Not visible to UI */}
                <input ref={fileInputRef} onChange={(e) => handleFilechange(e.target.files)} type="file" name="file" id="file" className='hidden' />
            </div>
        )
    } 

    return (
        <div 
            id='file-input' 
            className={`p-4 border-2 border-gray-300 w-fit rounded-lg flex gap-3 items-center ${dragging && "bg-gray-200 ease-transition"}`} 
            onDragOver={(e) => {e.preventDefault(); setDragging(true)}}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => { e.preventDefault(); handleFilechange(e.dataTransfer.files) }}
        >
            <Image 
                width={47}
                height={47}
                src={"/images/events/add-file.svg"}
                alt='Add File logo'
            />

            <div id="text" className='space-y-1'>
                <h1 className='text-black'>Grab and drop image or document here or</h1>
                <button onClick={() => fileInputRef.current.click()} className='text-[var(--primary-green)] font-semibold outline-none'>
                    Upload from your computer
                </button>
                {error !== "" && <p className='text-red-500'>{error}</p>}
            </div>

            <input
                ref={fileInputRef}
                onChange={(e) => handleFilechange(e.target.files)}
                type="file"
                name="file"
                id="file"
                className="hidden"
                accept="image/*,application/pdf"
            />
        </div>
    );
}

export default FileInput;
