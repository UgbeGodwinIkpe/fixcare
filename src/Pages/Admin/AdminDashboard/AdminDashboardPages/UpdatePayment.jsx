// Importing the necessary modules 
import React, { Fragment, useState } from 'react';
import styles from "../css/AdminUpdatePayment.module.css"; 
import countryUsers from '../../../../Components/countryUsers';
import regionCountries from '../../../../Components/regionCountries';
import axios from 'axios'; 

// Creating the component 
const AdminUpdatePayment = (props) => {
    // Setting the state 
    const [selectedRegion, setSelectedRegion] = useState(""); 
    const [countries, setCountries] = useState([]);  
    const [selectedCountry, setSelectedCountry] = useState(""); 
    const [users, setUsers] = useState([]); 
    const [selectedUser, setSelectedUser] = useState(null); 

    // Handle select upload 
    const handleselectPdf = (e) => {
        // Getting the dom element for the file upload 
        const file = document.getElementById("file"); 

        // Clicking on the file 
        file.click(); 
    } 

    // Handle region change 
    const handleRegionChange = (e) => {
        const region = e.target.value; 
        setSelectedRegion(region);

        // Update the countries based on the selected region 
        setCountries(regionCountries[region] || []); 
        setSelectedCountry(""); // Reset selected country when region changes
        setUsers([]); // Reset users when region changes
        setSelectedUser(null); // Reset selected user when region changes
    };

    // Handle country change 
    const handleCountryChange = (e) => {
        const country = e.target.value; 
        setSelectedCountry(country);
        const token=localStorage.getItem('auth')
        var userArray=[];
        axios.post('http://localhost:6300/admin/list', {country, token})
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
     
                })
                .catch(function (error) {
                    console.log(error);
      
                });
        // Update the users based on the selected country
        // setUsers(countryUsers[country] || []); 
        // setSelectedUser(null); // Reset selected user when country changes
    };

    // Handle user change 
    const handleUserChange = (e) => {
        const user = e.target.value; 
        setSelectedUser(user); // Set the selected user
    };

    // Rendering the component
    return(
        <Fragment> 
            {/* Adding the main div  */}
                {/* Adding the main div */}
                <main> 
                    <div className={styles.headerTextDiv}> 
                        <h3> Update Payment </h3>
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

                {/* Adding the upload pdf */}
                {selectedUser && (
                    <div className={styles.userDetails}>
                        <div> 
                            <input type="file" id="file" className={styles.uploadFile}/> 
                            <button onClick={handleselectPdf} className={styles.selectPdfBtn}> Select Pdf </button>
                        </div>
                        <div className={styles.uploadBtnDiv}> 
                            <button className={styles.uploadBtn}> Upload PDF format Invoice </button>
                        </div>
                    </div>
                )}

            </main>
        </Fragment>
    )
}

// Exporting the Update payment 
export default AdminUpdatePayment; 