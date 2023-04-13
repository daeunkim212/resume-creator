import React, { OptionHTMLAttributes } from "react";
import styled from "styled-components";

interface OptionProps extends OptionHTMLAttributes<HTMLOptionElement> {
  children: React.ReactNode;
}

export default function Option({ children, ...props }: OptionProps) {
  return <StyledOption {...props}>{children}</StyledOption>;
}

const StyledOption = styled.option``;
