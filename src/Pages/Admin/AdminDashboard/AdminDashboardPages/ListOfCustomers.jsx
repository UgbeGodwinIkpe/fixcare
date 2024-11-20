// Importing the necessary modules 
import React, { Fragment, useState } from 'react'; 
import styles from "../css/ListOfCustomers.module.css";
import countryUsers from '../../../../Components/countryUsers';
import regionCountries from '../../../../Components/regionCountries'; 
import axios from 'axios';
// Creating the ListOfCustomers component 
const ListOfCustomers = (props) => {
    // Setting the state 
    const [selectedRegion, setSelectedRegion] = useState(""); 
    const [countries, setCountries] = useState([]);  
    const [selectedCountry, setSelectedCountry] = useState(""); // Track selected country
    const [users, setUsers] = useState([]); // Users to display after country selection
    const [selectedUser, setSelectedUser] = useState(null); // Track selected user

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
        let ln=user.split(" ")[0];
        let fn=user.split(" ")[1];
        let mn=user.split(" ")[2] || "";
        let token=localStorage.getItem("auth");
        let reqD={firstname:fn, lastname:ln, middlename:mn, token:token};
        axios.post('http://localhost:6300/admin/userdetails', reqD)
                .then(function (response) {
                    let userD=response.data.data;
                    console.log(userD, userD.email)
                    document.getElementById("email").textContent=userD.emailAddress
                    document.getElementById("premisetype").textContent=userD.premisesType
                    document.getElementById("distance").textContent=userD.distanceFromCenter
                    document.getElementById("contact").textContent=userD.contact
                    document.getElementById("house").textContent=userD.houseNumber
                    document.getElementById("street").textContent=userD.streetName
                    document.getElementById("city").textContent=userD.city
                    document.getElementById("state").textContent=userD.state
                    document.getElementById("landmark").textContent=userD.landmark
                    document.getElementById("refcode").textContent=userD.refid
                    document.getElementById("fee").textContent=userD.yearlyFee
                    document.getElementById("paymentdate").textContent=userD.paymentdate||"null"
                    document.getElementById("paymentmode").textContent=userD.paymenttype ||"null"
                    document.getElementById("amountpaid").textContent=userD.amountpaid||"null"
                    document.getElementById("experydate").textContent=userD.expirydate||"null"
                })
                .catch(function (error) {
                    console.log(error);
      
                });
    };

    // Returning the JSX component 
    return (
        <Fragment> 
            {/* Adding the main div */}
            <main> 
                <div className={styles.headerTextDiv}> 
                    <h3> List Of Customers </h3>
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

                {/* Adding the user details table */}
                {selectedUser && (
                    <div className={styles.userDetails}>
                        <h3>User Details</h3>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <td> {selectedUser}</td>
                                </tr>
                                <tr> 
                                    <th> Region </th>
                                    <td> {selectedRegion}</td>
                                </tr>
                                <tr>
                                    <th> Country </th> 
                                    <td>{selectedCountry}</td>
                                </tr>
                                <tr> 
                                    <th> Email Id </th>
                                    <td id="email"> user email </td>
                                </tr>
                                <tr> 
                                    <th> First Name </th>
                                    <td> {selectedUser.split(" ")[1]}</td>
                                </tr>
                                <tr> 
                                    <th> Last Name </th>
                                    <td> {selectedUser.split(" ")[0]}</td>
                                </tr>
                                <tr> 
                                    <th> Premises Type </th>
                                    <td id="premisetype"> apartment </td>
                                </tr>
                                <tr> 
                                    <th> Distance from center </th>
                                    <td id="distance"> within 5km </td>
                                </tr>
                                <tr> 
                                    <th> Contact </th>
                                    <td id="contact"> *********** </td>
                                </tr>
                                <tr> 
                                    <th> House No </th>
                                    <td id="house"> **** </td>
                                </tr>
                                <tr> 
                                    <th> Stree Name </th>
                                    <td id="street"> null </td>
                                </tr>
                                <tr> 
                                    <th> City </th>
                                    <td id="city"> null </td>
                                </tr>
                                <tr> 
                                    <th> State </th>
                                    <td id="state"> Texas </td>
                                </tr>
                                <tr> 
                                    <th> Landmark </th>
                                    <td id="landmark"> null </td>
                                </tr>
                                <tr> 
                                    <th> Referral Code </th>
                                    <td id="refcode"> null </td>
                                </tr>
                                <tr> 
                                    <th> Yearly Fee </th>
                                    <td id="fee"> ** </td>
                                </tr>
                                <tr> 
                                    <th> Payment Date </th>
                                    <td id="paymentdate"> **/**/**** </td>
                                </tr>
                                <tr> 
                                    <th> Payment Mode </th>
                                    <td id="paymentmode"> null </td>
                                </tr>
                                <tr> 
                                    <th> Amount Paid </th>
                                    <td id="amountpaid"> ** </td>
                                </tr>
                                <tr> 
                                    <th> Plan Expiry Date </th>
                                    <td id="experydate"> **/**/****</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </Fragment>
    );
};

// Exporting the ListOfCustomers component 
export default ListOfCustomers;