import React, { InputHTMLAttributes } from "react";
import styled from "styled-components";
import theme from "../src/theme";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  componentSize?: "small" | "medium" | "large";
  label?: string;
  containerStyle?: React.CSSProperties;
}

export default function Input({
  componentSize = "medium",
  label,
  containerStyle,
  ...props
}: InputProps) {
  return (
    <InputContainer style={containerStyle}>
      {label && <InputLabel componentSize={componentSize}>{label}</InputLabel>}
      <StyledInput componentSize={componentSize} {...props} />
    </InputContainer>
  );
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const InputLabel = styled.label<{
  componentSize?: "small" | "medium" | "large";
}>`
  font-size: ${({ componentSize }) =>
    componentSize === "small"
      ? "0.8rem"
      : componentSize === "medium"
      ? "1rem"
      : "1.2rem"};
  font-weight: 500;
  color: ${theme.color.black};
`;

const StyledInput = styled.input<{
  componentSize?: "small" | "medium" | "large";
}>`
  font-size: ${({ componentSize }) =>
    componentSize === "small"
      ? "0.8rem"
      : componentSize === "medium"
      ? "1rem"
      : "1.2rem"};
  color: ${theme.color.black};
  background-color: ${theme.color.white};
  border: 1px solid #cccccc;
  border-radius: 4px;
  padding: 8px 12px;
  transition: border-color 0.2s ease-in-out;

  &:focus {
    border-color: ${theme.color.blue};
    outline: none;
  }

  &::placeholder {
    color: #999999;
  }
`;
