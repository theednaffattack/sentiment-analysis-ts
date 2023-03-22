import { wordDict, WordKey } from "./word-dict";

export function aposToLexForm(text: string) {
  const data = text.split(" ");
  data.forEach((word, index) => {
    Object.keys(wordDict).forEach((key) => {
      if (key === word.toLowerCase()) {
        data[index] = wordDict[key as WordKey];
      }
    });
  });

  return data.join(" ");
}
