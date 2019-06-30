export const asArray = (objectOrArray: any | any[]): any[] => {
  return !Array.isArray(objectOrArray)
    ? [objectOrArray]
    : objectOrArray;
};
