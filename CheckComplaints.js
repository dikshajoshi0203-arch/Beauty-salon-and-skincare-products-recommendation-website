import React, { useEffect, useState } from "react";
import "./CheckComplaints.css";

const CheckComplaints = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/complaints") 
      .then((response) => response.json())
      .then((data) => setComplaints(data))
      .catch((error) => console.error("Error fetching complaints:", error));
  }, []);

  return (
    <div className="complaints-container">
      <h2 className="complaints-title">Customer Complaints</h2>
      {complaints.length === 0 ? (
        <p className="no-complaints">No complaints available</p>
      ) : (
        <div className="complaints-list">
          {complaints.map((complaint) => (
            <div key={complaint.id} className="complaint-card">
              <h3>{complaint.subject}</h3>
              <p><strong>From:</strong> {complaint.user}</p>
              <p>{complaint.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckComplaints;
