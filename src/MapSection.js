import React, { useState } from "react";
import "./MapSection.css";

// Category mapping for better display
const categoryMapping = {
    'BT': 'Body Tissue or Organ',
    'GE': 'Glass Equipment-Packaging',
    'ME': 'Metal Equipment-Packaging',
    'OW': 'Organic Wastes',
    'PE': 'Plastic Equipment-Packaging',
    'PP': 'Paper Equipment-Packaging',
    'SN': 'Syringe Needles',
    'aerosol_cans': 'Aerosol Cans',
    'aluminum_food_cans': 'Aluminum Food Cans',
    'aluminum_soda_cans': 'Aluminum Soda Cans',
    'Battery': 'Battery',
    'cardboard_boxes': 'Cardboard Boxes',
    'cardboard_packaging': 'Cardboard Packaging',
    'clothing': 'Clothing',
    'coffee_grounds': 'Coffee Grounds',
    'disposable_plastic_cutlery': 'Disposable Plastic Cutlery',
    'eggshells': 'Eggshells',
    'food_waste': 'Food Waste',
    'Gauze': 'Gauze',
    'glass_beverage_bottles': 'Glass Beverage Bottles',
    'glass_cosmetic_containers': 'Glass Cosmetic Containers',
    'glass_food_jars': 'Glass Food Jars',
    'Gloves': 'Gloves',
    'Keyboard': 'Keyboard',
    'magazines': 'Magazines',
    'Mask': 'Mask',
    'Microwave': 'Microwave',
    'Mobile': 'Mobile',
    'Mouse': 'Mouse',
    'newspaper': 'Newspaper',
    'office_paper': 'Office Paper',
    'paper_cups': 'Paper Cups',
    'PCB': 'PCB',
    'plastic_cup_lids': 'Plastic Cup Lids',
    'plastic_detergent_bottles': 'Plastic Detergent Bottles',
    'plastic_food_containers': 'Plastic Food Containers',
    'plastic_shopping_bags': 'Plastic Shopping Bags',
    'plastic_soda_bottles': 'Plastic Soda Bottles',
    'plastic_straws': 'Plastic Straws',
    'plastic_trash_bags': 'Plastic Trash Bags',
    'plastic_water_bottles': 'Plastic Water Bottles',
    'Player': 'Player',
    'Printer': 'Printer',
    'shoes': 'Shoes',
    'steel_food_cans': 'Steel Food Cans',
    'styrofoam_cups': 'Styrofoam Cups',
    'styrofoam_food_containers': 'Styrofoam Food Containers',
    'Syringe': 'Syringe',
    'tea_bags': 'Tea Bags',
    'Television': 'Television',
    'Tweezers': 'Tweezers',
    'Washing Machine': 'Washing Machine'
};

// Waste category mapping
const wasteCategoryMapping = {
    // Biodegradable Waste
    'BT': 'Biodegradable Waste',
    'OW': 'Biodegradable Waste',
    'coffee_grounds': 'Biodegradable Waste',
    'eggshells': 'Biodegradable Waste',
    'food_waste': 'Biodegradable Waste',
    'tea_bags': 'Biodegradable Waste',
    'Gauze': 'Biodegradable Waste',
    'Gloves': 'Biodegradable Waste',
    
    // Non-Biodegradable Waste
    'PE': 'Non-Biodegradable Waste',
    'disposable_plastic_cutlery': 'Non-Biodegradable Waste',
    'plastic_cup_lids': 'Non-Biodegradable Waste',
    'plastic_detergent_bottles': 'Non-Biodegradable Waste',
    'plastic_food_containers': 'Non-Biodegradable Waste',
    'plastic_shopping_bags': 'Non-Biodegradable Waste',
    'plastic_soda_bottles': 'Non-Biodegradable Waste',
    'plastic_straws': 'Non-Biodegradable Waste',
    'plastic_trash_bags': 'Non-Biodegradable Waste',
    'plastic_water_bottles': 'Non-Biodegradable Waste',
    'styrofoam_cups': 'Non-Biodegradable Waste',
    'styrofoam_food_containers': 'Non-Biodegradable Waste',
    'GE': 'Non-Biodegradable Waste',
    'glass_beverage_bottles': 'Non-Biodegradable Waste',
    'glass_cosmetic_containers': 'Non-Biodegradable Waste',
    'glass_food_jars': 'Non-Biodegradable Waste',
    'ME': 'Non-Biodegradable Waste',
    '(ME) Metal equipment': 'Non-Biodegradable Waste',
    'aerosol_cans': 'Non-Biodegradable Waste',
    'aluminum_food_cans': 'Non-Biodegradable Waste',
    'aluminum_soda_cans': 'Non-Biodegradable Waste',
    'steel_food_cans': 'Non-Biodegradable Waste',
    'PP': 'Non-Biodegradable Waste',
    'cardboard_boxes': 'Non-Biodegradable Waste',
    'cardboard_packaging': 'Non-Biodegradable Waste',
    'magazines': 'Non-Biodegradable Waste',
    'newspaper': 'Non-Biodegradable Waste',
    'office_paper': 'Non-Biodegradable Waste',
    'paper_cups': 'Non-Biodegradable Waste',
    
    // Hazardous Waste
    'SN': 'Hazardous Waste',
    'Syringe': 'Hazardous Waste',
    'Battery': 'Hazardous Waste',
    'Mask': 'Hazardous Waste',
    'Tweezers': 'Hazardous Waste',
    'PCB': 'Hazardous Waste',
    
    // Electronic Waste (E-Waste)
    'Keyboard': 'Electronic Waste (E-Waste)',
    'Microwave': 'Electronic Waste (E-Waste)',
    'Mobile': 'Electronic Waste (E-Waste)',
    'Mouse': 'Electronic Waste (E-Waste)',
    'Player': 'Electronic Waste (E-Waste)',
    'Printer': 'Electronic Waste (E-Waste)',
    'Television': 'Electronic Waste (E-Waste)',
    'Washing Machine': 'Electronic Waste (E-Waste)',
    
    // Miscellaneous / Reusable Waste
    'clothing': 'Miscellaneous / Reusable Waste',
    'shoes': 'Miscellaneous / Reusable Waste'
};

