// Importing the necessary modules 
import React, { Fragment } from 'react'; 
import { useTranslation } from 'react-i18next'; // Importing the translation hook
import styles from "../css/SupportAccount.module.css"; 
import addLogo from "../../../Images/addLogo.png"; 
import axios from 'axios';
import Swal from 'sweetalert2';

// Creating the support account component 
const SupportAccount = (props) => { 
    const { t } = props; // Using the translation hook

    // Creating a function for handling the input file 
    const handleInputFile = (event) => {
        // Getting the dom element 
        const inputFile = document.getElementById("inputFile"); 

        // Clicking the input file button 
        inputFile.click(); 
    };
    const handleSupportMessage=()=>{
        // codes
        // Getting all the dom elements 
    //   const email = document.getElementById("email").value; 
      const description = document.getElementById("w3review").value;
      const subject = document.getElementById("subject").value; 
      const type = document.getElementById("type").value;
      const inputFile = document.getElementById("inputFile");
      const file=inputFile.files[0];
      const token=localStorage.getItem('auth');
      if(!token || !file || !subject || !type || !description){
        return Swal.fire({
            title: "Bad Request",
              text: "All fields are required!",
              icon: "error"
          })
      }
      console.log(subject, type, description); 
      let supMessage={
        token, file, subject, type, description
      }
      // log new user detail on console
      console.log(supMessage);
      // send data to api
      axios.post('https://userbackend-c87y.onrender.com/partner/mail', supMessage,{
        headers:{'Content-Type':'multipart/form-data',}
      })
          .then(function (response) {
              
          // console.log('refid',response.data.refid);
          // document.cookie = `user={email}; expires={expires.toUTCString()}; path=/`;
          
          Swal.fire({
            title: response.data.status,
              text: response.data.message,
              icon: response.data.status
          })
          })
          .catch(function (error) {
            //   console.log(error.response);
              console.log("data:", error.response.data);
              // Handle the error
              Swal.fire({
              title: error.response.data.status,
              text: error.response.data.message,
              icon: error.response.data.status
              });
          });
    }

    // handle support form
    const cancelSupport=()=>{
        console.log("I am cancelled!")
        window.location.href = "https://fixcare-ten.vercel.app/dashboard"
    }
    // Return the jsx 
    return(
        <Fragment>
            {/* Adding the main div */}
            <main className={styles.rightSection}> 
                <h2>{t('Support Account')}</h2>

                <div className={styles.headerParaDiv}> 
                    <div className={styles.headerTextDiv}> 
                        <p>
                            {t('If you have any questions related to your subscription and account raise ticket')} <br /> 
                            {t('Email us at')}: <a href="mailto:service@fixtechcare.com">service@fixtechcare.com</a>
                        </p>
                        <p>
                            {t('Service Center')}: xxxxxxxxxxxxx 
                        </p>
                    </div>

                    <div className={styles.subjectDiv}>
                        <div> 
                            <label>{t('Subject*')}</label>
                            <input type="text" id="subject" placeholder={t('Subject...')} className={styles.inputForm} /> 
                        </div>
                        <div> 
                            <label>{t('Type*')}</label>
                            <select className={styles.selectTag} id="type">
                                <option value="services">{t('Services')}</option>
                                <option value="account">{t('Account')}</option>
                                <option value="payment">{t('Payment')}</option>
                                <option value="other">{t('Other')}</option>
                                <option value="addOnService">{t('Add on Service')}</option>
                                <option value="complaint">{t('Complaint')}</option>
                                <option value="question">{t('Question')}</option>
                            </select>
                        </div>
                        <div> 
                            <label>{t('Description*')}</label>
                            <textarea 
                                placeholder={t('Type your description here...')} 
                                id="w3review" 
                                name="w3review" 
                                className={styles.textAreaInputForm} 
                            >
                            </textarea>
                        </div>
                        <div className={styles.attachAFileDiv} onClick={handleInputFile}> 
                            <img src={addLogo} alt={t('addLogo')} className={styles.addLogo} /> 
                            <p className={styles.attachAFileText}>{t('Attach a file')}</p>
                            <input type="file" className={styles.inputFile} id="inputFile" /> 
                        </div>

                        {/* Adding the submit and cancel div */}
                        <div className={styles.submitAndCancelDiv}>
                            <button className={styles.inputBtn} onClick={handleSupportMessage}>{t('Submit')}</button>
                            <button className={styles.inputBtn} onClick={cancelSupport}>{t('Cancel')}</button> 
                        </div>

                    </div>

                </div>
            </main>
        </Fragment>
    );
}; 

// Exporting the support account 
export default SupportAccount;
