// Importing the necessary modules 
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook
import styles from "../css/scheduleYourService.module.css";
import serviceType from '../../../Components/serviceType';
import Swal from 'sweetalert2';
import axios from 'axios';

// Creating the schedule component 
const ScheduleYourService = (props) => {
    // Use the useTranslation hook
  const { t } = props;

  
  // Setting the state 
  const [serviceOptions, setServiceOptions] = useState(""); 
  const [serviceTypes, setServiceTypes] = useState([]); // State to hold service types based on the selected service
  const [selectedServiceType, setSelectedServiceType] = useState(""); // State to hold the selected service type

  // Handle service change 
  const handleServiceChange = (e) => {
    const service = e.target.value;
    setServiceOptions(service);

    // Update the service types based on the selected service, if available
    setServiceTypes(serviceType[service] || []); 
  };

  // Handle service type change
  const handleServiceTypeChange = (e) => {
    setSelectedServiceType(e.target.value);
  };
  const handleMaiantenceRequest=()=>{
     // Getting all the dom elements
     var serviceid;
     const address = document.getElementById("address").value; 
     const service = document.getElementById("service").value;
     if(!address || !service){
      return Swal.fire({
          title: "Bad Request",
            text: "All fields are required!",
            icon: "error"
        })
    }
    console.log("Service: ",service)
    switch(service){
      case "Electrical":
        serviceid="fix-6231";
        break;
      case "Plumbing Maintenance":
        serviceid="fix-6232";
        break;
      case "Computer System Maintenance online support":
          serviceid="fix-6233";
          break;
      case "Computer System Maintenance offline support":
        serviceid="fix-6235";
        break;
      case "Carpenter Services":
        serviceid="fix-6236";
        break;
      case "Cleaning Solutions":
        serviceid="fix-6237";
        break;
      case "Premises Review":
        serviceid="fix-6238";
        break;
        default: return alert("Service id is missing")
    }

     const servicetype= document.getElementById("servicetype").value;
     const problem= document.getElementById("problem").value;
     const timeslot= document.getElementById("date").value +" "+document.getElementById("time").value;
     const message= document.getElementById("message").value;
     const refid= localStorage.getItem("refid");
     if(!address || !service || !servicetype || !timeslot || !refid){
      return Swal.fire({
          title: "Bad Request",
            text: "All fields are required!",
            icon: "error"
        })
    }
    let customer=localStorage.getItem("username");
     console.log(customer,serviceid, address, service, servicetype, problem, timeslot, message, refid); 
     let newService={
      serviceid, address, service, servicetype, customer, problem, timeslot, message, refid
     }
     // log new user detail on console
     console.log(newService);
     // send data to api
     axios.post('http://localhost:6300/partner/maintenance', newService)
         .then(function (response) {
             
         // console.log('refid',response.data.refid);
         // document.cookie = `user={email}; expires={expires.toUTCString()}; path=/`;
         
         Swal.fire({
           title: response.data.status,
             text: response.data.message,
             icon: response.data.status
         })
        //  .then(()=>{
        //    if(response.data.status==='success'){
        //      // Handle the successful response
        //      console.log(response.data);
        //      let expires=new Date(Date.now()+1*86400000);
        //      localStorage.setItem('refid', response.data.refid);
        //      localStorage.setItem('username', response.data.username);
        //      localStorage.setItem('auth', response.data.xAuthToken);
        //      window.location.href = "http://localhost:3000/dashboard"
        //    }
        //  });
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
  return (
    <div>
      {/* Adding the main div */}
      <main className={styles.mainDiv}>

        <div className={styles.container}> 
          <div className={styles.raiseYourMaintenanceDiv}> 
            <h2>{t('Raise Your Maintenance Query Ticket')}</h2> {/* Translated heading */}
          </div>

          <div className={styles.innerContainerDiv}> 
            <div className={styles.enterAddressDiv}>
              <input 
                type="text" id="address" required
                placeholder={t('Enter Address')} // Translated placeholder
                className={styles.enterAddressInputForm} 
              /> 
            </div>

            {/* First select for choosing the service */}
            <div> 
              <select 
                className={styles.selectInputForm} id="service"
                value={serviceOptions} required
                onChange={handleServiceChange}
              >
                <option value="">{t('Select Service')}</option> {/* Translated option */}
                <option value="Electrical">{t('Electrical & Electronics Maintenance')}</option>
                <option value="Plumbing Maintenance">{t('Plumbing Maintenance')}</option>
                <option value="Computer System Maintenance online support">{t('Computer Hardware & Software Maintenance (Online support)')}</option>
                <option value="Computer System Maintenance offline support">{t('Computer Hardware & Software Maintenance (Offline support)')}</option>
                <option value="Carpenter Services">{t('Carpenter Services')}</option>
                <option value="Cleaning Solutions">{t('Cleaning Solutions')}</option>
                <option value="Premises Review">{t('Premises Review')}</option>
              </select>
            </div>

            {/* Conditionally render second select based on selected service */}
            {serviceTypes.length > 0 && (
              <div>
                <select 
                  className={styles.selectInputForm} id="servicetype"
                  value={selectedServiceType} required
                  onChange={handleServiceTypeChange}
                >
                  <option value="">{t('Select Service Type')}</option> {/* Translated option */}
                  {serviceTypes.map((type, index) => (
                    <option className={styles.serviceTypeOption} key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Adding the problem div */}
            <div className={styles.problemDiv}> 
              <label>{t('Problem')}</label> {/* Translated label */}
              <textarea name="" id="problem" className={styles.problemInputForm} maxLength="300" placeholder={t('Enter manually...')}></textarea> {/* Translated placeholder */}
            </div>

            {/* Preferred time slot */}
            <div className={styles.preferredTimeSlotDiv}>
              <div> 
                <p>{t('Preferred Time Slot')}</p>  {/* Translated text */}
              </div> 

              <div> 
                <table className={styles.scheduleYourServiceTable}> 
                  <tbody> 
                    <tr> 
                      <th>{t('Today')}</th> {/* Translated text */}
                      <th>{t('Tomorrow')}</th> {/* Translated text */}
                    </tr>
                    <tr> 
                      <td> 
                        <div className={styles.tableDataDiv}> 
                          <p>{t('Anytime')}</p> {/* Translated text */}
                          <input type="radio" name="today" /> {/* Group by "today" */}
                        </div>
                      </td>
                      <td> 
                        <div className={styles.tableDataDiv}> 
                          <p>{t('Anytime')}</p> {/* Translated text */}
                          <input type="radio" name="tomorrow" /> {/* Group by "tomorrow" */}
                        </div>
                      </td> 
                    </tr>
                    <tr> 
                      <td>
                        <div className={styles.tableDataDiv}>
                          <p>{t('Now')}</p> {/* Translated text */}
                          <input type="radio" name="today" /> {/* Group by "today" */}
                        </div>
                      </td>
                      <td>
                        <div className={styles.tableDataDiv}>
                          <p>{t('10:00am to 12:00am')}</p> {/* Translated text */}
                          <input type="radio" name="tomorrow" /> {/* Group by "tomorrow" */}
                        </div>
                      </td>
                    </tr>
                    <tr> 
                      <td> 
                        <div className={styles.tableDataDiv}>
                          <p>{t('Within 2 to 3 hours')}</p> {/* Translated text */}
                          <input type="radio" name="today" /> {/* Group by "today" */}
                        </div>
                      </td>
                      <td> 
                        <div className={styles.tableDataDiv}>
                          <p>{t('12:00pm to 03:00pm')}</p> {/* Translated text */}
                          <input type="radio" name="tomorrow" /> {/* Group by "tomorrow" */}
                        </div>
                      </td>
                    </tr>
                    <tr> 
                      <td> 
                        <div className={styles.tableDataDiv}>
                          <p>{t('Within 3 to 6 hours')}</p> {/* Translated text */}
                          <input type="radio" name="today" /> 
                        </div>
                      </td>
                      <td>
                        <div className={styles.tableDataDiv}>
                          <p>{t('03:00pm to 06:00pm')}</p> {/* Translated text */}
                          <input type="radio" name="tomorrow" /> 
                        </div> 
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>

            {/* Enter Manually  */}
            <div className={styles.enterManuallyHeaderDiv}> 
              <div className={styles.enterManuallyDiv}> 
                <p>{t('Enter Manually')}</p> {/* Translated text */}
              </div>

              <div className={styles.selectDateAndTimeDiv}> 
                <div> 
                  <label>{t('Select Date')}</label> {/* Translated label */}
                  <input type="date" id="date" required className={styles.inputFormDate}/> 
                </div>
                <div>
                  <label>{t('Time')}</label> {/* Translated label */}
                  <input type="time" id="time" required className={styles.inputFormTime} /> 
                </div>
              </div>
            </div>


            {/* Enter any message  */}
            <div className={styles.enterAnyMessageDiv}>
              <div>
                <label>{t('Any Message')}</label> <br /> {/* Translated label */}
                <textarea className={styles.anyMessageInputForm} maxLength="300" id="message" placeholder={t('Upto 100 words only')}> </textarea> {/* Translated placeholder */}
              </div>
              <div className={styles.submitBtnDiv}> 
                <button className={styles.submitBtn} onClick={handleMaiantenceRequest}>{t('Submit')}</button> {/* Translated button text */}
              </div>
            </div>

        </div>
        </div>

      </main>
    </div>
  );
};

// Exporting the schedule service 
export default ScheduleYourService;
