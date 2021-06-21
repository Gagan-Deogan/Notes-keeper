export const getSeacrhResult = (notes, searchBy) => {
  if (notes && searchBy) {
    return notes.filter((note) => {
      return !!note.labels.filter((label) => label.includes(searchBy)).length;
    });
  }
  return notes;
};
export const getFilterdByPin = (notes, onlyPin) => {
  return onlyPin ? notes.filter((note) => note.isPin) : notes;
};
