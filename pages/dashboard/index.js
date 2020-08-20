import React from "react";

// Import componentes
import styles from "./index.module.css";
import UserDashboard from '../../src/components/users/dashboard/user_dashboard'

// Import redux tools
import { useSelector } from "react-redux";
import StructureContainer from "../../src/components/admin/structure_container/structure_container";

const Dashboard = () => {
  const user = useSelector((store) => store.user);

  return user.user.cargo === "admin" ? (
    <StructureContainer />
  ) : user.user.cargo === "user" ? (
    <UserDashboard />
  ) : <div className="center"></div>
};

export default Dashboard;
