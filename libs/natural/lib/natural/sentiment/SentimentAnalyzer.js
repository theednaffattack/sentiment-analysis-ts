import englishAfinnVoca from "afinn-165";
import spanishAfinnVoca from "./Spanish/afinnShortSortedSpanish.json" assert { type: "json" };
import portugueseAfinnVoca from "./Portuguese/afinnShortSortedPortuguese.json" assert { type: "json" };
import afinn165Financialmarketnews from "afinn-165-financialmarketnews";
import spanishSenticonVoca from "./Spanish/senticon_es.json" assert { type: "json" };
import englishSenticonVoca from "./English/senticon_en.json" assert { type: "json" };
import galicianSenticonVoca from "./Galician/senticon_gl.json" assert { type: "json" };
import catalanSenticonVoca from "./Catalan/senticon_ca.json" assert { type: "json" };
import basqueSenticonVoca from "./Basque/senticon_eu.json" assert { type: "json" };
import dutchPatternVoca from "./Dutch/pattern-sentiment-nl.json" assert { type: "json" };
import italianPatternVoca from "./Italian/pattern-sentiment-it.json" assert { type: "json" };
import englishPatternVoca from "./English/pattern-sentiment-en.json" assert { type: "json" };
import frenchPatternVoca from "./French/pattern-sentiment-fr.json" assert { type: "json" };
import negationsEn from "./English/negations_en.json" assert { type: "json" };
import negationsEs from "./Spanish/negations_es.json" assert { type: "json" };
import negationsDu from "./Dutch/negations_du.json" assert { type: "json" };
import negationsPt from "./Portuguese/negations_pt.json" assert { type: "json" };
/*
  Copyright (c) 2019, Domingo Martín Mancera, Hugo W.L. ter Doest (based on https://github.com/dmarman/lorca)

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
// Afinn Financial Market News
// const englishAfinnFinancialMarketNewsVoca = require('afinn-165-financialmarketnews')
// Use ESM syntax
const englishAfinnFinancialMarketNewsVoca =
  afinn165Financialmarketnews.afinnFinancialMarketNews;
// Negations
const englishNegations = negationsEn.words;
const spanishNegations = negationsEs.words;
const dutchNegations = negationsDu.words;
const portugueseNegations = negationsPt.words;
// Mapping from type of vocabulary to language to vocabulary
const languageFiles = {
  afinn: {
    English: [englishAfinnVoca, englishNegations],
    Spanish: [spanishAfinnVoca, spanishNegations],
    Portuguese: [portugueseAfinnVoca, portugueseNegations],
  },
  afinnFinancialMarketNews: {
    English: [englishAfinnFinancialMarketNewsVoca, englishNegations],
  },
  senticon: {
    Spanish: [spanishSenticonVoca, spanishNegations],
    English: [englishSenticonVoca, englishNegations],
    Galician: [galicianSenticonVoca, null],
    Catalan: [catalanSenticonVoca, null],
    Basque: [basqueSenticonVoca, null],
  },
  pattern: {
    Dutch: [dutchPatternVoca, dutchNegations],
    Italian: [italianPatternVoca, null],
    English: [englishPatternVoca, englishNegations],
    French: [frenchPatternVoca, null],
  },
};
class SentimentAnalyzer {
  constructor(language, stemmer, type) {
    this.language = language;
    this.stemmer = stemmer;
    // this.vocabulary must be a copy of the languageFiles object
    // or in subsequent execution the polarity will be undefined
    // shallow copy - requires ES6
    this.vocabulary = Object.assign({}, languageFiles[type][language][0]);
    Object.setPrototypeOf(this.vocabulary, null);
    if (type === "senticon") {
      Object.keys(this.vocabulary).forEach((word) => {
        this.vocabulary[word] = this.vocabulary[word].pol;
      });
    } else {
      if (type === "pattern") {
        Object.keys(this.vocabulary).forEach((word) => {
          this.vocabulary[word] = this.vocabulary[word].polarity;
        });
        // console.log(JSON.stringify(this.vocabulary, null, 2));
      }
    }
    this.negations = [];
    if (languageFiles[type][language][1] != null) {
      this.negations = languageFiles[type][language][1];
    }
    if (stemmer) {
      const vocaStemmed = Object.create(null);
      for (const token in this.vocabulary) {
        vocaStemmed[stemmer.stem(token)] = this.vocabulary[token];
      }
      this.vocabulary = vocaStemmed;
    }
  }
  // words is an array of words (strings)
  getSentiment(words) {
    let score = 0;
    let negator = 1;
    // let nrHits = 0
    words.forEach((token) => {
      const lowerCased = token.toLowerCase();
      if (this.negations.indexOf(lowerCased) > -1) {
        negator = -1;
        // nrHits++
      } else {
        // First try without stemming
        if (this.vocabulary[lowerCased] !== undefined) {
          score += negator * this.vocabulary[lowerCased];
          // nrHits++
        } else {
          if (this.stemmer) {
            const stemmedWord = this.stemmer.stem(lowerCased);
            if (this.vocabulary[stemmedWord] !== undefined) {
              score += negator * this.vocabulary[stemmedWord];
              // nrHits++
            }
          }
        }
      }
    });
    score = score / words.length;
    // console.log("Number of hits: " + nrHits);
    return score;
  }
}
export default SentimentAnalyzer;
