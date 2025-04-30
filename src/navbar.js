import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // ✅ Import Link
import { FaHome, FaInfoCircle, FaRecycle, FaEnvelope, FaUser, FaUserPlus, FaBars } from "react-icons/fa";
import UserAvatar from "./components/UserAvatar";
import "./Taskbar.css";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if user is logged in
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Show navbar at the top of the page
            if (currentScrollY < 100) {
                setIsVisible(true);
            } else {
                // Hide navbar when scrolling down, show when scrolling up
                setIsVisible(currentScrollY < lastScrollY);
            }
            
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <div className={`navbar-container ${isVisible ? 'navbar-visible' : 'navbar-hidden'}`}>
            <nav className="navbar">
                <div className="logo">
                    <Link to="/" className="logo-text">SortSmart</Link> {/* ✅ Clickable logo */}
                </div>

                <ul className={isOpen ? "nav-links open" : "nav-links"}>
                    <li><Link to="/"><FaHome /> Home</Link></li>  {/* ✅ Home navigates to HeroSection */}
                    <li><Link to="/about"><FaInfoCircle /> About Us</Link></li>
                    <li><Link to="/upload"><FaRecycle /> Classify Waste</Link></li>
                    <li><Link to="/contact"><FaEnvelope /> Contact Us</Link></li>
                </ul>

                <div className="auth-buttons">
                    {user ? (
                        <UserAvatar username={user.username} onLogout={handleLogout} />
                    ) : (
                        <>
                            <Link to="/login" className="login-btn"><FaUser /> Log-In</Link>
                            <Link to="/signup" className="signup-btn"><FaUserPlus /> Sign-Up</Link>
                        </>
                    )}
                </div>

                <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
                    <FaBars />
                </button>
            </nav>
        </div>
    );
};

export default Navbar;
