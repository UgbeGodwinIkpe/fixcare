// Importing the necessary modules 
import React, { Fragment, useState } from 'react'
import styles from "./css/UserLogin.module.css";
import Zoom from 'react-reveal/Zoom';
// import styles1 from "./css/Subscription.module.css";
import fixtechLogo from "../../Images/fixTechLogo.jpeg"; 
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import Swal from 'sweetalert2';

// Creating the user login component
const UserLogin = () => {
  // set states
const [captchaValid, setCaptchaValid] = useState(false);
const [captchaError, setCaptchaError] = useState(false); 
    
// Callback for reCAPTCHA verification
const handleCaptchaChange = (value) => {
  if (value) {
      setCaptchaValid(true);   // Valid captcha
      setCaptchaError(false);  // Reset any previous errors
  } else {
      setCaptchaValid(false);
  }
};

// login function
const handleLogin = (e) => {
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
      const email = document.getElementById("email").value; 
      const password = document.getElementById("password").value; 
    
      console.log(email, password); 
      let newUser={
          emailAddress:email,
          password:password
      }
      // log new user detail on console
      console.log(newUser);
      // send data to api
      axios.post('http://localhost:6300/partner/login', newUser)
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
              window.location.href = "http://localhost:3000/dashboard"
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
                <h3> User Login </h3> 
              </div> 

              <div className={styles.emailDiv}> 
                <label> Email*</label> <br /> 
                <input type="email" id="email" className={styles.inputForm}/> 
            </div>

            <div className={styles.passwordDiv}>
              <label> Password*</label> <br /> 
              <input type="password" id="password" className={styles.inputForm} />
            </div>

            {/* Adding the remever me div */}
            <div className={styles.rememberMeDiv}>
              <input type="checkbox" /> 
              <label> Remember Me </label>
            </div>
            {/* reCAPTCHA Component */}
            <Zoom delay={800}>
                        <div className={styles.formGroup}>
                            <ReCAPTCHA
                                sitekey="6Lfb8UwqAAAAAMLtQFvrcXt9P1x30KYmVV14k9NQ"
                                onChange={handleCaptchaChange}
                            />
                        </div>
                    </Zoom>
            {/* Adding the login button */}
            <div className={styles.loginBtnDiv}> 
              <button className={styles.loginBtn} onClick={handleLogin}> LOGIN </button>
            </div>

            {/* Adding the forget password div */}
            <div className={styles.forgetPassword}> 
              <div>
                <Link to="../"> For <span className={styles.link}> Registration </span></Link>
              </div>
              <div>
                <Link to="#"> <span className={styles.link}> Forget Password ? </span></Link>
              </div>
            </div>
          </section>
        </div>
      </div> 


    </Fragment>

  )
}

// Exporting the userLogin
export default UserLogin
