import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebook, FaGithub, FaUser, FaEnvelope, FaLock, FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';
import './Auth.css';
import { checkUserExists, writeUser, initializeExcelFile } from "./utils/excelAuth";

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const navigate = useNavigate();

    // Initialize user storage when component mounts
    React.useEffect(() => {
        try {
            const initialized = initializeExcelFile();
            if (!initialized) {
                console.error('Failed to initialize user storage');
                setErrors({ submit: 'Failed to initialize user storage. Please try again.' });
            } else {
                console.log('User storage initialized successfully');
            }
        } catch (error) {
            console.error('Error in storage initialization:', error);
            setErrors({ submit: 'An error occurred. Please try again.' });
        }
    }, []);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        if (!acceptTerms) {
            newErrors.terms = 'You must accept the Terms & Conditions';
        }
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);

        try {
            // Check if user already exists
            if (checkUserExists(formData.email)) {
                setErrors({ email: "Email already registered" });
                setIsSubmitting(false);
                return;
            }

            // Write user to storage
            const success = writeUser({
                username: formData.name,
                email: formData.email,
                password: formData.password
            });

            if (success) {
                console.log('User created successfully');
                setShowSuccess(true);
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            } else {
                console.error('Failed to create user');
                setErrors({
                    submit: 'Failed to create account. Please try again.'
                });
            }
        } catch (error) {
            console.error('Error in signup:', error);
            setErrors({
                submit: 'An error occurred. Please try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSocialSignup = (platform) => {
        console.log(`${platform} signup clicked`);
        // Implement social signup logic here
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-container">
                <div className="auth-card">
                    <h2>Create Account</h2>
                    <p className="auth-subtitle">Join SortSmart today!</p>

                    {showSuccess && (
                        <div className="success-message">
                            <FaCheckCircle />
                            <p>Account created successfully! Redirecting to login...</p>
                        </div>
                    )}

                    {errors.submit && (
                        <div className="error-message">
                            <FaExclamationCircle />
                            <p>{errors.submit}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="name">
                                <FaUser /> Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                className={errors.name ? 'error' : ''}
                            />
                            {errors.name && (
                                <div className="error-message">
                                    <FaExclamationCircle />
                                    {errors.name}
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">
                                <FaEnvelope /> Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className={errors.email ? 'error' : ''}
                            />
                            {errors.email && (
                                <div className="error-message">
                                    <FaExclamationCircle />
                                    {errors.email}
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">
                                <FaLock /> Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Create a password"
                                className={errors.password ? 'error' : ''}
                            />
                            {errors.password && (
                                <div className="error-message">
                                    <FaExclamationCircle />
                                    {errors.password}
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">
                                <FaLock /> Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                className={errors.confirmPassword ? 'error' : ''}
                            />
                            {errors.confirmPassword && (
                                <div className="error-message">
                                    <FaExclamationCircle />
                                    {errors.confirmPassword}
                                </div>
                            )}
                        </div>

                        <div className="form-options">
                            <label className="terms">
                                <input
                                    type="checkbox"
                                    checked={acceptTerms}
                                    onChange={(e) => {
                                        setAcceptTerms(e.target.checked);
                                        if (errors.terms) {
                                            setErrors(prev => ({
                                                ...prev,
                                                terms: ''
                                            }));
                                        }
                                    }}
                                />
                                I agree to the Terms & Conditions
                            </label>
                        </div>
                        {errors.terms && (
                            <div className="error-message">
                                <FaExclamationCircle />
                                {errors.terms}
                            </div>
                        )}

                        <button 
                            type="submit" 
                            className="auth-button"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </form>

                    <div className="social-auth">
                        <div className="social-auth-title">Or sign up with</div>
                        <div className="social-buttons">
                            <button 
                                className="social-button"
                                onClick={() => handleSocialSignup('google')}
                                type="button"
                            >
                                <FaGoogle />
                            </button>
                            <button 
                                className="social-button"
                                onClick={() => handleSocialSignup('facebook')}
                                type="button"
                            >
                                <FaFacebook />
                            </button>
                            <button 
                                className="social-button"
                                onClick={() => handleSocialSignup('github')}
                                type="button"
                            >
                                <FaGithub />
                            </button>
                        </div>
                    </div>

                    <p className="auth-redirect">
                        Already have an account?
                        <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup; 