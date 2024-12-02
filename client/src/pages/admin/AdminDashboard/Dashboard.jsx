import React from "react";
import OverviewCards from "./OverViewCards";
import ServiceProviders from "./ServiceProvider";
import Users from "./User";
import Bookings from "./Bookings"
import "../../../assets/css/adminDashboard.css"


export default function Dashboard() {
  return (
    <div className="dashboard-container">
      {/* Overview Cards */}
      <OverviewCards />

      {/* Management Sections */}
      <div className="management-sections">
        <Bookings />
        <ServiceProviders />
        <Users />
      </div>
    </div>
  );
};

// export default Dashboard;
