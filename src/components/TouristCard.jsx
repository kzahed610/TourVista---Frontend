import { useState } from "react";
import "./TouristCard.css";

function TouristCard({ tour, onSelect, isFocused, isDimmed }) {
  const images = [tour.imageCover, ...tour.images];
  const [currentImage, setCurrentImage] = useState(0);
  const buildUrl = (img) => {
    if (!img) return "";
    if (img.startsWith("http://") || img.startsWith("https://")) return img;
    if (img.startsWith("/api/v1") || img.startsWith("api/v1/")) return `/${img.replace(/^\//, "")}`;
    if (img.startsWith("/img") || img.startsWith("img/")) return `/api/v1/${img.replace(/^\//, "")}`;
    return `/api/v1/img/tours/${img}`;
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImage((i) => (i + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImage((i) => (i - 1 + images.length) % images.length);
  };

  return (
    <div
      className={`tourist-card 
        ${isFocused ? "focused" : ""} 
        ${isDimmed ? "dimmed" : ""}`}
      onClick={onSelect}
    >
      {/* IMAGE WRAPPER */}
      <div className="image-wrapper">
        <img src={buildUrl(images[currentImage])} alt={tour.name} />

        {isFocused && (
          <>
            <button className="nav prev" onClick={prevImage}>‹</button>
            <button className="nav next" onClick={nextImage}>›</button>
          </>
        )}
      </div>

      <h1 className="card-title">{tour.name}</h1>

      {isFocused && (
        <p className="card-summary">{tour.description}</p>
      )}

      <ul className="card-meta">
        <li>₹ {tour.price}</li>
        <li>{tour.duration} days</li>
        <li>{tour.difficulty}</li>
        <li>⭐ {tour.ratingsAverage}</li>
      </ul>
    </div>
  );
}

export default TouristCard;
