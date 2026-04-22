import { useState } from "react";
import RequestCard from "../components/RequestCard";
import "../styles/managerPage.css";
import { FILTERS, ROLES } from "../utils/constants";

function ManagerPage({ setRole, requests, updateRequestStatus, deleteRequest }) {

  const [activeFilter, setActiveFilter] = useState(FILTERS[0].value);

  const filteredRequests =
    activeFilter === FILTERS[0].value
      ? requests
      : requests.filter((req) => req.status === activeFilter);


  return (
    <div className="manager-container">
      <h1 className="manager-title">You entered as Manager</h1>
      <button className="standart-button" onClick={() => setRole(null)}>
        <i className="fa-solid fa-arrow-left" ></i>
        Go Back
      </button>

      <div className="manager-filters">
        {FILTERS.map((filter) => (
          <button
            key={filter.value}
            className={`filter-button ${
              activeFilter === filter.value ? "active" : ""
            }`}
            onClick={() => setActiveFilter(filter.value)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="manager-list">
        {filteredRequests.reverse().map((req) => (
          <RequestCard
            key={req.id}
            {...req}
            role={ROLES.MANAGER}
            onStatusChange={updateRequestStatus}
            onDelete={deleteRequest}
          />
        ))}
      </div>

    </div>
  );
}

export default ManagerPage;