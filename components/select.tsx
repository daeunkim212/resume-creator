import React, { ChangeEvent, SelectHTMLAttributes } from "react";
import styled from "styled-components";
import theme from "../src/theme";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  containerStyle?: React.CSSProperties;
}

export default function Select({
  label,
  containerStyle,
  children,
  ...props
}: SelectProps) {
  return (
    <SelectContainer style={containerStyle}>
      {label && <SelectLabel>{label}</SelectLabel>}
      <StyledSelect {...props}>{children}</StyledSelect>
    </SelectContainer>
  );
}

const SelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const SelectLabel = styled.label`
  font-size: 1rem;
  font-weight: 500;
  color: ${theme.color.black};
`;

const StyledSelect = styled.select`
  font-size: 1rem;
  color: ${theme.color.black};
  background-color: ${theme.color.white};
  border: 1px solid #cccccc;
  border-radius: 4px;
  padding: 8px 12px;
  flex-grow: 1;
  appearance: none;
  transition: border-color 0.2s ease-in-out;

  &:focus {
    border-color: ${theme.color.blue};
    outline: none;
  }
`;
