import React from 'react';
import Image from 'next/image';
import { countries } from '../data';

const BasicInfoForm = ({updateIsBasicInfoFilled}) => {
    return (
        <div id='basic-info-form'>
            <div id="profile-image">
                <Image src={"/new-inventors-form/dummy-profile-pic.svg"} alt='Selected Profile Picture' priority width={98} height={105}/>
                <div id="text-choose-file">
                    <h4>User Profile Image</h4>
                    <input type="file" id="profile-pic-input" name="profile-pic" accept=".png, .jpg, .jpeg" max={5000} />
                    <p>Max. File Size: 5mb</p>
                </div>
            </div>

            <div className='horizontal-rule'></div>

            <form action="submit">
                <div className="name">
                    <div id="first-name-div">
                        <label htmlFor="first-name">First Name</label>
                        <input type="name" id="first-name" name="first-name" className='input' required />
                    </div>

                    <div id="last-name-div">
                        <label htmlFor="first-name">Last Name</label>
                        <input type="name" id="last-name" name="last-name" className='input' required />
                    </div>
                </div>
                
                <div className="email-password">
                    <div id="email-div">
                        <label htmlFor="email">Email address</label>
                        <input type="email" id="email" name="email" className='input' required />
                    </div>

                    <div id="password-div">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" className='input' required />
                    </div>
                </div>

                <div className="description-country-city">
                    <div id="bio-description">
                        <label htmlFor="description">Bio/Short Description</label>
                        <textarea name="bio-description" id="bio-description" placeholder='Write here..' className='input'></textarea>
                    </div>

                    <div id="Phone">
                        <label htmlFor="phone">Phone</label>
                        <input type="tel" name="phone" id="phone" className='input' />
                    </div>

                    <div id="country">
                        <label htmlFor="country"></label>
                        <select name="country" id="country" className='input'>
                            <option value="">-- Select a country --</option>
                            {countries.map((country) => (
                                <option key={country.name} value={country.name}>{country.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default BasicInfoForm;
