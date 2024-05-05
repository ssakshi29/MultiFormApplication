import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";

const BreadCrumbContainer = styled.div`
  margin: 1rem 1rem;
`;

export const BreadCrumb = () => {
  const location = useLocation();

  console.log(location);

  const pathNames = location.pathname.split("/").filter((p) => p);

  let route = "";

  console.log(pathNames);
  return (
    <BreadCrumbContainer>
      {<Link to="/">Personal Details</Link>}
      {pathNames.map((name, index) => {
        route += `/${name}`;
        const CurrentPage = index === pathNames.length - 1;
        return CurrentPage ? (
          <span key={route}> / {name}</span>
        ) : (
          <span key={route}>
            / <Link to={route}>{name}</Link>
          </span>
        );
      })}
      <Outlet />
    </BreadCrumbContainer>
  );
};
