
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Dashboard = () => {
//   const [totalCars, setTotalCars] = useState(0);
//   const [carsSoldThisYear, setCarsSoldThisYear] = useState(0);
//   const [carsSoldThisMonth, setCarsSoldThisMonth] = useState(0);
//   const [earningsThisMonth, setEarningsThisMonth] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_API_URL}/cars/stats/count`);
//         setTotalCars(response.data.totalCars);
//         setCarsSoldThisYear(response.data.carsSoldThisYear);
//         setCarsSoldThisMonth(response.data.carsSoldThisMonth);
//         setEarningsThisMonth(response.data.earningsThisMonth);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch the statistics');
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p style={{ color: 'red' }}>{error}</p>;

//   return (
    
//     <div className="dashboard">
//       <h1>Dashboard</h1>
//       <div className="card-container">
//         <div className="card">
//           <h3>Total Cars</h3>
//           <p>{totalCars}</p>
//         </div>
//         <div className="card">
//           <h3>Cars Sold This Year</h3>
//           <p>{carsSoldThisYear}</p>
//         </div>
//         <div className="card">
//           <h3>Cars Sold This Month</h3>
//           <p>{carsSoldThisMonth}</p>
//         </div>
//         <div className="card">
//           <h3>Earnings This Month</h3>
//           <p>{earningsThisMonth}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import axios from 'axios'
import { useState, useEffect } from 'react';
const Dashboard = () => {
  const [totalCars, setTotalCars] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [monthlySales, setMonthlySales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    // const barData = [
    //     { name: 'Jan', sales: 15000 },
    //     { name: 'Feb', sales: 12000 },
    //     { name: 'Mar', sales: 8000 },
    //     { name: 'Apr', sales: 10000 },
    //     { name: 'May', sales: 14000 },
    //     { name: 'Jun', sales: 12000 },
    //     { name: 'Jul', sales: 16000 },
    //     { name: 'Aug', sales: 14000 },
    //     { name: 'Sep', sales: 13000 },
    //     { name: 'Oct', sales: 15000 },
    //     { name: 'Nov', sales: 17000 },
    //     { name: 'Dec', sales: 18000 },
    // ];

    const pieData = [
        { name: 'Desktop', value: 63, color: '#4CAF50' },
        { name: 'Tablet', value: 15, color: '#FFC107' },
        { name: 'Phone', value: 22, color: '#0088FE' },
    ];

    useEffect(() => {
          const fetchStats = async () => {
            try {

              const carResponse = await axios.get(`${import.meta.env.VITE_API_URL}/cars/stats/count`);
              const customerResponse = await axios.get(`${import.meta.env.VITE_API_URL}/purchases/count`);
              const profitResponse = await axios.get(`${import.meta.env.VITE_API_URL}/purchases/total-amount`); // Fetch total profit
              const salesResponse = await axios.get(`${import.meta.env.VITE_API_URL}/purchases/monthly-sales`); // Fetch monthly sales

              setTotalCars(carResponse.data.totalCars);
              setTotalCustomers(customerResponse.data.totalCustomers);
              setTotalProfit(profitResponse.data.totalAmount / 100);
              setMonthlySales(salesResponse.data);
              setLoading(false);

              // const response = await axios.get(`${import.meta.env.VITE_API_URL}/cars/stats/count`);
              // setTotalCars(response.data.totalCars);
             
              //setLoading(false);
            } catch (err) {
              setError('Failed to fetch the statistics');
              setLoading(false);
            }
          };
          fetchStats();
   }, []);
   if (loading) return <p>Loading...</p>;
   if (error) return <p style={{ color: 'red' }}>{error}</p>;
 
    return (
        <div className="dashboard">
            {/* Header with Search and Profile Icons */}
            <div className="dashboard-header">
                <div className="search-bar">
                    {/* <input type="text" placeholder="Search..." /> */}
                </div>
                <div className="profile-icons">
                    <i className="fas fa-bell"></i>
                    <i className="fas fa-user"></i>
                   
                </div>
            </div>

            {/* Metric Cards */}
            <div className="dashboard-cards">
                <div className="card budget-card">
                    <div className="card-info">
                        <span>Total Cars</span>
                        <h2>{totalCars}</h2>
                       
                    </div>
                    <div className="card-icon"><i className="fas fa-car"></i></div>
                </div>
                <div className="card customers-card">
                    <div className="card-info">
                        <span>Total Customers</span>
                        <h2>{totalCustomers}</h2>
                       
                    </div>
                    <div className="card-icon"><i className="fas fa-users"></i></div>
                </div>
                <div className="card task-progress-card">
                    <div className="card-info">
                        <span>Task Progress</span>
                        <h2>75.5%</h2>
                        <div className="progress-bar">
                            <div className="progress" style={{ width: '75.5%' }}></div>
                        </div>
                    </div>
                    <div className="card-icon"><i className="fas fa-tasks"></i></div>
                </div>
                <div className="card profit-card">
                    <div className="card-info">
                        <span>Total Profit</span>
                        <h2>${totalProfit.toFixed(2)}</h2>
                    </div>
                    <div className="card-icon"><i className="fas fa-wallet"></i></div>
                </div>
            </div>

            {/* Charts */}
            <div className="dashboard-charts">
                <div className="chart sales-chart">
                    <h3>Sales</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={monthlySales}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="totalSales" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="chart traffic-chart">
                    <h3>Traffic Source</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={80}
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="traffic-legend">
                        {pieData.map((entry) => (
                            <div key={entry.name} className="legend-item">
                                <span style={{ backgroundColor: entry.color }}></span>
                                {entry.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

