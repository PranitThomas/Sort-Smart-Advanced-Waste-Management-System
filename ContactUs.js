import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaPaperPlane, FaCheckCircle } from "react-icons/fa";
import "./ContactUs.css";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:3001/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            console.log("Form submitted:", formData);
            setIsSubmitted(true);
            
            setFormData({
                name: "",
                email: "",
                subject: "",
                message: ""
            });
            
            setTimeout(() => {
                setIsSubmitted(false);
            }, 5000);
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("There was an error submitting your message. Please try again.");
        }
    };

    return (
        <>
            <div className="contact-wrapper"></div>
            <div className="contact-container">
                <motion.div 
                    className="contact-header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1>Contact Us</h1>
                    <p className="tagline">We'd love to hear from you!</p>
                </motion.div>

                <div className="contact-content">
                    <motion.div 
                        className="contact-info"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="info-section">
                            <h2>Get in Touch</h2>
                            <p>
                                Have questions about SortSmart? Want to provide feedback or suggestions? 
                                We're here to help and would love to hear from you!
                            </p>
                            
                            <div className="contact-details">
                                <motion.div 
                                    className="contact-item"
                                    whileHover={{ x: 10 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="contact-icon">
                                        <FaMapMarkerAlt />
                                    </div>
                                    <div>
                                        <h3>Address</h3>
                                        <p>University of Petroleum and Energy Studies, Dehradun</p>
                                    </div>
                                </motion.div>
                                
                                <motion.div 
                                    className="contact-item"
                                    whileHover={{ x: 10 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="contact-icon">
                                        <FaEnvelope />
                                    </div>
                                    <div>
                                        <h3>Email</h3>
                                        <p>SortSmart@gmail.com</p>
                                    </div>
                                </motion.div>
                                
                                <motion.div 
                                    className="contact-item"
                                    whileHover={{ x: 10 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="contact-icon">
                                        <FaPhone />
                                    </div>
                                    <div>
                                        <h3>Phone</h3>
                                        <p>+91 9451092778</p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                        
                        <div className="info-section">
                            <h2>Connect With Us</h2>
                            <div className="social-links">
                                <motion.a 
                                    href="#" 
                                    className="social-link"
                                    whileHover={{ y: -5, scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <FaFacebook />
                                </motion.a>
                                <motion.a 
                                    href="#" 
                                    className="social-link"
                                    whileHover={{ y: -5, scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <FaGithub />
                                </motion.a>
                                <motion.a 
                                    href="#" 
                                    className="social-link"
                                    whileHover={{ y: -5, scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <FaInstagram />
                                </motion.a>
                                <motion.a 
                                    href="#" 
                                    className="social-link"
                                    whileHover={{ y: -5, scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <FaLinkedin />
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>
                    
                    <motion.div 
                        className="contact-form-container"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <h2>Send Us a Message</h2>
                        {isSubmitted ? (
                            <motion.div 
                                className="success-message"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200 }}
                            >
                                <FaCheckCircle />
                                <p>Thank you for your message! We'll get back to you soon.</p>
                            </motion.div>
                        ) : (
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        required
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="subject">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="Enter subject"
                                        required
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Enter your message"
                                        rows="5"
                                        required
                                    ></textarea>
                                </div>
                                
                                <motion.button 
                                    type="submit" 
                                    className="submit-btn"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <FaPaperPlane className="submit-icon" />
                                    Send Message
                                </motion.button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default ContactUs; 