import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState(); // Type sélectionné
  const [currentPage, setCurrentPage] = useState(1); // Page actuelle

  // Filtrage des événements
  const filteredEvents = (data?.events || []).filter((event) => {
    if (!type) return true; // Affiche tous les événements si aucun type n'est sélectionné
    return event.type === type; // Filtre par type
  });

  // Calculer les événements pour la page actuelle
  const startIndex = (currentPage - 1) * PER_PAGE;
  const paginatedEvents = filteredEvents.slice(
    startIndex,
    startIndex + PER_PAGE
  );

  // Logique pour le débogage
  console.log("Type sélectionné :", type);
  console.log("Événements filtrés :", filteredEvents);
  console.log("Événements paginés :", paginatedEvents); // Ajout de ce log pour vérifier la pagination

  const changeType = (evtType) => {
    console.log("Type sélectionné modifié :", evtType);
    setCurrentPage(1); // Réinitialiser à la première page lors du changement de type
    setType(evtType); // Met à jour le type sélectionné
  };

  const pageNumber = Math.ceil(filteredEvents.length / PER_PAGE); // Nombre total de pages
  const typeList = new Set(data?.events.map((event) => event.type)); // Liste des types uniques

  return (
    <>
      {error && <div>An error occurred</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)} // Transforme le Set en tableau
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {paginatedEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {Array.from({ length: pageNumber }, (_, n) => (
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
