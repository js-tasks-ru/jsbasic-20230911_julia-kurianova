function checkSpam(str) {
  const spamWord1 = "1xBet".toLowerCase();
  const spamWord2 = "XXX".toLowerCase();
  str = str.toLowerCase();

  if (str.includes(spamWord1) || str.includes(spamWord2)) return true;

  return false;
}
