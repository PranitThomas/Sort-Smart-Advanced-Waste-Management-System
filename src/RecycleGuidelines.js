import React from "react";
import "./RecycleGuidelines.css";
import { recyclingGuidelines } from "./data/recyclingGuidelines";

export default function RecycleGuidelines({ classification }) {
    // Get the guidelines based on the classification class
    const getGuidelines = (classKey) => {
        if (!classKey) return null;
        
        // Try exact match first
        if (recyclingGuidelines[classKey]) {
            return recyclingGuidelines[classKey];
        }
        
        // Try uppercase match
        const upperKey = classKey.toUpperCase();
        if (recyclingGuidelines[upperKey]) {
            return recyclingGuidelines[upperKey];
        }
        
        // Try lowercase match
        const lowerKey = classKey.toLowerCase();
        if (recyclingGuidelines[lowerKey]) {
            return recyclingGuidelines[lowerKey];
        }
        
        // Try to find a partial match
        for (const key in recyclingGuidelines) {
            if (key.toLowerCase() === classKey.toLowerCase() || 
                classKey.toLowerCase().includes(key.toLowerCase()) || 
                key.toLowerCase().includes(classKey.toLowerCase())) {
                return recyclingGuidelines[key];
            }
        }
        
        return null;
    };

    const guidelines = classification ? getGuidelines(classification.class) : null;

    return (
        <div className="guidelines-container">
            <h2>♻️ Recycle Guidelines</h2>
            {guidelines ? (
                <div className="guidelines-content">
                    <h3>{guidelines.title}</h3>
                    <ul className="guidelines-steps">
                        {guidelines.guidelines.map((guideline, index) => (
                            <li key={index}>{guideline}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No guidelines available for this item. Please try another image or contact support.</p>
            )}
        </div>
    );
}
