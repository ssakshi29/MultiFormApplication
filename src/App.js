import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PersonalDetails } from "./components/PersonalDetails";
import { EmployeeDetails } from "./components/EmployeeDetails";
import { MedicalDetails } from "./components/MedicalDetails";
import { AllDetails } from "./components/AllDetails";
import ApplicationStepper from "./components/ApplicationStepper";

const applicationSteps = [
  {
    name: "Personal Details",
    path: "/",
  },
  {
    name: "Employee Details",
    path: "/employee",
  },
  {
    name: "Medical Details",
    path: "/employee/medical",
  },
];

function App() {
  const [currentStep, setcurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [isPersonalInfoFilled, setIsPersonalInfoFilled] = useState(localStorage.getItem("personalDetails"));
  const [isMedicalInfoFilled, setIsMedicalInfoFilled] = useState(localStorage.getItem("medicalDetails"));
  const [isEmployeeInfoFilled, setIsEmployeeInfoFilled] = useState(localStorage.getItem("employee"));
  // const stepCur = useRef(1);
  

  const handleStep = () => {
    setcurrentStep((prev) => {
      if (prev === applicationSteps.length) {
        setIsComplete(true);
        return prev;
      } else {
        return prev + 1;
      }
    });
    // stepCur.current = currentStep+1;
  };

  const handlePreviousStep = () => {
    setcurrentStep((prev) => {
      if (prev === 1) {
        return prev;
      } else {
        return prev - 1;
      }
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ApplicationStepper
              stepConfig={applicationSteps}
              currentStep={currentStep}
              isComplete={isComplete}
              isPersonalInfoFilled={isPersonalInfoFilled}
              isMedicalInfoFilled={isMedicalInfoFilled}
              isEmployeeInfoFilled={isEmployeeInfoFilled}
              // stepRef={stepCur}
            />
          }
        >
          <Route index element={<PersonalDetails handleStep={handleStep}  setIsPersonalInfoFilled={setIsPersonalInfoFilled}/>} />
          <Route
            path="employee"
            element={
              <EmployeeDetails
                handleStep={handleStep}
                setIsEmployeeInfoFilled={setIsEmployeeInfoFilled}
                handlePreviousStep={handlePreviousStep}
              />
            }
          />
          <Route
            path="employee/medical"
            element={
              <MedicalDetails
                handleStep={handleStep}
                setIsMedicalInfoFilled={setIsMedicalInfoFilled}
                handlePreviousStep={handlePreviousStep}
              />
            }
          />
        </Route>
        <Route path="details" element={<AllDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
