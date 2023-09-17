function ucFirst(str) {
  if (Object.is(str, null) || Object.is(str, undefined))
    return "no string in argument";
  if (str.length < 2) return str.toUpperCase();

  return str[0].toUpperCase() + str.slice(1);
}
