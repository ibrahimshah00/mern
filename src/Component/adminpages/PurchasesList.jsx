// PurchaseList.jsx
import React, { useEffect, useState } from 'react';

const PurchaseList = () => {
  const [purchases, setPurchases] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/purchases`);
          const text = await response.text(); // Get the raw text of the response
          console.log('Raw Response:', text); // Log the raw response text
          
          const data = JSON.parse(text); // Try to parse it as JSON
          setPurchases(data);
      } catch (error) {
          console.error('Error fetching purchases:', error);
      }
  };
    fetchPurchases();
  }, []);

  const toggleDropdown = (index) => {
    setActiveDropdown((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="purchase-list-container">
      <h2 className="purchase-list-title">Purchase History</h2>
      <div className="purchase-list">
        {purchases.length > 0 ? (
          purchases.map((purchase,index) => (
            <div key={purchase._id} className="purchase-card">
              <h3><button 
                  className="dropdown-toggle" 
                  onClick={() => toggleDropdown(index)}
                  style={{ cursor: 'pointer', marginLeft: '8px' }}
                >
                  {purchase.carName} ▼
                </button>
                </h3>
                {activeDropdown === index && (
                <div className="purchase-details">
                  <p><strong>Buyer ID:</strong> {purchase.userName}</p>
                  <p><strong>Amount:</strong> ${purchase.amount / 100}</p>
                  <p><strong>Payment ID:</strong> {purchase.paymentIntentId}</p>
                  <p><strong>Date:</strong> {new Date(purchase.createdAt).toLocaleDateString()}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No purchases found.</p>
        )}
      </div>
    </div>
  );
};

export default PurchaseList;
