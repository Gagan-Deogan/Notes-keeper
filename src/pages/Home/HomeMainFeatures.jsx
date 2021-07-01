import { useState } from "react";
import { useHome } from "context/HomeProvider";
import { Spinner } from "components/Spinner";
import { NoteCard } from "components/NoteCard";
import { SearchBar } from "components/SearchBar";
import { getSeacrhResult, getFilterdByPin, convertLabelsToArr } from "utils";

export const HomeMainFeatures = () => {
  const { notesResponse, labelResponse } = useHome();

  const [searchBy, setSearchBy] = useState("");
  const [onlyPin, setOnlyPin] = useState(false);
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

  return (
    <>
      <NoteCard cardFor="SUBMIT" />
      <SearchBar
        searchBy={searchBy}
        setSearchBy={setSearchBy}
        onlyPin={onlyPin}
        setOnlyPin={setOnlyPin}
      />
      <section className="main-layout">
        {filteredNotes.map((note) => (
          <NoteCard data={note} key={note.id} cardFor="SHOW" />
        ))}
      </section>
    </>
  );
};
