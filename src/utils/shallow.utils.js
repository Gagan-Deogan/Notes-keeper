export const isShallowEqual = (oldObj, newObj) => {
  delete oldObj["__typename"];
  for (let i in oldObj) {
    if (oldObj[i] !== newObj[i]) {
      return false;
    }
  }
  return true;
};
