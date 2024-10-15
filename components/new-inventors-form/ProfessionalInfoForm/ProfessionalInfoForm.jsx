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
        <div id='professional-info'>
            <form action="submit">
                <div id="job-company">
                    <div id="job-div">
                        <label htmlFor="job">Job title</label>
                        <input type="name" id="job" name="job" className='input' required />
                    </div>

                    <div id="company-div">
                        <label htmlFor="company">Company/Organization</label>
                        <input type="name" id="company" name="company" className='input' required />
                    </div>
                </div>
                
                <div id="experience-school">
                    <div id="years-of-experience">
                        <label htmlFor="experience">Years of Experience</label>
                        <select name="experience" id="experience" className='input'>
                            <option value="">Select</option>
                            {yearsOfExperience.map(item => <option value={item}>{item}</option>)}
                        </select>
                    </div>

                    <div id="School / Alumni">
                        <label htmlFor="company">Company/Organization</label>
                        <input type="name" id="company" name="company" className='input' required />
                    </div>
                </div>

                <header>Skills and Interests</header>

                <div id="primary-secondary-skills">
                    <div id="primary-skills-div">
                        <label htmlFor="primary-skill">Primary skill</label>
                        <select name='primary-skill' id='primary-skill' className='input'>
                            <option value="">select</option>
                            {skills.map((skill) => (
                                <option value={skill}>{skill}</option>
                            ))}
                        </select>
                    </div>

                    <div id="secondary-skills-div">
                        <label htmlFor="secondary-skill">Secondary skill</label>
                        <select name='secondary-skill' id='secondary-skill' className='input'>
                            <option value="">select</option>
                            {skills.map((skill) => (
                                <option value={skill}>{skill}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div id="tools-interest">
                    <div id='tools-div'>
                        <label htmlFor="tools">Technologies/Tools Expertise</label>
                        <select name="tools" id="tools" className='input'>
                            <option value=""> select</option>
                            {tools.map((tool) => <option value={tool}>{tool}</option>)}
                        </select>
                    </div>

                    <div id="interest">
                        <label htmlFor="interest">Area of Interest (e.g Web Development, AI, Cybersecurity)</label>
                        <input type="text" id="interest" name="interest" placeholder="e.g. graphic design, entrepreneurship, etc." />
                        <textarea name="interest" id="interest" placeholder='Write here .. ' className='input'></textarea>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ProfessionalInfoForm;
