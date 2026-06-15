import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import CreateUser from "../pages/CreateUser";
import UserDetails from "../pages/UserDetails";
import Stores from "../pages/Stores";
import CreateStore from "../pages/CreateStore";
import StoreDetails from "../pages/StoreDetails";
import AdminLayout from "../components/AdminLayout";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />

        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/users" element={<Users />} />

          <Route path="/users/create" element={<CreateUser />} />

          <Route path="/users/:id" element={<UserDetails />} />

          <Route path="/stores" element={<Stores />} />

          <Route path="/stores/create" element={<CreateStore />} />

          <Route path="/stores/:id" element={<StoreDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
