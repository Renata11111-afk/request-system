import RequestCard from "../components/RequestCard";
import RequestForm from "../components/RequestForm";
import "../styles/userPage.css";
import { ROLES } from "../utils/constants";

function UserPage({
  setRole, requests, addRequest
}) {

  return (
    <div className="user-container">
      <h1 className="user-title">You entered as User</h1>

      <button className="standart-button" onClick={() => setRole(null)}>
        <i className="fa-solid fa-arrow-left" ></i>
        Go Back
      </button>
      <div className="user-content">
        <div className="content-left">
          <RequestForm
            onSubmit={addRequest}
          />
        </div>
        <div className="content-right">
          {requests.length === 0 ? (
            <p className="empty-text">You have no requests yet</p>
          ) : (
            [...requests].reverse().map((req) => (
              <RequestCard
                key={req.id}
                title={req.title}
                description={req.description}
                status={req.status}
                role={ROLES.USER}
                createdAt={req.createdAt}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default UserPage;