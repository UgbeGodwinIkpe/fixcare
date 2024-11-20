// Importing the necessary modules
import React, { Fragment, useState, useEffect } from 'react'; 
import styles from "./css/Dashboard.module.css";
import logoImage from "../../Images/fixTechLogo.jpeg"; 
import alarmLogo from "../../Images/alarmLogo.png";
import { CiMenuBurger } from "react-icons/ci";
import { AiFillHome } from "react-icons/ai";
import { MdAccountBalance, MdOutlinePayment, MdSubscriptions } from "react-icons/md";
import { FaHistory, FaQuestion } from "react-icons/fa";
import { BiSolidReport, BiSupport } from "react-icons/bi";
import { AiFillSchedule } from "react-icons/ai";
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import Swal from 'sweetalert2';
// import Swal from 'sweetalert2';
let userRefId=localStorage.getItem('refid');
let userRefIdK=localStorage.key('refid');
let usern=localStorage.getItem('username');
var username;
if(userRefId===null||userRefIdK===null ||usern===null){
    username="User";
}else{
    username=usern;
}
const Navbar = ({ online, userName, setActiveMenu }) => {
    const { t, i18n } = useTranslation();  // i18n instance

    const [onlineStatus, setOnlineStatus] = useState(online);
    const [menuOpen, setMenuOpen] = useState(false);

    // Toggle the menu visibility
    const handleMenuToggle = () => {
        setMenuOpen(true);
    };

    // Function to switch languages
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };
    // Fucntion to logout
    const handleLogout=()=>{
        // logout user
        console.log("Logout")
        let authToken=localStorage.getItem('auth')
        axios.get('http://localhost:6300/partner/logout', {token:authToken})
        .then(function (response) {
            // log response
            console.log("response:-", response);
            if(response.status==200){
                // clear storage
                localStorage.clear();
                //alert message
                // alert(`Ppassword successfully changed to: ${np}`)
                Swal.fire({
                    title: "Logged Out",
                      text: "You have been logged out!",
                      icon: "success"
                  }).then(()=>{
                      window.location.href = "http://localhost:3000/login"
                    
                  });
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
    // Large screens view
    return (
            <Fragment>
                <main className={styles.headerDiv}>
                    <div className={styles.LogoDiv}> 
                        <img src={logoImage} alt="LOGO" className={styles.imageLogo}/> 
                    </div>

                    <div className={styles.menuLogo}> 
                        <CiMenuBurger onClick={handleMenuToggle} className={styles.menuLogo}/> 
                    </div>

                    {/* Sliding menu container */}
                    <section id="menuContainer" className={`${styles.menuContainer} ${menuOpen ? styles.menuOpen : styles.menuClosed}`}>
                        <div> 
                            <div className={styles.innerNav}>
                                <div> 
                                    <img src={logoImage} alt="logo image" aria-label='logo image' className={styles.mobileLogoImage}/> 
                                </div>
                                <button onClick={() => setMenuOpen(false)}> X </button> 
                            </div> 
                            
                            <div className={styles.homeBtn} onClick={() => {
                                setActiveMenu('home') 
                                setMenuOpen(false)
                            }}> 
                                <AiFillHome /> 
                                <button>{t('Home')}</button>
                            </div>

                            <div className={styles.homeBtn} onClick={() => {
                                setActiveMenu('myAccount'); 
                                setMenuOpen(false); 
                            }}> 
                                <MdAccountBalance /> 
                                <button>{t('Account Details')}</button>
                            </div>

                            <div className={styles.homeBtn} onClick={() => {
                                setActiveMenu('payments'); 
                                setMenuOpen(false); 
                            }}>
                                <MdOutlinePayment /> 
                                <button>{t('Payments')}</button> 
                            </div>

                            <div className={styles.homeBtn} onClick={() => {
                                setActiveMenu('subscriptionDetails'); 
                                setMenuOpen(false);
                            }}>
                                <MdSubscriptions /> 
                                <button>{t('Subscription Details')}</button>
                            </div>

                            <div className={styles.homeBtn} onClick={() => {
                                setActiveMenu("serviceHistory"); 
                                setMenuOpen(false);
                            }}>
                                <FaHistory /> 
                                <button>{t('Service History')}</button>
                            </div>

                            <div className={styles.homeBtn} onClick={() => {
                                setActiveMenu("serviceReport"); 
                                setMenuOpen(false);
                            }}>
                                <BiSolidReport /> 
                                <button>{t('Service Report')}</button> 
                            </div>

                            <div className={styles.homeBtn} onClick={() => {
                                setActiveMenu("scheduleYourService"); 
                                setMenuOpen(false);
                            }}>
                                <AiFillSchedule /> 
                                <button>{t('Schedule Your Service')}</button>
                            </div>

                            <div className={styles.homeBtn} onClick={() => {
                                setActiveMenu("supportAccount"); 
                                setMenuOpen(false);
                            }}> 
                                <BiSupport />
                                <button>{t('Support Account')}</button>
                            </div>

                            <div className={styles.homeBtn} onClick={() => {
                                setActiveMenu("faq"); 
                                setMenuOpen(false);
                            }}> 
                                <FaQuestion /> 
                                <button>{t('FAQ')}</button>
                            </div>
                            
                        </div>
                    </section>

                    {/* Language selector */}
                    <div>
                        <select className={styles.languageSelect} onChange={(e) => changeLanguage(e.target.value)} defaultValue="en">
                            <option value="en">English</option>
                            <option value="fr">Français</option>
                            <option value="es">Español</option>
                            <option value="de">German</option>
                            <option value="hi"> India </option>
                            {/* Add more languages here */}
                        </select>
                    </div>

                    <div className={styles.welcomeNameDiv}> 
                        <p>{t('Welcome')} {username} </p>
                    </div>

                    <div className={styles.alarmAndLogoutDiv}> 
                        <div> 
                            <img src={alarmLogo} alt="alertLogo" className={styles.alertLogo}/> 
                        </div>

                        <div>
                            <button className={styles.logoutBtn} onClick={handleLogout}>{t('Log Out')}</button>
                        </div>
                    </div>
                </main>
            </Fragment>
        );
};

export default Navbar;
