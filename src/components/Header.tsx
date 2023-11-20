import React from "react";
import styled from "styled-components";

type HeaderProps = {
  headerText: string;
  subtitle?: string;
};

const StyledHeader = styled.h2`
  text-decoration: underline;
  margin-bottom: 24px;
`;

const Header = (props: HeaderProps) => {
  const { headerText, subtitle } = props;
  return (
    <>
      <StyledHeader>{headerText}</StyledHeader>
      {subtitle && <p>{subtitle}</p>}
    </>
  );
};

export default Header;
