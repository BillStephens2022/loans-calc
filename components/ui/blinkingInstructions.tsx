import React from "react";
import { ImArrowDown } from "react-icons/im";
import classes from "./blinkingInstructions.module.css";

interface BlinkingInstructionsProps {
  page: string;
}

// blinking instructional message to the user to click on a row in the table

const BlinkingInstructions: React.FC<BlinkingInstructionsProps> = ({
  page,
}) => {
  return (
    <h2 className={classes.instructionHeader}>
      <ImArrowDown />
      &nbsp;&nbsp;Click a loan below to view {page} details&nbsp;&nbsp;
      <ImArrowDown />
    </h2>
  );
};

export default BlinkingInstructions;
