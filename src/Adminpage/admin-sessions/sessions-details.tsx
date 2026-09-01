import { useState } from "react";
import { useParams } from "react-router-dom";
import { getsessionId } from "../../api/session.api";

interface semester {
    id:number,
    // semester:Semester,
    startDate: string,
    endDate:string

}

interface session {
    id: number,

}
function Sessiondetails() {}

export default Sessiondetails;
