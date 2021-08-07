import { useReducer, useEffect, useRef } from "react";
import { useAuth, useHome } from "context";
import { reducer } from "./reducer";
import { AddLabels } from "./AddLabels";
import { MarkAsPin } from "./MarkAsPin";
import { ColorPtale } from "./ColorPtale";
import { LabelsList } from "./LabelsList";
import { colorList } from "./colorList";
import { UPDATE_NOTE } from "quiries/home.queries";
import { useMutation } from "@apollo/client";
import { isShallowEqual } from "utils";
import send from "assets/send.svg";
import deleteIcon from "assets/delete.svg";

export const NoteCard = ({ data, cardFor }) => {
  const {
    user: { uid },
  } = useAuth();

  const { handleSubmit, handleRemoveNote } = useHome();
  const timerId = useRef();
  const [updateNote] = useMutation(UPDATE_NOTE);
  const initialState = data || {
    title: "",
    note: "",
    isPin: false,
    color: "white",
    labels: [],
  };
  const [{ title, note, isPin, color, labels, id }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    if (cardFor === "SHOW") {
      timerId.current = setTimeout(() => {
        const newData = {
          id,
          userId: uid,
          title,
          note,
          isPin,
          color,
          labels: labels.join(","),
        };
        const oldData = { ...data, labels: data.labels.join(",") };
        if (!isShallowEqual(oldData, newData)) {
          updateNote({
            variables: newData,
          });
        }
      }, 300);
    }
    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
    };
  }, [title, note, isPin, color, labels, cardFor, data, id, uid, updateNote]);

  return (
    <div
      className="dis-flx dir-col jst-spa-bet from-cont pos-rel "
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
      {!!labels.length && <LabelsList list={labels} dispatch={dispatch} />}
      <div className="dis-flx pos-rel">
        <AddLabels dispatch={dispatch} />
        {cardFor === "SUBMIT" && (
          <button
            className="btn-link mrg-l-8"
            onClick={() =>
              handleSubmit({ title, note, isPin, color, labels, dispatch })
            }>
            <img src={send} alt="send" />
          </button>
        )}{" "}
        {cardFor === "SHOW" && (
          <button
            className="btn-link mrg-l-8"
            onClick={() => handleRemoveNote(id)}>
            <img src={deleteIcon} alt="Delete" />
          </button>
        )}
      </div>
      <ColorPtale dispatch={dispatch} />
    </div>
  );
};
