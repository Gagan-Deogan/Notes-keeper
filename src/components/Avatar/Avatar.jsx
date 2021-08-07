import "./avatar.css";
import defaultDp from "assets/dp.png";

export const Avatar = ({ image, name }) => {
  return (
    <div className="avatar pos-fix-l">
      <img src={image ? image : defaultDp} alt={name} />
    </div>
  );
};
