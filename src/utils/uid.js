const letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
const number = Math.floor(Math.random() * 10000 + 1);
const letRand = Math.floor(Math.random() * 10 + 1);
const secLetRand = Math.floor(Math.random() * 10 + 1);
const uid = () => {
  const reversed = letters.reverse();
  let id;

  const idLetters = `${letters[letRand]}${reversed[secLetRand]}`;
  id = `${idLetters}${number}`;
  return id;
};
export default uid;
