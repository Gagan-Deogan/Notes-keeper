import React, { useRef, useReducer, useEffect } from "react";
import { AddTag } from "./AddTag";
import { MarkAsPin } from "./MarkAsPin";
import { ColorPtale } from "./ColorPtale";
import { LabelsList } from "./LabelsList";
import send from "../../assets/send.svg";
import deleteIcon from "../../assets/delete.svg";
import { reducer } from "./reducer";
import { colorList } from "./colorList";
export const NoteCard = ({
  setCardDetails,
  data,
  handleRemNote,
  cardFor,
  handleSubmit,
}) => {
  const textArea = useRef(null);

  const initialState = data || {
    title: "",
    note: "",
    isPin: false,
    color: "white",
    labels: [],
    id: "",
  };
  const [{ title, note, isPin, color, labels, id }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // const handleFormSubmit = () => {
  //   if (formObj.title && formObj.note) {
  //     const newObj = { ...formObj, id: `${new Date()}` };
  //     setCardDetails((prev) => {
  //       const next = [...prev, newObj];
  //       window.localStorage.setItem("notes", JSON.stringify(next));
  //       setFormObj({
  //         title: "",
  //         note: "",
  //         pin: false,
  //         color: "#ffffff",
  //         labels: [],
  //         id: "",
  //       });
  //       return next;
  //     });
  //   }
  // };
  // const autoSave = () => {
  //   if (data) {
  //     setCardDetails((prev) => {
  //       const next = prev.map((note) => {
  //         return data.id === note.id ? formObj : note;
  //       });
  //       window.localStorage.setItem("notes", JSON.stringify(next));
  //       return next;
  //     });
  //   }
  // };

  // useEffect(autoSave, [formObj, data]);

  return (
    <div
      className="dis-flx dir-col from-cont pos-rel"
      style={{ background: colorList[color] }}>
      <MarkAsPin dispatch={dispatch} isPin={isPin} />
      <input
        type="text"
        key="title"
        name="title"
        placeholder="Title"
        value={title}
        onChange={(e) =>
          dispatch({ type: "SET_TITLE", payload: e.target.value })
        }
      />
      <textarea
        type="text"
        key="Notes"
        name="Notes"
        placeholder="Take a note"
        value={note}
        onChange={(e) =>
          dispatch({ type: "SET_NOTE", payload: e.target.value })
        }
      />
      <LabelsList list={labels} dispatch={dispatch} />
      <div className="dis-flx pos-rel">
        <AddTag dispatch={dispatch} />
        {cardFor === "SUBMIT" && (
          <img
            src={send}
            className="mrg-l-8 cursor"
            onClick={() => handleSubmit({ title, note, isPin, color, labels })}
            alt="send"
          />
        )}{" "}
        {/* {cardFor === "SHOW" && (
          <img
            src={deleteIcon}
            className="mrg-l-8 cursor"
            onClick={() => handleRemNote(formObj["id"])}
            alt="send"
          />
        )} */}
      </div>
      <ColorPtale dispatch={dispatch} />
    </div>
  );
};
