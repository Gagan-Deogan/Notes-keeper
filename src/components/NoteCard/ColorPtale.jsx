import { colorList } from "./colorList";
export const ColorPtale = ({ dispatch }) => {
  return (
    <div className="dis-flx palette-cont pos-abs jst-spa-bet">
      {Object.entries(colorList).map(([key, color]) => (
        <div
          className="circle cursor"
          style={{ background: color }}
          onClick={() => dispatch({ type: "SET_COLOR", payload: key })}
          key={key}>
          {" "}
        </div>
      ))}
    </div>
  );
};
