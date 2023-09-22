function camelize(str) {
  if (!str) return str;

  const startWithHyphen = str[0] === "-";
  const result = str
    .split("-")
    .filter((item) => item)
    .map((item) => item[0].toUpperCase() + item.slice(1, item.length))
    .join("");

  if (startWithHyphen) {
    return result;
  } else {
    return result[0].toLowerCase() + result.slice(1, result.length);
  }
}
