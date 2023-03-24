import aggressiveTokenizerNl from "./aggressive_tokenizer_nl.js";
import aggressiveTokenizerFa from "./aggressive_tokenizer_fa.js";
import aggressiveTokenizerFr from "./aggressive_tokenizer_fr.js";
import aggressiveTokenizerDe from "./aggressive_tokenizer_de.js";
import aggressiveTokenizerRu from "./aggressive_tokenizer_ru.js";
import aggressiveTokenizerEs from "./aggressive_tokenizer_es.js";
import aggressiveTokenizerIt from "./aggressive_tokenizer_it.js";
import aggressiveTokenizerPl from "./aggressive_tokenizer_pl.js";
import aggressiveTokenizerPt from "./aggressive_tokenizer_pt.js";
import aggressiveTokenizerNo from "./aggressive_tokenizer_no.js";
import aggressiveTokenizerSv from "./aggressive_tokenizer_sv.js";
import aggressiveTokenizerVi from "./aggressive_tokenizer_vi.js";
import aggressiveTokenizerId from "./aggressive_tokenizer_id.js";
import aggressiveTokenizer, {
  AggressiveTokenizer,
} from "./aggressive_tokenizer.js";
import tokenizerCase from "./tokenizer_case.js";
import { RegexpTokenizer } from "./regexp_tokenizer.js";
import { OrthographyTokenizer } from "./regexp_tokenizer.js";
import { WordTokenizer } from "./regexp_tokenizer.js";
import { WordPunctTokenizer } from "./regexp_tokenizer.js";
import treebankWordTokenizer from "./treebank_word_tokenizer.js";
import tokenizerJa from "./tokenizer_ja.js";
import sentenceTokenizer from "./sentence_tokenizer.js";
import sentenceTokenizerParser from "./sentence_tokenizer_parser.js";

/*
Copyright (c) 2011, Chris Umbel

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
("use strict");
const RegexpTokenizer$0 = { RegexpTokenizer }.RegexpTokenizer;
const OrthographyTokenizer$0 = { OrthographyTokenizer }.OrthographyTokenizer;
const WordTokenizer$0 = { WordTokenizer }.WordTokenizer;
const WordPunctTokenizer$0 = { WordPunctTokenizer }.WordPunctTokenizer;
export { aggressiveTokenizerNl as AggressiveTokenizerNl };
export { aggressiveTokenizerFa as AggressiveTokenizerFa };
export { aggressiveTokenizerFr as AggressiveTokenizerFr };
export { aggressiveTokenizerDe as AggressiveTokenizerDe };
export { aggressiveTokenizerRu as AggressiveTokenizerRu };
export { aggressiveTokenizerEs as AggressiveTokenizerEs };
export { aggressiveTokenizerIt as AggressiveTokenizerIt };
export { aggressiveTokenizerPl as AggressiveTokenizerPl };
export { aggressiveTokenizerPt as AggressiveTokenizerPt };
export { aggressiveTokenizerNo as AggressiveTokenizerNo };
export { aggressiveTokenizerSv as AggressiveTokenizerSv };
export { aggressiveTokenizerVi as AggressiveTokenizerVi };
export { aggressiveTokenizerId as AggressiveTokenizerId };
export { AggressiveTokenizer };
export { tokenizerCase as CaseTokenizer };
export { RegexpTokenizer$0 as RegexpTokenizer };
export { OrthographyTokenizer$0 as OrthographyTokenizer };
// export { WordTokenizer$0 as WordTokenizer };
export { WordTokenizer };
export { WordPunctTokenizer$0 as WordPunctTokenizer };
export { treebankWordTokenizer as TreebankWordTokenizer };
export { tokenizerJa as TokenizerJa };
export { sentenceTokenizer as SentenceTokenizer };
export { sentenceTokenizerParser as SentenceTokenizerNew };
