// Importing the necessary modules 
import React, { Fragment } from 'react'; 
import logoImage from "../../Images/fixTechLogo.jpeg"; 
import styles from "./css/Email.module.css"; 
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

// Creating the functional component 
const EmailMessage = (props) => {
    // Returning the jsx component 
    return(
        <Fragment>
            <main className={styles.mainDiv}>
                <div className={styles.container}>
                    <div className={styles.imageLogoDiv}>
                        <img src={logoImage} className={styles.logoImage} alt="logoImage" /> 
                    </div>

                    <div className={styles.textDescDiv}> 
                        <div className={styles.welcomeToFixTechCardHeaderDiv}> 
                            <h3 className={styles.welcomeToFixtechCareHeader}> Welcome to Fixtech Care </h3>
                        </div>
                        <div className={styles.subscriptionTextDiv}> 
                            <p> Your subscription has been activated now </p> 
                        </div>
                        <div> 
                            <p> You're all set, now you can easily handle your dashboard by just login your account details as 
                            per below details </p> 
                        </div>
                    </div>

                    <div className={styles.weareHereToHelpParaDiv}> 
                        <p className={styles.weareHereToHelpPara}> We're here to help! </p> 
                    </div>

                     {/*Adding the table  */}
                     <div className={styles.tableDiv}>
                        <table> 
                            <tbody>
                                <tr> 
                                    <th> Type of Services </th>
                                    <th> Allotted In Plan </th>
                                </tr>
                                <tr> 
                                    <td> Electrical & Electronics Maintenance </td>
                                    <td className={styles.tableData}> 18 </td>
                                </tr>
                                <tr> 
                                    <td> Plumbing Maintenance </td>
                                    <td className={styles.tableData}> 10 </td>
                                </tr>
                                <tr> 
                                    <td> Computer System Maintenance (Hardware & Software)</td>
                                    <td className={styles.tableData}> 8 </td>
                                </tr>
                                <tr> 
                                    <td> Carpenter Services </td>
                                    <td className={styles.tableData}> 6 </td>
                                </tr>
                                <tr> 
                                    <td> Housekeeping Service (Home Cleaning) </td>
                                    <td className={styles.tableData}> 2 </td>
                                </tr>
                                <tr> 
                                    <td> F.M.O Review </td>
                                    <td className={styles.tableData}> 2 </td>
                                </tr>
                            </tbody>
                        </table> 
                    </div>

                    {/* Adding the please download your dashboard div */}
                    <div className={styles.pleaseDownloadYourInvoice}> 
                        <p> <b> Please download your Invoice from the dashboard or contact the support team </b></p>

                    </div>

                    {/* alert message */}
                    <div className={styles.outterUnscribeMessage}> 
                        <p> You're receiving this mail because you've signed up for a new account with Fixtechcare. <br /> 
                            Fixtechcare is brand owned by KSK Business Consultant. 
                        </p>

                        <div className={styles.unsubscribeLinkDiv}>
                            <Link to="#" className={styles.unsubscribeLink}> Unsubscribe </Link>
                        </div>
                    </div>
                </div>

            </main>

        </Fragment>
    )
}

// Exporting the email message 
export default EmailMessage; 