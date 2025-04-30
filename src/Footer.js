import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaRecycle, FaInfoCircle, FaEnvelope, FaArrowRight, FaGithub, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* General */}
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li>
                            <Link to="/">
                                <FaHome className="footer-icon" />
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/upload">
                                <FaRecycle className="footer-icon" />
                                Classify Waste
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* The Team */}
                <div className="footer-section">
                    <h3>About</h3>
                    <ul>
                        <li>
                            <Link to="/about">
                                <FaInfoCircle className="footer-icon" />
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact">
                                <FaEnvelope className="footer-icon" />
                                Contact Us
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Legal */}
                <div className="footer-section">
                    <h3>Legal</h3>
                    <ul>
                        <li className="legal-item">
                            <span className="bullet"></span>
                            <Link to="/privacy">Privacy Policy</Link>
                        </li>
                        <li className="legal-item">
                            <span className="bullet"></span>
                            <Link to="/terms">Terms of Use</Link>
                        </li>
                    </ul>
                </div>

                {/* Stay in the Loop */}
                <div className="footer-section">
                    <h3>Newsletter</h3>
                    <p>Join our newsletter for tips on sustainable living and exclusive updates.</p>
                    <button className="subscribe-btn">
                        Subscribe
                        <FaArrowRight />
                    </button>
                </div>
            </div>

            {/* Divider */}
            <div className="footer-divider"></div>

            {/* Copyright and Socials */}
            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} SortSmart | Making Earth Cleaner, One Sort at a Time</p>
                <div className="social-icons">
                    <a href="#" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
                        <FaGithub />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                        <FaLinkedin />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                        <FaInstagram />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                        <FaFacebook />
                    </a>
                </div>
            </div>
        </footer>
    );
}
