import { useContext, createContext, useState, useEffect } from "react";
import { auth, provider } from "../firebase";
import { Spinner } from "components/Spinner";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLoading, setLoading] = useState(false);

  const loginUser = async (type) => {
    try {
      if (type === "anonymously") {
        const { user } = await auth.signInAnonymously();
        setUser(user);
      } else {
        const { user } = await auth.signInWithPopup(provider);
        setUser(user);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logoutUser = () => {
    auth
      .signOut()
      .then(() => {
        setUser();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return unSubscribe;
  }, [setLoading]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <AuthContext.Provider value={{ user, logoutUser, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
