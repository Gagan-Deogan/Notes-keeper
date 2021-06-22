import { useState, useEffect } from "react";
import { useAuth } from "context";
import { NoteCard } from "components/NoteCard";
import { SearchBar } from "components/SearchBar";
import { Spinner } from "components/Spinner";
import { useSubscription, useMutation, gql } from "@apollo/client";
import {
  GET_USER_NOTES,
  POST_NOTE,
  REMOVE_NOTE,
  GET_USER_LABEL,
  POST_LABEL,
  REMOVE_LABEL,
} from "./home.service";
import { getSeacrhResult, getFilterdByPin } from "utils";
import { Avatar } from "components/Avatar";
import logoutIcon from "assets/logout.svg";
const convertLabelsToArr = (notes) => {
  return notes.map((note) => {
    return {
      ...note,
      labels: note.labels === "" ? [] : note.labels.split(","),
    };
  });
};

export const Home = () => {
  const [searchBy, setSearchBy] = useState("");
  const [onlyPin, setOnlyPin] = useState(false);
  const {
    user: { uid, photoURL },
    logoutUser,
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
  if (notesResponse.loading || labelResponse.loading) {
    return <Spinner />;
  }
  if (!notesResponse.data || !labelResponse.data) {
    return <h1>Error</h1>;
  }

  const {
    data: { Notes },
  } = notesResponse;
  const {
    data: { Labels },
  } = labelResponse;
  const notes = convertLabelsToArr(Notes);
  const searchedNotes = getSeacrhResult(notes, searchBy);
  const filteredNotes = getFilterdByPin(searchedNotes, onlyPin);
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
    <div className="dis-flx dir-col alg-itm w100 jst-ctr mrg-t-64">
      <Avatar image={photoURL} />
      <button className="btn-link pos-fix-r" onClick={logoutUser}>
        <img src={logoutIcon} alt="logout-button" />
      </button>
      <NoteCard
        handleSubmit={handleSubmit}
        handleAddLabel={handleAddLabel}
        handleRemoveLabel={handleRemoveLabel}
        cardFor="SUBMIT"
        labelsList={Labels}
      />
      <SearchBar
        searchBy={searchBy}
        setSearchBy={setSearchBy}
        onlyPin={onlyPin}
        setOnlyPin={setOnlyPin}
      />
      <section className="main-layout">
        {filteredNotes.map((note) => (
          <NoteCard
            data={note}
            key={note.id}
            cardFor="SHOW"
            handleRemoveNote={handleRemoveNote}
            handleAddLabel={handleAddLabel}
            labelsList={Labels}
          />
        ))}
      </section>
    </div>
  );
};
