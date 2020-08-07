import React from "react";

// Import componentes
import styles from "./index.module.css";
import AdminDashboard from '../../src/components/Admin/dashboard/admin_dashboard'
import UserDashboard from '../../src/components/Users/dashboard/user_dashboard'

// Import redux tools
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((store) => store.user);

  return user.user.cargo === "admin" ? (
    <AdminDashboard />
  ) : user.user.cargo === "user" ? (
    <UserDashboard />
  ) : <div className="center"></div>
};

export default Dashboard;
