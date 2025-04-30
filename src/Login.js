import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebook, FaGithub, FaEnvelope, FaLock, FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';
import './Auth.css';
import { validateUser } from './utils/excelAuth';

const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
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
            // Validate user against Excel data
            const user = validateUser(formData.email, formData.password);
            
            if (user) {
                // Store user session
                const userData = {
                    username: user.username,
                    email: user.email,
                    timestamp: new Date().toISOString()
                };
                
                // Update localStorage and notify parent component synchronously
                localStorage.setItem('user', JSON.stringify(userData));
                if (onLogin) {
                    onLogin(userData);
                }

                // Force state updates to be processed
                await new Promise(resolve => setTimeout(resolve, 0));
                
                setShowSuccess(true);
                
                // Navigate after a short delay
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            } else {
                setErrors({
                    submit: 'Invalid email or password'
                });
            }
        } catch (error) {
            setErrors({
                submit: 'Failed to login. Please try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSocialLogin = (platform) => {
        console.log(`${platform} login clicked`);
        // Implement social login logic here
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-container">
                <div className="auth-card">
                    <h2>Welcome Back</h2>
                    <p className="auth-subtitle">Sign in to continue</p>

                    {showSuccess && (
                        <div className="success-message">
                            <FaCheckCircle />
                            <p>Login successful! Redirecting...</p>
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
                                placeholder="Enter your password"
                                className={errors.password ? 'error' : ''}
                            />
                            {errors.password && (
                                <div className="error-message">
                                    <FaExclamationCircle />
                                    {errors.password}
                                </div>
                            )}
                        </div>

                        <div className="form-options">
                            <label className="remember-me">
                                <input type="checkbox" />
                                Remember me
                            </label>
                            <Link to="/forgot-password" className="forgot-password">
                                Forgot password?
                            </Link>
                        </div>

                        <button 
                            type="submit" 
                            className="auth-button"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    <div className="social-auth">
                        <div className="social-auth-title">Or login with</div>
                        <div className="social-buttons">
                            <button 
                                className="social-button"
                                onClick={() => handleSocialLogin('google')}
                                type="button"
                            >
                                <FaGoogle />
                            </button>
                            <button 
                                className="social-button"
                                onClick={() => handleSocialLogin('facebook')}
                                type="button"
                            >
                                <FaFacebook />
                            </button>
                            <button 
                                className="social-button"
                                onClick={() => handleSocialLogin('github')}
                                type="button"
                            >
                                <FaGithub />
                            </button>
                        </div>
                    </div>

                    <div className="auth-footer">
                        Don't have an account? <Link to="/signup">Sign up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login; 