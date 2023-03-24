import _ from "underscore";
const ngrams = function (sequence, n, startSymbol, endSymbol) {
    const result = [];
    if (!_.isArray(sequence)) {
        sequence = sequence.split('');
    }
    const count = _.max([0, sequence.length - n + 1]);
    // Check for left padding
    if (typeof startSymbol !== 'undefined' && startSymbol !== null) {
        // Create an array of (n) start symbols
        const blanks = [];
        for (let i = 0; i < n; i++) {
            blanks.push(startSymbol);
        }
        // Create the left padding
        for (let p = n - 1; p > 0; p--) {
            // Create a tuple of (p) start symbols and (n - p) words
            result.push(blanks.slice(0, p).concat(sequence.slice(0, n - p)));
        }
    }
    // Build the complete ngrams
    for (let i = 0; i < count; i++) {
        result.push(sequence.slice(i, i + n));
    }
    // Check for right padding
    if (typeof endSymbol !== 'undefined' && endSymbol !== null) {
        // Create an array of (n) end symbols
        const blanks = [];
        for (let i = 0; i < n; i++) {
            blanks.push(endSymbol);
        }
        // create the right padding
        for (let p = n - 1; p > 0; p--) {
            // Create a tuple of (p) start symbols and (n - p) words
            result.push(sequence.slice(sequence.length - p, sequence.length).concat(blanks.slice(0, n - p)));
        }
    }
    return result;
};
const ngrams$0 = function (sequence, n, startSymbol, endSymbol) {
    return ngrams(sequence, n, startSymbol, endSymbol);
};
export const bigrams = function (sequence, startSymbol, endSymbol) {
    return ngrams(sequence, 2, startSymbol, endSymbol);
};
export const trigrams = function (sequence, startSymbol, endSymbol) {
    return ngrams(sequence, 3, startSymbol, endSymbol);
};
export { ngrams$0 as ngrams };
