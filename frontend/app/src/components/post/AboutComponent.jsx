import React from "react";
import "./AboutPage.css";
import PersonCard from "./PersonCard";

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-header">
        <h1 className="about-title">StakerSpace</h1>
        <p className="about-description">
          Our project is crafted with passion and dedication to deliver the best
          user experience. Discover more about the minds behind the creation.
        </p>
      </div>

      <div className="cards-container">
        <PersonCard
          name="Manish Tiwari"
          role="Lead Developer"
          description="Manish is a software developer with a passion for interactive and efficient applications. With a background in tech and design, he’s focused on building solutions that make a difference."
          image="https://via.placeholder.com/100" // Replace with actual image URL if available
        />
        <PersonCard
          name="Jane Doe"
          role="UI/UX Designer"
          description="Jane brings creativity to life through design. Her attention to detail and eye for aesthetics make every project visually stunning and user-friendly."
          image="https://via.placeholder.com/100" // Replace with actual image URL if available
        />
      </div>
    </div>
  );
};

export default AboutPage;
