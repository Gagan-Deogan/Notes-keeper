import { useContext, createContext } from "react";
import { useAuth } from "context";
import { useSubscription, useMutation } from "@apollo/client";
import {
  GET_USER_NOTES,
  POST_NOTE,
  REMOVE_NOTE,
  GET_USER_LABEL,
  POST_LABEL,
  REMOVE_LABEL,
} from "../pages/Home/home.queries";

const HomeContext = createContext();

export const HomeProvider = ({ children }) => {
  const {
    user: { uid },
  } = useAuth();
  const notesResponse = useSubscription(GET_USER_NOTES, {
    variables: { userId: uid },
  });

  const labelResponse = useSubscription(GET_USER_LABEL, {
    variables: { userId: uid },
  });
  const [postNote] = useMutation(POST_NOTE);
  const [removeNote] = useMutation(REMOVE_NOTE);
  const [postLabel] = useMutation(POST_LABEL);
  const [removeLabel] = useMutation(REMOVE_LABEL);

  const handleSubmit = async ({
    title,
    note,
    color,
    isPin,
    labels,
    dispatch,
  }) => {
    if (title && note && color) {
      const labelText = labels.join("");
      const { data } = await postNote({
        variables: {
          userId: uid,
          title,
          note,
          color,
          isPin,
          labels: labelText,
        },
      });
      if (data) {
        dispatch({ type: "CLEAR_STATE" });
      }
    }
  };
  const handleRemoveNote = (id) => {
    removeNote({
      variables: { id },
    });
  };
  const handleAddLabel = (text) => {
    postLabel({
      variables: {
        userId: uid,
        text,
      },
    });
  };
  const handleRemoveLabel = (id) => {
    removeLabel({
      variables: { id },
    });
  };
  return (
    <HomeContext.Provider
      value={{
        notesResponse,
        labelResponse,
        handleSubmit,
        handleRemoveNote,
        handleAddLabel,
        handleRemoveLabel,
      }}>
      {children}
    </HomeContext.Provider>
  );
};

export const useHome = () => {
  return useContext(HomeContext);
};
