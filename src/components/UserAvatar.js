import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import './UserAvatar.css';

const UserAvatar = ({ username, onLogout }) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const firstLetter = username ? username.charAt(0).toUpperCase() : 'U';

    const handleLogout = () => {
        localStorage.removeItem('user');
        if (onLogout) {
            onLogout();
        }
        navigate('/login');
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="user-avatar-container" ref={dropdownRef}>
            <div 
                className="avatar-wrapper"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="user-avatar">
                    {firstLetter}
                </div>
                <span className="username">{username}</span>
            </div>
            
            {isOpen && (
                <div className="dropdown-menu">
                    <div className="dropdown-item" onClick={handleLogout}>
                        <FaSignOutAlt />
                        <span>Logout</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserAvatar; 