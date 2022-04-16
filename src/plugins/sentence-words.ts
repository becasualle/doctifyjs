export const getWords = (string: string) => {
  return string.split(" ");
};

export const createSentence = (words: string[]) => {
  return words.join(", ");
};
