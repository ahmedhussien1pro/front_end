import React from "react";
import "./403.css";
import { Link } from "react-router-dom";
export default function Error403({ role }) {
  return (
    <div className="text-wrapper">
      <div className="title" data-content={404}>
        403 - Access Denied
      </div>
      <div className="subtitle">
        Oops , You don't have permission to access this page
        <Link
          to={role === "writer" ? "/dashboard/writer" : "/"}
          className="d-block text-center btn btn-primary"
        >
          {role === "writer" ? "Go to Writer Page" : "Go to Home Page"}
        </Link>
      </div>
    </div>
  );
}
