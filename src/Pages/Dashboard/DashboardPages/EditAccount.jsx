// Importing the necessary modules 
import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom';
import styles from "../css/MyAccount.module.css";  
import profileLogo from "../../../Images/profile.png"; 

// Creating the functional component 
const EditAccount = (props) => {
    // Handling the state 
    const [image, setImage] = useState(""); 

    // Getting the translation object 
    const { t } = props; 
    {/* Fect user details */}
    const  getUserDetails=()=>{
        let userRefId=localStorage.getItem('refid');
        let authToken=localStorage.getItem('auth');
        let email=document.getElementById("email"),
        fname=document.getElementById("fname"),
        lname=document.getElementById("lname"),
        mname=document.getElementById("mname"),
        phone=document.getElementById("contact"),
        address=document.getElementById("address"),
        street=document.getElementById("street"),
        city=document.getElementById("city"),
        landmark=document.getElementById("landmark");
        // if(userRefId===null||userRefIdK===null){
        //     Swal.fire({
        //         title: "error",
        //           text: "Session expired, kindly login!",
        //           icon: "error"
        //       }).then(()=>{window.location.href = "http://localhost:3000/login"});
        // }
        axios.post('http://localhost:6300/partner/user', {refid:userRefId, token:authToken})
        .then(function (response) {
            // log response
            console.log(response);
            email.value=response.data.emailAddress;
        fname.value=response.data.firstname;
        lname.value=response.data.lastname;
        mname.value=response.data.middlename;
        phone.value=response.data.contact;
        // ptype.value=response.data.premisesType;
        address.value=response.data.houseNumber;
        street.value=response.data.streetName;
        landmark.value=response.data.landmark;
        city.value=response.data.city
        })
        .catch(function (error) {
            // Handle the error
            console.log(error);
        });
    };
    useEffect(()=>{getUserDetails()},[]);
    // document.addEventListener('DOMContentLoaded', getUserDetails);
    // Handle upload image 
    const handeleUploadImage = (props) => {
        // Getting the dom element of the upload file 
        const fileUpload = document.getElementById("fileUpload"); 
        fileUpload.click();  
    }
    
    const handeleUpdateDetails=()=>{
        let userRefId=localStorage.getItem('refid');
        let authToken=localStorage.getItem('auth');
        let email=document.getElementById("email").value,
        fname=document.getElementById("fname").value,
        lname=document.getElementById("lname").value,
        mname=document.getElementById("mname").value,
        phone=document.getElementById("contact").value,
        address=document.getElementById("address").value,
        street=document.getElementById("street").value,
        city=document.getElementById("city").value,
        landmark=document.getElementById("landmark").value;
        console.log(email, fname, userRefId, lname, mname, address, phone, street, city, landmark)
        if(email===null || fname===null || userRefId===null||lname==='' || mname===''|| address===''){
          return  Swal.fire({
                title: "error",
                  text: "All fields are rquired!",
                  icon: "error"
              })
        }
        let changeData={refid:userRefId, token:authToken, email, fname, lname, mname, address, phone, street, city, landmark}
        axios.patch('http://localhost:6300/partner/editUser', changeData)
        .then(function (response) {
            // log response
            console.log("response:-");
            console.log("response:-", response);
            if(response.status==200){
                //alert message
                // alert(`Ppassword successfully changed to:`)
                Swal.fire({
                    title: "Details updated",
                      text: `Details successfully updated.`,
                      icon: "success"
                  })
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
    // Returning the jsx component 
    return(
        <Fragment>
            <main className={styles.mainDiv}>
                
                
                {/* Adding the edit account details div */}
                <section className={styles.lowerSection}>
                    <div className={styles.changePasswordDiv}> 
                        <div>
                            <h3 style={{textAlign:"center"}}> {'Edit Account Details'}  </h3>
                        </div>

                        <section className={styles.passwordSection} style={{width:"100%"}}>
                            <p id="err"></p>
                            <div className={styles.inputFormDiv} style={{width:"100%"}}> 
                                <label className={styles.labelInputForm}> {'First Name:'} </label>
                                <input type="text" id="fname" className={styles.inputForm} style={{width:"80%"}} /> 
                            </div>
                            <div className={styles.inputFormDiv} style={{width:"100%"}}> 
                                <label className={styles.labelInputForm}> {'Last Name:'} </label>
                                <input type="text" id="lname" className={styles.inputForm} style={{width:"80%"}} /> 
                            </div>
                            <div className={styles.inputFormDiv} style={{width:"100%"}}> 
                                <label className={styles.labelInputForm}> {'Middle Name:'} </label>
                                <input type="text" id="mname" className={styles.inputForm} style={{width:"80%"}}/> 
                            </div>
                            <div className={styles.inputFormDiv} style={{width:"100%"}}> 
                                <label className={styles.labelInputForm}> {'Email:'} </label>
                                <input type="email" id="email" className={styles.inputForm} style={{width:"80%"}} readOnly /> 
                            </div>
                            <div className={styles.inputFormDiv} style={{width:"100%"}}> 
                                <label className={styles.labelInputForm}> {'Phone Number:'} </label>
                                <input type="text" id="contact" className={styles.inputForm} style={{width:"80%"}} /> 
                            </div>
                            <div className={styles.inputFormDiv} style={{width:"100%"}}> 
                                <label className={styles.labelInputForm}> {'House Number:'} </label>
                                <input type="text" id="address" className={styles.inputForm} style={{width:"80%"}} /> 
                            </div>
                            <div className={styles.inputFormDiv} style={{width:"100%"}}> 
                                <label className={styles.labelInputForm}> {'Street Name:'} </label>
                                <input type="text" id="street" className={styles.inputForm} style={{width:"80%"}} /> 
                            </div>
                            <div className={styles.inputFormDiv} style={{width:"100%"}}> 
                                <label className={styles.labelInputForm}> {'Land-mark:'} </label>
                                <input type="text" id="landmark" className={styles.inputForm} style={{width:"80%"}} /> 
                            </div>
                            <div className={styles.inputFormDiv} style={{width:"100%"}}> 
                                <label className={styles.labelInputForm}> {'City:'} </label>
                                <input type="text" id="city" className={styles.inputForm} style={{width:"80%"}} /> 
                            </div>
                            
                        </section>

                        <div className={styles.updateBtnDiv} style={{display:"flex"}}> 
                            <button className={styles.updateBtn} onClick={handeleUpdateDetails}> {'Update'} </button>
                            <Link to="/dashboard" style={{marginLeft:"5px"}}><button className={styles.updateBtn}> {'Go Back Home'} </button></Link>
                        </div>
                        
                    </div>
                </section>
                
            </main>
        </Fragment>
    )
}

// Exporting the dashboard my account component 
export default EditAccount; 