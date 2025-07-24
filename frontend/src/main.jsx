import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { 
  Footer} from './sections'
  import Nav from './components/Nav'
  import SignIn from './components/SignIn.jsx'
import { BrowserRouter, Routes, Route } from "react-router";
import RegisterForm from './components/RegisterForm.jsx'
 
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import Tickets from './pages/Dashboard/tickets/Tickets.jsx'
import UserProvider from './context/UserContext';
import AddTicket from './pages/Dashboard/tickets/AddTicket.jsx'
import EditTicket from './pages/Dashboard/tickets/EditTicket.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
 
  <UserProvider>
   
  <main className='relative'>
  <Nav/>
   <Routes>
      <Route path="/" element={<App />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<RegisterForm />} />
      <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/dashboard/tickets" element={<Tickets />} />
          <Route path="/dashboard/tickets/add" element={<AddTicket />} />
          <Route path="/dashboard/tickets/edit/:id" element={<EditTicket />} />
       
         
         
    </Routes>


 

   
      <Footer/>
  
    </main>
    
    </UserProvider>
</BrowserRouter>
)
