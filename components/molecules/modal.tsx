import React, { FC, ReactNode } from "react";
import styled from "styled-components";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  return (
    <StyledModalWrapper isOpen={isOpen} onClick={onClose}>
      <StyledModalContent onClick={(e) => e.stopPropagation()}>
        {children}
      </StyledModalContent>
    </StyledModalWrapper>
  );
}

interface StyledModalWrapperProps {
  isOpen: boolean;
}

const StyledModalWrapper = styled.div<StyledModalWrapperProps>`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

const StyledModalContent = styled.div`
  position: relative;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 4px;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;

  @media (min-width: 768px) {
    max-width: 600px;
    max-height: 80%;
  }
`;
