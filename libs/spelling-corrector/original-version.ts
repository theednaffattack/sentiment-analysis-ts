export function spellCorrector() {
  this.nWords = new HashMap();
  this.alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
}

spellCorrector.prototype.loadDictionary = function (dictPath) {
  dictPath = dictPath || __dirname + "/big.txt";
  let file = fs.readFileSync(dictPath).toString().toLowerCase();
  let regex = /[a-z]+/g;
  let match: RegExpExecArray | null;
  let word: string;

  while ((match = regex.exec(file))) {
    word = match[0];
    let newCount = 1;
    if (this.nWords.has(word)) {
      newCount = newCount + this.nWords.get(word);
    }
    this.nWords.set(word, newCount);
  }
};

spellCorrector.prototype.getEdits = function (word) {
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
};

spellCorrector.prototype.correct = function (word) {
  if (this.nWords.has(word)) {
    return word;
  }
  let suggestions = this.getEdits(word);
  let candidates = new HashMap();
  suggestions.forEach(
    function (curWord) {
      if (this.nWords.has(curWord)) {
        candidates.set(this.nWords.get(curWord), curWord);
      }
    }.bind(this)
  );

  if (candidates.count() > 0) {
    return bestCandidate(candidates);
  }

  suggestions.forEach(
    function (curWord) {
      let newSuggestions = this.getEdits(curWord);
      newSuggestions.forEach(
        function (newWord) {
          if (this.nWords.has(newWord)) {
            candidates.set(this.nWords.get(newWord), newWord);
          }
        }.bind(this)
      );
    }.bind(this)
  );
  return candidates.count() > 0 ? bestCandidate(candidates) : word;
};

function bestCandidate(candidates) {
  let maxCount = 0;
  let word;
  candidates.forEach(function (value, key) {
    if (key > maxCount) {
      maxCount = key;
      word = value;
    }
  });
  return word;
}
