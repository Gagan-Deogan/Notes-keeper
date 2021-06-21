import { useState, useEffect } from "react";
import { NoteCard } from "components/NoteCard";
import { SearchBar } from "components/SearchBar";
import { Spinner } from "components/Spinner";
import { useSubscription, useMutation, gql } from "@apollo/client";
import { GET_USER_NOTES, POST_NOTE } from "./home.service";
import { getSeacrhResult, getFilterdByPin } from "utils";

export const Home = () => {
  const [searchBy, setSearchBy] = useState("");
  const [onlyPin, setOnlyPin] = useState(false);
  const userId = "asbxsh";
  const { data, loading } = useSubscription(GET_USER_NOTES(userId));
  // const [postNote] = useMutation(POST_NOTE);
  const [notes, setCardDetails] = useState(() => {
    const notes = window.localStorage.getItem("notes");
    if (!!!notes) {
      window.localStorage.setItem("notes", []);
      return [];
    } else {
      return JSON.parse(notes);
    }
  });

  const searchedNotes = getSeacrhResult(notes, searchBy);
  const filteredNotes = getFilterdByPin(searchedNotes, onlyPin);
  const handleSubmit = ({ title, note, color, isPin, labels }) => {
    console.log(title, note, color, isPin, labels);
    if (title && note && color && isPin && labels) {
      const labelText = labels.join("");
      // postNote({
      //   user_Id: "asbxsh",
      //   title,
      //   note,
      //   color,
      //   isPin,
      //   labels: labelText,
      // });
    }
  };
  return (
    <div className="dis-flx dir-col alg-itm w100 jst-ctr mrg-t-16">
      <NoteCard
        for="add-notes"
        setCardDetails={setCardDetails}
        handleSubmit={handleSubmit}
        cardFor="SUBMIT"
      />
      <SearchBar
        searchBy={searchBy}
        setSearchBy={setSearchBy}
        onlyPin={onlyPin}
        setOnlyPin={setOnlyPin}
      />
      <section className="main-layout">
        {!loading &&
          filteredNotes.map((note) => (
            <NoteCard
              data={note}
              setCardDetails={setCardDetails}
              // handleRemNote={handleRemNote}
              key={note["id"]}
            />
          ))}
        {loading && <Spinner />}
      </section>
    </div>
  );
};
