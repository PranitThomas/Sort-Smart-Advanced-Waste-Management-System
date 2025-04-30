import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import UploadPage from "./UploadPage";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import Login from "./Login";
import Signup from "./Signup";

function App() {
    const [user, setUser] = useState(null);
    const [navKey, setNavKey] = useState(0);

    useEffect(() => {
        // Check for existing user session
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
        setNavKey(prev => prev + 1); // Force Navbar re-render
    };

    const handleLogout = () => {
        setUser(null);
        setNavKey(prev => prev + 1); // Force Navbar re-render
    };

    return (
        <Router>
            <Navbar key={navKey} user={user} onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<HeroSection />} />  {/* ✅ Home navigates here */}
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;


