// Importing the necessary modules 
import React, { Fragment, useState } from 'react';
import styles from "../css/Messages.module.css";
import countryServices from '../../../../Components/services';
import countryUsers from '../../../../Components/countryUsers'; 
import regionCountries from '../../../../Components/regionCountries';

// Creating a functional component 
const Messages = (props) => {
    // Setting the state 
    const [countries, setCountries] = useState([]); 
    const [selectedRegion, setSelectedRegion] = useState(""); 
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedService, setSelectedService] = useState("")
    const [services, setServices] = useState([]); 
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    // Handle region change 
    const handleRegionChange = (e) => {
        const region = e.target.value; 
        setSelectedRegion(region); 

        // Update the countries based on the selected region 
        setCountries(regionCountries[region] || []); 
        setSelectedCountry(""); 
        setServices([]); 
        setSelectedService(""); // Reset service when region changes
    };

    // Handle country change 
    const handleCountryChange = (e) => {
        const country = e.target.value; 
        setSelectedCountry(country);

        // Update the services based on the selected country
        setServices(countryServices[country] || []); 
        setUsers(countryUsers[country] || []);
        setSelectedService(""); // Reset selected service when country changes
    };

    // Handle user change 
    const handleUserChange = (e) => {
        const user = e.target.value; 
        setSelectedUser(user); // Set the selected user
    };

    // Returning the component 
    return(
        <Fragment> 
            <div> 
            <div className={styles.messageTextDiv}> 
                <p className={styles.messageText}> 
                    <span className={styles.messageFeature}> Message Feature: </span> 
                    Send to All / Send as per Country / Send to Individual 
                </p>
            </div>
            <div className={styles.selectDiv}>
                <div>
                <div> 
                        <label> Select Region*</label>
                        <select 
                            id="region"
                            value={selectedRegion}
                            onChange={handleRegionChange}
                            className={styles.continentName}
                        >
                            <option value="">Select a region</option>
                            <option value="asiaPacific">Asia Pacific</option>
                            <option value="europe">Europe</option>
                            <option value="northAmerica">North America</option>
                        </select>    
                    </div> 
                </div>
                <div>
                    {countries.length > 0 && (
                        <div className={styles.selectCountry}>
                            <select 
                                id="country" 
                                value={selectedCountry} 
                                onChange={handleCountryChange} 
                                className={styles.countryName}
                            >
                                <option value="">Select a country</option>
                                {countries.map((country, index) => (
                                    <option key={index} value={country}>
                                        {country}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
                <div>
                    {/* Adding the user names div */}
                    {users.length > 0 && (
                        <div className={styles.selectUsers}>
                            <select 
                                id="user" 
                                onChange={handleUserChange} 
                                className={styles.userName}
                            >
                                <option value="">Select a user</option>
                                {users.map((user, index) => (
                                    <option key={index} value={user}>
                                        {user}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
            </div>

            {/* Adding the message div */}
            <div> 
                <div className={styles.sendMessageInputFormDiv}> 
                    <textarea className={styles.sendMessageInputForm} placeholder='Type message'></textarea>
                </div>
                <div className={styles.sendMessageBtnDiv}>
                    <button className={styles.sendMessageBtn}> Send Message </button>
                </div>
            </div>
            </div>
        </Fragment>
    )
}

// Exporting the messages component 
export default Messages; 