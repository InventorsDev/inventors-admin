import React from 'react';

const ContactInfoForm = ({updateIsContactInfoFilled}) => {
    return (
        <div id='ContactInfoForm' className='flex w-full gap-6 mt-4'>
            <section id='section-1' className='flex flex-col w-full gap-4'>
                <div id='inkedIn-div' className='label-input'>
                    <label htmlFor="linkedIn">LinkedIn Profile</label>
                    <input type="text" name="linkedIn" id="linkedIn" placeholder='Enter URL' className='form-input'/>
                </div>

                <div id="portfolio" className='label-input'>
                    <label htmlFor="Portfolio">Personal Website / Portfolio</label>
                    <input type="text" name="portfolio" id="portfolio" placeholder='Enter URL' className='form-input'/>
                </div>

                <div id='facebook-div' className='label-input'>
                    <label htmlFor="facebook">Facebook Handle</label>
                    <input type="text" name="facebook" id="facebook" placeholder='Enter URL' className='form-input'/>
                </div>
            </section>

            <section id='section-2' className='flex flex-col w-full gap-4'>
                <div id='skill-profile-div' className='label-input'>
                    <label htmlFor="skill-profile">Skill Profile (GitHub, Behance)</label>
                    <input type="text" name="skill-profile" id="skill-profile" placeholder='Enter URL' className='form-input'/>
                </div>

                <div id="x-handle-div" className='label-input'>
                    <label htmlFor="x-handle">X-Handle (Twitter)</label>
                    <input type="text" name="x-handle" id="x-handle" placeholder='Enter URL' className='form-input'/>
                </div>
            </section>
        </div>
    );
}

export default ContactInfoForm;
