import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: #f7f6f6;
  padding: 5rem 3rem;
  margin: 1rem 1rem;
`;

const H3 = styled.h3`
  margin-left: 1rem;
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  line-height: 1.75rem;
  font-size: 1.375rem;
  letter-spacing: 0;
  font-weight: 400;
`;

const Table = styled.div`
  line-height: 1.75rem;
`;

const TableRow = styled.div``;

const Strong = styled.strong`
  margin-right: 1rem;
  width: 1rem;
`;

export const AllDetails = () => {
  const [allDetails, setAllDetails] = useState<any[]>([]);
  const personalDetails = JSON.parse(
    localStorage.getItem("personalDetails") || ""
  );
  const medicalDetails = JSON.parse(
    localStorage.getItem("medicalDetails") || ""
  );
  const employeeDetails = JSON.parse(localStorage.getItem("employee") || "");

  useEffect(() => {
    setAllDetails([personalDetails, medicalDetails, employeeDetails]);
  },[personalDetails, medicalDetails, employeeDetails]);

  return (
    <Container>
      <H3>Details</H3>

      {allDetails.map((details, index) => {
        return (
          <Table key={index}>
            {Object.keys(details).map((detail, index) => {
              return (
                <TableRow key={index}>
                  <Strong>{detail}:</Strong>
                  <span>{details[detail]}</span>
                </TableRow>
              );
            })}
          </Table>
        );
      })}
    </Container>
  );
};
