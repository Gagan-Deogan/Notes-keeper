import { useHome } from "context/HomeProvider";
import React, { useRef, useState } from "react";
import addtag from "../../assets/add_tag.svg";

export const AddLabels = ({ dispatch }) => {
  const menu = useRef(null);
  const { labelResponse, handleAddLabel, handleRemoveLabel } = useHome;
  const [label, setLabel] = useState("");

  const labelsList = labelResponse.data;

  const handleExpand = () => {
    menu.current.style.display = "block";
  };

  const handleDispand = () => {
    menu.current.style.display = "none";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLabel = e.target.elements.label.value;
    if (newLabel) {
      handleAddLabel(newLabel);
      setLabel("");
    }
  };

  return (
    <div onMouseOver={handleExpand} onMouseLeave={handleDispand}>
      <button className="btn-link">
        <img src={addtag} alt="add-label" />
      </button>
      <div className="menu-list pos-abs" ref={menu}>
        <form className="dis-flx jst-spa-bet mrg-b-8" onSubmit={handleSubmit}>
          <input
            type="text"
            name="label"
            placeholder="Add Label"
            className="add-lab"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            // onKeyDown={handleSubmit}
          />
          <button className="btn-link">Add</button>
        </form>
        <ul>
          {labelsList &&
            labelsList.map(({ text, id }) => (
              <li className="dis-flx jst-spa-bet  mrg-b-8 cursor " key={id}>
                <p
                  onClick={() =>
                    dispatch({ type: "ADD_LABEL", payload: text })
                  }>
                  {text}
                </p>
                <p onClick={() => handleRemoveLabel(id)} id="close">
                  X
                </p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
