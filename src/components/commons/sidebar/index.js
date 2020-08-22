import React from "react";

// Import componentes
import styles from "./index.module.css";
import AdminSidebar from './admin_sidebar/admin_sidebar'
import UserSidebar from './user_sidebar/user_sidebar'

// Import redux tools
import { useSelector } from "react-redux";

const SideBarContainer = () => {
  const user = useSelector((store) => store.user);

  return user.user.groups === 1 ? (
    <AdminSidebar />
  ) : user.user.groups === 2 ||  user.user.groups === 3 ? (
    <UserSidebar />
  ) : <div className={styles.sidebar_container}></div>
};

export default SideBarContainer;
