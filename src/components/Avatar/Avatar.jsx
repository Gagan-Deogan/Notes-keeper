import "./avatar.css";
export const Avatar = ({ image, name }) => {
  return (
    <div className="avatar pos-fix-l">
      <img src={image} alt={name} />
    </div>
  );
};
