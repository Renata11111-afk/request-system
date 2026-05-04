import "../styles/requestCard.css";
import { ROLES, STATUS } from "../utils/constants";

function RequestCard({
  id,
  title,
  description,
  status,
  role,
  onStatusChange,
  onDelete,
  createdAt,
  addLog
}) {
  const getNextStatus = () => {
    if (status === STATUS.NEW) return STATUS.IN_PROGRESS;
    if (status === STATUS.IN_PROGRESS) return STATUS.DONE;
    return null;
  };

  const nextStatus = getNextStatus();

  return (
    <div className="card-content">
      {role === ROLES.MANAGER &&
        <div className="card-top">
          <p className="card-id">ID: {id}</p>
          <div className={`card-status status-${status}`}>
            Status: {status}
          </div>
        </div>
      }

      <p className="card-date">
        Created at: {new Date(createdAt).toLocaleString()}
      </p>
      <h2 className="card-title">{title}</h2>
      <p className="card-descr">{description}</p>

      {role === ROLES.MANAGER && (
        <>
          {nextStatus && (
            <button
              className="card-button"
              onClick={() => {
                onStatusChange(id, nextStatus);
                addLog(`Changed status to ${nextStatus}`, role);
              }}
            >
              <i className="fa-solid fa-arrow-up"></i>
              Move to <b>"{nextStatus}"</b>
            </button>
          )}

          {status === STATUS.DONE && (
            <button
              className="card-button delete"
              onClick={() => {
                onDelete(id);
                addLog("Deleted request", role);
              }}
            >
              <i className="fa-solid fa-trash"></i>
              Delete request
            </button>
          )}
        </>
      )}

    </div>
  );
}

export default RequestCard;