import React, { useState, useRef, useEffect } from "react";
import "./PolaroidUpload.css";

const BACKEND_URL = 'http://localhost:5000';

export default function PolaroidUpload({ onClassificationUpdate }) {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [backendStatus, setBackendStatus] = useState('checking');
    const fileInputRef = useRef(null);

    useEffect(() => {
        // Test backend connection when component mounts
        testBackendConnection();
    }, []);

    const testBackendConnection = async () => {
        try {
            const response = await fetch(`${BACKEND_URL}/test`);
            const data = await response.json();
            
            if (data.status === 'success') {
                setBackendStatus('connected');
                if (!data.model_loaded) {
                    setError('Backend is running but the model is not loaded properly.');
                }
            } else {
                setBackendStatus('error');
                setError('Backend connection failed');
            }
        } catch (err) {
            setBackendStatus('error');
            setError('Cannot connect to backend server. Please make sure it is running.');
            console.error('Backend connection error:', err);
        }
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setLoading(true);
            setError(null);
            onClassificationUpdate(null);
            
            // Display image preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);

            // Prepare form data for API
            const formData = new FormData();
            formData.append('image', file);

            try {
                // Send image to backend for classification
                const response = await fetch(`${BACKEND_URL}/classify`, {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Classification failed');
                }

                const data = await response.json();
                onClassificationUpdate(data);
            } catch (err) {
                setError(err.message || 'Failed to classify image. Please try again.');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="upload-container">
            <div className="upload-box">
                <h2>Upload Your Image</h2>

                {backendStatus === 'checking' && (
                    <div className="status-message">Checking backend connection...</div>
                )}

                {backendStatus === 'error' && (
                    <div className="error-message">
                        {error}
                        <button onClick={testBackendConnection} className="retry-button">
                            Retry Connection
                        </button>
                    </div>
                )}

                <div className="polaroid">
                    {image ? (
                        <img src={image} alt="Uploaded" className="polaroid-image" />
                    ) : (
                        <div className="placeholder">No Image</div>
                    )}
                    <p className="caption">Your Photo</p>
                </div>

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    ref={fileInputRef}
                    style={{ display: "none" }}
                />
                <button
                    className="upload-button"
                    onClick={() => fileInputRef.current.click()}
                    disabled={loading || backendStatus !== 'connected'}
                >
                    {loading ? "Processing..." : "Upload Image"}
                </button>

                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
    );
}
