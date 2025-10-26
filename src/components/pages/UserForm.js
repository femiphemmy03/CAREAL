import React, { useState } from "react";
import axios from "axios";
import "./Pages.css";

function UserForm() {
  const [formData, setFormData] = useState({
    plateNumber: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ Use POST method and send JSON body
      const response = await axios.post("http://localhost:5000/api/users", formData);

      setMessage("✅ Frontend: Info submitted successfully!");
      console.log("📨 Server Response:", response.data);

      // Reset form
      setFormData({ plateNumber: "" });
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      setMessage("❌ Failed to submit. Please try again.");
    }
  };

  return (
    <div className="page-container">
      <h2>Enter Your Car Information</h2>
      <form onSubmit={handleSubmit}>
        <label>Car Plate Number:</label>
        <input
          type="text"
          name="plateNumber"
          value={formData.plateNumber}
          onChange={handleChange}
          required
        />

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>

      {message && <p className="response-message">{message}</p>}
    </div>
  );
}

export default UserForm;
