// Importing the necessary modules 
import React, { Fragment } from 'react'
import styles from "./css/AdminLogin.module.css"; 
import fixtechLogo from "../../../Images/fixTechLogo.jpeg"; 
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

// Creating the Admin login component 
const AdminLogin = () => {

    //login handler
    const handleLogin = (e) => {
        // Prevent default submission 
        e.preventDefault();
      
        // Checking if the captcha is valid
        let a=1;
        // !captchaValid
        if (a==0) {
            // setCaptchaError(true); 
            alert("Captcha not valid")  // Show error if CAPTCHA not validated
            return;
        }
      
        // Proceed with form submission logic
        // Else get the form data 
        else {
            // Getting all the dom elements 
            const username = document.getElementById("username").value; 
            const password = document.getElementById("password").value; 
            const rememberMe = document.getElementById("rememberme").value;
            console.log(username, password, rememberMe); 
            let adminUser={
                username,
                password,
                rememberMe
            }
            // log new user detail on console
            console.log(adminUser);
            // send data to api
            axios.post('https://fixtech-admin-backend.onrender.com/admin/login', adminUser)
                .then(function (response) {
                    
                // console.log('refid',response.data.refid);
                // document.cookie = `user={email}; expires={expires.toUTCString()}; path=/`;
                
                Swal.fire({
                  title: response.data.status,
                    text: response.data.message,
                    icon: response.data.status
                }).then(()=>{
                  if(response.data.status==='success'){
                    // Handle the successful response
                    console.log(response.data);
                    let expires=new Date(Date.now()+1*86400000);
                    localStorage.setItem('refid', response.data.refid);
                    localStorage.setItem('username', response.data.username);
                    localStorage.setItem('auth', response.data.xAuthToken);
                    window.location.href = "https://fixcare-ten.vercel.app/adminDashboard"
                  }
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
  return (
    <Fragment>
      <div> 
        <div className={styles.photoDiv}>
            <img src={fixtechLogo} alt="LOGO" className={styles.imageLogo} />  
        </div>

        <div className={styles.container}>
            <section className={styles.innerContainer}>
                <div> 
                    <h3> Admin Login </h3>
                </div>

                <div className={styles.emailDiv}>
                    <label> Username* </label> <br /> 
                    <input type="text" id="username" placeholder='Username...' className={styles.inputForm} /> 
                </div>

                <div className={styles.passwordDiv}>
                    <label> Password* </label> <br /> 
                    <input type="password" id="password" placeholder='Password...' className={styles.inputForm} /> 
                </div>

                {/* Adding the remever me div */}
                <div className={styles.rememberMeDiv}>
                    <input type="checkbox" id="rememberme" /> 
                    <label className={styles.rememberMeText}> Remember Me </label>
                </div>

                {/* Adding the login button */}
                <div className={styles.loginBtnDiv}> 
                    <button className={styles.loginBtn} onClick={handleLogin}> LOGIN </button>
                </div>

                {/* Adding the forget password div  */}
                {/* <div className={styles.forgetPassword}>
                    <div>
                        <Link to="#"> <span className={styles.link}> Forget Password ? </span> </Link>
                    </div>
                </div> */}
            
            </section> 

        </div>
      </div>
    </Fragment>
  )
}

export default AdminLogin
