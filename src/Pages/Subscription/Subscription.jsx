// Importing the necessary modules 
import React, { useState } from 'react';
import styles from "./css/Subscription.module.css";
import Slide from 'react-reveal/Slide';  
import Zoom from 'react-reveal/Zoom';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';
// import { withSwal } from 'react-sweetalert2';
import prices from '../../Components/Prices';
import regionCountries from '../../Components/regionCountries';

const Subscription = () => {
    // State to store selected region and countries
    const [selectedRegion, setSelectedRegion] = useState("");
    const [countries, setCountries] = useState([]);  
    const [selectedPremises, setSelectedPremises] = useState("");
    const [distanceFromCenter, setDistanceFromCenter] = useState(""); 
    const [captchaValid, setCaptchaValid] = useState(false);
    const [captchaError, setCaptchaError] = useState(false); 
    const [countryPrice, setCountryPrice] = useState(""); 
    const [swalProps, setSwalProps] = useState({});
    // Handler for region change
    const handleRegionChange = (e) => {
        const region = e.target.value;
        setSelectedRegion(region);

        // Update the countries based on the selected region
        setCountries(regionCountries[region] || []);
    };

    // Handle country change 
    const handleCountryChange = (e) => {
        // Getting the price 
        const country = e.target.value;

        // Getting the dom element 
        const countryPrice = document.getElementById("countryPrice"); 
        
        // Getting the country price 
        const countryPriceValue = prices[country]

        // Setting the state 
        // setCountryPrice(countryPriceValue); 
        countryPrice.innerText = countryPriceValue; 
    }

    // Handler for premises type change
    const handlePremisesChange = (value) => {
        setSelectedPremises(value);
    };

    // Handler for distance from center 
    const handleDistanceFromCenter = (value) => {
        setDistanceFromCenter(value); 
    }

    // Callback for reCAPTCHA verification
    const handleCaptchaChange = (value) => {
        if (value) {
            setCaptchaValid(true);   // Valid captcha
            setCaptchaError(false);  // Reset any previous errors
        } else {
            setCaptchaValid(false);
        }
    };

    // Creating a function for handling the submit button 
    const handleSubmit = (e) => {
        // Prevent default submission 
        e.preventDefault();

        // Checking if the captcha is valid
        let a=1;
        // !captchaValid
        if (a==0) {
            setCaptchaError(true); 
            alert("Captcha not valid")  // Show error if CAPTCHA not validated
            return;
        }

        // Proceed with form submission logic
        // Else get the form data 
        else {
            // Getting all the dom elements 
            const region = document.getElementById("region").value; 
            const country = document.getElementById("country").value; 
            const password = document.getElementById("password").value; 
            const email = document.getElementById("email").value; 
            const firstname = document.getElementById("firstname").value;
            const middlename = document.getElementById("middlename").value || ""; 
            const lastname = document.getElementById("lastname").value; 
            const phoneNumber = document.getElementById("phoneNumber").value; 
            const houseNumber = document.getElementById("houseNumber").value;
            const streetName = document.getElementById("streetName").value;  
            const city = document.getElementById("city").value; 
            const state = document.getElementById("state").value; 
            const landmark = document.getElementById("landmark").value; 
            const pincode = document.getElementById("pincode").value; 
            const referralcode = document.getElementById("referralcode").value; 
            const countryPrice = document.getElementById("countryPrice").innerText; 
            const premisesType = selectedPremises || ""; 
            const distanceFromCenterValue = distanceFromCenter || ""; 


            console.log(country.value); 
            console.log(distanceFromCenterValue);
            let newUser={
                region:region,
                country:country,
                password:password,
                emailAddress:email,
                firstname:firstname,
                middlename:middlename,
                lastname:lastname,
                premisesType:premisesType,
                distanceFromCenter:distanceFromCenterValue,
                contact:phoneNumber,
                houseNumber:houseNumber,
                streetName:streetName,
                city:city,
                state:state,
                landmark:landmark,
                pincode:pincode,
                yearlyFee:countryPrice

            }
            // log new user detail on console
            console.log(newUser);
            // send data to api
            axios.post('https://userbackend-c87y.onrender.com/partner/register', newUser)
                .then(function (response) {
                    // Handle the successful response
                    console.log(response.data);
                    
                    Swal.fire({
                    title: response.data.status,
                    text: response.data.message,
                    icon: response.data.status
                    });
                })
                .catch(function (error) {
                    console.log(error);

                    // Handle the error
                    Swal.fire({
                    title: 'Unsuccessful',
                    text: 'Something went wrong!',
                    icon: 'error'
                    });
                });
        }
    };

    // Rendering the component 
    return (
        <main className={styles.mainDiv}>
            <div className={styles.getyourSubHeaderDiv}>
                <h3> Get Your Subscription Now </h3>
            </div>

            <div className={styles.formDiv}>
                <form>
                    {/* Adding the continent region div */}
                    <Slide left>
                        <div className={styles.selectRegionDiv}>
                            <label> Select Region* </label>
                            <select id="region" value={selectedRegion} onChange={handleRegionChange} className={styles.continentName}>
                                <option value="">Select a region</option>
                                <option value="asiaPacific">Asia Pacific</option>
                                <option value="europe">Europe</option>
                                <option value="northAmerica">North America</option>
                            </select>
                        </div>
                    </Slide>

                    <Slide left> 
                    {/* Adding the countries div */}
                    {countries.length > 0 && (
                        <div className={styles.selectCountriesDiv}>
                            <label> Select Country* </label>
                            <select id="country" className={styles.countryName} onChange={handleCountryChange}>
                                <option value="">Select a country</option>
                                {countries.map((country, index) => (
                                    <option key={index} value={country}>
                                        {country}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    </Slide>

                    <Slide right> 
                        {/* Adding the password div */}
                        <div className={styles.passwordDiv}>
                            <label> Password* </label>
                            <input id="password" type="password" placeholder='Enter your password here...' className={`${styles.inputForm} ${styles.password}`}/> 
                        </div>

                        {/* Adding the email id */}
                        <div className={styles.emailDiv}> 
                            <label> Email ID* </label>
                            <input id="email" type="email" placeholder='Enter your email here...' className={`${styles.inputForm} ${styles.email}`} /> 
                        </div>

                        {/* Adding the firstname div */}
                        <div className={styles.firstnameDiv}> 
                            <label> First Name* </label>
                            <input id="firstname" type="text" placeholder='Enter your first name' className={`${styles.inputForm} ${styles.firstname}`}/>
                        </div>

                        {/* Adding the middle name  */}
                        <div className={styles.middlenameDiv}> 
                            <label> Middle Name </label>
                            <input type="text" id="middlename" placeholder='Enter your middle name' className={`${styles.inputForm} ${styles.middlename}`} /> 
                        </div>

                        {/* Adding the last name */}
                        <div className={styles.lastnameDiv}> 
                            <label> Last Name* </label>
                            <input id="lastname" type="text" placeholder='Enter your lastname' className={`${styles.inputForm} ${styles.lastname}`} /> 
                        </div>
                    </Slide>

                    <Zoom delay={200}>
                        {/* Premises type (only one can be selected at a time) */}
                        <section className={styles.premisesTypeOuterDiv}> 
                            <div className={styles.premisesLabelTypeDiv}> 
                                <label> Premises Type *</label>
                            </div>

                            <div className={styles.premisesTypeDiv}>
                                <div className={styles.checkboxMainDiv}> 
                                    <label className={styles.checkboxLabel}> Apartment </label>
                                    <input 
                                        type="checkbox" 
                                        value="apartment" 
                                        checked={selectedPremises === "apartment"} 
                                        onChange={() => handlePremisesChange("apartment")} 
                                    />
                                </div>
                                <div className={styles.checkboxMainDiv}> 
                                    <label className={styles.checkboxLabel}> House/Villa </label>
                                    <input 
                                        type="checkbox" 
                                        value="house/villa" 
                                        checked={selectedPremises === "house/villa"} 
                                        onChange={() => handlePremisesChange("house/villa")} 
                                    />
                                </div>
                                <div className={styles.checkboxMainDiv}> 
                                    <label className={styles.checkboxLabel}> Farm House </label>
                                    <input 
                                        type="checkbox" 
                                        value="farmhouse" 
                                        checked={selectedPremises === "farmhouse"} 
                                        onChange={() => handlePremisesChange("farmhouse")} 
                                    /> 
                                </div> 
                            </div>
                        </section>

                        {/* Adding the distance from center  */}
                        <section className={styles.distanceFromCenterDiv}> 
                            <div>
                                <label> Distance from center* </label>
                            </div>

                            <section className={styles.distanceFromCenterOptions}> 
                                <div className={styles.checkboxMainDiv}>
                                    <label className={styles.checkboxLabel}> Within 5km</label>
                                    <input type="checkbox" 
                                    value="within5km"
                                    checked={distanceFromCenter === "within5km"}
                                    onChange={() => handleDistanceFromCenter('within5km')} /> 
                                </div>
                                <div className={styles.checkboxMainDiv}> 
                                    <label className={styles.checkboxLabel}> 10km </label>
                                    <input type="checkbox" 
                                    value="10km"
                                    checked={distanceFromCenter === "10km"}
                                    onChange={() => handleDistanceFromCenter("10km")} /> 
                                </div>
                                <div className={styles.checkboxMainDiv}>
                                    <label className={styles.checkboxLabel}> 20km </label>
                                    <input type="checkbox"
                                    value="20km"
                                    checked={distanceFromCenter === "20km"}
                                    onChange={() => handleDistanceFromCenter("20km")} />  
                                </div>
                            </section> 
                        </section>
                    

                        {/* Adding the contact div */}
                        <section className={styles.contactDiv}> 
                            <div> 
                                <label> Contact* </label>
                            </div>

                            <div> 
                                <input type="tel" id="phoneNumber" placeholder='Enter your phone number...' className={`${styles.inputForm} ${styles.contactForm}`} /> 
                            </div>
                        </section>

                        {/*Adding the Address div  */}
                        <section className={styles.addressDiv}> 
                            <div> 
                                <label> Address* </label>
                            </div>

                            <div> 
                                <section className={styles.firstRowAddress}> 
                                    <div> 
                                        <label> House No </label>
                                        <input type="text" id="houseNumber" className={styles.addressInputForm} /> 
                                    </div>
                                    <div> 
                                        <label> street Name </label>
                                        <input type="text" id="streetName" className={styles.addressInputForm} /> 
                                    </div>
                                    <div> 
                                        <label> City </label>
                                        <input type="text" id="city" className={styles.addressInputForm} /> 
                                        {/* <select className={styles.selectCityForm}> 
                                            <option value="select city"> Select a city </option>
                                        </select> */}
                                    </div>
                                </section>
                                <section className={styles.secondRowAddress}> 
                                    <div>
                                        <label> State </label>
                                        <input type="text" id="state" className={styles.addressInputForm} /> 
                                        {/* <select className={styles.selectStateForm}>
                                            <option value="select state"> Select a state </option>
                                        </select> */}
                                    </div>
                                    <div className={styles.landmarkDiv}> 
                                        <label> Landmark </label>
                                        <input type="text" id="landmark" className={styles.landmarkInputForm} /> 
                                    </div>
                                </section>
                                <section className={styles.thirdRowAddress}>
                                    <div className={styles.pinCodeDiv}> 
                                        <label> Pin Code </label>
                                        <input type="number" id="pincode" placeholder="Enter pin code" className={styles.enterPinCodeForm} /> 
                                    </div>
                                </section>

                            </div>
                        </section>

                        {/* Adding the refferal code div */}
                        <div className={styles.referralCodeDiv}> 
                            <div> 
                                <label> Referral Code </label>
                            </div> 
                            <div> 
                                <input type="number" placeholder='Referral Code' id="referralcode" className={styles.referralCodeInputForm}/> 
                            </div> 
                        </div> 

                    </Zoom>


                    {/* Adding the type of services and number of visits section */}
                    <Slide right> 
                        <section className={styles.tableDiv}> 
                            <table> 
                                <tbody> 
                                    <tr> 
                                        <th> Type of Services </th>
                                        <th>  Number of Visits </th>
                                    </tr>
                                    <tr> 
                                        <td> Electrical & Electronics Maintenance </td>
                                        <td> 18 </td>
                                    </tr>
                                    <tr> 
                                        <td> Plumbing Maintenance </td>
                                        <td> 10 </td>
                                    </tr>
                                    <tr> 
                                        <td> Computer System Maintenance (Hardware & Software) </td>
                                        <td> 8 </td>
                                    </tr>
                                    <tr> 
                                        <td> Carpenter Services </td>
                                        <td> 6 </td>
                                    </tr>
                                    <tr> 
                                        <td> Housekeeping Services (Cleaning Solutions) </td>
                                        <td> 4 </td>
                                    </tr>
                                    <tr> 
                                        <td> F.M.O Review </td>
                                        <td> Half Yearly Site Audit </td>
                                    </tr>
                                    <tr> 
                                        <td> <b> Yearly Fee </b> </td>
                                        <td> <b> <span id="countryPrice"> {countryPrice} </span> </b> </td>
                                    </tr> 
                                </tbody>
                            </table>
                        </section>
                    </Slide>

                    {/* reCAPTCHA Component */}
                    <Zoom delay={800}>
                        <div className={styles.formGroup}>
                            <ReCAPTCHA
                                sitekey="6Lfb8UwqAAAAAMLtQFvrcXt9P1x30KYmVV14k9NQ"
                                onChange={handleCaptchaChange}
                            />
                        </div>
                    </Zoom>

                    {/* Zoom animation on the submit button */}
                    <Zoom delay={1000}>
                        <div className={styles.formGroup}>
                            <button type="submit" className={styles.subscribeNow} onClick={handleSubmit}>Subscribe Now</button>
                            <div style={{display:"flex"}}>
                                <p>Already have an account? </p><Link to="/login" style={{textDecoration:'none', marginLeft:"5px"}}> Login</Link>
                            </div>
                        </div>
                    </Zoom>

                </form>
            </div>
        </main>
    );
};

export default Subscription;