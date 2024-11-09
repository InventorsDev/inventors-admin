import React from 'react';

const ProfessionalInfoForm = ({updateIsProfessionalInfoFilled}) => {
    // The above prop is a function
    const skills = [
        "Web Design", 
        "Product Management", 
        "Product Design", 
        "Copywriting", 
        "Software Developmeent", 
        "Community Management", 
        "AI and Machine Learning",
        "DevOps and Cloud Computing"
    ]

    const yearsOfExperience = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "10+"];

    const tools = ["figma", "adobeXD", "clickUp"];

    return (
        <div id='professional-info' className='mt-4'>
            <form action="submit" className='flex flex-col gap-3'>
                <div id="job-company" className='w-full flex gap-4'>
                    <div id="job-div" className='label-input'>
                        <label htmlFor="job">Job title</label>
                        <input type="name" id="job" name="job" placeholder='Enter job title' className='form-input' required />
                    </div>

                    <div id="company-div" className='label-input'>
                        <label htmlFor="company">Company/Organization</label>
                        <input type="name" id="company" name="company" placeholder='Enter company name' className='form-input' required />
                    </div>
                </div>
                
                <div id="experience-school" className='flex gap-4'>
                    <div id="years-of-experience" className='label-input'>
                        <label htmlFor="experience">Years of Experience</label>
                        <select name="experience" id="experience" className='form-input cursor-pointer'>
                            <option value="">Select</option>
                            {yearsOfExperience.map(item => <option value={item} key={item}>{item}</option>)}
                        </select>
                    </div>

                    <div id="School / Alumni" className='label-input'>
                        <label htmlFor="school">School/Alumni</label>
                        <input type="name" id="school" name="school" placeholder='Enter School name' className='form-input' required />
                    </div>
                </div>

                <header className='text-[#3C3C3C] text-[18px] font-extrabold leading-[32px]'>Skills and Interests</header>

                <div id="primary-secondary-skills" className='flex gap-4'>
                    <div id="primary-skills-div" className='label-input'>
                        <label htmlFor="primary-skill">Primary skill</label>
                        <select name='primary-skill' id='primary-skill' className='form-input'>
                            <option value="">select</option>
                            {skills.map((skill) => (
                                <option value={skill} key={skill}>{skill}</option>
                            ))}
                        </select>
                    </div>

                    <div id="secondary-skills-div" className='label-input'>
                        <label htmlFor="secondary-skill">Secondary skill</label>
                        <select name='secondary-skill' id='secondary-skill' className='form-input cursor-pointer'>
                            <option value="">select</option>
                            {skills.map((skill) => (
                                <option value={skill} key={skill}>{skill}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div id="tools-interest" className='flex gap-4'>
                    <div id='tools-div' className='label-input'>
                        <label htmlFor="tools">Technologies/Tools Expertise</label>
                        <select name="tools" id="tools" className='form-input cursor-pointer'>
                            <option value=""> select</option>
                            {tools.map((tool) => <option value={tool} key={tool}>{tool}</option>)}
                        </select>
                    </div>

                    <div id="interest" className='label-input'>
                        <label htmlFor="interest">Area of Interest (e.g Web Development, AI, Cybersecurity)</label>
                        <textarea name="interest" id="interest" maxLength={500} placeholder='Write here .. ' className='form-input h-[5rem]'></textarea>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ProfessionalInfoForm;
