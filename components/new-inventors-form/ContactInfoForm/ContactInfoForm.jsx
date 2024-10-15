import React from 'react';

const ContactInfoForm = ({updateIsContactInfoFilled}) => {
    return (
        <div id='ContactInfoForm'>
            <section id='section-1'>
                <div id='inkedIn-div'>
                    <label htmlFor="linkedIn">LinkedIn Profile</label>
                    <input type="text" name="linkedIn" id="linkedIn" placeholder='Enter URL' className='input'/>
                </div>

                <div id="portfolio">
                    <label htmlFor="Portfolio">Personal Website / Portfolio</label>
                    <input type="text" name="portfolio" id="portfolio" placeholder='Enter URL' className='input'/>
                </div>

                <div id='facebook-div'>
                    <label htmlFor="facebook">Facebook Handle</label>
                    <input type="text" name="facebook" id="facebook" placeholder='Enter URL' className='input'/>
                </div>
            </section>

            <section id='section-2'>
                <div id='skill-profile-div'>
                    <label htmlFor="skill-profile">Skill Profile (GitHub, Behance)</label>
                    <input type="text" name="skill-profile" id="skill-profile" placeholder='Enter URL' className='input'/>
                </div>

                <div id="x-handle-div">
                    <label htmlFor="x-handle">X-Handle (Twitter)</label>
                    <input type="text" name="x-handle" id="x-handle" placeholder='Enter URL' className='input'/>
                </div>
            </section>
        </div>
    );
}

export default ContactInfoForm;
