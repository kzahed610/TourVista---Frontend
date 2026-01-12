import { useState } from "react";
import { motion } from "framer-motion";
import TouristCard from "./TouristCard";
import TouristModal from "./TouristModal";
import "./CardGrid.css";
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};
function CardGrid({ status, results, tours }) {
  const [selectedTour, setSelectedTour] = useState(null);
  if (status !== "success") {
    return <p className="error">Failed to load tours.</p>;
  }
  return (
    <div className="card-grid-wrapper">
      {" "}
      <p className="results">Total tours: {results}</p>{" "}
      <div className="card-grid">
        {" "}
        {tours.map((tour) => (
          <motion.div
            key={tour.id}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {" "}
            <TouristCard
              tour={tour}
              isDimmed={selectedTour && selectedTour.id !== tour.id}
              onSelect={() => setSelectedTour(tour)}
            />{" "}
          </motion.div>
        ))}{" "}
      </div>{" "}
      {selectedTour && (
        <TouristModal
          tour={selectedTour}
          onClose={() => setSelectedTour(null)}
        />
      )}{" "}
    </div>
  );
}
export default CardGrid;
