import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Layout from '@/layouts/main';
import Modal from '@/components/Modal/Modal';
import CustomCheckbox from '@/components/CustomCheckbox/CustomCheckbox';

const Blogs = () => {
    const [blogs, updateBlogs] = useState([
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
            views: 334,
            image: "/images/blogs/thumbnail.png",
            approved: true
        },
        {
            id: 6,
            title: 'Getting started with Tech',
            description: 'Use audio to have live conversations with other collaborators directly in your Figma and FigJam.',
            views: 980,
            image: "/images/blogs/thumbnail.png",
            approved: false
        },
        {
            id: 7,
            title: 'Getting started with AI',
            description: 'Use audio to have live conversations with other collaborators directly in your Figma and FigJam.',
            views: 0,
            image: "/images/blogs/thumbnail.png",
            approved: false
        },
        {
            id: 8,
            title: 'Getting started with AI',
            description: 'Use audio to have live conversations with other collaborators directly in your Figma and FigJam.',
            views: 440,
            image: "/images/blogs/thumbnail.png",
            approved: true
        },
        {
            id: 9,
            title: 'Getting started with AI',
            description: 'Use audio to have live conversations with other collaborators directly in your Figma and FigJam.',
            views: 440,
            image: "/images/blogs/thumbnail.png",
            approved: true
        },
        {
            id: 10,
            title: 'Getting started with AI',
            description: 'Use audio to have live conversations with other collaborators directly in your Figma and FigJam.',
            views: 0,
            image: "/images/blogs/thumbnail.png",
            approved: false
        },
        {
            id: 11,
            title: 'Getting started with AI',
            description: 'Use audio to have live conversations with other collaborators directly in your Figma and FigJam.',
            views: 334,
            image: "/images/blogs/thumbnail.png",
            approved: true
        },
        {
            id: 12,
            title: 'Getting started with AI',
            description: 'Use audio to have live conversations with other collaborators directly in your Figma and FigJam.',
            views: 440,
            image: "/images/blogs/thumbnail.png",
            approved: true
        }
    ]);
    const [pages, updatePages] = useState([]);
    const [blogsToShow, updateBlogsToShow] = useState([]);

    const [selectedItems, updateSelectedItems] = useState([]);
    const [deleteModalHidden, updateDeleteModalHidden] = useState(true);
    const [currentPageIndex, updateCurrentPageIndex] = useState(0);

    const router = useRouter();

    useEffect(() => {
        // when blogs data arrives ...
        const groupedBlogs = groupBlogs();
        updateBlogsToShow(groupedBlogs);
        updateCurrentPageIndex(0);
        if (groupedBlogs[currentPageIndex]) updateBlogsToShow(groupedBlogs[currentPageIndex]);
        updatePages(groupedBlogs);

    }, [blogs])

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

    const deleteBlogPosts = () => {
        updateSelectedItems([]);
        updateDeleteModalHidden(true);

        // delete posts logic with api ...
        router.refresh();
    }

    const groupBlogs = () => {
        const grouped = [];
        let tempArray = [];
      
        blogs.forEach((picture, index) => {
          tempArray.push(picture);
      
          // Once we have 8 items in the tempArray, push it to the grouped array and reset
          if (tempArray.length === 6 || index === blogs.length - 1) {
            grouped.push(tempArray);
            tempArray = [];
          }
        });
      
        return grouped;
    };

    const changePage = (currentIndex) => {
        updateCurrentPageIndex(currentIndex);
        console.log(currentPageIndex);
    }

    return (
        <div className={`blogs-content w-full ${blogsToShow.length > 0 && "min-h-screen"} p-0 lg:p-5`}>
            <Modal hidden={deleteModalHidden}>
                <div className='flex flex-col gap-4 items-center'>
                    <Image src={"/images/blogs/delete-blog.svg"} width={105} height={110} />
                    <h2 className='font-extrabold text-[18px]'>Delete blogs?</h2>
                    <p className='text-gray-400 text-sm'>You&apos;re about to delete {selectedItems.length} blogs</p>
                    
                    <div id="btns" className='flex gap-4'>
                        <button className='bg-red-100 rounded-xl flex items-center gap-2 px-4 py-3' onClick={deleteBlogPosts}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className='scale-[120%]'>
                                <path d="M1.99806 3.98177L3.35588 3.84865L3.35588 3.84866L3.35759 3.84848C6.85806 3.49317 10.4144 3.63033 13.9958 3.98174C13.996 3.98199 13.9961 3.9822 13.9961 3.98234C13.9961 3.98238 13.9961 3.98243 13.9961 3.98249L13.996 3.98248L13.9959 3.98437H13.9958H13.9957H13.9957H13.9956H13.9955H13.9954H13.9953H13.9952H13.9951H13.995H13.995H13.9949H13.9948H13.9947H13.9946H13.9945H13.9944H13.9943H13.9943H13.9942H13.9941H13.994H13.9939H13.9938H13.9937H13.9936H13.9935H13.9935H13.9934H13.9933H13.9932H13.9931H13.993H13.9929H13.9928H13.9927H13.9926H13.9925H13.9925H13.9924H13.9923H13.9922H13.9921H13.992H13.9919H13.9918H13.9917H13.9916H13.9915H13.9914H13.9914H13.9913H13.9912H13.9911H13.991H13.9909H13.9908H13.9907H13.9906H13.9905H13.9904H13.9903H13.9902H13.9901H13.99H13.99H13.9899H13.9898H13.9897H13.9896H13.9895H13.9894H13.9893H13.9892H13.9891H13.989H13.9889H13.9888H13.9887H13.9886H13.9885H13.9884H13.9883H13.9882H13.9881H13.988H13.9879H13.9878H13.9877H13.9877H13.9876H13.9875H13.9874H13.9873H13.9872H13.9871H13.987H13.9869H13.9868H13.9867H13.9866H13.9865H13.9864H13.9863H13.9862H13.9861H13.986H13.9859H13.9858H13.9857H13.9856H13.9855H13.9854H13.9853H13.9852H13.9851H13.985H13.9849H13.9848H13.9847H13.9846H13.9845H13.9844H13.9843H13.9842H13.9841H13.984H13.9839H13.9838H13.9837H13.9836H13.9835H13.9834H13.9833H13.9832H13.9831H13.983H13.9829H13.9828H13.9827H13.9826H13.9825H13.9824H13.9823H13.9822H13.9821H13.9819H13.9818H13.9817H13.9816H13.9815H13.9814H13.9813H13.9812H13.9811H13.981H13.9809H13.9808H13.9807H13.9806H13.9805H13.9804H13.9803H13.9802H13.9801H13.98H13.9799H13.9798H13.9797H13.9796H13.9795H13.9793H13.9792H13.9791H13.979H13.9789H13.9788H13.9787H13.9786H13.9785H13.9784H13.9783H13.9782H13.9781H13.978H13.9779H13.9778H13.9777H13.9775H13.9774H13.9773H13.9772H13.9771H13.977H13.9769H13.9768H13.9767H13.9766H13.9765H13.9764H13.9763H13.9762H13.9761H13.9759H13.9758H13.9757H13.9756H13.9755H13.9754H13.9753H13.9752H13.9751H13.975H13.9749H13.9748H13.9746H13.9745H13.9744H13.9743H13.9742H13.9741H13.974H13.9739H13.9738H13.9737H13.9736H13.9734H13.9733H13.9732H13.9731H13.973H13.9729H13.9728H13.9727H13.9726H13.9725H13.9724H13.9722H13.9721H13.972C10.4349 3.63101 6.88739 3.49654 3.36416 3.85351L2.00608 3.98665C2.00238 3.98697 2.00063 3.98648 2.00009 3.98631C1.99932 3.98607 1.99878 3.98576 1.99846 3.98551C1.99837 3.98513 1.99826 3.98452 1.99818 3.98363C1.99811 3.98293 1.99808 3.98231 1.99806 3.98177Z" fill="#FF0018" stroke="#FF0018"/>
                                <path d="M5.82047 2.44417L5.67631 3.259L5.81294 2.44541L5.81304 2.4448C5.86976 2.10446 5.92086 1.85727 6.06932 1.67384C6.11918 1.61224 6.1926 1.54383 6.30947 1.48477C6.25587 1.51487 6.20345 1.55211 6.154 1.5984C6.0069 1.73608 5.94084 1.90317 5.90337 2.03423C5.86947 2.15281 5.84589 2.29304 5.82386 2.424C5.82273 2.43075 5.8216 2.43748 5.82047 2.44417ZM7.13318 1.3426C7.01149 1.3426 6.89379 1.34502 6.78436 1.35472C6.88462 1.34272 6.99804 1.33594 7.12651 1.33594H8.87318C8.99607 1.33594 9.10523 1.34234 9.20235 1.35375C9.10023 1.34511 8.99177 1.3426 8.87984 1.3426H7.13318Z" fill="#FF0018" stroke="#FF0018"/>
                                <path d="M10.1396 15.1677H5.85961C3.53294 15.1677 3.43961 13.881 3.36627 12.841L2.93294 6.12769C2.91294 5.85436 3.12627 5.61436 3.39961 5.59436C3.67961 5.58103 3.91294 5.78769 3.93294 6.06103L4.36627 12.7744C4.43961 13.7877 4.46627 14.1677 5.85961 14.1677H10.1396C11.5396 14.1677 11.5663 13.7877 11.6329 12.7744L12.0663 6.06103C12.0863 5.78769 12.3263 5.58103 12.5996 5.59436C12.8729 5.61436 13.0863 5.84769 13.0663 6.12769L12.6329 12.841C12.5596 13.881 12.4663 15.1677 10.1396 15.1677Z" fill="#FF0018"/>
                                <path d="M9.10672 11.5H6.88672C6.61339 11.5 6.38672 11.2733 6.38672 11C6.38672 10.7267 6.61339 10.5 6.88672 10.5H9.10672C9.38005 10.5 9.60672 10.7267 9.60672 11C9.60672 11.2733 9.38005 11.5 9.10672 11.5Z" fill="#FF0018"/>
                                <path d="M9.66634 8.83594H6.33301C6.05967 8.83594 5.83301 8.60927 5.83301 8.33594C5.83301 8.0626 6.05967 7.83594 6.33301 7.83594H9.66634C9.93967 7.83594 10.1663 8.0626 10.1663 8.33594C10.1663 8.60927 9.93967 8.83594 9.66634 8.83594Z" fill="#FF0018"/>
                            </svg>
                            <span className='text-[#FF0018]'>Yes, delete</span>
                        </button>

                        <button className='rounded-xl border-2 border-[#D3D3D3] px-4 py-3' onClick={() => updateDeleteModalHidden(true)}>No, go back!</button>
                    </div>
                </div>
            </Modal>

            {/* Show blog posts only when the list is not empty */}
            {blogsToShow.length > 0 ?
                <>
                    <div className="search-select-delete flex w-full py-3 justify-between bg-white mb-2 px-4 rounded-xl shadow-[0px 1.41px 2.83px -0.71px #AFB6C933] lg:mb-3">
                        <input type="text" id='blog-search' className='px-4 w-full mx-2 h-fit self-center py-3 border-2 border-gray-300 rounded-xl
                        md:w-fit' placeholder='Search blog'/>

                        <div id="select-delete" className='bg-white p-2 gap-3 hidden md:flex lg:p-4'>
                            <div id='selected-blogs-count' className="bg-green-100 text-sm rounded-lg p-3 text-[#00B598]">Selected ({selectedItems.length})</div>
                            <button 
                                id='delete-selected-blogs'
                                disabled={selectedItems.length === 0} 
                                className='flex gap-2 items-center border-2 rounded-lg p-3 border-red-700 ease-transition hover:scale-105 disabled:opacity-50'
                                onClick={() => updateDeleteModalHidden(false)}
                            >
                                <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg" className='scale-[120%]'>
                                    <path d="M5.60645 1.20312H9.60645M1.60645 3.20313H13.6064M12.2731 3.20313L11.8056 10.216C11.7354 11.2681 11.7004 11.7942 11.4731 12.1931C11.2731 12.5443 10.9713 12.8266 10.6076 13.0029C10.1944 13.2031 9.66718 13.2031 8.61268 13.2031H6.60022C5.54572 13.2031 5.01847 13.2031 4.60534 13.0029C4.24162 12.8266 3.93984 12.5443 3.73977 12.1931C3.51252 11.7942 3.47745 11.2681 3.4073 10.216L2.93978 3.20313M6.27311 6.20313V9.53646M8.93978 6.20313V9.53646" stroke="#AA0010" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span className='text-red-700 text-sm'>Delete ({selectedItems.length})</span>
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between gap-5 py-2 md:grid md:grid-cols-2 lg:grid-cols-3">
                        {Array.from(pages[currentPageIndex]).map((blog, index) => 
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

                    <div id="pages" className='flex p-6 py-4 mt-4 gap-4 items-center justify-end rounded-2xl bg-white'> 
                        <h3 className='text-black font-semibold'>Page {parseInt(currentPageIndex) + 1} of {(pages.length)}</h3>
                        <div className="page-list flex gap-2">
                            {pages.map((page, index) => (
                                <span 
                                    key={index}
                                    id={index}
                                    className={`text-sm px-2 py-1 cursor-pointer leading-[21px] text-[#98A2B3] ${currentPageIndex == index && "active-page-number"}`}
                                    onClick={(e) => changePage(e.target.id)}
                                >
                                    {index + 1}
                                </span>
                        ))}</div>
                        <div id="arrows" className='flex'>
                            <button 
                                className={`bg-[#00B598] p-4 rounded-2xl rounded-r-none disabled:opacity-50`} 
                                disabled={currentPageIndex == 0} id='left-arrow'
                                onClick={() => changePage(parseInt(currentPageIndex) - 1)}
                            >
                                <Image src={"/images/blogs/left-arrow-icon.svg"} width={8} height={16} alt='left-arrow'/>
                            </button>

                            <button 
                                className='bg-[#00B598] p-4 rounded-2xl rounded-l-none disabled:opacity-50' 
                                disabled={pages.length == parseInt(currentPageIndex) + 1} id='right-arrow'
                                onClick={() => changePage(parseInt(currentPageIndex) + 1)}
                            >
                                <Image src={"/images/blogs/right-arrow-icon.svg"} width={8} height={16} alt='right-arrow'/>
                            </button>
                        </div>
                    </div>

                </>
            :<div id='no-blog-posts-content' className='bg-white flex flex-col rounded-lg py-5 justify-center items-center gap-3'>
                <Image src={"/images/blogs/no-blog-posts.svg"} width={289} height={320} alt='no-blog-posts-svg'/>
                <span className='text-sm leading-[28px] text-[#464646]'>Nothing here, create your first blog</span>
                <button 
                    className='text-white px-4 py-3 bg-[#00B598] ease-transition hover:scale-105'
                    onClick={() => router.push('/blog/create-post')}
                >
                    Create new
                </button>
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
                :<div className='pending-status absolute bottom-6 rounded-3xl self-end mt-5 text-red-700 p-2 px-4 bg-red-100 flex gap-2 items-center'>
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