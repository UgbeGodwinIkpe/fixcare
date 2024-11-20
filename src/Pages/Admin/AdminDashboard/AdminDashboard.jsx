// Importing the necessary modules 
import React, { Fragment, useState } from 'react'; 
import styles from './css/AdminDashboard.module.css'; 
import Navbar from './Navbar';
import { AiFillHome } from "react-icons/ai";
import { FaListOl } from "react-icons/fa";
import { MdBrowserUpdated } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { FaCodePullRequest } from "react-icons/fa6";
import { SiGooglemessages } from "react-icons/si";
import AdminHome from './AdminDashboardPages/AdminHome';
import Messages from './AdminDashboardPages/Messages';
import PendingServiceRequest from './AdminDashboardPages/PendingServiceRequest';
import AdminUpdatePayment from './AdminDashboardPages/UpdatePayment';
import ListOfCustomers from './AdminDashboardPages/ListOfCustomers';
import UpdateServiceHIstory from './AdminDashboardPages/UpdateServiceHistory';

// Creating the dashboard component 
const AdminDashboard = (props) => {
    // Setting the state 
    const [activeMenu, setActiveMenu] = useState("home");

    // Creating  a function for rendering the menu content 
    const renderMenuContent = () => {
        switch (activeMenu) {
            case 'home':
                return <AdminHome />; 
                
            case 'listOfCustomers': 
                return <ListOfCustomers />; 

            case 'updatePayments':
                return <AdminUpdatePayment />; 
                
            case 'updateServiceHistory': 
                return <UpdateServiceHIstory />; 

            case 'pendingServiceRequest': 
                return <PendingServiceRequest />;
                
            case 'messages': 
                return <Messages />; 

            default:
                return <AdminHome />;          
        }
    }
    
    // Returng the jsx component 
    return(
        <Fragment> 
            {/* Adding the navbar */}
            <Navbar online={true} userName="Admin User" /> 

            {/* Adding the main div */}
            <main className={styles.mainDiv}>
                {/* Left Section div */}
                <section className={styles.leftSection}>
                    <div 
                        className={`${styles.leftSectionHomeDiv} ${activeMenu === 'home' ? styles.activeMenu : ''}`} 
                        onClick={() => setActiveMenu('home')}
                    > 
                        <AiFillHome /> 
                        <button className={styles.button}> Home </button>
                    </div>
                    <div 
                        className={activeMenu === 'listOfCustomers' ? styles.activeMenu : ''} 
                        onClick={() => setActiveMenu('listOfCustomers')}
                    > 
                        <FaListOl /> 
                        <button> List of Customers </button>
                    </div>
                    <div
                        className={activeMenu === "updatePayments" ? styles.activeMenu : ''}
                        onClick={() => setActiveMenu('updatePayments')}
                    > 
                        <MdBrowserUpdated /> 
                        <button> Update Payments </button>
                    </div>
                    <div
                        className={activeMenu === "updateServiceHistory" ? styles.activeMenu : ''}
                        onClick={() => setActiveMenu('updateServiceHistory')}
                    >   
                        <FaHistory /> 
                        <button> Update Service History </button>
                    </div>
                    <div
                        className={activeMenu === "pendingServiceRequest" ? styles.activeMenu : ''}
                        onClick={() => setActiveMenu("pendingServiceRequest")}
                    > 
                        <FaCodePullRequest /> 
                        <button> Pending Service Request </button>
                    </div>
                    <div 
                        className={activeMenu === "messages" ? styles.activeMenu: ''}
                        onClick={() => setActiveMenu("messages")}
                    > 
                        <SiGooglemessages /> 
                        <button> Messages </button>
                    </div>

                </section>


                {/* Right section div */}
                <section className={styles.rightSection}>
                    <div className={styles.innerRightSection}>
                        {/* rendering the dashboard contents div */}
                        {renderMenuContent()} 
                    </div>
                </section>
            </main>
        </Fragment>
    )
}

// Exporting the admin dashboard 
export default AdminDashboard; 