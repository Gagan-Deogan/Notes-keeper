import React from "react";
import pinIcon from "../../assets/pin.svg";
import fillpin from "../../assets/fill_pin.svg";
export const MarkAsPin = ({ dispatch, isPin }) => {
  return (
    <div
      className="pin-cont pos-abs exp-btn"
      onClick={() => dispatch({ type: "TOOGLE_PIN" })}>
      <img src={isPin ? fillpin : pinIcon} alt="pin-icon" />
    </div>
  );
};
