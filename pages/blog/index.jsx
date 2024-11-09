import React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Layout from '@/layouts/main';
import CustomCheckbox from '@/components/CustomCheckbox/CustomCheckbox';

const blogs = [
    {
        id: 1,
        title: 'Getting started with Tech',
        description: 'Use audio to have live conversations with other collaborators directly in your Figma and FigJam.',
        views: 0,
        image: "/images/blogs/thumbnail.png",
        approved: false
    },
    {
        id: 2,
        title: 'Getting started with Tech',
        description: 'Use audio to have live conversations with other collaborators directly in your Figma and FigJam.',
        views: 440,
        image: "/images/blogs/thumbnail.png",
        approved: true
    },
    {
        id: 3,
        title: 'Getting started with Tech',
        description: 'Use audio to have live conversations with other collaborators directly in your Figma and FigJam.',
        views: 440,
        image: "/images/blogs/thumbnail.png",
        approved: true
    },
    {
        id: 4,
        title: 'Getting started with Tech',
        description: 'Use audio to have live conversations with other collaborators directly in your Figma and FigJam.',
        views: 0,
        image: "/images/blogs/thumbnail.png",
        approved: false
    },
    {
        id: 5,
        title: 'Getting started with Tech',
        description: 'Use audio to have live conversations with other collaborators directly in your Figma and FigJam.',
        views: 440,
        image: "/images/blogs/thumbnail.png",
        approved: true
    },
    {
        id: 6,
        title: 'Getting started with Tech',
        description: 'Use audio to have live conversations with other collaborators directly in your Figma and FigJam.',
        views: 440,
        image: "/images/blogs/thumbnail.png",
        approved: true
    }
]

const Blogs = () => {
    const [selectedItems, updateSelectedItems] = useState([]);

    useEffect(() => {
        console.log(selectedItems);
    }, [selectedItems])

    const handleBlogSelection = (e, checked) => {
        const blogPost = e.target.closest(".blog-post"); // Assuming the parent element with the ID is a ".blog-post" class.
        const blogPostId = blogPost.id;
        
        if (!checked) {             
            // Add the ID to selectedItems if checked is false
            updateSelectedItems((prev) => [...prev, blogPostId]);         
        } else {             
            // Remove the ID from selectedItems if checked is true
            updateSelectedItems((prev) => prev.filter(itemId => itemId !== blogPostId));         
        } 
    }

    return (
        <div className={`blogs-content w-full ${[].length > 0 && "min-h-screen"} p-0 lg:p-5`}>
            {[].length > 0 ?
                <>
                    <div className="search-select-delete flex w-full py-3 justify-between bg-white mb-2 px-4 rounded-xl shadow-[0px 1.41px 2.83px -0.71px #AFB6C933] lg:mb-3">
                        <input type="text" id='blog-search' className='px-4 w-full mx-2 h-fit self-center py-3 border-2 border-gray-300 rounded-xl
                        md:w-fit' placeholder='Search blog'/>

                        <div id="select-delete" className='bg-white p-2 gap-3 hidden md:flex lg:p-4'>
                            <div id='selected-blogs-count' className="bg-green-100 text-sm rounded-lg p-3 text-[#00B598]">Selected ({selectedItems.length})</div>
                            <button id='delete-selected-blogs' className='flex gap-2 items-center border-2 rounded-lg p-3 border-red-700 ease-transition hover:border-red-500'>
                                <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg" className='scale-[120%]'>
                                    <path d="M5.60645 1.20312H9.60645M1.60645 3.20313H13.6064M12.2731 3.20313L11.8056 10.216C11.7354 11.2681 11.7004 11.7942 11.4731 12.1931C11.2731 12.5443 10.9713 12.8266 10.6076 13.0029C10.1944 13.2031 9.66718 13.2031 8.61268 13.2031H6.60022C5.54572 13.2031 5.01847 13.2031 4.60534 13.0029C4.24162 12.8266 3.93984 12.5443 3.73977 12.1931C3.51252 11.7942 3.47745 11.2681 3.4073 10.216L2.93978 3.20313M6.27311 6.20313V9.53646M8.93978 6.20313V9.53646" stroke="#AA0010" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span className='text-red-700 text-sm'>Delete ({selectedItems.length})</span>
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between gap-5 py-2 md:grid md:grid-cols-2 lg:grid-cols-3">
                        {Array.from(blogs).map((blog, index) => 
                            <BlogItem 
                                id={blog.id}
                                key={index} 
                                thumbnail={blog.image} 
                                title={blog.title} 
                                description={blog.description} 
                                approved = {blog.approved} 
                                viewCount = {blog.views} 
                                handleCheckedState = {(e, checked) => handleBlogSelection(e, checked)} 
                            />
                        )}
                    </div>
                </>
            : <div id='no-blog-posts-content' className='bg-white flex flex-col rounded-lg py-5 justify-center items-center gap-3'>
                <Image src={"/images/blogs/no-blog-posts.svg"} width={289} height={320} alt='no-blog-posts-svg'/>
                <span className='text-sm leading-[28px] text-[#464646]'>Nothing here, create your first blog</span>
                <button className='text-white px-4 py-3 bg-[#00B598] ease-transition hover:scale-105'>Create new</button>
            </div>}
        </div>
    );
}

