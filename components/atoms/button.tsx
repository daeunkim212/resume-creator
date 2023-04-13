import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";
import theme from "../../src/theme";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary" | "secondary" | "transparent";
  size?: "small" | "medium" | "large";
  isFullWidth?: boolean;
  children: React.ReactNode;
}

export default function Button({
  color = "primary",
  size = "medium",
  isFullWidth = false,
  children,
  ...props
}: ButtonProps) {
  return (
    <StyledButton
      color={color}
      size={size}
      isFullWidth={isFullWidth}
      {...props}
    >
      {children}
    </StyledButton>
  );
}

interface StyledButtonProps {
  color: string;
  size: string;
  isFullWidth: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${({ color }) =>
    color === "transparent"
      ? "transparent"
      : color === "primary"
      ? theme.color.blue
      : theme.color.white};
  border: ${({ color }) =>
    color === "transparent"
      ? "none"
      : color === "primary"
      ? "none"
      : "1px solid #999999"};
  color: ${({ color }) => (color === "primary" ? "#ffffff" : "#333333")};
  font-size: ${({ size }) =>
    size === "small" ? "0.8rem" : size === "medium" ? "1rem" : "1.2rem"};
  padding: ${({ size }) =>
    size === "small"
      ? "4px 8px"
      : size === "medium"
      ? "8px 16px"
      : "12px 24px"};
  width: ${({ isFullWidth }) => (isFullWidth ? "100%" : "auto")};
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${({ color }) =>
      color === "transparent"
        ? "#CCCCCC"
        : color === "primary"
        ? "#1e40af"
        : "#f5f5f5"};
  }
`;
