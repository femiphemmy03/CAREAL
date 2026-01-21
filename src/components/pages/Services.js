import React, { useState } from "react";
import axios from "axios";
import "./Services.css";
import "./Pages.css";

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [message, setMessage] = useState("");

  const services = [
    {
      id: 1,
      title: "Vehicle License Renewal",
      description: "Renew your vehicle license quickly and easily without visiting the office.",
      duration: "1-2 business days",
      documents: "Vehicle license copy, valid ID",
      basePrice: 10000,
      developerFee: 1000,
      paymentCharge: 500,
    },
    {
      id: 2,
      title: "Insurance Renewal",
      description: "Renew your vehicle insurance with verified providers online.",
      duration: "1 business day",
      documents: "Previous insurance document",
      basePrice: 15000,
      developerFee: 1000,
      paymentCharge: 500,
    },
    {
      id: 3,
      title: "Road Worthiness Renewal",
      description: "Get your road worthiness certificate renewed hassle-free.",
      duration: "2-3 business days",
      documents: "Vehicle inspection report, ID",
      basePrice: 12000,
      developerFee: 1000,
      paymentCharge: 500,
    },
  ];

  const handleProceed = (service) => {
    setSelectedService(service);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
    setMessage("");
  };

  const handleConfirmPayment = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/payments", {
        title: selectedService.title,
        basePrice: selectedService.basePrice,
        developerFee: selectedService.developerFee,
        paymentCharge: selectedService.paymentCharge,
      });

      setMessage("✅ Payment recorded successfully!");
      console.log("📦 Backend response:", response.data);

      setTimeout(() => {
        setSelectedService(null);
        setMessage("");
      }, 1500);
    } catch (error) {
      console.error("❌ Error saving payment:", error);
      setMessage("❌ Failed to record payment. Please try again.");
    }
  };

  return (
    <div className="page-container">
      <h2>Available Renewal Services</h2>
      <div className="service-grid">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <p><strong>Duration:</strong> {service.duration}</p>
            <p><strong>Required Documents:</strong> {service.documents}</p>
            <p><strong>Base Price:</strong> ₦{service.basePrice.toLocaleString()}</p>
            <button
              className="submit-btn"
              onClick={() => handleProceed(service)}
            >
              Proceed to Payment
            </button>
          </div>
        ))}
      </div>

      {/* Payment Summary Modal */}
      {selectedService && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Payment Summary</h3>
            <p><strong>Service:</strong> {selectedService.title}</p>
            <p>Base Price: ₦{selectedService.basePrice.toLocaleString()}</p>
            <p>Developer Fee: ₦{selectedService.developerFee.toLocaleString()}</p>
            <p>Payment Charge: ₦{selectedService.paymentCharge.toLocaleString()}</p>
            <hr />
            <p>
              <strong>Total:</strong> ₦
              {(
                selectedService.basePrice +
                selectedService.developerFee +
                selectedService.paymentCharge
              ).toLocaleString()}
            </p>

            {message && <p className="response-message">{message}</p>}

            <div className="modal-actions">
              {!message && (
                <>
                  <button onClick={handleConfirmPayment} className="submit-btn">
                    Confirm Payment
                  </button>
                  <button onClick={handleCloseModal} className="cancel-btn">
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
