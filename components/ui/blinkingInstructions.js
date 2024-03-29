import classes from "./blinkingInstructions.module.css";
import { ImArrowDown } from "react-icons/im";

const BlinkingInstructions = ({ page }) => {
  return (
    <h2 className={classes.instructionHeader}>
      <ImArrowDown />
      &nbsp;&nbsp;Click a loan below to view {page} details&nbsp;&nbsp;
      <ImArrowDown />
    </h2>
  );
};

export default BlinkingInstructions;
