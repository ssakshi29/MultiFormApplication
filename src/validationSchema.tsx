import validator from "validator";
import { ZodType, z } from "zod";

export type PersonalData = {
  email: string;
  phone?: string;
  legalName: string;
  address: string;
  country: string;
  city: string;
  state: string;
  zipCode: string;
};

export type MedicalData = {
  bloodType: string;
  allergies?: string;
  medications?: string;
  emergencyContact?: string;
};

export type EmployeeData = {
  employerName: string;
  jobTitle: string;
  month: string;
  country: string;
  city: string;
  state: string;
  zipCode: string;
};


export const employeeValidationSchema: ZodType<EmployeeData> = z.object({
  employerName: z
    .string()
    .min(1, "Employer Name is required")
    .max(255, "Employer Name must not be more than 255 characters"),
  jobTitle: z
    .string()
    .min(1, "Job Title is required")
    .max(255, "Job Title must not be more than 255 characters"),
  month: z.string().min(1, "Month is required"),
  country: z
    .string()
    .min(1, "Country is required")
    .max(30, "Country name must not be more than 30 characters"),
  city: z
    .string()
    .min(1, "City is required")
    .max(30, "City must not be more than 30 characters"),
  state: z.string().min(1, "State is required"),
  zipCode: z
    .string()
    .nonempty("ZipCode is required")
    .min(7, "ZipCode must be atleast of 7 chars"),
});

export const medicalValidationSchema: ZodType<MedicalData> = z.object({
  bloodType: z.string().min(1, "Blood Type is required"),
  allergies: z.string().optional(),
  medications: z.string().optional(),
  emergencyContact: z
    .string()
    .refine(validator.isMobilePhone, { message: "Invalid contact number" }),
});

export const validationSchema: ZodType<PersonalData> = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  phone: z
    .string()
    .refine(validator.isMobilePhone, { message: "Invalid phone number" }),
  legalName: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name must not be more than 255 characters"),
  address: z
    .string()
    .min(1, "Address is required")
    .max(100, "Address must not be more than 100 characters"),
  country: z
    .string()
    .min(1, "Country is required")
    .max(30, "Country name must not be more than 30 characters"),
  city: z
    .string()
    .min(1, "City is required")
    .max(30, "City must not be more than 30 characters"),
  state: z.string().min(1, "State is required"),
  zipCode: z
    .string()
    .nonempty("ZipCode is required")
    .min(7, "ZipCode must be atleast of 7 chars"),
});
