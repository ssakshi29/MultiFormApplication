import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { EmployeeData, employeeValidationSchema } from "../validationSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const Container = styled.div`
  background-color: #f7f6f6;
  padding: 5rem 10rem;
  margin: 1rem 0;
`;

const H3 = styled.h3`
  margin-left: 1rem;
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  line-height: 1.75rem;
  font-size: 1.375rem;
  letter-spacing: 0;
  font-weight: 400;
`;
const InputContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;
const Input = styled.input`
  width: 100%;
  margin: 1rem 1rem;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
`;

const SaveButton = styled.button`
  background-color: rgb(26, 115, 232);
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  margin-left: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 24px;
`;
const Button = styled.button`
  background-color: #ebebeb;
  border: 1px solid black;
  border-radius: 4px;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
`;

const ErrorContainer = styled.div`
  color: red;
`;

export const EmployeeDetails = ({ handleStep, handlePreviousStep }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EmployeeData>({
    resolver: zodResolver(employeeValidationSchema),
  });

  useEffect(() => {
    const details = localStorage.getItem("employee");
    if (details) {
      const data = JSON.parse(details);
      Object.entries(data).forEach(([key, value]) => {
        setValue(key as keyof EmployeeData, value as string, {
          shouldValidate: true,
        });
      });
    }
  }, [setValue]);

  const handlePrevious = () => {
    handlePreviousStep();
    navigate("/");
  };

  const handleSave = (data: EmployeeData) => {
    localStorage.setItem("employee", JSON.stringify(data));
    handleStep();
    navigate("/employee/medical");
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(handleSave)}>
        <div>
          <H3>Employee Details</H3>
          <Input
            type="text"
            placeholder="Employer Name"
            {...register("employerName")}
          />
          <ErrorContainer>
            {errors?.employerName && <span>{errors.employerName.message}</span>}
          </ErrorContainer>

          <Input
            type="text"
            placeholder="Job Title"
            {...register("jobTitle")}
          />
          <ErrorContainer>
            {errors?.jobTitle && <span>{errors.jobTitle.message}</span>}
          </ErrorContainer>

          <Input type="month" placeholder="Month" {...register("month")} />
          <ErrorContainer>
            {errors?.month && <span>{errors.month.message}</span>}
          </ErrorContainer>

          <InputContainer>
            <Input
              type="text"
              placeholder="Country / Region"
              {...register("country")}
            />
            <ErrorContainer>
              {errors?.country && <span>{errors.country.message}</span>}
            </ErrorContainer>

            <Input type="text" placeholder="City" {...register("city")} />
            <ErrorContainer>
              {errors?.city && <span>{errors.city.message}</span>}
            </ErrorContainer>
          </InputContainer>

          <InputContainer>
            <Input type="text" placeholder="State" {...register("state")} />
            <ErrorContainer>
              {errors?.state && <span>{errors.state.message}</span>}
            </ErrorContainer>
            <Input
              type="text"
              placeholder="Zip/postal Code"
              {...register("zipCode")}
            />
            <ErrorContainer>
              {errors?.zipCode && <span>{errors.zipCode.message}</span>}
            </ErrorContainer>
          </InputContainer>
        </div>
        <ButtonContainer>
          <Button type="button" onClick={handlePrevious}>
            Previous
          </Button>
          <SaveButton type="submit">Save</SaveButton>
        </ButtonContainer>
      </form>
    </Container>
  );
};
