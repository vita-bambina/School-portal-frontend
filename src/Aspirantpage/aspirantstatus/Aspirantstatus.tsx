import { Outlet } from "react-router-dom";
import Statuscard from "./Statuscard";
import Informationcard from "./informationcard"
// import { getCurrentEnrollment } from "../../api/enrollment.api";
import { useState } from "react";

function AspirantStatus() {
  return (
    <>
      <div className="Aspirantstatus-background">
        <div className="Aspirantstatus-body">
          <p className="Your-application">Your Application</p>
          <Statuscard />
          <Outlet />
          < Informationcard/>
        </div>
      </div>
    </>
  );
}

export default AspirantStatus;
