import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const UserDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      const token = localStorage.getItem("token");
      const userEmail = localStorage.getItem("email");

      if (!token || !userEmail) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/appointments", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAppointments(response.data.filter((appt) => appt.userEmail === userEmail));
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [navigate]);
  if (loading) {
    return <p style={styles.loading}>⏳ Loading your dashboard...</p>;
  }

  const appointmentCounts = appointments.reduce((acc, appt) => {
    acc[appt.date] = (acc[appt.date] || 0) + 1;
    return acc;
  }, {});

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📊 Your Appointments</h2>

      <div style={styles.section}>
        <h3>📅 Upcoming & Past Appointments</h3>
        {appointments.length ? (
          <ul style={styles.list}>
            {appointments.map((appt, index) => (
              <li key={index} style={styles.listItem}>
                 {appt.services} on <strong>{appt.date}</strong> at <strong>{appt.time}</strong>
              </li>
            ))}
          </ul>
        ) : (
          <p>No booked appointments.</p>
        )}
      </div>

      <div style={styles.chartSection}>
        <div style={styles.chart}>
          <h3>📈 Appointments Over Time</h3>
          <Bar
            data={{
              labels: Object.keys(appointmentCounts),
              datasets: [
                {
                  label: "Appointments",
                  data: Object.values(appointmentCounts),
                  backgroundColor: "#ff4081",
                },
              ],
            }}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#fff0f5",
    minHeight: "100vh",
    textAlign: "center",
  },
  heading: {
    fontSize: "28px",
    color: "#ff4081",
    marginBottom: "20px",
  },
  section: {
    background: "white",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  list: {
    listStyleType: "none",
    padding: 0,
  },
  listItem: {
    fontSize: "16px",
    padding: "5px 0",
    borderBottom: "1px solid #eee",
  },
  chartSection: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  chart: {
    background: "white",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    width: "400px",
    height: "300px",
  },
  loading: {
    fontSize: "18px",
    textAlign: "center",
    marginTop: "50px",
  },
};

export default UserDashboard;
