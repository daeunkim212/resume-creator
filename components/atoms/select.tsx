import React, { SelectHTMLAttributes, OptionHTMLAttributes } from "react";
import styled from "styled-components";
import theme from "../../src/theme";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  containerStyle?: React.CSSProperties;
  componentSize?: "small" | "medium" | "large";
}

export default function Select({
  label,
  containerStyle,
  componentSize = "medium",
  children,
  ...props
}: SelectProps) {
  return (
    <SelectContainer style={containerStyle}>
      {label && (
        <SelectLabel componentSize={componentSize}>{label}</SelectLabel>
      )}
      <StyledSelect componentSize={componentSize} {...props}>
        {children}
      </StyledSelect>
    </SelectContainer>
  );
}

interface OptionProps extends OptionHTMLAttributes<HTMLOptionElement> {
  componentSize?: "small" | "medium" | "large";
  children: React.ReactNode;
}

function Option({ componentSize = "small", children, ...props }: OptionProps) {
  return (
    <StyledOption componentSize={componentSize} {...props}>
      {children}
    </StyledOption>
  );
}

const StyledOption = styled.option<{
  componentSize?: "small" | "medium" | "large";
}>`
  font-size: ${({ componentSize }) =>
    componentSize === "small"
      ? "0.8rem"
      : componentSize === "medium"
      ? "1rem"
      : "1.2rem"};
`;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const SelectLabel = styled.label<{
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
  width: 4rem;
`;

const StyledSelect = styled.select<{
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
  flex-grow: 1;
  appearance: none;
  transition: border-color 0.2s ease-in-out;

  &:focus {
    border-color: ${theme.color.blue};
    outline: none;
  }
`;

Select.Option = Option;
