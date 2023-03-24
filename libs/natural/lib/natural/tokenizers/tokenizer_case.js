import Tokenizer from "./tokenizer.js";
import util from "util";
const CaseTokenizer = function () {
    Tokenizer.call(this);
};
util.inherits(CaseTokenizer, Tokenizer);
// Changing the prototype of a native type is bad practice
/*
CaseTokenizer.prototype.attach = function () {
  const self = this

  String.prototype.tokenize = function (preserveApostrophe) {
    return self.tokenize(this, preserveApostrophe)
  }
}
*/
// Idea from Seagull: http://stackoverflow.com/a/26482650
CaseTokenizer.prototype.tokenize = function (text, preserveApostrophe) {
    const whitelist = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const lower = text.toLowerCase();
    const upper = text.toUpperCase();
    let result = '';
    let i;
    for (i = 0; i < lower.length; ++i) {
        if (lower[i] !== upper[i] || whitelist.indexOf(lower[i]) > -1 || (text[i] === '\'' && preserveApostrophe)) {
            result += text[i];
        }
        else {
            result += ' ';
        }
    }
    return this.trim(result.replace(/\s+/g, ' ').split(' '));
};
export default CaseTokenizer;
