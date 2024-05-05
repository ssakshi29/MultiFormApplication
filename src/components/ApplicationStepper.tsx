import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";

type props = {
  stepConfig: [
    {
      name: string;
      path: string;
    }
  ];
  currentStep: number;
  isComplete: boolean;
};

const StepPosition = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: gray;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const StepContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin: 1rem 1rem;
`;

const ProgressBarFill = styled.div`
  position: absolute;
  height: 2px;
  background: green;
  width: 0;
  top: 50%;
  left: 0;
  z-index: -1;
  transition: 0.5s ease;
`;

const ProgressBar = styled.div`
  background: gray;
  width: 100%;
  height: 2px;
  top: 50%;
  position: absolute;
  left: 0;
  z-index: -1;
`;

const StepWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StepName = styled.span`
  background-color: white;
  padding-left: 0.2rem;
  top: 0;
  text-align: center;
`;

const StepPositionActive = styled(StepPosition)`
  background-color: skyblue;
`;
const ApplicationStepper: React.FC<props> = ({
  stepConfig,
  currentStep,
  isComplete,
}) => {
  const navigate = useNavigate();

  const calculateProgress = (100 / (stepConfig.length - 1)) * (currentStep - 1);

  const handleClick = (index: number) => {
    if (index < currentStep) {
      navigate(stepConfig[index]?.path);
    }
  };

  return (
    <>
      <StepContainer>
        {stepConfig.map((step, index) => {
          return (
            <StepWrapper key={step.name} onClick={() => handleClick(index)}>
              {currentStep > index + 1 || isComplete ? (
                <StepPositionActive>&#10003;</StepPositionActive>
              ) : currentStep === index + 1 ? (
                <StepPositionActive>{index + 1}</StepPositionActive>
              ) : (
                <StepPosition>{index + 1}</StepPosition>
              )}
              <StepName> {step.name}</StepName>
            </StepWrapper>
          );
        })}
        <ProgressBar>
          <ProgressBarFill
            style={{
              width: `${calculateProgress}%`,
            }}
          ></ProgressBarFill>
        </ProgressBar>
      </StepContainer>
      <Outlet />
    </>
  );
};

export default ApplicationStepper;
