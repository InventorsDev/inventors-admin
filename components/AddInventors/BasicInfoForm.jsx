import React from 'react';
import ProfileInput from '../ProfileInput';
import { countries } from '@/utils/countries';

const BasicInfoForm = ({ updateIsBasicInfoFilled }) => {
    return (
        <div id='basic-info-form' className=''>
            <ProfileInput />

            <div className='horizontal-rule my-10'></div>

            <form action="submit" className='text-[14px] leading-[24px] flex flex-col gap-1 font-[400] text-[#29343D]'>
                <div className="name flex w-full gap-4 mb-4">
                    <div id="first-name-div" className='label-input'>
                        <label htmlFor="first-name">First Name</label>
                        <input type="name" id="first-name" placeholder="Enter your first name" name="first-name" className='form-input' required />
                    </div>

                    <div id="last-name-div" className='label-input'>
                        <label htmlFor="first-name">Last Name</label>
                        <input type="name" id="last-name" name="last-name" placeholder="Enter your last name" className='form-input' required />
                    </div>
                </div>

                <div className="email-password flex gap-4 mb-4">
                    <div id="email-div" className='label-input'>
                        <label htmlFor="email">Email address</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email address" className='form-input' required />
                    </div>

                    <div id="password-div" className='label-input'>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter password" className='form-input' required />
                    </div>
                </div>

                <div className="description-country-city flex gap-4 mb-4">
                    <div id="bio-description" className='label-input'>
                        <label htmlFor="description">Bio/Short Description</label>
                        <textarea name="bio-description" id="bio-description" maxLength={600} placeholder='Tell us about you' className='form-input h-[150%] resize-none'></textarea>
                    </div>

                    <section className='flex flex-col w-full'>
                        <div id="Phone" className='label-input mb-4'>
                            <label htmlFor="phone">Phone</label>
                            <input type="tel" name="phone" id="phone" placeholder="Enter your phone number" className='form-input' />
                        </div>

                        <div id="country" className='label-input cursor-pointer'>
                            <label htmlFor="country">Country</label>
                            <select name="country" id="country" className='form-input text-black'>
                                <option value="">-- Select a country --</option>
                                {countries.map((country) => (
                                    <option key={country} value={country} className='text-black'>{country}</option>
                                ))}
                            </select>
                        </div>
                    </section>
                </div>
            </form>
        </div>
    );
}

export default BasicInfoForm;
