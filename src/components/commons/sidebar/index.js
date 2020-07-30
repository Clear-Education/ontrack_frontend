import React from "react";

// Import componentes
import styles from "./index.module.css";
import AdminSidebar from './admin_sidebar/admin_sidebar'
import UserSidebar from './user_sidebar/user_sidebar'

// Import redux tools
import { useSelector } from "react-redux";

const SideBarContainer = () => {
  const user = useSelector((store) => store.user);

  return /* user.user.role === "admin" */ true ? (
    <AdminSidebar />
  ) : user.user.role === "user" ? (
    <UserSidebar />
  ) : <div></div>
};

export default SideBarContainer;
