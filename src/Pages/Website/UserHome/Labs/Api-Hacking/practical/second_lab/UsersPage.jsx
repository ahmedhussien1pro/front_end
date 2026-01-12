import usersData from "./users.json";
import React, { useState, useEffect } from "react";

const UsersPage = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    setUsers(usersData);
  }, []);

  return <div className="Custom__body--bg p-4 ">
    <pre >{users ? JSON.stringify(users, null, 2) : "Loading..."}</pre>
  </div> ;
};

export default UsersPage;
