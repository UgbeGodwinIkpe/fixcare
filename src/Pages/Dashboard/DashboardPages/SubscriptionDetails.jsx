// Importing the necessary modules 
import React, { Fragment } from 'react'; 
import styles from "../css/SubscriptionDetails.module.css"; 

// Creating the functional component for subscription details 
const SubscriptionDetails = (props) => {
    // Getting the translation object 
    const { t } = props; 

    // Returning the jsx component 
    return(
        <Fragment> 
            <main className={styles.rightSection}>
                <h2> {t('Subscription Page')} </h2>

                <div className={styles.SubscriptionDetailsDiv}>
                    <div>
                        <h3> {t('Subscription Details')} </h3>
                    </div>
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <td> {t('Customer ID')} </td>
                                    <td> xxxxxxx </td>
                                </tr>
                                <tr> 
                                    <td> {t('Plan Activated')} </td>
                                    <td> xx/xx/xxxx </td>
                                </tr>
                                <tr> 
                                    <td> {t('Expires On')} </td>
                                    <td> xx/xx/xxxx </td>
                                </tr>
                                <tr>
                                    <td> {t('Subscription Cost')} </td>
                                    <td> SGD xxx </td>
                                </tr>
                                <tr> 
                                    <td> {t('Renew Now')} </td>
                                    <td> Mange Plan </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </Fragment>
    )
}; 

// Exporting the SubscriptionDetails component 
export default SubscriptionDetails; 