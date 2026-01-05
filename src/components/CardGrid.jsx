import { useState } from "react";
import TouristCard from "./TouristCard";
import TouristModal from "./TouristModal";
import "./CardGrid.css";

function CardGrid({ status, results, tours }) {
  const [selectedTour, setSelectedTour] = useState(null);

  if (status !== "success") {
    return <p className="error">Failed to load tours.</p>;
  }

  return (
    <div className="card-grid-wrapper">
      <p className="results">Total tours: {results}</p>

      <div className="card-grid">
        {tours.map(tour => (
          <TouristCard
            key={tour.id}
            tour={tour}
            isDimmed={selectedTour && selectedTour.id !== tour.id}
            onSelect={() => setSelectedTour(tour)}
          />
        ))}
      </div>

      {selectedTour && (
        <TouristModal
          tour={selectedTour}
          onClose={() => setSelectedTour(null)}
        />
      )}
    </div>
  );
}

export default CardGrid;
