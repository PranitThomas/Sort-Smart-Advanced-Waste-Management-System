import React, { useState } from "react";
import PolaroidUpload from "./PolaroidUpload";
import MapSection from "./MapSection";
import RecycleGuidelines from "./RecycleGuidelines";
import "./UploadPage.css";

export default function UploadPage() {
    const [classification, setClassification] = useState(null);

    const handleClassificationUpdate = (classData) => {
        setClassification(classData);
    };

    return (
        <div className="upload-page">
            {/* Wrap Polaroid Upload & Map Section */}
            <div className="upload-sections">
                <PolaroidUpload 
                    onClassificationUpdate={handleClassificationUpdate}
                />
                <MapSection classification={classification} />
            </div>

            {/* Recycle Guidelines below the sections */}
            <RecycleGuidelines classification={classification} />
        </div>
    );
}
