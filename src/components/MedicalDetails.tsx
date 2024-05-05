import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MedicalData, medicalValidationSchema } from "../validationSchema";
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

export const MedicalDetails = ({ handleStep, handlePreviousStep }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<MedicalData>({
    resolver: zodResolver(medicalValidationSchema),
  });

  useEffect(() => {
    const details = localStorage.getItem("medicalDetails");
    if (details) {
      const data = JSON.parse(details);
      Object.entries(data).forEach(([key, value]) => {
        setValue(key as keyof MedicalData, value as string, {
          shouldValidate: true,
        });
      });
    }
  }, [setValue]);

  const handlePrevious = () => {
    handlePreviousStep();
    navigate("/employee");
  };

  const handleSave = (data: MedicalData) => {
    localStorage.setItem("medicalDetails", JSON.stringify(data));
    handleStep();
    navigate("/details");
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(handleSave)}>
        <div>
          <H3>Medical Details</H3>
          <Input
            type="text"
            placeholder="Blood Type"
            {...register("bloodType")}
          />
          <ErrorContainer>
            {errors?.bloodType && <span>{errors.bloodType.message}</span>}
          </ErrorContainer>

          <Input
            type="text"
            placeholder="Allergies"
            {...register("allergies")}
          />
          <ErrorContainer>
            {errors?.allergies && <span>{errors.allergies.message}</span>}
          </ErrorContainer>

          <Input
            type="text"
            placeholder="Medications"
            {...register("medications")}
          />
          <ErrorContainer>
            {errors?.medications && <span>{errors.medications.message}</span>}
          </ErrorContainer>

          <Input
            type="text"
            placeholder="Emergency Contact"
            {...register("emergencyContact")}
          />
          <ErrorContainer>
            {errors?.emergencyContact && (
              <span>{errors.emergencyContact.message}</span>
            )}
          </ErrorContainer>

          <ButtonContainer>
            <Button type="button" onClick={handlePrevious}>
              Previous
            </Button>
            <ButtonContainer>
              <SaveButton type="submit">Submit</SaveButton>
            </ButtonContainer>
          </ButtonContainer>
        </div>
      </form>
    </Container>
  );
};
