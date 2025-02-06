import React from "react";
import "./PersonCard.css";

const PersonCard = ({ name, role, description, image }) => {
  return (
    <div className="person-card">
      <img src={image} alt={`${name}'s avatar`} className="person-image" />
      <h2 className="person-name">{name}</h2>
      <h3 className="person-role">{role}</h3>
      <p className="person-description">{description}</p>
    </div>
  );
};

export default PersonCard;
