// Importing the necessary modules 
import React, { Fragment } from 'react'; 
import styles from "../css/Payments.module.css";


// Creating the functional component for payment 
const Payments = (props) => {
    // Getting the translation object 
    const { t } = props; 

    // Returing the jsx component 
    return(
        <Fragment>
            <main className={styles.rightSection}> 
                <h2> {t('Payment Page')} </h2>
                <div className={styles.billingDetailsDiv}> 
                    <div> 
                        <h3> {t('Billing Details')} </h3>
                    </div>
                    <div> 
                        <table>
                            <tbody>
                                <tr>
                                    <td> {t('Subscription Cost')} </td>
                                    <td> SGD$ </td>
                                </tr>
                                <tr> 
                                    <td> {t('Expires On')} </td>
                                    <td> xx/xx/xxxx </td>
                                </tr>
                                <tr> 
                                    <td> {t('Download Invoice')} </td>
                                    <td> <button className={styles.pdfDownloadBtn}> {t('Pdf')} </button> </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main> 
        </Fragment>
    )
}

// Exporting the payment 
export default Payments; 