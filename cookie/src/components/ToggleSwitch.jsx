import { useState } from "react";
import styled from "styled-components";

const Label = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
`;

const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;
`;

const ToggleContainer = styled.div`
  position: relative;
  width: 44px;
  height: 24px;
  background-color: ${(props) => (props.checked ? "#4CAF50" : "#e5e7eb")};
  border-radius: 9999px;
  transition: background-color 0.3s ease;

  &:focus {
    outline: none;
  }

  &::after {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    border: 1px solid #d1d5db;
    transition: transform 0.3s ease;
    transform: ${(props) =>
      props.checked ? "translateX(20px)" : "translateX(0)"};
  }
`;

const LabelText = styled.span`
  margin-left: 12px;
  font-size: 1rem;
  font-weight: bold;
  color: #ffffff;
`;

const ToggleSwitch = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <Label>
      <HiddenCheckbox
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
      />
      <ToggleContainer checked={isChecked} />
      <LabelText>{isChecked ? "알림 ON" : "알림 OFF"}</LabelText>
    </Label>
  );
};

export default ToggleSwitch;
