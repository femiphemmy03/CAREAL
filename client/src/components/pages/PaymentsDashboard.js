import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Pages.css";
import "./PaymentsDashboard.css";

const PaymentsDashboard = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/payments");
      setPayments(response.data);
    } catch (error) {
      console.error("❌ Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalRevenue = payments.reduce((sum, p) => sum + p.total, 0);

  return (
    <div className="page-container">
      <h2>Payments Dashboard</h2>

      {loading ? (
        <p>Loading payments...</p>
      ) : payments.length === 0 ? (
        <p>No payments recorded yet.</p>
      ) : (
        <>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Service</th>
                <th>Base Price (₦)</th>
                <th>Dev Fee (₦)</th>
                <th>Charge (₦)</th>
                <th>Total (₦)</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.service_title}</td>
                  <td>{p.base_price.toLocaleString()}</td>
                  <td>{p.developer_fee.toLocaleString()}</td>
                  <td>{p.payment_charge.toLocaleString()}</td>
                  <td>{p.total.toLocaleString()}</td>
                  <td>{new Date(p.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="summary-box">
            <p><strong>Total Payments:</strong> {payments.length}</p>
            <p><strong>Total Revenue:</strong> ₦{totalRevenue.toLocaleString()}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentsDashboard;
