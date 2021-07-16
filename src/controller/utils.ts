function capitalize(str: string): string {
  str = str.trim();
  return (
    str.substr(0, 1).toLocaleUpperCase("tr") +
    str.substr(1, str.length - 1).toLocaleLowerCase("tr")
  );
}

function getDate(str: string): string {
  return str.split("T")[0];
}

function dateConvert(str: string): string {
  return str.split("T")[1].substr(0, 5);
}

/**
 * Get elements that exist in the second array but not
 *  in the first array.
 * @param oldArray
 * @param newArray
 */
function getNewArrayMembers<T>(oldArray: T[], newArray: T[]): T[] {
  return newArray.filter(
    (element) =>
      oldArray.findIndex((oldArrayElement) => oldArrayElement === element) ===
      -1
  ); // Get the elements that do not appear in the old array.
}

export { capitalize, dateConvert, getDate, getNewArrayMembers };
