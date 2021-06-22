import { useReducer, useEffect } from "react";
import { reducer } from "./reducer";
import { useAuth } from "context";
import { AddLabels } from "./AddLabels";
import { MarkAsPin } from "./MarkAsPin";
import { ColorPtale } from "./ColorPtale";
import { LabelsList } from "./LabelsList";
import { colorList } from "./colorList";
import { UPDATE_NOTE } from "pages/Home/home.service";
import { useMutation } from "@apollo/client";
import { notASameData } from "utils";
import send from "assets/send.svg";
import deleteIcon from "assets/delete.svg";

export const NoteCard = ({
  data,
  cardFor,
  labelsList,
  handleSubmit,
  handleAddLabel,
  handleRemoveNote,
  handleRemoveLabel,
}) => {
  const {
    user: { uid },
  } = useAuth();

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
    const timeoutId = setTimeout(() => {
      if (cardFor === "SHOW") {
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
        if (notASameData(oldData, newData)) {
          updateNote({
            variables: newData,
          });
        }
      }
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [title, note, isPin, color, labels, cardFor]);

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
        <AddLabels
          dispatch={dispatch}
          handleAddLabel={handleAddLabel}
          labelsList={labelsList}
          handleRemoveLabel={handleRemoveLabel}
        />
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
