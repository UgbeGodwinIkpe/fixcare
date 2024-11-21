// Importing the necessary modules 
import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';
import styles from "../css/MyAccount.module.css";  
import profileLogo from "../../../Images/profile.png"; 

// Creating the functional component 
const MyAccount = (props) => {
    // Handling the state 
    const [image, setImage] = useState(""); 

    // Getting the translation object 
    const { t } = props; 
    {/* Fect user details */}
    const  getUserDetails=()=>{
        let userRefId=localStorage.getItem('refid');
        let authToken=localStorage.getItem('auth');
        let email=document.getElementById("userEmail"),
        fname=document.getElementById("userFname"),
        lname=document.getElementById("userLname"),
        phone=document.getElementById("userPhone"),
        ptype=document.getElementById("userPtype"),
        address=document.getElementById("userAddress");
        email.innerText="User Email";
        fname.innerText="First Name";
        lname.innerText="Last Name";
        phone.innerText="Phone Number";
        ptype.innerText="Premises Type";
        address.innerText="Home Address"
        // if(userRefId===null||userRefIdK===null){
        //     Swal.fire({
        //         title: "error",
        //           text: "Session expired, kindly login!",
        //           icon: "error"
        //       }).then(()=>{window.location.href = "http://localhost:3000/login"});
        // }
        axios.post('https://userbackend-c87y.onrender.com/partner/user', {refid:userRefId, token:authToken})
        .then(function (response) {
            // log response
            console.log(response);
            email.innerText=response.data.emailAddress;
        fname.innerText=response.data.firstname;
        lname.innerText=response.data.lastname;
        phone.innerText=response.data.contact;
        ptype.innerText=response.data.premisesType;
        address.innerText=response.data.houseNumber + " "+response.data.streetName+", " +response.data.landmark+", "+response.data.city
        })
        .catch(function (error) {
            // Handle the error
            console.log(error);
        });
    };
    useEffect(()=>{getUserDetails()},[]);
    // document.addEventListener('DOMContentLoaded', getUserDetails);
    // Handle upload image 
    const handeleUploadImage = (props) => {
        // Getting the dom element of the upload file 
        const fileUpload = document.getElementById("fileUpload"); 
        fileUpload.click();  
    }
    // Handle change password
    const handleNewPassValidation=()=>{
        let errtxt=document.getElementById("err");
        let np=document.getElementById("np").value;
        let cp=document.getElementById("cp").value;
        let op=document.getElementById("op").value;
        if(op===''){
            errtxt.innerText="Center your current password!"
            errtxt.style.color="red";
            errtxt.style.padding="4px"
            errtxt.style.border="2px red solid"
            errtxt.style.textAlign="center";
        }else if(np.length<=5){
            errtxt.innerText="Password must be must contain minimum of 6 characters!"
            errtxt.style.color="red";
            // errtxt.style.background="grey";
            errtxt.style.padding="4px"
            errtxt.style.border="2px red solid"
            errtxt.style.textAlign="center";
        }else if(np>5){
            errtxt.innerText="Password characters length accepted!"
            errtxt.style.color="green";
            errtxt.style.padding="4px"
            errtxt.style.border="2px green solid";
            errtxt.style.textAlign="center";
        }
    }
    const handleCPassValidation=()=>{
        let errtxt=document.getElementById("err");
        let np=document.getElementById("np").value;
        let cp=document.getElementById("cp").value;
        let op=document.getElementById("op").value;
        if(op===''){
            errtxt.innerText="Center your current password!"
            errtxt.style.color="red";
            errtxt.style.padding="4px"
            errtxt.style.border="2px red solid"
            errtxt.style.textAlign="center";
        }else if(np !== cp){
            errtxt.innerText="Confirm password do not match with the new password field!"
            errtxt.style.color="red";
            errtxt.style.padding="4px"
            errtxt.style.border="2px red solid"
            errtxt.style.textAlign="center";
        }else if(np===cp){
            errtxt.innerText="Confirmed!"
            errtxt.style.color="green";
            errtxt.style.padding="4px";
            errtxt.style.border="2px green solid";
            errtxt.style.textAlign="center";
        }
    }
    const handeleChangePassword=()=>{
        let op=document.getElementById("op").value;
        let np=document.getElementById("np").value;
        let authToken=localStorage.getItem('auth');
        let refid=localStorage.getItem('refid');
        if(op===null || np===null || refid===null||op==='' || np===''|| refid===''){
          return  Swal.fire({
                title: "error",
                  text: "All fields are rquired!",
                  icon: "error"
              })
        }
        let changeData={oldpass:op, newpass:np,refid:refid, token:authToken}
        axios.patch('https://userbackend-c87y.onrender.com/partner/changeuserpassword', changeData)
        .then(function (response) {
            // log response
            console.log("response:-");
            console.log("response:-", response);
            if(response.status==200){
                //alert message
                // alert(`Ppassword successfully changed to: ${np}`)
                Swal.fire({
                    title: "successfulled",
                      text: `Your password has been successfully changed to: ${np}`,
                      icon: "success"
                  })
            }else{
                Swal.fire({
                    title: "error",
                      text: "Something went wrong!",
                      icon: "error"
                  })
            }
        })
        .catch(function (error) {
            // Handle the error
            console.log(error);
        });

    }
    // Returning the jsx component 
    return(
        <Fragment>
            <main className={styles.mainDiv}>
                <section className={styles.upperSection}> 
                    <div>
                        <h2> {t('Account Details')} </h2>
                    </div>
                    <div className={styles.userProfile}>
                        <div>
                            <p className={styles.userProfileText}> {t('User Profile')} </p>
                        </div>
                        <div>
                            <Link to="/editAccount" ><button className={styles.editBtn}> {t('EDIT')} </button></Link>
                        </div>

                    </div>
                    <div className={styles.profileLogoDiv}>
                        <div> 
                            <img src={profileLogo} className={styles.profileLogo} alt="profileLogo" />
                        </div>
                        <div> 
                            <input type="file" id="fileUpload" className={styles.inputFile} onChange={() => {
                                console.log('Uploading the image'); 
                            }}/> 
                        </div>
                        <div> 
                            <button className={styles.uploadBtn} onClick={handeleUploadImage}> {t('Upload')} <br /> {t('Profile Picture')}</button>
                        </div>
                    </div>

                    {/* Adding the table */}
                    <div className={styles.tableDiv}> 
                    <table>
                        <tbody>
                        <tr>
                            <td>{t('Email ID')} </td>
                            <td id="userEmail">cmbonu@ymail.com</td>
                        </tr>
                        <tr>
                            <td>{t('First Name')} </td>
                            <td id="userFname">Chinedu</td>
                        </tr>
                        <tr>
                            <td>{t('Last Name')}</td>
                            <td id="userLname">Mbonu</td>
                        </tr>
                        <tr>
                            <td>{t('Premises Type')}</td>
                            <td id="userPtype"> None </td>
                        </tr>
                        <tr>
                            <td>{t('Contact')} </td>
                            <td id="userPhone">+2349072168687</td>
                        </tr>
                        <tr>
                            <td>{t('Address')}</td>
                            <td id="userAddress">Airport road warri, Delta State. </td>
                        </tr>
                        </tbody>
                    </table>
                    </div>

                </section>
                
                {/* Adding the change password div */}
                <section className={styles.lowerSection}>
                    <div className={styles.changePasswordDiv}> 
                        <div>
                            <h3> {t('Change Password')}  </h3>
                        </div>

                        <section className={styles.passwordSection}>
                            <p id="err"></p>
                            <div className={styles.inputFormDiv}> 
                                <label className={styles.labelInputForm}> {t('Current password')} </label>
                                <input type="password" id="op" className={styles.inputForm} /> 
                            </div>
                            <div className={styles.inputFormDiv}> 
                                <label className={styles.labelInputForm}> {t('New Password')} </label>
                                <input type="password" onInput={handleNewPassValidation} id="np" className={styles.inputForm} /> 
                            </div>
                            <div className={styles.inputFormDiv}> 
                                <label className={styles.labelInputForm}> {t('Confirm Password')} </label>
                                <input type="password" onInput={handleCPassValidation} id="cp" className={styles.inputForm} /> 
                            </div>
                        </section>

                        <div className={styles.updateBtnDiv}> 
                            <button className={styles.updateBtn} onClick={handeleChangePassword}> {t('Update')} </button>
                        </div>

                    </div>
                </section>
                
            </main>
        </Fragment>
    )
}

// Exporting the dashboard my account component 
export default MyAccount; 