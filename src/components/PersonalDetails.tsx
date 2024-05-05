import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { PersonalData, validationSchema } from "../../src/validationSchema";
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
  justify-content: space-between;
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
  align-items: flex-end;
  display: flex;
  justify-content: end;
  flex-wrap: wrap;
  margin-top: 24px;
`;

const ErrorContainer = styled.div`
  color: red;
`;

export const PersonalDetails = ({ handleStep }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PersonalData>({
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    const details = localStorage.getItem("personalDetails");

    if (details) {
      const data = JSON.parse(details);
      Object.entries(data).forEach(([key, value]) => {
        setValue(key as keyof PersonalData, value as string, {
          shouldValidate: true,
        });
      });
    }
  }, [setValue]);

  const handleSave = (data: PersonalData) => {
    handleStep();
    localStorage.setItem("personalDetails", JSON.stringify(data));
    navigate("/employee");
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(handleSave)}>
        <H3>Contact Details</H3>

        <Input
          type="text"
          placeholder="Legal Name"
          {...register("legalName")}
        />
        <ErrorContainer>
          {errors?.legalName && <span>{errors.legalName.message}</span>}
        </ErrorContainer>

        <Input type="text" placeholder="Address" {...register("address")} />
        <ErrorContainer>
          {errors?.address && <span>{errors.address.message}</span>}
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

        <Input
          type="email"
          placeholder="Email address"
          {...register("email")}
        />
        <ErrorContainer>
          {errors?.email && <span>{errors.email.message}</span>}
        </ErrorContainer>

        <Input type="tel" placeholder="Primary Phone" {...register("phone")} />
        <ErrorContainer>
          {errors?.phone && <span>{errors.phone.message}</span>}
        </ErrorContainer>

        <ButtonContainer>
          <SaveButton type="submit">Save</SaveButton>
        </ButtonContainer>
      </form>
    </Container>
  );
};
