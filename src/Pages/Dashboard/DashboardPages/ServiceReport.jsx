// Importing the necessary modules 
import React, { Fragment } from 'react';
import styles from "../css/ServiceReport.module.css"; 

// Creating the service report component 
const ServiceReport = (props) => {
    // Getting the translation object 
    const { t } = props; 

    // Returning the jsx component 
    return(
        <Fragment> 
            <main className={styles.rightSection}> 
                <h2> {t('Service Report')} </h2>

                <div className={styles.serviceReportDiv}>
                    <table>
                        <tbody>
                            <tr>
                                <th> {t('Type of Services')} </th>
                                <th> {t('Allotted In Plan')} </th>
                                <th> {t('Used')} </th>
                                <th> {t('Balance')} </th>
                            </tr>
                            <tr>
                                <td> {t('Electrical & Electronics Maintenance')} </td>
                                <td className={styles.blueTd}> 18 </td>
                                <td className={styles.redTd}> 6 </td>
                                <td className={styles.greenTd}> 12 </td>
                            </tr>
                            <tr>
                                <td> {t('Plumbing Maintenance')} </td>
                                <td className={styles.blueTd}> 10 </td>
                                <td className={styles.redTd}> 2 </td>
                                <td className={styles.greenTd}> 10 </td>
                            </tr>
                            <tr>
                                <td> 
                                    {t('Computer System Maintenance (Hardware & Software)')}
                                </td>
                                <td className={styles.blueTd}> 8 </td>
                                <td className={styles.redTd}> 3 </td>
                                <td className={styles.greenTd}> 5 </td>
                            </tr>
                            <tr> 
                                <td> {t('Carpenter Services')} </td>
                                <td className={styles.blueTd}> 6 </td>
                                <td className={styles.redTd}> 2 </td>
                                <td className={styles.greenTd}> 4 </td>
                            </tr>
                            <tr> 
                                <td> {t('Cleaning Solutions')} </td>
                                <td className={styles.blueTd}> 4 </td>
                                <td className={styles.redTd}> 2 </td>
                                <td className={styles.greenTd}> 2 </td>
                            </tr>
                            <tr> 
                                <td> {t('F.M.O Review')} </td>
                                <td className={styles.blueTd}> 2 </td>
                                <td className={styles.redTd}> - </td>
                                <td className={styles.greenTd}> 2 </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </main>
        </Fragment>
    )
}

// exporting the service report 
export default ServiceReport; 