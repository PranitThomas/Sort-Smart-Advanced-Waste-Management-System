import React from "react";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FaRecycle, FaLeaf, FaGlobeAmericas } from "react-icons/fa";
import "./HeroSection.css";

export default function HeroSection() {
    const navigate = useNavigate();

    return (
        <section className="hero-section" id="hero-section">
            <div className="hero-content">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="hero-badge"
                >
                    <FaRecycle className="hero-icon" />
                    <span>Eco-Friendly Solution</span>
                </motion.div>
                
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="hero-title"
                >
                    Smart Waste Management for a <span className="highlight">Greener Tomorrow</span>
                </motion.h1>
                
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="hero-text"
                >
                    Efficiently sort, recycle, and manage waste with SortSmart. Our AI-powered platform helps you make a positive impact on the environment.
                </motion.p>

                <motion.div 
                    className="feature-circles"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <div className="circle-icon">
                        <FaLeaf />
                        <span>Eco-Friendly</span>
                    </div>
                    <div className="circle-icon">
                        <FaRecycle />
                        <span>Smart Sorting</span>
                    </div>
                    <div className="circle-icon">
                        <FaGlobeAmericas />
                        <span>Sustainable Future</span>
                    </div>
                </motion.div>
                
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    className="hero-button"
                >
                    <Button
                        variant="contained"
                        color="success"
                        className="cta-button"
                        onClick={() => navigate("/upload")}
                        sx={{
                            backgroundColor: "#4ade80",
                            padding: "16px 32px",
                            fontSize: "18px",
                            fontWeight: "bold",
                            borderRadius: "8px",
                            textTransform: "none",
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            "&:hover": { 
                                backgroundColor: "#22c55e",
                                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)'
                            }
                        }}
                    >
                        Get Started
                    </Button>
                </motion.div>
            </div>
            
            <div className="hero-scroll-indicator">
                <motion.div 
                    className="scroll-arrow"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 10L12 15L17 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </motion.div>
            </div>
        </section>
    );
}
