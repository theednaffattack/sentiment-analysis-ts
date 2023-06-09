import Tokenizer from "../tokenizers/tokenizer_ja.js";
import { words } from "../util/stopwords_ja.js";
/*
 Copyright (c) 2012, Guillaume Marty

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
'use strict';
const stopwords = { words }.words;
/**
 * @constructor
 */
const StemmerJa = function () {
};
/**
 * Tokenize and stem a text.
 * Stop words are excluded except if the second argument is true.
 *
 * @param {string} text
 * @param {boolean} keepStops Whether to keep stop words from the output or not.
 * @return {Array.<string>}
 */
StemmerJa.prototype.tokenizeAndStem = function (text, keepStops) {
    const self = this;
    const stemmedTokens = [];
    const tokens = new Tokenizer().tokenize(text);
    // This is probably faster than an if at each iteration.
    if (keepStops) {
        tokens.forEach(function (token) {
            let resultToken = token.toLowerCase();
            resultToken = self.stem(resultToken);
            stemmedTokens.push(resultToken);
        });
    }
    else {
        tokens.forEach(function (token) {
            if (stopwords.indexOf(token) === -1) {
                let resultToken = token.toLowerCase();
                resultToken = self.stem(resultToken);
                stemmedTokens.push(resultToken);
            }
        });
    }
    return stemmedTokens;
};
/**
 * Stem a term.
 *
 * @param {string} token
 * @return {string}
 */
StemmerJa.prototype.stem = function (token) {
    token = this.stemKatakana(token);
    return token;
};
/**
 * Remove the final prolonged sound mark on katakana if length is superior to
 * a threshold.
 *
 * @param {string} token A katakana string to stem.
 * @return {string} A katakana string stemmed.
 */
StemmerJa.prototype.stemKatakana = function (token) {
    const HIRAGANA_KATAKANA_PROLONGED_SOUND_MARK = 'ー';
    const DEFAULT_MINIMUM_LENGTH = 4;
    if (token.length >= DEFAULT_MINIMUM_LENGTH &&
        token.slice(-1) === HIRAGANA_KATAKANA_PROLONGED_SOUND_MARK &&
        this.isKatakana(token)) {
        token = token.slice(0, token.length - 1);
    }
    return token;
};
/**
 * Is a string made of fullwidth katakana only?
 * This implementation is the fastest I know:
 * http://jsperf.com/string-contain-katakana-only/2
 *
 * @param {string} str A string.
 * @return {boolean} True if the string has katakana only.
 */
StemmerJa.prototype.isKatakana = function (str) {
    return !!str.match(/^[゠-ヿ]+$/);
};
export default new StemmerJa();
