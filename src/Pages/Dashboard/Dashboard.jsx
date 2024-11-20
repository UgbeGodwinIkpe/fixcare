// Importing the necessary modules 
import React, { Fragment } from 'react'; 
import styles from "./css/Dashboard.module.css";  
import MyAccount from './DashboardPages/MyAccount';
import DashboardHome from './DashboardPages/DashboardHome'; 
import Payments from './DashboardPages/Payments';
import SubscriptionDetails from './DashboardPages/SubscriptionDetails';
import ServiceHistory from './DashboardPages/ServiceHistory';
import ServiceReport from './DashboardPages/ServiceReport';
import ScheduleYourService from './DashboardPages/ScheduleYourService';
import SupportAccount from './DashboardPages/SupportAccount';
import EditAccount from './DashboardPages/EditAccount';
import Faq from "./DashboardPages/Faq"; 
import { AiFillHome } from "react-icons/ai";
import { MdAccountBalance, MdOutlinePayment, MdSubscriptions } from "react-icons/md";
import { FaHistory, FaQuestion } from "react-icons/fa";
import { BiSolidReport, BiSupport } from "react-icons/bi";
import { AiFillSchedule } from "react-icons/ai";
import Loader from '../../Components/loaders';
import Navbar from './Navbar';
import { withTranslation } from 'react-i18next'; // Importing translation hook

class Dashboard extends React.Component {
    // Setting the state 
    constructor(props) {
        super(props);

        // Initialize state
        this.state = {
            activeMenu: 'home',
            loading: true
        };

        this.setActiveMenu = this.setActiveMenu.bind(this); // Bind method to class
    }

    // Method to set the active menu
    setActiveMenu(menu) {
        this.setState({ activeMenu: menu });
    }

    // ComponentDidMount to handle the loader
    componentDidMount() {
        this.timer = setTimeout(() => {
            this.setState({ loading: false });
        }, 2000);
    }

    // Clear timer when the component unmounts
    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    // Method for rendering menu content
    renderMenuContent() {
        const { activeMenu } = this.state;
        const { t } = this.props

        switch (activeMenu) {
            case 'home': 
                return <DashboardHome t={t} />;
                
            case 'myAccount': 
                return <MyAccount t={t} />;
            
            case 'editAccount': 
                return <EditAccount t={t} />;

            case 'payments': 
                return <Payments t={t} />;

            case 'subscriptionDetails': 
                return <SubscriptionDetails t={t} />;

            case 'serviceHistory': 
                return <ServiceHistory t={t} />;

            case 'serviceReport': 
                return <ServiceReport t={t} />;

            case 'scheduleYourService': 
                return <ScheduleYourService t={t} />;

            case 'supportAccount': 
                return <SupportAccount t={t} />;

            case 'faq': 
                return <Faq t={t} />;

            default: 
                return <DashboardHome t={t} />;
        }
    }

    // Render method for the component
    render() {
        const { loading, activeMenu } = this.state;
        const { t } = this.props; // Access the translation function `t`

        return (
            <Fragment>
                {/* Adding the navbar */}
                <Navbar 
                    online={true} 
                    userName="Mbonu"
                    setActiveMenu={this.setActiveMenu} // Passing the method to Navbar
                />

                <main className={styles.mainDiv}>
                    {/* Left section div */}
                    <section className={styles.leftSection}>
                        <div 
                            className={`${styles.leftSectionHomeDiv} ${activeMenu === 'home' ? styles.activeMenu : ''}`} 
                            onClick={() => this.setActiveMenu('home')}
                        > 
                            <AiFillHome /> 
                            <button className={styles.button}> {t('Home')} </button>
                        </div>
                        <div 
                            className={activeMenu === 'myAccount' ? styles.activeMenu : ''} 
                            onClick={() => this.setActiveMenu('myAccount')}
                        > 
                            <MdAccountBalance /> 
                            <button> {t('Account Details')} </button>
                        </div>
                        <div 
                            className={activeMenu === 'payments' ? styles.activeMenu : ''} 
                            onClick={() => this.setActiveMenu('payments')}
                        > 
                            <MdOutlinePayment />
                            <button> {t('Payments')} </button>
                        </div>
                        <div 
                            className={activeMenu === 'subscriptionDetails' ? styles.activeMenu : ''} 
                            onClick={() => this.setActiveMenu('subscriptionDetails')}
                        > 
                            <MdSubscriptions />
                            <button className={styles.subscriptionDetailsBtn}> {t('Subscription Details')} </button>
                        </div>
                        <div 
                            className={activeMenu === 'serviceHistory' ? styles.activeMenu : ''} 
                            onClick={() => this.setActiveMenu('serviceHistory')}
                        >
                            <FaHistory /> 
                            <button> {t('Service History')} </button>
                        </div>
                        <div 
                            className={activeMenu === 'serviceReport' ? styles.activeMenu : ''} 
                            onClick={() => this.setActiveMenu('serviceReport')}
                        >
                            <BiSolidReport /> 
                            <button> {t('Service Report')} </button> 
                        </div>
                        <div 
                            className={activeMenu === 'scheduleYourService' ? styles.activeMenu : ''} 
                            onClick={() => this.setActiveMenu('scheduleYourService')}
                        >
                            <AiFillSchedule /> 
                            <button className={styles.scheduleService}> {t('Schedule Your Service')} </button> 
                        </div>
                        <div 
                            className={activeMenu === 'supportAccount' ? styles.activeMenu : ''} 
                            onClick={() => this.setActiveMenu('supportAccount')}
                        > 
                            <BiSupport /> 
                            <button> {t('Support Account')} </button>
                        </div>
                        <div 
                            className={activeMenu === 'faq' ? styles.activeMenu : ''} 
                            onClick={() => this.setActiveMenu('faq')}
                        >
                            <FaQuestion /> 
                            <button> {t('FAQ')} </button> 
                        </div>
                    </section>

                    {/* Right section div */}
                    <section className={styles.rightSection}> 
                        {/* rendering the dashboard contents div */}
                        {loading ? <Loader /> : this.renderMenuContent()}
                    </section>
                </main>
            </Fragment>
        );
    }
}

// Exporting the component with translation support
export default withTranslation()(Dashboard);
