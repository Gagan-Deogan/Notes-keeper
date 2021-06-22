export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "SET_NOTE":
      if (action.payload.length < 150) {
        return { ...state, note: action.payload };
      }
      return state;
    case "SET_COLOR":
      return { ...state, color: action.payload };
    case "TOOGLE_PIN":
      return { ...state, isPin: !state.isPin };
    case "ADD_LABEL":
      const labelAddTo = action.payload;
      const isAlready = state.labels.find((label) => label === labelAddTo);
      if (!isAlready) {
        return { ...state, labels: [].concat([labelAddTo], state.labels) };
      }
      return state;
    case "REMOVE_LABEL":
      const labelRemoveTO = action.payload;
      const newLables = state.labels.filter((label) => label !== labelRemoveTO);
      console.log(newLables);
      return { ...state, labels: newLables };
    case "CLEAR_STATE": {
      return {
        title: "",
        note: "",
        isPin: false,
        color: "white",
        labels: [],
      };
    }
    default:
      return state;
  }
};
