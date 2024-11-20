// Importing the necessary modules 
import React, {Fragment} from 'react'
import styles from "../css/serviceHistory.module.css"; 
import Ratings from '../../../Components/ratings';

// Creating the service history component 
const ServiceHistory = (props) => {
    // Getting the translation object 
    const { t } = props; 

    // Returning the jsx component 
  return (
    <Fragment>
        <main className={styles.rightSection}>
            <h2> {t('Service History')} </h2>

            <div className={styles.serviceTypeDiv}> 
                <label> <b> {t('Service Type')} </b> </label>
                <div> 
                    <select className={styles.selectTag}>
                        <option value="electricalAndElectronics"> {t('Electrical & Electronics Maintenance')} </option>
                        <option value="plumbingMaintenance"> {t('Plumbing Maintenance')} </option>
                        <option value="computerSystemMaintenance"> {t('Computer System Maintenance (Hardware & Software)')} </option>
                        <option value="carpenterServices"> {t('Carpenter Services')} </option>
                        <option value="housekeepingServices"> {t('Housekeeping Services (Cleaning Solutions)')} </option>
                        <option value="fmoreview"> {t('F.M.O Review')} </option>
                    </select>
                </div>
            </div>


            <div className={styles.serviceTypeDivTwo}> 
                <table>
                    <tbody>
                        <tr> 
                            <td> {t('Date')} </td>
                            <td> 12/02/2021 </td>
                        </tr>
                        <tr> 
                            <td> {t('Time')} </td>
                            <td> 04:30pm </td>
                        </tr>
                        <tr> 
                            <td> {t('Maintenance Engineer')} </td>
                            <td> Avinash Sharma </td>
                        </tr>
                        <tr> 
                            <td> {t('Problem Fixed')} </td>
                            <td> Repaired Lamp and fixed wire of kitchen
                            switch board </td>
                        </tr>
                        <tr>
                            <td> {t('Service ID')} </td>
                            <td> xxxxxx (Six Digit) </td>
                        </tr> 
                        <tr> 
                            <td> {t('Give Us Rating')} </td>
                            <td> <Ratings /> </td>
                        </tr>
                    </tbody>
                </table>
            </div> 
        </main>
    </Fragment>
  )
}

// Exporting the service history component 
export default ServiceHistory
