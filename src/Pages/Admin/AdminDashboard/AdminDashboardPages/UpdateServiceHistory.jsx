// Importing the necessary modules 
import React, { Fragment, useState } from 'react';
import styles from "../css/UpdateServiceHIstory.module.css"; 
import regionCountries from '../../../../Components/regionCountries';
import countryUsers from '../../../../Components/countryUsers';
import axios from 'axios';
// Creating the functional component 
const UpdateServiceHistory = (props) => {
    // Setting the state 
    const [selectedRegion, setSelectedRegion] = useState(""); 
    const [countries, setCountries] = useState([]);  
    const [selectedCountry, setSelectedCountry] = useState("");
    const [users, setUsers] = useState([]); 
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedServiceType, setSelectedServiceType] = useState(""); // New state for service type

    // Handle region change 
    const handleRegionChange = (e) => {
        const region = e.target.value; 
        setSelectedRegion(region); 

        // Update the countries based on the selected region 
        setCountries(regionCountries[region] || []); 
        setSelectedCountry(""); 
        setUsers([]); 
        setSelectedUser(null); 
        setSelectedServiceType(""); // Reset service type when region changes
    }; 

    // Handle country change 
    const handleCountryChange = (e) => {
        const country = e.target.value; 
        setSelectedCountry(country); 
        const token=localStorage.getItem('auth')
        var userArray=[];
        axios.post('https://fixtech-admin-backend.onrender.com/admin/list', {country, token})
                .then(function (response) {
                    let usersD=response.data.data;
                    for(var i=0; i<usersD.length; i++){
                        console.log(usersD[i].firstname)
                        let userFullName= usersD[i].lastname + " "+usersD[i].firstname +" "+ usersD[i].middlename
                        userArray.push(userFullName);
                    }
                    console.log("userArray:", userArray)
                    // Update the users based on the selected country
                    setUsers(userArray || []); 
                    setSelectedUser(null); // Reset selected user when country changes
                    setSelectedServiceType(""); // Reset service type when country changes
    
                })
                .catch(function (error) {
                    console.log(error);
      
                });
        // Update the users based on the selected country 
        // setUsers(countryUsers[country] || []); 
        // setSelectedUser(null); 
        // setSelectedServiceType(""); // Reset service type when country changes
    };

    // Handle user change 
    const handleUserChange = (e) => {
        const user = e.target.value; 
        setSelectedUser(user); 
        setSelectedServiceType(""); // Reset service type when user changes
    };

    // Handle service type change
    const handleServiceTypeChange = (e) => {
        setSelectedServiceType(e.target.value);
    };

    // Returning the JSX component 
    return(
        <Fragment>
            {/* Adding the main div */}
            <main className={styles.mainDiv}> 
                <div className={styles.updateServiceHeaderText}>
                    <p> Update service history </p>
                </div>
                <div>
                    <label>Select Region*</label>
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

                {/* Adding the countries div */}
                {countries.length > 0 && (
                    <div className={styles.selectCountry}>
                        <label>Select Country*</label>
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

                {/* Adding the user names div */}
                {users.length > 0 && (
                    <div className={styles.selectUsers}>
                        <label>Select User*</label>
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

                {/* Adding the service type */}
                {selectedUser && (
                    <div className={styles.userDetails}>
                        <label> Service Type* </label>
                        <select 
                            className={styles.serviceTypeSelect}
                            value={selectedServiceType}
                            onChange={handleServiceTypeChange} // Handle service type selection
                        >
                            <option value="">Select a service type</option>
                            <option value="Electrical & Electronics Maintenance">Electrical & Electronics Maintenance</option>
                            <option value="Plumbing Maintenance">Plumbing Maintenance</option>
                            <option value="Computer System Maintenance">Computer System Maintenance (Hardware & Software)</option>
                            <option value="Carpenter Services">Carpenter Services</option>
                            <option value="Cleaning Solutions">Cleaning Solutions</option>
                            <option value="F.M.O Review">F.M.O Review</option>
                        </select>
                    </div>
                )}

                {/* Adding the table */}
                {selectedServiceType && (
                    <div className={styles.tableDiv}>
                        <h3>Service History for {selectedServiceType}</h3>
                        <table>
                            <tbody>
                                <tr> 
                                    <th> Date </th>
                                    <td> <input type="date" placeholder="12/02/2021" className={styles.inputForm} /> </td>
                                </tr>
                                <tr> 
                                    <th> Time </th>
                                    <td> <input type="time" className={styles.inputForm} /> </td>
                                </tr> 
                                <tr> 
                                    <th> Maintenance Engineer </th>
                                    <td> <input type="text" placeholder='Avinash Sharma' className={styles.inputForm} /> </td>
                                </tr>
                                <tr> 
                                    <th> 
                                        Problem Fixed 
                                    </th>
                                    <td> 
                                        <input 
                                            type="text" 
                                            placeholder='Repaired Lamp and Fixed wire of kitchen switch board'
                                            className={styles.inputForm} 
                                        s/> 
                                    </td>
                                </tr>
                            </tbody>
                        </table> 

                        {/* Adding the submit div  */}
                        <div className={styles.submitBtnDiv}> 
                            <button className={styles.submitBtn}> Submit </button>
                        </div>
                    </div>
                )}

            </main>
        </Fragment>
    );
}

// Exporting the update service history 
export default UpdateServiceHistory;
