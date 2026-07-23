import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Components
import Navbar from "./components/Layout/Navbar";


// Pages
import Footer from "./components/Layout/Footer";
import Loader from "./components/Layout/Loader";
import ProtectedRoute from './components/ProtectedRoute';
import PremiumCursor from "./components/Premium/PremiumCursor";
import ServiceAnnouncements from "./components/Layout/ServiceAnnouncements";

const Home = lazy(() => import("./components/Pages/Home"));
const Contact = lazy(() => import("./components/Pages/Contact"));
const About = lazy(() => import("./components/home/About"));
const Services = lazy(() => import("./components/Pages/Services"));
const ServicePage = lazy(() => import("./components/Pages/ServicePage"));
const Countries = lazy(() => import("./components/Pages/Countries"));
const ConsultationForm = lazy(() => import("./components/Forms/ConsultancyForm"));
const FAQ = lazy(() => import("./components/Pages/FAQ"));
const DocumentChecklist = lazy(() => import("./components/Pages/DocumentChecklist"));
const Process = lazy(() => import("./components/Pages/Process"));
const AdminPanel = lazy(() => import("./Admin/AdminPanel"));
const AdminLogin = lazy(() => import("./components/adminLogin"));

function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <main key={location.pathname} className="page-enter flex-grow">
      <Suspense fallback={<div className="min-h-[60vh] bg-slate-50 px-6 py-20 text-center text-sm font-bold text-slate-500">Loading CAIALS...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/document-checklist" element={<DocumentChecklist />} />
        <Route path="/process" element={<Process />} />
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
        <Route path="/:slug" element={<ServicePage />} />
      </Routes>
      </Suspense>
    </main>
  );
}

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        
        {/* Navbar always visible */}
              <Loader />

        <Navbar />
        <PremiumCursor />
        <ServiceAnnouncements />

        {/* Page Content */}
        <AnimatedRoutes />
        <Footer/>

      </div>
    </Router>
  );
}

export default App;