export default function MapSection({ classification }) {
    const [city, setCity] = useState("");
    const [recyclingCenters, setRecyclingCenters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [mapVisible, setMapVisible] = useState(false);

    // Get the full category name based on the classification class
    const getCategoryName = (classKey) => {
        return categoryMapping[classKey] || classKey;
    };
    
    // Get the waste category based on the classification class
    const getWasteCategory = (classKey) => {
        // Debug logging
        console.log("Classification class key:", classKey);
        console.log("Type of classKey:", typeof classKey);
        console.log("Available keys in wasteCategoryMapping:", Object.keys(wasteCategoryMapping));
        
        // Handle specific cases
        if (classKey === 'ME' || classKey === 'me' || classKey === '(ME) Metal equipment') {
            console.log("Matched ME category directly");
            return 'Non-Biodegradable Waste';
        }
        
        // Check if the key exists in the mapping
        if (wasteCategoryMapping[classKey]) {
            console.log("Found in wasteCategoryMapping:", wasteCategoryMapping[classKey]);
            return wasteCategoryMapping[classKey];
        }
        
        // Try to find a partial match
        for (const key in wasteCategoryMapping) {
            if (key.includes(classKey) || classKey.includes(key)) {
                console.log("Found partial match:", key, wasteCategoryMapping[key]);
                return wasteCategoryMapping[key];
            }
        }
        
        // Log the unknown category for debugging
        console.log("Unknown category:", classKey);
        
        return 'Unknown Category';
    };

    const handleSearch = async () => {
        if (!city.trim()) {
            setError("Please enter a city name");
            return;
        }

        setLoading(true);
        setError(null);
        setRecyclingCenters([]);
        setMapVisible(false);

        try {
            const response = await fetch('http://localhost:5000/recycling-centers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ location: city })
            });

            if (!response.ok) {
                throw new Error("Failed to fetch recycling centers data.");
            }

            const data = await response.json();
            
            if (data.status === 'error') {
                throw new Error(data.message);
            }

            if (data.results.length === 0) {
                setError("No recycling centers found in this area.");
            } else {
                // Transform the results to match the expected format
                const places = data.results.map(r => ({
                    properties: {
                        name: r.name,
                        address: r.address,
                        rating: r.rating,
                        lat: r.lat,
                        lon: r.lon,
                        maps_link: r.maps_link,
                        google_maps_link: r.google_maps_link
                    }
                }));
                
                setRecyclingCenters(places);
                setMapVisible(true);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="map-section">
            {/* Classification Display Section */}
            <div className="classification-display">
                {classification ? (
                    <div className="classification-card">
                        <h3>Classification Result</h3>
                        <div className="classification-details">
                            <div className="classification-item">
                                <span className="label">Item Type:</span>
                                <span className="value">{getCategoryName(classification.class)}</span>
                            </div>
                            <div className="classification-item">
                                <span className="label">Category:</span>
                                <span className="value" data-category={getWasteCategory(classification.class)}>
                                    {getWasteCategory(classification.class)}
                                </span>
                            </div>
                            <div className="classification-item">
                                <span className="label">Confidence:</span>
                                <span className="value">{classification.confidence.toFixed(2)}%</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="no-classification">
                        <h3>No Classification Yet</h3>
                        <p>Upload an image to see classification results</p>
                    </div>
                )}
            </div>

            {/* Search Bar Section */}
            <div className="search-section">
                <h3>Find Recycling Centers</h3>
                <div className="search-container">
                    <input 
                        type="text" 
                        placeholder="Enter city name" 
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="search-input"
                    />
                    <button 
                        onClick={handleSearch} 
                        className="search-button"
                        disabled={loading}
                    >
                        {loading ? "Searching..." : "Search"}
                    </button>
                </div>
                {error && <div className="error-message">{error}</div>}
            </div>

            {/* Map Section */}
            <div className="map-container">
                {mapVisible ? (
                    <div className="map-content">
                        <h3>Recycling Centers near {city}</h3>
                        <div className="recycling-centers-list">
                            {recyclingCenters.map((place, index) => {
                                const props = place.properties || {};
                                return (
                                    <div key={index} className="recycling-center-card">
                                        <h4>{props.name || `Recycling Center ${index + 1}`}</h4>
                                        <p>{props.address || "Address not available"}</p>
                                        <div className="center-links">
                                            {props.maps_link && (
                                                <a 
                                                    href={props.maps_link} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="website-link"
                                                >
                                                    View Details
                                                </a>
                                            )}
                                            {props.google_maps_link && (
                                                <a 
                                                    href={props.google_maps_link} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="maps-link"
                                                >
                                                    Open in Google Maps
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="map-placeholder">
                        <p>Enter a city name to find recycling centers</p>
                    </div>
                )}
            </div>
        </div>
    );
}
