import React, { useState } from "react";
import styled from "styled-components";
import Input from "../atoms/input";
import theme from "../../src/theme";

interface DateRangeInputProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEndDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checkboxMessage?: string;
}

export default function DateRangeInput({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  checkboxMessage,
}: DateRangeInputProps) {
  const [hideEndDate, setHideEndDate] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHideEndDate(e.target.checked);
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value > endDate)
      setErrorMessage("끝나는 날이 시작하는 날보다 빠를 수 없습니다.");
    else setErrorMessage("");
    onStartDateChange(e);
    console.log(startDate, endDate);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (hideEndDate) {
      return;
    }
    if (e.target.value < startDate)
      setErrorMessage("끝나는 날이 시작하는 날보다 빠를 수 없습니다.");
    else setErrorMessage("");
    onEndDateChange(e);
    console.log(startDate, endDate);
  };

  return (
    <div>
      <DateInputContainer>
        <Input
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          componentSize="small"
        />
        {!hideEndDate && (
          <>
            -
            <Input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              componentSize="small"
            />
          </>
        )}
        <CheckboxContainer>
          <Checkbox
            type="checkbox"
            checked={hideEndDate}
            onChange={handleCheckboxChange}
          />
          {checkboxMessage && <CheckboxLabel>{checkboxMessage}</CheckboxLabel>}
        </CheckboxContainer>
      </DateInputContainer>
      {errorMessage && <ErrorLabel>{errorMessage}</ErrorLabel>}
    </div>
  );
}

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
`;

const Checkbox = styled.input`
  margin-right: 4px;
`;

const CheckboxLabel = styled.label`
  font-size: 0.8rem;
  font-weight: 500;
  color: #999999;
`;

const ErrorLabel = styled.span`
  font-size: 0.8rem;
  color: ${theme.color.red};
`;

const DateInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
