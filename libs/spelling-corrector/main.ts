import HashMap from "hashmap";

import fs from "fs";

// Create a TS version
export class SpellCorrector {
  nWords: HashMap<any, any>;
  alphabet: string[];

  constructor() {
    this.nWords = new HashMap();
    this.alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  }

  bestCandidate(candidates: any[]) {
    let maxCount = 0;
    let word;
    candidates.forEach((value, key) => {
      if (key > maxCount) {
        maxCount = key;
        word = value;
      }
    });
    return word;
  }

  correct(word: string) {
    if (this.nWords.has(word)) {
      return word;
    }
    let suggestions = this.getEdits(word);
    let candidates = new HashMap();
    suggestions.forEach((curWord: string) => {
      if (this.nWords.has(curWord)) {
        candidates.set(this.nWords.get(curWord) as string, curWord);
      }
    });

    if (candidates.count() > 0) {
      return this.bestCandidate(candidates as any);
    }

    suggestions.forEach((curWord: string) => {
      let newSuggestions = this.getEdits(curWord);
      newSuggestions.forEach((newWord: string) => {
        if (this.nWords.has(newWord)) {
          candidates.set(this.nWords.get(newWord) as string, newWord);
        }
      });
    });
    return candidates.count() > 0
      ? this.bestCandidate(candidates as any)
      : word;
  }

  getEdits(word: string) {
    let result: any[] = [];
    for (let i = 0; i < word.length; i++)
      result.push(word.slice(0, i) + word.slice(i + 1));
    for (let i = 0; i < word.length - 1; i++)
      result.push(
        word.slice(0, i) +
          word.slice(i + 1, i + 2) +
          word.slice(i, i + 1) +
          word.slice(i + 2)
      );
    for (let i = 0; i < word.length; i++)
      for (let j = 0; j < this.alphabet.length; j++)
        result.push(word.slice(0, i) + this.alphabet[j] + word.slice(i + 1));
    for (let i = 0; i <= word.length; i++)
      for (let j = 0; j < this.alphabet.length; j++)
        result.push(word.slice(0, i) + this.alphabet[j] + word.slice(i));
    return result;
  }

  loadDictionary(dictPath: string) {
    dictPath = dictPath || __dirname + "/big.txt";
    let file = fs.readFileSync(dictPath).toString().toLowerCase();
    let regex = /[a-z]+/g;
    let match: RegExpExecArray | null;
    let word: string;

    while ((match = regex.exec(file))) {
      word = match[0];
      let newCount = 1;
      if (this.nWords.has(word)) {
        newCount = newCount + (this.nWords.get(word) as any);
      }
      this.nWords.set(word, newCount);
    }
  }
}
