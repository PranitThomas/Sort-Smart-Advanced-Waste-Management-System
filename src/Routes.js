import React from "react";
import { Routes, Route } from "react-router-dom";
import HeroSection from "./HeroSection";
import UploadPage from "./UploadPage";
import AboutUs from "./AboutUs";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/about" element={<AboutUs />} />
        </Routes>
    );
}
