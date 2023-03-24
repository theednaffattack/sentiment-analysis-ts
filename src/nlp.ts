import { aposToLexForm } from "../libs/apos-to-lex-form/main";
import natural from "natural";
import { SpellCorrector } from "../libs/spelling-corrector/main";
import stopword from "stopword";

const tokenizer = new natural.WordTokenizer();
const spellCorrector = new SpellCorrector();
spellCorrector.loadDictionary();

const analyzer = new natural.SentimentAnalyzer(
  "English",
  natural.PorterStemmer,
  "afinn"
);

export function getSentiment(str: string): -1 | 0 | 1 {
  if (!str.trim()) {
    return 0;
  }
  const lexed = aposToLexForm(str)
    .toLowerCase()
    .replace(/[^a-zA-Z\s]+/g, "");

  const tokenized = tokenizer.tokenize(lexed);

  const fixedSpelling = tokenized.map((word) => {
    return spellCorrector.correct(word);
  });

  const filteredFixedSpelling = fixedSpelling.filter(isWord);

  const stopwordsRemoved = stopword.removeStopwords(filteredFixedSpelling);
  const analyzed = analyzer.getSentiment(stopwordsRemoved);

  if (analyzed >= 1) return 1;
  if (analyzed === 0) return 0;
  // default
  return -1;
}

/**Type Guard */
function isWord(word: string | undefined): word is string {
  return !!word;
}
