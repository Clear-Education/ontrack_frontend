import React from "react";

// Import componentes
import styles from "./index.module.css";
import AdminSidebar from './admin_sidebar/admin_sidebar'
import UserSidebar from './user_sidebar/user_sidebar'

// Import redux tools
import { useSelector } from "react-redux";

const SideBarContainer = () => {
  const user = useSelector((store) => store.user);

  return user.user.cargo === "admin" ? (
    <AdminSidebar />
  ) : user.user.cargo === "user" ? (
    <UserSidebar />
  ) : <div className={styles.sidebar_container}></div>
};

export default SideBarContainer;
