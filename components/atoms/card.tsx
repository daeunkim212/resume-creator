import React from "react";
import styled from "styled-components";
import theme from "../../src/theme";

interface CardProps {
  size?: "small" | "medium" | "large";
  isFullWidth?: boolean;
  isClickable?: boolean;
  children: React.ReactNode;
}

export default function Card({
  size = "medium",
  isFullWidth = true,
  isClickable = false,
  children,
}: CardProps) {
  return (
    <StyledCard size={size} isFullWidth={isFullWidth} isClickable={isClickable}>
      {children}
    </StyledCard>
  );
}

interface StyledCardProps {
  size?: "small" | "medium" | "large";
  isFullWidth?: boolean;
  isClickable?: boolean;
  flexDir?: "col" | "row";
}

const StyledCard = styled.div<StyledCardProps>`
  background-color: ${theme.color.white};
  color: ${theme.color.black};
  border: 1px solid #dddddd;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${({ isFullWidth }) => (isFullWidth ? "100%" : "auto")};
  cursor: ${({ isClickable }) => (isClickable ? "pointer" : "auto")};
  transition: box-shadow 0.2s ease-in-out;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);

  ${({ size }) => {
    switch (size) {
      case "small":
        return `
          font-size: 0.8rem;
          padding: 4px;
        `;
      case "large":
        return `
          font-size: 1.2rem;
          padding: 8px;
        `;
      default:
        return `
            font-size: 1rem;
            padding: 12px;
          `;
    }
  }};
`;
