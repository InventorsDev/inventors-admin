import React from 'react';
import Image from 'next/image';
import { Country, State, City }  from 'country-state-city';

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

                <div className='horizontal-rule'></div>

                <form action="submit">
                    <div className="name">
                        <div id="first-name-div">
                            <label htmlFor="first-name">First Name</label>
                            <input type="name" id="first-name" name="first-name" required />
                        </div>

                        <div id="last-name-div">
                            <label htmlFor="first-name">Last Name</label>
                            <input type="name" id="last-name" name="last-name" required />
                        </div>
                    </div>
                    
                    <div className="email-password">
                        <div id="email-div">
                            <label htmlFor="email">Email address</label>
                            <input type="email" id="email" name="email" required />
                        </div>

                        <div id="password-div">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" required />
                        </div>
                    </div>

                    <div className="description-country-city">
                        <div id="bio-description">
                            <label htmlFor="description">Bio/Short Description</label>
                            <input type="text" name="bio-description" id="bio-description" />
                        </div>

                        <div id="Phone">
                            <label htmlFor="phone">Phone</label>
                            <input type="tel" name="phone" id="phone" />
                        </div>

                        <div id="country">
                            <label htmlFor="country"></label>
                            <select name="country" id="country">
                                <option value="">-- Select a country --</option>
                                {Country.getAllCountries().map((country) => (
                                    <option key={country.name} value={country.name}>{country.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default BasicInfoForm;
