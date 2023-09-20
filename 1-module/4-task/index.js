function checkSpam(str) {
  const spamWord1 = "1xBet".toLowerCase();
  const spamWord2 = "XXX".toLowerCase();
  str = str.toLowerCase();
  return str.includes(spamWord1) || str.includes(spamWord2);
}
