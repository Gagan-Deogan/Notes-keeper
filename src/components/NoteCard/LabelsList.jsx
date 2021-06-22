import React from "react";

export const LabelsList = ({ list, dispatch }) => {
  console.log(list);
  return (
    <div className="dis-flx mrg-b-8">
      {list.map((val, ind) => (
        <div className="label-cont dis-flx" key={ind}>
          <p>{val}</p>
          <p
            className="mrg-l-8 cursor"
            onClick={() => dispatch({ type: "REMOVE_LABEL", payload: val })}>
            X
          </p>
        </div>
      ))}
    </div>
  );
};

export default LabelsList;
