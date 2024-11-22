// Importing the necessary modules 
import React, { Fragment, useState } from 'react';
import styles from "../css/PendingServiceRequest.module.css";
import countryServices from '../../../../Components/services'; 
import countryUsers from '../../../../Components/countryUsers';
import regionCountries from '../../../../Components/regionCountries';
import axios from 'axios';
// Creating the pending service request component 
const PendingServiceRequest = (props) => {
    // Setting the state 
    const [selectedRegion, setSelectedRegion] = useState(""); 
    const [countries, setCountries] = useState([]);  
    const [selectedCountry, setSelectedCountry] = useState("");
    const [services, setServices] = useState([]); 
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedService, setSelectedService] = useState("");    
    
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
        // setServices(countryServices[country] || []);
        setServices(countryServices["service id"] || []);
        
        setUsers(countryUsers[country] || []);
        setSelectedService(""); // Reset selected service when country changes
    };

    // Handle service change 
    const handleServiceChange = (e) => {
        const service = e.target.value;
        // setSelectedService(service); // Set the selected service
        const serviceid=document.getElementById("serviceid").value;
        const token=localStorage.getItem('auth')
        console.log(serviceid, service);
        var userArray=[];
        axios.post('https://fixtech-admin-backend.onrender.com/admin/pending', {serviceid:service, token:token})
                .then(function (response) {
                    if(response.status==200){
                        let usersD=response.data.data;
                        setUsers(userArray || []); 
                        setSelectedService(service); // Reset selected service when country changes

                    }
                    // console.log("Response: ", response)
                    // for(var i=0; i<usersD.length; i++){
                    //     let userFullName= usersD[i].lastname + " "+usersD[i].firstname +" "+ usersD[i].middlename
                    //     userArray.push(userFullName);
                    // }
                    // console.log("Array:", usersD)
                    // Update the users based on the selected country
                    // setSelectedUser(null); // Reset selected user when country changes
                    // setSelectedServiceType(""); // Reset service type when country changes
                    // setUsers(countryUsers[country] || []);
    
                })
                .catch(function (error) {
                    console.log(error);
      
                });
    };

    // Handle user change 
    const handleUserChange = (e) => {
        const user = e.target.value; 
        setSelectedUser(user); // Set the selected user
    };

    // Rendering the component 
    return(
        <Fragment>
           {/* Adding the main div */}
           <main className={styles.mainDiv}> 
                <div> 
                    <div className={styles.headerTextDiv}> 
                        <h3> Pending Service Request </h3>
                    </div>
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

                {/* Adding the service id */}
                {services.length > 0 && (
                    <Fragment>
                        <div className={styles.selectServiceTypeDiv}> 
                            <select 
                                className={styles.selectService}
                                value={selectedService}
                                onChange={handleServiceChange} // Handle service selection
                            id="serviceid"> 
                                <option value="">Select service id</option>
                                {services.map((service, index) => (
                                    <option key={index} value={service}>
                                        {service}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </Fragment>
                )}

                {/* Adding the table */}
                {selectedService && ( // Conditionally render the table when a service is selected
                    <main> 
                        <div>
                            <table> 
                                <tbody>
                                    <tr> 
                                        <th> Name of Customer </th>
                                        <th> Address </th>
                                        <th> Service Type </th>
                                        <th> Problem </th>
                                        <th> Preferred Time Slot </th>
                                        <th> Message </th>
                                    </tr>
                                    <tr> 
                                        <td> Alex </td>
                                        <td> No 54 Texas USA</td>
                                        <td> Electrical </td>
                                        <td> Bulb fittings </td>
                                        <td> 5:30pm </td>
                                        <td> I need my bulb fixed. </td>
                                    </tr>
                                </tbody>
                            </table> 
                        </div>

                    </main>
                )}
           </main>
        </Fragment>
    )
}

// Exporting the component 
export default PendingServiceRequest;
