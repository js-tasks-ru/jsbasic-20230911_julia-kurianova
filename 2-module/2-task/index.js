function isEmpty(obj) {
  for (let key in obj) {
    if (key in obj) return false
  }
  return true
}
