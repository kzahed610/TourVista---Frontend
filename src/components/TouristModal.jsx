import { useState, useRef } from "react";
import "./TouristModal.css";

function TouristModal({ tour, onClose }) {
  const images = [tour.imageCover, ...tour.images];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragDeltaX, setDragDeltaX] = useState(0);

  const dragStartX = useRef(null);
  const isDraggingRef = useRef(false);

  const handleNext = () => {
    if (animating) return;
    setDirection("next");
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setAnimating(false);
    }, 200);
  };

  const handlePrev = () => {
    if (animating) return;
    setDirection("prev");
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      setAnimating(false);
    }, 200);
  };

  const onDragStart = (clientX) => {
    setIsDragging(true);
    dragStartX.current = clientX;
    isDraggingRef.current = false;
  };

  const onDragMove = (clientX) => {
    if (!isDragging || dragStartX.current === null) return;
    const deltaX = clientX - dragStartX.current;
    if (Math.abs(deltaX) > 5) {
      isDraggingRef.current = true;
    }
    setDragDeltaX(deltaX);
  };

  const onDragEnd = () => {
    if (dragStartX.current === null) return;

    if (dragDeltaX > 100) {
      handlePrev();
    } else if (dragDeltaX < -100) {
      handleNext();
    }

    setIsDragging(false);
    setDragDeltaX(0);
    dragStartX.current = null;
  };

  // Mouse drag
  const handleMouseDown = (e) => onDragStart(e.clientX);
  const handleMouseMove = (e) => onDragMove(e.clientX);
  const handleMouseUp = () => onDragEnd();
  const handleMouseLeave = () => {
    if (isDragging) {
      onDragEnd();
    }
  };

  // Touch drag
  const handleTouchStart = (e) => onDragStart(e.touches[0].clientX);
  const handleTouchMove = (e) => onDragMove(e.touches[0].clientX);
  const handleTouchEnd = () => onDragEnd();

  const buildUrl = (img) => {
    if (!img) return "";
    if (img.startsWith("http://") || img.startsWith("https://")) return img;
    if (img.startsWith("/api/v1") || img.startsWith("api/v1/")) return `/${img.replace(/^\//, "")}`;
    if (img.startsWith("/img") || img.startsWith("img/")) return `/api/v1/${img.replace(/^\//, "")}`;
    return `/api/v1/img/tours/${img}`;
  };

  const handleOverlayClick = (e) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      return;
    }
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ userSelect: isDragging ? "none" : "auto" }}
      >
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <div
          className="deck-wrapper"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
          {images.map((img, index) => {
            const offset =
              ((index - currentIndex + images.length) % images.length) || 0;
            const zIndex = images.length - offset;

            let transform = `translateX(${offset * 10}px) translateY(${
              offset * 5
            }px) scale(${1 - offset * 0.05}) rotate(${offset * 2}deg)`;

            if (isDragging && offset === 0) {
              transform = `translateX(${dragDeltaX}px) rotate(${dragDeltaX / 20}deg)`;
            }

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
            const transition =
              isDragging && offset === 0
                ? "none"
                : "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s";

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
                  transition,
                  position: "absolute",
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
