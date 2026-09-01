// import { useState } from "react";
// import ProgressiveForm from "./Components/progressivefprm";
// import Personaldetails from "./Components/Bioenrollment";
// import Programmedetails from "./Components/programmeenrollmet";
// import Document from "./Components/Document";

// function Aspirantenrollment() {
//   const [enrollment, setenrollment] = useState({
//     // for personal details
//     firstName: "",
//     lastName: "",
//     otherName: "",

//     gender: "",
//     dateOfBirth: "",

//     phone: "",
//     address: "",

//     country: "",
//     stateOfOrigin: "",
//     lga: "",

//     currentState: "",
//     currentStateLga: "",

//     // Programme details side
//     facultyId: null,
//     departmentId: null,

//     jambRegistrationNumber: "",
//     jambScore: null,
//     waecAggregate: null,

//     // Documents side
//     passportPhoto: "",
//     birthCertificate: "",
//     waecResult: "",
//     jambResult: "",
//   });

//   return (
//     <ProgressiveForm>
//       <Personaldetails
//         enrollment={enrollment}
//         setenrollment={setenrollment}
//         nextStep={() => {}}
//       />
//       <Programmedetails
//         enrollment={enrollment}
//         setenrollment={setenrollment}
//         nextStep={() => {}}
//       />
//       <Document
//         enrollment={enrollment}
//         setenrollment={setenrollment}
//         nextStep={() => {}}
//       />
//     </ProgressiveForm>
//   );
// }
// export default Aspirantenrollment;
