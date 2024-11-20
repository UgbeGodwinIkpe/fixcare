// Importing the necessary modules 
import React, { Fragment, useState } from 'react'; 
import styles from "./css/Navbar.module.css";
import logoImage from "../../../Images/fixTechLogo.jpeg"; 
import alarmLogo from "../../../Images/alarmLogo.png";
import axios from 'axios';
import Swal from 'sweetalert2';

// Creating the navbar 
const Navbar = (props) => {
    // Setting the state 
    const [onlineStatus, setOnlineStatus] = useState(props.online); 
    let userN=localStorage.getItem('username').toUpperCase();
    // Getting the width 
    const innerWidth = window.innerWidth; 
    console.log(innerWidth); 
    // Fucntion to logout
    const handleLogout=()=>{
        // logout user
        console.log("Logout")
        let authToken=localStorage.getItem('auth')
        axios.get('http://localhost:6300/admin/logout', {token:authToken})
        .then(function (response) {
            // log response
            console.log("response:-", response);
            if(response.status==200){
                // clear storage
                localStorage.clear();
                //alert message
                // alert(`Ppassword successfully changed to: ${np}`)
                Swal.fire({
                    title: "Logged Out",
                      text: "You have been logged out!",
                      icon: "success"
                  }).then(()=>{
                      window.location.href = "http://localhost:3000/admin"
                    
                  });
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
    // Rendering the component 
    return(
        <Fragment> 
            <main className={styles.headerDiv}>
                <div className={styles.logoDiv}>
                    <img src={logoImage} alt="logoImage" className={styles.imageLogo} /> 
                </div>
                <div> 
                    <p> Welcome {userN} into your Dashboard  </p>
                </div>
                <div className={styles.alarmAndLogoutDiv}> 
                    <div className={styles.notificationsDiv}>
                       <div> 
                            <img src={alarmLogo} alt="alertLogo" className={styles.alertLogo}/>
                       </div>
                         
                        <div className={styles.notificationNumberDiv}>
                            <span className={styles.notificationNumber}> 20 </span>  
                        </div>
                        
                    </div>

                    <div>
                        <button className={styles.logoutBtn} onClick={handleLogout}> Log Out </button>
                    </div>
                </div>
            </main>

        </Fragment>
    )
}

// Exporting the Navbar 
export default Navbar; 