function truncate(str, maxlength) {
  const length = str.length;
  const charToEnd = String.fromCharCode(0x2026); // ellipsis

  if (length <= maxlength) return str;
  const truncWord = str.slice(0, maxlength - 1);

  return truncWord + charToEnd;
}
