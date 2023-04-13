import React from "react";
import styled from "styled-components";

interface WrapperProps {
  children: React.ReactNode;
}

export default function Wrapper({ children }: WrapperProps) {
  return <StyledWrapper>{children}</StyledWrapper>;
}

const StyledWrapper = styled.div`
  max-width: 100%;
  margin: 0 auto;

  @media screen and (min-width: 383px) {
    max-width: 360px;
  }

  @media screen and (min-width: 768px) {
    max-width: 720px;
  }

  @media screen and (min-width: 992px) {
    max-width: 960px;
  }

  @media screen and (min-width: 1200px) {
    max-width: 1140px;
  }
`;
