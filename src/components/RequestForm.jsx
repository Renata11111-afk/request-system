import { useState } from "react";
import "../styles/requestForm.css";

function RequestForm({ onSubmit, addLog }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(title, description);

    addLog("Created request", "User");

    setTitle("");
    setDescription("");
  };

  return (
    <form className="request-form" onSubmit={handleSubmit}>
      <input
        name="title"
        required
        minLength={5}
        className="form-input"
        placeholder="Enter your title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        name="description"
        required
        minLength={10}
        className="form-textarea"
        placeholder="Enter your description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="standart-button">
        <i className="fa-solid fa-plus"></i>
        Create request
      </button>
    </form>
  )
};

export default RequestForm;