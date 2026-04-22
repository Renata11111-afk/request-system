import "../styles/roleSelector.css";
import { ROLES } from "../utils/constants";

function RoleSelector({ setRole }) {
  return (
    <div className="role-container">
      <h1 className="role-title">Select your role</h1>

      <div className="role-cards">
        <div className="role-card" onClick={() => setRole(ROLES.USER)}>
          <h2 className="role-card-title">User</h2>
          <p className="role-card-descr">Create and view your requests</p>
        </div>

        <div className="role-card" onClick={() => setRole(ROLES.MANAGER)}>
          <h2 className="role-card-title">Manager</h2>
          <p className="role-card-descr">Manage all requests</p>
        </div>
      </div>
    </div>
  );
}

export default RoleSelector;