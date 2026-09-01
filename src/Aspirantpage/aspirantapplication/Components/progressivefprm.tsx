// import { useState } from "react";
// import { cloneElement } from "react";
// import type { ReactElement } from "react";

// interface ProgressiveFormProps {
//   children: ReactElement<any>[];
// }

// function ProgressiveForm({ children }: ProgressiveFormProps) {
//   // Which page are we currently on?
//   const [currentStep, setCurrentStep] = useState(0);

//   // Move forward
//   const nextStep = () => {
//     setCurrentStep((prev) => prev + 1);
//   };

//   // Move backward
//   const previousStep = () => {
//     setCurrentStep((prev) => prev - 1);
//   };

//   return (
//     <div>
//       {/* Shows user where they are */}
//       <div>
//         Step {currentStep + 1} of {children.length}
//       </div>

//       {/* Displays the current form page */}
//       <div>
//         {cloneElement(children[currentStep], {
//           nextStep,
//           previousStep,
//         })}
//       </div>

//       {/* Navigation buttons */}
//       <div>
//         {currentStep > 0 && <button onClick={previousStep}>Back</button>}

//         {currentStep < children.length - 1 && (
//           <button onClick={nextStep}>Continue</button>
//         )}

//         {currentStep === children.length - 1 && <button>Submit</button>}
//       </div>
//     </div>
//   );
// }

// export default ProgressiveForm;
