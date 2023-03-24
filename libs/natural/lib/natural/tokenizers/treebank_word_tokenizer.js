import Tokenizer from "./tokenizer.js";
import util from "util";
import _ from "underscore";
const contractions2 = [
    /(.)('ll|'re|'ve|n't|'s|'m|'d)\b/ig,
    /\b(can)(not)\b/ig,
    /\b(D)('ye)\b/ig,
    /\b(Gim)(me)\b/ig,
    /\b(Gon)(na)\b/ig,
    /\b(Got)(ta)\b/ig,
    /\b(Lem)(me)\b/ig,
    /\b(Mor)('n)\b/ig,
    /\b(T)(is)\b/ig,
    /\b(T)(was)\b/ig,
    /\b(Wan)(na)\b/ig
];
const contractions3 = [
    /\b(Whad)(dd)(ya)\b/ig,
    /\b(Wha)(t)(cha)\b/ig
];
const TreebankWordTokenizer = function () {
};
util.inherits(TreebankWordTokenizer, Tokenizer);
TreebankWordTokenizer.prototype.tokenize = function (text) {
    contractions2.forEach(function (regexp) {
        text = text.replace(regexp, '$1 $2');
    });
    contractions3.forEach(function (regexp) {
        text = text.replace(regexp, '$1 $2 $3');
    });
    // most punctuation
    text = text.replace(/([^\w.'\-/+<>,&])/g, ' $1 ');
    // commas if followed by space
    text = text.replace(/(,\s)/g, ' $1');
    // single quotes if followed by a space
    text = text.replace(/('\s)/g, ' $1');
    // periods before newline or end of string
    text = text.replace(/\. *(\n|$)/g, ' . ');
    return _.without(text.split(/\s+/), '');
};
export default TreebankWordTokenizer;
