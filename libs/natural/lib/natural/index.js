import * as brillPosTagger from "./brill_pos_tagger/index.js";
import * as classifiers from "./classifiers/index.js";
import * as distance from "./distance/index.js";
import * as inflectors from "./inflectors/index.js";
import * as ngrams from "./ngrams/index.js";
import * as normalizers from "./normalizers/index.js";
import * as phonetics from "./phonetics/index.js";
import * as analyzers from "./analyzers/index.js";
import * as sentiment from "./sentiment/index.js";
import * as spellcheck from "./spellcheck/index.js";
import * as stemmers from "./stemmers/index.js";
import * as tfidf from "./tfidf/index.js";
import * as tokenizers from "./tokenizers/index.js";
import * as transliterators from "./transliterators/index.js";
import * as trie from "./trie/index.js";
import * as util from "./util/index.js";
import * as wordnet from "./wordnet/index.js";
/*
Copyright (c) 2021, Hugo W.L. ter Doest

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
function buildExportMap(modules) {
    const result = {};
    modules.forEach(module => {
        Object.keys(module).forEach(key => {
            result[key] = module[key];
        });
    });
    return result;
}
export default buildExportMap([
    brillPosTagger,
    classifiers,
    distance,
    inflectors,
    ngrams,
    normalizers,
    phonetics,
    analyzers,
    sentiment,
    spellcheck,
    stemmers,
    tfidf,
    tokenizers,
    transliterators,
    trie,
    util,
    wordnet
]);
