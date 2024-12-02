import React from "react";
import OverviewCards from "./OverViewCards";
import Clients from "./Client";
import Bookings from "./Bookings"
import "../../../assets/css/adminDashboard.css"


export default function serviceProviderDashboard() {
  return (
    <div className="dashboard-container">
      {/* Overview Cards */}
      <OverviewCards />

      {/* Management Sections */}
      <div className="management-sections">
        <Clients />
        <Bookings />
      </div>
    </div>
  );
};

// export default Dashboard;
