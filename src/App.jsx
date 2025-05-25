  import { useState } from 'react';
  import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
  import Signup from './Component/Signup';
  import Login from './Component/Login';
  import Home from './Component/Home';
  import AdminCarDisplay from './Component/adminpages/AdminCarDisplay';
  import UpdateCar from './Component/adminpages/UpdateCar';
  import './App.css';
  import AdminAddCar from './Component/adminpages/AdminAddCar';
  import CarsByCompany from './Component/adminpages/CarsByCompany';
  import ProtectedRoute from './ProtectedRoute';
  import UserDisplay from './Component/UserPage/Userdisplay';
  import CarDetailPage from './Component/UserPage/CarDetail';
  import Contact from './Component/UserPage/Contact';
  import UsersLists from './Component/adminpages/UserLists';
  import { useAuth   } from '../src/Component/Context/AuthContext';
 import AdminLayout from './Component/adminpages/AdminLayout';
import PurchaseList from '../src/Component/adminpages/PurchasesList';

  function App() {
    const { auth } = useAuth(); 
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const [user, setUser] = useState(null);

    return (
      <>
        <Router>
          <Routes>
            {/* Default index page */}
            <Route path="/" element={<UserDisplay />} />

            <Route path="/car/:id" element={<CarDetailPage />} /> 


            {/* Authentication routes */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<Login setToken={setToken} setUser={setUser} />} />

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute user={auth.user}>
                  <AdminLayout>
                    <Home user={auth.user} setUser={setUser} />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/AdminCarDisply"
              element={
                <ProtectedRoute user={auth.user}>
                   <AdminLayout>
                <AdminCarDisplay />
              </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/update-car/:id"
              element={
                <ProtectedRoute user={auth.user}>
                  <AdminLayout>
                <UpdateCar />
              </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-car"
              element={
                <ProtectedRoute user={auth.user}>
                  <AdminLayout>
                <AdminAddCar />
              </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/cars"
              element={
                <ProtectedRoute user={auth.user}>
                  <AdminLayout>
                <CarsByCompany />
              </AdminLayout>
                </ProtectedRoute>
              }
            />
            
              {/* New route for Purchase List */}
          <Route
            path="/purchases"
            element={
              <ProtectedRoute user={auth.user} requiredRole="admin">
                 <AdminLayout>
                <PurchaseList />
              </AdminLayout>
              </ProtectedRoute>
            }
          />

            <Route
              path="/AdminCarDisply/:company"
              element={
                <ProtectedRoute user={auth.user}>
                  <AdminLayout>
                <AdminCarDisplay />
              </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
            path="/user-list"
            element={
              <ProtectedRoute user={auth.user} requiredRole="admin">
                  <AdminLayout>
                <UsersLists />
              </AdminLayout>
              </ProtectedRoute>
            }
          />

            {/* Redirect unknown routes to index page */}
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/contact" element={<Contact />} />
            
          </Routes>
        </Router>
      </>
    );
  }

  export default App;
