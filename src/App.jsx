import { useEffect, useState } from "react";
import RoleSelector from "./components/RoleSelector";
import UserPage from "./pages/UserPage";
import ManagerPage from "./pages/ManagerPage";
import { ROLES, STATUS } from "./utils/constants";

function App() {
  const [role, setRole] = useState(null);

  const [requests, setRequests] = useState(() => {
    return JSON.parse(localStorage.getItem("requests")) || [];
  });

  const [logs, setLogs] = useState(() => {
    return JSON.parse(localStorage.getItem("logs")) || [];
  });

  useEffect(() => {
    localStorage.setItem("logs", JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    localStorage.setItem("requests", JSON.stringify(requests));
  }, [requests]);

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


  const addLog = (action, role) => {
    const newLog = {
      id: Date.now(),
      action,
      role,
      time: new Date().toLocaleString()
    };

    setLogs(prev => [newLog, ...prev]);
  }

  if (role === ROLES.USER) {
    return (
      <UserPage
        setRole={setRole}
        requests={requests}
        addRequest={addRequest}
        addLog={addLog}
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
        logs={logs}
        addLog={addLog}
      />
    );
  }

  return <RoleSelector setRole={setRole} />;
}

export default App;
