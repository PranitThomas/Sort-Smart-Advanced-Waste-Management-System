import React from "react";
import { FaLeaf, FaRobot, FaUsers, FaRecycle, FaMobileAlt, FaDatabase, FaReact, FaPython, FaChartLine, FaTags, FaBrain, FaInfoCircle, FaMapMarkerAlt } from "react-icons/fa";
import "./AboutUs.css";

const AboutUs = () => {
    return (
        <>
            <div className="about-wrapper"></div>
            <div className="about-container">
                <div className="about-header">
                    <div className="header-content">
                        <h1>About SortSmart</h1>
                        <p className="tagline">Empowering sustainable waste management through AI</p>
                        <div className="header-stats">
                            <div className="stat-item">
                                <FaTags className="stat-icon" />
                                <span className="stat-number">52+</span>
                                <span className="stat-label">Waste Categories</span>
                            </div>
                            <div className="stat-item">
                                <FaBrain className="stat-icon" />
                                <span className="stat-number">GoogleNet</span>
                                <span className="stat-label">AI Model</span>
                            </div>
                            <div className="stat-item">
                                <FaInfoCircle className="stat-icon" />
                                <span className="stat-number">Recycling Guidance</span>
                                <span className="stat-label">Guidelines</span>
                            </div>
                            <div className="stat-item">
                                <FaMapMarkerAlt className="stat-icon" />
                                <span className="stat-number">Center Locator</span>
                                <span className="stat-label">Find Centers</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="about-section mission-section">
                    <div className="section-icon">
                        <FaLeaf />
                    </div>
                    <h2>Our Mission</h2>
                    <p>
                        SortSmart is dedicated to revolutionizing waste management by leveraging artificial intelligence 
                        to help users correctly identify and sort waste items. Our goal is to increase recycling rates, 
                        reduce contamination in recycling streams, and promote environmental sustainability.
                    </p>
                </div>

                <div className="about-section overview-section">
                    <div className="section-icon">
                        <FaRobot />
                    </div>
                    <h2>Project Overview</h2>
                    <div className="overview-content">
                        <p>
                            SortSmart is an AI-powered waste classification application that uses computer vision to identify 
                            different types of waste materials. The application can classify items into 52 different categories, 
                            including various types of plastics, metals, glass, paper, organic waste, and electronic waste.
                        </p>
                        <p>
                            Once an item is classified, SortSmart provides detailed recycling guidelines specific to that material, 
                            helping users make informed decisions about proper disposal methods.
                        </p>
                    </div>
                </div>

                <div className="about-section tech-section">
                    <div className="section-icon">
                        <FaDatabase />
                    </div>
                    <h2>Technology Stack</h2>
                    <div className="tech-details">
                        <div className="tech-item">
                            <div className="tech-icon">
                                <FaPython />
                            </div>
                            <h3>AI Model</h3>
                            <p>
                                Our application uses a GoogleNet deep learning model trained on a comprehensive dataset of waste items. 
                                The model can accurately identify 52 different waste categories with high confidence.
                            </p>
                        </div>
                        <div className="tech-item">
                            <div className="tech-icon">
                                <FaReact />
                            </div>
                            <h3>Frontend</h3>
                            <p>
                                Built with React.js, our user-friendly interface allows for easy image uploads and provides 
                                clear, actionable recycling guidelines.
                            </p>
                        </div>
                        <div className="tech-item">
                            <div className="tech-icon">
                                <FaMobileAlt />
                            </div>
                            <h3>Responsive</h3>
                            <p>
                                Our application is fully responsive and works seamlessly across all devices, from desktop 
                                computers to mobile phones.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="about-section features-section">
                    <div className="section-icon">
                        <FaRecycle />
                    </div>
                    <h2>Key Features</h2>
                    <div className="features-grid">
                        <div className="feature-item">
                            <h3>Real-time Classification</h3>
                            <p>Instant waste identification using advanced AI technology</p>
                        </div>
                        <div className="feature-item">
                            <h3>52 Categories</h3>
                            <p>Comprehensive classification across different waste types</p>
                        </div>
                        <div className="feature-item">
                            <h3>Detailed Guidelines</h3>
                            <p>Specific recycling instructions for each waste type</p>
                        </div>
                        <div className="feature-item">
                            <h3>Impact Tracking</h3>
                            <p>Monitor your environmental impact and recycling contributions</p>
                        </div>
                    </div>
                </div>

                <div className="about-section team-section">
                    <div className="section-icon">
                        <FaUsers />
                    </div>
                    <h2>Our Team</h2>
                    <p>
                        SortSmart was developed by a team of passionate developers and environmental enthusiasts 
                        dedicated to making waste management more efficient and sustainable.
                    </p>
                </div>

                <div className="about-section future-section">
                    <div className="section-icon">
                        <FaChartLine />
                    </div>
                    <h2>Future Plans</h2>
                    <div className="future-content">
                        <p>
                            We are continuously working to improve SortSmart by expanding our classification capabilities, 
                            adding more detailed recycling guidelines, and integrating with local recycling programs to provide 
                            even more personalized recommendations.
                        </p>
                        <div className="future-goals">
                            <div className="goal-item">
                                <h4>Enhanced AI</h4>
                                <p>Expanding our model to recognize more waste categories</p>
                            </div>
                            <div className="goal-item">
                                <h4>Local Integration</h4>
                                <p>Partnering with local recycling facilities</p>
                            </div>
                            <div className="goal-item">
                                <h4>Mobile App</h4>
                                <p>Developing native mobile applications</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutUs; 