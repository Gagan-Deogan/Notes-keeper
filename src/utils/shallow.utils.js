export const notASameData = (oldObj, newObj) => {
  delete oldObj["__typename"];
  for (let i in oldObj) {
    if (oldObj[i] !== newObj[i]) {
      return true;
    }
  }
  return false;
};
