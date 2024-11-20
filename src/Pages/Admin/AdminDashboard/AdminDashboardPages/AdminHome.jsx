// Importing the necessary modules 
import React, { Fragment } from 'react'; 
import styles from "../css/AdminHome.module.css"; 
import Zoom from 'react-reveal/Zoom';
import axios from 'axios';
import Swal from 'sweetalert2';

// Creating the functional component 
const AdminHome = (props) => {
    function getVariables(){
        // check if variable exist in localStorage
        let userRefId=localStorage.getItem('refid');
        let userRefIdK=localStorage.key('refid');
        let userN=localStorage.getItem('username');

        if(userRefId===null||userRefIdK===null ||userN===null){
            Swal.fire({
                title: "error",
                  text: "Session expired, kindly login!",
                  icon: "error"
              }).then(()=>{window.location.href = "http://localhost:3000/admin"});
        }else{
            Swal.fire({
                title: "success",
                  text: `Welcome, ${userN}`,
                  icon: "success"
              });
        }
    }
    getVariables();
    // Returning the jsx component 
    return(
        <Fragment> 
            <Zoom delay={100}>
                <div className={styles.adminHomeMessage}>
                    <p>
                        Welcome to "FixTech Care" Admin Home page. <br /> 
                        Your one and only reliable maintenance partner 
                    </p>

                    <p className={styles.serviceTicket}> 
                        Raise your service ticket now 
                    </p>
                </div>
            </Zoom>
        </Fragment>
    )
}

// Exporting the Admin home 
export default AdminHome; 