import React, { useRef, useState } from "react";
import addtag from "../../assets/add_tag.svg";

export const AddTag = ({ dispatch }) => {
  const menu = useRef(null);
  const [labelList, setLabelList] = useState(() => {
    let loaclListOfLabels = localStorage.getItem("labelList");
    if (!!!loaclListOfLabels) {
      window.localStorage.setItem("labelList", JSON.stringify(["javascript"]));
      return [];
    } else {
      return JSON.parse(loaclListOfLabels);
    }
  });

  const handleExpand = () => {
    menu.current.style.display = "block";
  };

  const handleDispand = () => {
    menu.current.style.display = "none";
  };

  const handleRemoval = (ind) => {
    setLabelList((prev) => {
      const next = prev.filter((val, i) => (i !== ind ? true : false));
      window.localStorage.setItem("labelList", JSON.stringify(next));
      return next;
    });
  };

  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      const input = e.target.value;
      e.target.value = "";
      setLabelList((prev) => {
        const next = [...prev, input];
        window.localStorage.setItem("labelList", JSON.stringify(next));
        return next;
      });
    }
  };

  // const addToCard = (e, val) => {
  //   if ( e.target.id !== "close" ) {
  //     setFormObj((prev) => {
  //       const nextLabels = prev["labels"].includes(val)
  //         ? [...prev["labels"]]
  //         : [...prev["labels"], val];
  //       return { ...prev, labels: nextLabels };
  //     });
  //   }
  // };

  return (
    <div onMouseOver={handleExpand} onMouseLeave={handleDispand}>
      <img src={addtag} className="cursor" alt="add-label" />
      <ul className="menu-list pos-abs" ref={menu}>
        <li className="dis-flx jst-spa-bet">
          <input
            type="text"
            placeholder="Add Label"
            className="add-lab"
            onKeyDown={handleSubmit}
          />
        </li>
        {labelList &&
          labelList.map((val, ind) => (
            <li className="dis-flx jst-spa-bet cursor" key={ind}>
              <p onClick={() => dispatch({ type: "ADD_LABEL", payload: val })}>
                {val}
              </p>
              <p onClick={() => handleRemoval(ind)} id="close">
                x
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
};
