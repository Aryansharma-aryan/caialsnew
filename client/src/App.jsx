import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Layout/Navbar";


// Pages
import Home from "./components/Pages/Home";
import Contact from "./components/Pages/Contact";
import About from "./components/home/About";
import Services from "./components/Pages/Services"
import Countries from "./components/Pages/Countries";
import Footer from "./components/Layout/Footer";
import Loader from "./components/Layout/Loader";
import ConsultationForm from "./components/Forms/ConsultancyForm";
import ProtectedRoute from './components/ProtectedRoute';
import AdminPanel from "./Admin/AdminPanel";
import AdminLogin from "./components/adminLogin";





function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        
        {/* Navbar always visible */}
              <Loader />

        <Navbar />

        {/* Page Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
           <Route path="/contact" element={<Contact />} />
           <Route path="/services" element={<Services />} />
           <Route path="/countries" element={<Countries />} />
           <Route path="/consultation" element={<ConsultationForm />} />
           <Route path="/login" element={<AdminLogin />} />
           <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />

          </Routes>
        </main>
        <Footer/>

      </div>
    </Router>
  );
}

export default App;