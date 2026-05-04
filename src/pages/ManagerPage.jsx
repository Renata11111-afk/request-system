import { useState } from "react";
import RequestCard from "../components/RequestCard";
import "../styles/managerPage.css";
import { FILTERS, ROLES, TAB } from "../utils/constants";
import ModalDelete from "../components/ModalDelete";

function ManagerPage({ setRole, requests, updateRequestStatus, deleteRequest, addLog, logs }) {
  const [activeTab, setActiveTab] = useState(TAB.REQUESTS);

  const [activeFilter, setActiveFilter] = useState(FILTERS[0].value);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleAskDelete = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  }

  const confirmDelete = () => {
    deleteRequest(selectedId);
    setSelectedId(null);
    setIsModalOpen(false);
  }
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedId(null);
  }

  const filteredRequests =
    activeFilter === FILTERS[0].value
      ? requests
      : requests.filter((req) => req.status === activeFilter);


  return (
    <div className="manager-container">
      <h1 className="manager-title">You entered as Manager</h1>
      <div className="manager-tabs">
        <button
          className={`manager-tab ${activeTab === TAB.REQUESTS ? "active" : ""}`}
          onClick={() => setActiveTab(TAB.REQUESTS)}>
          Requests
        </button>

        <button
          className={`manager-tab ${activeTab === TAB.LOGS ? "active" : ""}`}
          onClick={() => setActiveTab(TAB.LOGS)}>
          Logs
        </button>
      </div>

      <button className="standart-button" onClick={() => setRole(null)}>
        <i className="fa-solid fa-arrow-left" ></i>
        Go Back
      </button>

      {activeTab === TAB.REQUESTS &&
        <div>
          <div className="manager-filters">
            {FILTERS.map((filter) => (
              <button
                key={filter.value}
                className={`filter-button ${activeFilter === filter.value ? "active" : ""
                  }`}
                onClick={() => setActiveFilter(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="manager-list">
            {filteredRequests.length === 0 ? (
              <p className="empty-text">No requests found</p>
            ) : (
              filteredRequests.reverse().map((req) => (
                <RequestCard
                  key={req.id}
                  {...req}
                  role={ROLES.MANAGER}
                  onStatusChange={updateRequestStatus}
                  onDelete={handleAskDelete}
                  addLog={addLog}
                />
              )))}
          </div>

          {isModalOpen && (
            <ModalDelete
              isOpen={isModalOpen}
              onConfirm={confirmDelete}
              onClose={closeModal}
            />
          )}

        </div>
      }

      {activeTab === TAB.LOGS && (
        <div className="logs-wrapper">
          <h2 className="manager-title">Logs</h2>
          {logs.map(log => (
            <div className="manager-logslist" key={log.id}>
              {log.role} — {log.action} — {log.time}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ManagerPage;