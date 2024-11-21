// Importing the necessary modules 
import React, { Fragment } from 'react';
import styles from "../css/Dashboard.module.css";  
import Zoom from 'react-reveal/Zoom';
import { withTranslation } from 'react-i18next';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

// Creating the functional component 
const DashboardHome = (props) => {

    const { t } = props;
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
              }).then(()=>{window.location.href = "https://fixcare-ten.vercel.app/login"});
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
    return (
        <Fragment>
                <div className={styles.dashboardHomeMessage}> 
                    <p className={styles.welcomeMessage}>
                        {t('Welcome to FixTech Care your')} <br />
                        {t('one & only reliable maintenance')} <br />
                        {t('partner.')}
                    </p>
                    <Link to="/payment" ><button className={styles.logoutBtn} > Proceed to make payment </button></Link>
                    <p className={styles.serviceTicket}>
                        {t('Raise your service ticket now')}
                    </p>
                </div>
        </Fragment>
    );
};

// Exporting the dashboard home 
export default withTranslation()(DashboardHome);
