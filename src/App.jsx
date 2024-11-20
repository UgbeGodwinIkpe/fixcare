// Importing the necessary modules 
import "./App.css"; 
import React, { Component } from 'react'; 
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserLogin from "./Pages/UserLogin/UserLogin";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AdminLogin from "./Pages/Admin/AdminLogin/AdminLogin";
import Subscription from "./Pages/Subscription/Subscription";
import AdminDashboard from "./Pages/Admin/AdminDashboard/AdminDashboard";
import EmailMessage from "./Pages/Email/Emailmessage";
import EditAccount from './Pages/Dashboard/DashboardPages/EditAccount';
import PaymentPage from './Pages/Dashboard/DashboardPages/PaymentPage';

// Creating the class based component 
class App extends Component {
  // Setting the state 
  state = {} 

  // Rendering the component
  render() {
     // Returning the component 
     return(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Subscription />} /> 
          <Route path="/login" element={<UserLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/editAccount" element={<EditAccount />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/admin" element={<AdminLogin /> } /> 
          <Route path="/email" element={<EmailMessage />} /> 
          <Route path="/adminDashboard" element={<AdminDashboard />} /> 
        </Routes>
      
      </BrowserRouter>
     )
  }
}

// Exporting the app component 
export default App; 