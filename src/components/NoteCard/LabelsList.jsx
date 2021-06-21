import React from "react";

export const LabelsList = ({ list, dispatch }) => {
  return (
    <div className="dis-flx mrg-b-8">
      {list.map((val, ind) => (
        <div className="label-cont dis-flx" key={ind}>
          <p>{val}</p>
          <p
            className="mrg-l-8 cursor"
            onClick={() => dispatch({ type: "REMOVE_LABEL", payload: val })}>
            x
          </p>
        </div>
      ))}
    </div>
  );
};

export default LabelsList;
