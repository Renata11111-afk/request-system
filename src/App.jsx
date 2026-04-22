import { useEffect, useState } from "react";
import RoleSelector from "./components/RoleSelector";
import UserPage from "./pages/UserPage";
import ManagerPage from "./pages/ManagerPage";
import { ROLES, STATUS } from "./utils/constants";

function App() {
  const [role, setRole] = useState(null);
  const [requests, setRequests] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedRequests = JSON.parse(localStorage.getItem("requests")) || [];
    setRequests(savedRequests);
    setIsLoaded(true);
  }, []);
  
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("requests", JSON.stringify(requests));
    }
  }, [requests, isLoaded]);

  const addRequest = (title, description) => {
    const newRequest = {
      id: Date.now(),
      title,
      description,
      status: STATUS.NEW,
      createdAt: Date.now(),
    };

    setRequests((prev) => [...prev, newRequest]);
  };

  const updateRequestStatus = (id, newStatus) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );
  };

  const deleteRequest = (id) => {
    setRequests((prev) => prev.filter((req) => req.id !== id));
  };

  if (role === ROLES.USER) {
    return (
      <UserPage
        setRole={setRole}
        requests={requests}
        addRequest={addRequest}
      />
    );
  }

  if (role === ROLES.MANAGER) {
    return (
      <ManagerPage
        setRole={setRole}
        requests={requests}
        updateRequestStatus={updateRequestStatus}
        deleteRequest={deleteRequest}
      />
    );
  }

  return <RoleSelector setRole={setRole} />;
}

export default App;
