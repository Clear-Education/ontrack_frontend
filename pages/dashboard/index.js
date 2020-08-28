import React, { useEffect } from "react";

// Import componentes
import styles from "./index.module.css";


// Import redux tools
import { useSelector } from "react-redux";
import StructureContainer from "../../src/components/admin/structure_container/structure_container";
import { useRouter } from "next/router";

const Dashboard = () => {
  const user = useSelector((store) => store.user);
  const router = useRouter();

  useEffect(()=>{
    if(user.user.groups && user.user.groups !== "Administrador"){
      router.push('/dashboard/seguimientos');
    }
  },[user])

  return user.user.groups === "Administrador" ? (
    <StructureContainer />
  ) : <div></div>
};

export default Dashboard;
