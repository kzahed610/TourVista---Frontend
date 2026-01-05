import { useState, useRef } from "react";
import "./TouristModal.css";

function TouristModal({ tour, onClose }) {
  const images = [tour.imageCover, ...tour.images];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null); 
  const [animating, setAnimating] = useState(false);

  const dragStartX = useRef(null);

  const handleNext = () => {
    setDirection("next");
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setAnimating(false);
    }, 200);
  };

  const handlePrev = () => {
    setDirection("prev");
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      setAnimating(false);
    }, 200);
  };

  // Mouse drag
  const handleMouseDown = (e) => {
    dragStartX.current = e.clientX;
  };

  const handleMouseUp = (e) => {
    if (dragStartX.current === null) return;
    const deltaX = e.clientX - dragStartX.current;
    if (deltaX > 50) handlePrev(); // swipe right
    else if (deltaX < -50) handleNext(); // swipe left
    dragStartX.current = null;
  };

  const buildUrl = (img) => {
    if (!img) return "";
    if (img.startsWith("http://") || img.startsWith("https://")) return img;
    if (img.startsWith("/api/v1") || img.startsWith("api/v1/")) return `/${img.replace(/^\//, "")}`;
    if (img.startsWith("/img") || img.startsWith("img/")) return `/api/v1/${img.replace(/^\//, "")}`;
    return `/api/v1/img/tours/${img}`;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <div
          className="deck-wrapper"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          {images.map((img, index) => {
            const offset =
              ((index - currentIndex + images.length) % images.length) || 0;

            const zIndex = images.length - offset;

            let transform = `translateX(${offset * 10}px) translateY(${
              offset * 5
            }px) scale(${1 - offset * 0.05}) rotate(${offset * 2}deg)`;

            // Animate deck swipe
            if (animating) {
              if (offset === 0) {
                transform =
                  direction === "next"
                    ? "translateX(-120%) translateY(20px)"
                    : "translateX(120%) translateY(20px)";
              } else if (
                offset === 1 ||
                (offset === images.length - 1 && direction === "prev")
              ) {
                transform =
                  "translateX(0px) translateY(0px) scale(1) rotate(0deg)";
              }
            }

            const opacity = offset > 2 ? 0 : 1;

            return (
              <img
                key={index}
                src={buildUrl(img)}
                alt={`${tour.name} ${index + 1}`}
                className="deck-image"
                style={{
                  transform,
                  zIndex,
                  opacity,
                  transition:
                    "transform 0.6s cubic-bezier(0.4,0,0.2,1), opacity 0.6s",
                  position: "absolute",
                  cursor: "grab",
                }}
                onDragStart={(e) => e.preventDefault()} 
              />
            );
          })}

          <button className="deck-nav left" onClick={handlePrev}>
            ‹
          </button>
          <button className="deck-nav right" onClick={handleNext}>
            ›
          </button>
        </div>

        <h1>{tour.name}</h1>
        <p className="modal-description">{tour.description}</p>

        <div className="modal-info">
          <p>Price: ₹{tour.price}</p>
          <p>Duration: {tour.duration} days</p>
          <p>Difficulty: {tour.difficulty}</p>
          <p>Group size: {tour.maxGroupSize}</p>
          <p>
            Rating: ⭐ {tour.ratingsAverage} ({tour.ratingsQuantity})
          </p>
        </div>

        <ul className="modal-dates">
          {tour.startDates.map((date, index) => (
            <li key={index}>{date}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TouristModal;