const BlogItem = (props) => {
    return (
        <div className='blog-post w-fit bg-white p-3 pb-6 border-2 border-[#D3D3D3] relative rounded-lg' id={props.id}>
            {/* absolute select checkbox */}
            <CustomCheckbox updateCheckedState = {(checked) => handleBlogSelection} handleCheckedState = {(e, checked) => props.handleCheckedState(e, checked)}/>

            <Image src={props.thumbnail} alt='Blog cover Image' className='rounded-lg min-w-full' width={288} height={140} />
            <h2 className="font-[700] text-[#333333] text-[20px] leading-[28px] py-4">{props.title}</h2>
            <p className='font-[400] text-sm leading-[24px] text-gray-500 text-wrap w-full'>{`${props.description.slice(0,102)}...`}</p>
            {props.approved && <button className='text-green-700 text-sm font-[400]'>Read More</button>}

            <div className='status-views flex justify-between mt-auto pt-3'>
                {/* status */}
                {props.approved ? <div className='approved-status rounded-3xl p-2 px-4 bg-green-100 text-[#003C33] flex gap-2 items-center'>
                    <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg" className='scale-[120%]'>
                        <path d="M4.99967 9.88802C2.52884 9.88802 0.520508 7.87969 0.520508 5.40885C0.520508 2.93802 2.52884 0.929688 4.99967 0.929688C7.47051 0.929688 9.47884 2.93802 9.47884 5.40885C9.47884 7.87969 7.47051 9.88802 4.99967 9.88802ZM4.99967 1.55469C2.87467 1.55469 1.14551 3.28385 1.14551 5.40885C1.14551 7.53385 2.87467 9.26302 4.99967 9.26302C7.12467 9.26302 8.85384 7.53385 8.85384 5.40885C8.85384 3.28385 7.12467 1.55469 4.99967 1.55469Z" fill="#007965"/>
                        <path d="M4.40859 6.90052C4.32526 6.90052 4.24609 6.86719 4.18776 6.80885L3.00859 5.62969C2.88776 5.50885 2.88776 5.30885 3.00859 5.18802C3.12943 5.06719 3.32943 5.06719 3.45026 5.18802L4.40859 6.14635L6.55026 4.00469C6.67109 3.88385 6.87109 3.88385 6.99193 4.00469C7.11276 4.12552 7.11276 4.32552 6.99193 4.44635L4.62943 6.80885C4.57109 6.86719 4.49193 6.90052 4.40859 6.90052Z" fill="#007965"/>
                    </svg>
                    <span>Approved</span>
                </div>
                :<div className='pending-status rounded-3xl h-full self-end mt-5 text-red-700 p-2 px-4 bg-red-100 flex gap-2 items-center'>
                    <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg" className='scale-[120%]'>
                        <path d="M4.99967 9.88802C2.52884 9.88802 0.520508 7.87969 0.520508 5.40885C0.520508 2.93802 2.52884 0.929688 4.99967 0.929688C7.47051 0.929688 9.47884 2.93802 9.47884 5.40885C9.47884 7.87969 7.47051 9.88802 4.99967 9.88802ZM4.99967 1.55469C2.87467 1.55469 1.14551 3.28385 1.14551 5.40885C1.14551 7.53385 2.87467 9.26302 4.99967 9.26302C7.12467 9.26302 8.85384 7.53385 8.85384 5.40885C8.85384 3.28385 7.12467 1.55469 4.99967 1.55469Z" fill="#D50014"/>
                        <path d="M6.54544 7.0474C6.49128 7.0474 6.43711 7.0349 6.38711 7.00156L5.09544 6.23073C4.77461 6.03906 4.53711 5.61823 4.53711 5.2474V3.53906C4.53711 3.36823 4.67878 3.22656 4.84961 3.22656C5.02044 3.22656 5.16211 3.36823 5.16211 3.53906V5.2474C5.16211 5.3974 5.28711 5.61823 5.41628 5.69323L6.70794 6.46406C6.85794 6.55156 6.90378 6.74323 6.81628 6.89323C6.75378 6.99323 6.64961 7.0474 6.54544 7.0474Z" fill="#D50014"/>
                    </svg>
                    <span>Pending</span>
                </div>}

                {/* views  - only show when status is approved*/}
                {props.approved && <div id='views' className='flex text-[#464646] gap-2 items-center'>
                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" className='scale-[120%]'>
                        <path d="M7.00044 9.93448C5.60628 9.93448 4.47461 8.80281 4.47461 7.40865C4.47461 6.01448 5.60628 4.88281 7.00044 4.88281C8.39461 4.88281 9.52628 6.01448 9.52628 7.40865C9.52628 8.80281 8.39461 9.93448 7.00044 9.93448ZM7.00044 5.75781C6.09044 5.75781 5.34961 6.49865 5.34961 7.40865C5.34961 8.31865 6.09044 9.05948 7.00044 9.05948C7.91044 9.05948 8.65128 8.31865 8.65128 7.40865C8.65128 6.49865 7.91044 5.75781 7.00044 5.75781Z" fill="#464646"/>
                        <path d="M6.99988 12.6718C4.80655 12.6718 2.73572 11.3884 1.31238 9.1601C0.694049 8.1976 0.694049 6.62844 1.31238 5.6601C2.74155 3.43177 4.81238 2.14844 6.99988 2.14844C9.18738 2.14844 11.2582 3.43177 12.6815 5.6601C13.2999 6.6226 13.2999 8.19177 12.6815 9.1601C11.2582 11.3884 9.18738 12.6718 6.99988 12.6718ZM6.99988 3.02344C5.11572 3.02344 3.31322 4.1551 2.05322 6.1326C1.61572 6.8151 1.61572 8.0051 2.05322 8.6876C3.31322 10.6651 5.11572 11.7968 6.99988 11.7968C8.88405 11.7968 10.6865 10.6651 11.9465 8.6876C12.384 8.0051 12.384 6.8151 11.9465 6.1326C10.6865 4.1551 8.88405 3.02344 6.99988 3.02344Z" fill="#464646"/>
                    </svg>
                    <span>{props.viewCount}</span>
                </div>}
            </div>            
        </div>
    )
}

export default Blogs;

Blogs.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
  };