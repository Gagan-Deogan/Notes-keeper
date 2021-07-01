import { useAuth } from "context";
import { HomeProvider } from "context/HomeProvider";
import { HomeMainFeatures } from "./HomeMainFeatures";
import { Avatar } from "components/Avatar";
import logoutIcon from "assets/logout.svg";

export const Home = () => {
  const {
    user: { photoURL },
    logoutUser,
  } = useAuth();

  return (
    <HomeProvider>
      <div className="dis-flx dir-col alg-itm w100 jst-ctr mrg-t-64">
        <Avatar image={photoURL} />
        <button className="btn-link pos-fix-r" onClick={logoutUser}>
          <img src={logoutIcon} alt="logout-button" />
        </button>
      </div>
      <HomeMainFeatures />
    </HomeProvider>
  );
};
