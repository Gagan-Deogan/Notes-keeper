import { useAuth } from "context";
import heroImage from "assets/hero_image.png";
import googleIcon from "assets/google.svg";
export const Login = () => {
  const { loginUser } = useAuth();
  return (
    <>
      <div className="w100 dis-flx dir-col jst-ctr alg-itm">
        <img src={heroImage} alt="hero" className="mrg-t-64" />
        <h1>Start Taking Notes!</h1>
        <div className="dis-flx">
          <button
            className="btn-pry mrg-t-16  mrg-r-16"
            onClick={() => loginUser("google")}>
            <img alt="google-icon" src={googleIcon} />
            <span className="mrg-l-8">Login</span>
          </button>
          <button
            className="btn-pry mrg-t-16 mrg-l-16"
            onClick={() => loginUser("anonymously")}>
            <span className="mrg-l-8">Guest login</span>
          </button>
        </div>
      </div>
    </>
  );
};
