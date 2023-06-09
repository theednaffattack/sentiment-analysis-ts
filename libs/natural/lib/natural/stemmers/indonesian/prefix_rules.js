import Removal from "./removal.js";
import fin from "./data/kata-dasar.json" assert { type: "json" };
// Make global variable for dictionary
const dictionary = loadDictionary();
function loadDictionary() {
    return new Set(fin.filter(Boolean));
}
// Find certain word in dictionary
function find(word) {
    return dictionary.has(word);
}
function PrefixRules() {
    const PrefixRules = this;
    this.removal = undefined;
    this.currentWord = undefined;
    // Run the array of disambiguate rules on input word
    function runDisambiguator(disambiguateRules, word) {
        let result;
        for (const i in disambiguateRules) {
            result = disambiguateRules[i](word);
            if (find(result)) {
                break;
            }
        }
        if (result === undefined) {
            this.currentWord = word;
            this.removal = undefined;
            return this;
        }
        return createResultObject(result, word, 'DP');
    }
    function createResultObject(result, word, type) {
        const removedPart = word.replace(result, '');
        const removal = new Removal(word, result, removedPart, type);
        this.removal = removal;
        this.currentWord = result;
        return this;
    }
    PrefixRules.RemovePlainPrefix = function (word) {
        const result = word.replace(/^(di|ke|se)/, '');
        if (result !== word) {
            const removedPart = word.replace(result, '');
            const removal = new Removal(word, result, removedPart, 'DP');
            this.removal = removal;
        }
        else {
            this.removal = undefined;
        }
        this.currentWord = result;
        return this;
    };
    // RULE 1
    function disambiguateRule1A(word) {
        // Rule 1a : berV -> ber-V
        const matches = word.match(/^ber([aiueo].*)$/);
        if (matches) {
            return matches[1];
        }
    }
    function disambiguateRule1B(word) {
        // Rule 1b : berV -> be-rV
        const matches = word.match(/^ber([aiueo].*)$/);
        if (matches) {
            return 'r' + matches[1];
        }
    }
    PrefixRules.DisambiguatorPrefixRule1 = function (word) {
        // Push rules 1A & 1B
        const disambiguateRules = [];
        disambiguateRules.push(disambiguateRule1A);
        disambiguateRules.push(disambiguateRule1B);
        return runDisambiguator(disambiguateRules, word);
    };
    // RULE 2
    function disambiguateRule2(word) {
        // Rule 2 : berCAP -> ber-CAP where C != 'r' AND P != 'er'
        const matches = word.match(/^ber([bcdfghjklmnpqrstvwxyz])([a-z])(.*)/);
        if (matches) {
            if (matches[3].match(/^er(.*)$/)) {
                return;
            }
            return matches[1] + matches[2] + matches[3];
        }
    }
    PrefixRules.DisambiguatorPrefixRule2 = function (word) {
        // Push rule 2
        const disambiguateRules = [];
        disambiguateRules.push(disambiguateRule2);
        return runDisambiguator(disambiguateRules, word);
    };
    // RULE 3
    function disambiguateRule3(word) {
        // Rule 3 : berCAerV -> ber-CAerV where C != 'r'
        const matches = word.match(/ber([bcdfghjklmnpqrstvwxyz])([a-z])er([aiueo])(.*)/);
        if (matches) {
            if (matches[1] === 'r') {
                return;
            }
            return matches[1] + matches[2] + 'er' + matches[3] + matches[4];
        }
    }
    PrefixRules.DisambiguatorPrefixRule3 = function (word) {
        // Push rule 3
        const disambiguateRules = [];
        disambiguateRules.push(disambiguateRule3);
        return runDisambiguator(disambiguateRules, word);
    };
    // RULE 4
    function disambiguateRule4(word) {
        // Rule 4 : belajar -> ajar
        if (word === 'belajar') {
            return 'ajar';
        }
    }
    PrefixRules.DisambiguatorPrefixRule4 = function (word) {
        // Push rule 4
        const disambiguateRules = [];
        disambiguateRules.push(disambiguateRule4);
        return runDisambiguator(disambiguateRules, word);
    };
    // RULE 5
    function disambiguateRule5(word) {
        // Rule 5 : beC1erC2 -> be-C1erC2 where C1 != 'r'
        const matches = word.match(/be([bcdfghjklmnpqstvwxyz])(er[bcdfghjklmnpqrstvwxyz])(.*)$/);
        if (matches) {
            return matches[1] + matches[2] + matches[3];
        }
    }
    PrefixRules.DisambiguatorPrefixRule5 = function (word) {
        // Push rule 5
        const disambiguateRules = [];
        disambiguateRules.push(disambiguateRule5);
        return runDisambiguator(disambiguateRules, word);
    };
    // RULE 6
    function disambiguateRule6a(word) {
        // Rule 6a : terV -> ter-V
        const matches = word.match(/^ter([aiueo].*)$/);
        if (matches) {
            return matches[1];
        }
    }
    function disambiguateRule6b(word) {
        // Rule 6b : terV -> te-rV
        const matches = word.match(/^ter([aiueo].*)$/);
        if (matches) {
            return 'r' + matches[1];
        }
    }
    PrefixRules.DisambiguatorPrefixRule6 = function (word) {
        // Push rule 6
        const disambiguateRules = [];
        disambiguateRules.push(disambiguateRule6a);
        disambiguateRules.push(disambiguateRule6b);
        return runDisambiguator(disambiguateRules, word);
    };
    // RULE 7
    function disambiguateRule7(word) {
        // Rule 7 : terCerv -> ter-CerV where C != 'r'
        const matches = word.match(/^ter([bcdfghjklmnpqrstvwxyz])er([aiueo].*)$/);
        if (matches) {
            if (matches[1] === 'r') {
                return;
            }
            return matches[1] + 'er' + matches[2];
        }
    }
    PrefixRules.DisambiguatorPrefixRule7 = function (word) {
        // Push rule 7
        const disambiguateRules = [];
        disambiguateRules.push(disambiguateRule7);
        return runDisambiguator(disambiguateRules, word);
    };
    // RULE 8
    function disambiguateRule8(word) {
        // Rule 8 : terCP -> ter-CP where C != 'r' and P != 'er'
        const matches = word.match(/^ter([bcdfghjklmnpqrstvwxyz])(.*)$/);
        if (matches) {
            if (matches[1] === 'r' || matches[2].match(/^er(.*)$/)) {
                return;
            }
            return matches[1] + matches[2];
        }
    }
    PrefixRules.DisambiguatorPrefixRule8 = function (word) {
        // Push rule 8
        const disambiguateRules = [];
        disambiguateRules.push(disambiguateRule8);
        return runDisambiguator(disambiguateRules, word);
    };
    // RULE 9
    function disambiguateRule9(word) {
        // Rule 9 : te-C1erC2 -> te-C1erC2 where C1 != 'r'
        const matches = word.match(/^te([bcdfghjklmnpqrstvwxyz])er([bcdfghjklmnpqrstvwxyz])(.*)$/);
        if (matches) {
            if (matches[1] === 'r') {
                return;
            }
            return matches[1] + 'er' + matches[2] + matches[3];
        }
    }
    PrefixRules.DisambiguatorPrefixRule9 = function (word) {
        // Push rule 9
        const disambiguateRules = [];
        disambiguateRules.push(disambiguateRule9);
        return runDisambiguator(disambiguateRules, word);
    };
    // RULE 10
    function disambiguateRule10(word) {
        // Rule 10 : me{l|r|w|y}V -> me-{l|r|w|y}V
        const matches = word.match(/^me([lrwy])([aiueo])(.*)$/);
        if (matches) {
            return matches[1] + matches[2] + matches[3];
        }
    }
    PrefixRules.DisambiguatorPrefixRule10 = function (word) {
        // Push rule 10
        const disambiguateRules = [];
        disambiguateRules.push(disambiguateRule10);
        return runDisambiguator(disambiguateRules, word);
    };
    // RULE 11
    function disambiguateRule11(word) {
        // Rule 11 : mem{b|f|v} -> mem-{b|f|v}
        const matches = word.match(/^mem([bfv])(.*)$/);
        if (matches) {
            return matches[1] + matches[2];
        }
    }
    PrefixRules.DisambiguatorPrefixRule11 = function (word) {
        // Push rule 11
        const disambiguateRules = [];
        disambiguateRules.push(disambiguateRule11);
        return runDisambiguator(disambiguateRules, word);
    };
    // RULE 12
    function disambiguateRule12(word) {
        // Nazief and Adriani Rule 12 : beC1erC2 -> be-C1erC2 where C1 != 'r'
        // Modified by Jelita Asian's CS Rule 12 : mempe -> mem-pe to stem mempengaruhi
        const matches = word.match(/^mempe(.*)$/);
        if (matches) {
            return 'pe' + matches[1];
        }
    }
    PrefixRules.DisambiguatorPrefixRule12 = function (word) {
        // Push rule 12
        const disambiguateRules = [];
        disambiguateRules.push(disambiguateRule12);
        return runDisambiguator(disambiguateRules, word);
    };
    // RULE 13
    function disambiguateRule13a(word) {
        // Rule 13a : mem{rV|V} -> me-m{rV|V}
        const matches = word.match(/^mem([aiueo])(.*)$/);
        if (matches) {
            return 'm' + matches[1] + matches[2];
        }
    }
    function disambiguateRule13b(word) {
        // Rule 13b : mem{rV|V} -> me-p{rV|V}
        const matches = word.match(/^mem([aiueo])(.*)$/);
        if (matches) {
            return 'p' + matches[1] + matches[2];
        }
    }
    PrefixRules.DisambiguatorPrefixRule13 = function (word) {
        // Push rule 13
        const disambiguateRules = [];
        disambiguateRules.push(disambiguateRule13a);
        disambiguateRules.push(disambiguateRule13b);
        return runDisambiguator(disambiguateRules, word);
    };
    // RULE 14
    function disambiguateRule14(word) {
        /* Rule 14 modified by Andy Librian : men{c|d|j|s|t|z} -> men-{c|d|j|s|t|z}
            in order to stem mentaati
    
            Rule 14 modified by ECS: men{c|d|j|s|z} -> men-{c|d|j|s|z}
            in order to stem mensyaratkan, mensyukuri
    
            Original CS Rule no 14 was : men{c|d|j|z} -> men-{c|d|j|z} */
        const matches = word.match(/^men([cdjstz])(.*)$/);
        if (matches) {
            return matches[1] + matches[2];
        }
    }
    PrefixRules.DisambiguatorPrefixRule14 = function (word) {
        // Push rule 14
        const disambiguateRules = [];
        disambiguateRules.push(disambiguateRule14);
        return runDisambiguator(disambiguateRules, word);
    };
    // RULE 15
    function disambiguateRule15a(word) {
        // Rule 15a : men{V} -> me-n{V}
        const matches = word.match(/^men([aiueo])(.*)$/);
        if (matches) {
            return 'n' + matches[1] + matches[2];
        }
    }
    function disambiguateRule15b(word) {
        // Rule 15b : men{V} -> me-t{V}
        const matches = word.match(/^men([aiueo])(.*)$/);
        if (matches) {
            return 't' + matches[1] + matches[2];
        }
    }
    PrefixRules.DisambiguatorPrefixRule15 = function (word) {
        // Push rule 15
        const disambiguateRules = [];
        disambiguateRules.push(disambiguateRule15a);
        disambiguateRules.push(disambiguateRule15b);
        return runDisambiguator(disambiguateRules, word);
    };
    // RULE 16
    function disambiguateRule16(word) {
        // Original Nazief and Adriani's Rule 16 : meng{g|h|q} -> meng-{g|h|q}
        // Modified Jelita Asian's CS Rule 16 : meng{g|h|q|k} -> meng-{g|h|q|k} to stem mengkritik
        const matches = word.match(/^meng([g|h|q|k])(.*)$/);
        if (matches) {
            return matches[1] + matches[2];
        }
    }
    PrefixRules.DisambiguatorPrefixRule16 = function (word) {
        // Push rule 16
        const disambiguateRules = [];
        disambiguateRules.push(disambiguateRule16);
        return runDisambiguator(disambiguateRules, word);
    };
    // RULE 17
    function disambiguateRule17a(word) {
        // Rule 17a : mengV -> meng-V
        const matches = word.match(/^meng([aiueo])(.*)$/);
        if (matches) {
            return matches[1] + matches[2];
        }
    }
    function disambiguateRule17b(word) {
        // Rule 17b : mengV -> meng-kV
        const matches = word.match(/^meng([aiueo])(.*)$/);
        if (matches) {
            return 'k' + matches[1] + matches[2];
        }
    }
    function disambiguateRule17c(word) {
        // Rule 17c : mengV -> meng-V- where V = 'e'
        const matches = word.match(/^menge(.*)$/);
        if (matches) {
            return matches[1];
        }
    }
    function disambiguateRule17d(word) {
        // Rule 17d : mengV -> me-ngV
        const matches = word.match(/^meng([aiueo])(.*)$/);
        if (matches) {
            return 'ng' + matches[1] + matches[2];
        }
    }
    PrefixRules.DisambiguatorPrefixRule17 = function (word) {
        // Push rule 17
        const disambiguateRules = [];
        disambiguateRules.push(disambiguateRule17a);
        disambiguateRules.push(disambiguateRule17b);
        disambiguateRules.push(disambiguateRule17c);
        disambiguateRules.push(disambiguateRule17d);
        return runDisambiguator(disambiguateRules, word);
    };
    // RULE 18
    function disambiguateRule18a(word) {
        // Rule 18a : menyV -> me-nyV to stem menyala -> nyala
        const matches = word.match(/^meny([aiueo])(.*)$/);
        if (matches) {
            return 'ny' + matches[1] + matches[2];
        }
    }
    function disambiguateRule18b(word) {
        // Original Rule 18b : menyV -> meny-sV
        // Modified by CC (shifted into 18b, see also 18a)
        const matches = word.match(/^meny([aiueo])(.*)$/);
        if (matches) {
            return 's' + matches[1] + matches[2];
        }
    }
    PrefixRules.DisambiguatorPrefixRule18 = function (word) {
        // Push rule 18
        const disambiguateRules = [];
        disambiguateRules.push(disambiguateRule18a);
        disambiguateRules.push(disambiguateRule18b);
        return runDisambiguator(disambiguateRules, word);
    };
    // RULE 19
    function disambiguateRule19(word) {
        // Original Rule 19 : mempV -> mem-pV where V != 'e'
        // Modified Rule 19 by ECS : mempA -> mem-pA where A != 'e' in order to stem memproteksi
        const matches = word.match(/^memp([abcdfghijklmopqrstuvwxyz])(.*)$/);
        if (matches) {
            return 'p' + matches[1] + matches[2];
        }
    }
    PrefixRules.DisambiguatorPrefixRule19 = function (word) {
        // Push rule 19
        const disambiguateRules = [];
        disambiguateRules.push(disambiguateRule19);
        return runDisambiguator(disambiguateRules, word);
    };
    // RULE 20
    function disambiguateRule20(word) {
        // Rule 20 : pe{w|y}V -> pe-{w|y}V
        const matches = word.match(/^pe([wy])([aiueo])(.*)$/);
        if (matches) {
            return matches[1] + matches[2] + matches[3];
        }
    }
    PrefixRules.DisambiguatorPrefixRule20 = function (word) {
        // Push rule 20
        const disambiguateRules = [];
        disambiguateRules.push(disambiguateRule20);
        return runDisambiguator(disambiguateRules, word);
    };
    // RULE 21
    function disambiguateRule21a(word) {
        // Rule 21a : perV -> per-V
        const matches = word.match(/^per([aiueo])(.*)$/);
        if (matches) {
            return matches[1] + matches[2];
        }
    }
    function disambiguateRule21b(word) {
        // Rule 21b : perV -> pe-rV
        const matches = word.match(/^pe(r[aiueo])(.*)$/);
        if (matches) {
            return matches[1] + matches[2];
        }
    }
    PrefixRules.DisambiguatorPrefixRule21 = function (word) {
        // Push rule 21
        const disambiguateRules = [];
        disambiguateRules.push(disambiguateRule21a);
        disambiguateRules.push(disambiguateRule21b);
        return runDisambiguator(disambiguateRules, word);
    };
    // RULE 23
    function disambiguateRule23(word) {
        // Rule 23 : perCAP -> per-CAP where C != 'r' AND P != 'er'
        const matches = word.match(/^per([bcdfghjklmnpqrstvwxyz])([a-z])(.*)$/);
        if (matches) {
            if (matches[3].match(/^er(.*)$/)) {
                return;
            }
            return matches[1] + matches[2] + matches[3];
        }
    }
    PrefixRules.DisambiguatorPrefixRule23 = function (word) {
        // Push rule 23
        const disambiguateRules = [];
        disambiguateRules.push(disambiguateRule23);
        return runDisambiguator(disambiguateRules, word);
    };
    // RULE 24
    function disambiguateRule24(word) {
        // Rule 24 : perCAerV -> per-CAerV where C != 'r'
        const matches = word.match(/^per([bcdfghjklmnpqrstvwxyz])([a-z])er([aiueo])(.*)$/);
        if (matches) {
            if (matches[1] === 'r') {
                return;
            }
            return matches[1] + matches[2] + 'er' + matches[3] + matches[4];
        }
    }
    PrefixRules.DisambiguatorPrefixRule24 = function (word) {
        // Push rule 24
        const disambiguateRules = [];
        disambiguateRules.push(disambiguateRule24);
        return runDisambiguator(disambiguateRules, word);
    };
    // RULE 25
    function disambiguateRule25(word) {
        // Rule 25 : pem{b|f|v} -> pem-{b|f|v}
        const matches = word.match(/^pem([bfv])(.*)$/);
        if (matches) {
            return matches[1] + matches[2];
        }
    }
    PrefixRules.DisambiguatorPrefixRule25 = function (word) {
        // Push rule 25
        const disambiguateRules = [];
        disambiguateRules.push(disambiguateRule25);
        return runDisambiguator(disambiguateRules, word);
    };
    // RULE 26
    function disambiguateRule26a(word) {
        // Rule 26a : pem{rV|V} -> pe-m{rV|V}
        const matches = word.match(/^pem([aiueo])(.*)$/);
        if (matches) {
            return 'm' + matches[1] + matches[2];
        }
    }
    function disambiguateRule26b(word) {
        // Rule 26b : pem{rV|V} -> pe-p{rV|V}
        const matches = word.match(/^pem([aiueo])(.*)$/);
        if (matches) {
            return 'p' + matches[1] + matches[2];
        }
    }
    PrefixRules.DisambiguatorPrefixRule26 = function (word) {
        // Push rule 26
        const disambiguateRules = [];
        disambiguateRules.push(disambiguateRule26a);
        disambiguateRules.push(disambiguateRule26b);
        return runDisambiguator(disambiguateRules, word);
    };
    // RULE 27
    function disambiguateRule27(word) {
        // Rule 27 : pen{c|d|j|s|t|z} -> pen-{c|d|j|s|t|z}
        const matches = word.match(/^pen([cdjstz])(.*)$/);
        if (matches) {
            return matches[1] + matches[2];
        }
    }
    PrefixRules.DisambiguatorPrefixRule27 = function (word) {
        // Push rule 27
        const disambiguateRules = [];
        disambiguateRules.push(disambiguateRule27);
        return runDisambiguator(disambiguateRules, word);
    };
    // RULE 28
    function disambiguateRule28a(word) {
        // Rule 28a : pen{V} -> pe-n{V}
        const matches = word.match(/^pen([aiueo])(.*)$/);
        if (matches) {
            return 'n' + matches[1] + matches[2];
        }
    }
    function disambiguateRule28b(word) {
        // Rule 28b : pen{V} -> pe-t{V}
        const matches = word.match(/^pen([aiueo])(.*)$/);
        if (matches) {
            return 't' + matches[1] + matches[2];
        }
    }
    PrefixRules.DisambiguatorPrefixRule28 = function (word) {
        // Push rule 28
        const disambiguateRules = [];
        disambiguateRules.push(disambiguateRule28a);
        disambiguateRules.push(disambiguateRule28b);
        return runDisambiguator(disambiguateRules, word);
    };
    // RULE 29
    function disambiguateRule29(word) {
        // Rule 29 by ECS : pengC -> peng-C
        const matches = word.match(/^peng([bcdfghjklmnpqrstvwxyz])(.*)$/);
        if (matches) {
            return matches[1] + matches[2];
        }
    }
    PrefixRules.DisambiguatorPrefixRule29 = function (word) {
        // Push rule 29
        const disambiguateRules = [];
        disambiguateRules.push(disambiguateRule29);
        return runDisambiguator(disambiguateRules, word);
    };
    // RULE 30
    function disambiguateRule30a(word) {
        // Rule 30a : pengV -> peng-V
        const matches = word.match(/^peng([aiueo])(.*)$/);
        if (matches) {
            return matches[1] + matches[2];
        }
    }
    function disambiguateRule30b(word) {
        // Rule 30b : pengV -> peng-kV
        const matches = word.match(/^peng([aiueo])(.*)$/);
        if (matches) {
            return 'k' + matches[1] + matches[2];
        }
    }
    function disambiguateRule30c(word) {
        // Rule 30c : pengV -> pengV- where V = 'e'
        const matches = word.match(/^penge(.*)$/);
        if (matches) {
            return matches[1];
        }
    }
    PrefixRules.DisambiguatorPrefixRule30 = function (word) {
        // Push rule 30
        const disambiguateRules = [];
        disambiguateRules.push(disambiguateRule30a);
        disambiguateRules.push(disambiguateRule30b);
        disambiguateRules.push(disambiguateRule30c);
        return runDisambiguator(disambiguateRules, word);
    };
    // RULE 31
    function disambiguateRule31a(word) {
        // Rule 31a : penyV -> pe-nyV
        const matches = word.match(/^peny([aiueo])(.*)$/);
        if (matches) {
            return 'ny' + matches[1] + matches[2];
        }
    }
    function disambiguateRule31b(word) {
        // Original Rule 31 : penyV -> peny-sV
        const matches = word.match(/^peny([aiueo])(.*)$/);
        if (matches) {
            return 's' + matches[1] + matches[2];
        }
    }
    PrefixRules.DisambiguatorPrefixRule31 = function (word) {
        // Push rule 31
        const disambiguateRules = [];
        disambiguateRules.push(disambiguateRule31a);
        disambiguateRules.push(disambiguateRule31b);
        return runDisambiguator(disambiguateRules, word);
    };
    // RULE 32
    function disambiguateRule32(word) {
        // Rule 32 : pelV -> pe-lV except pelajar -> ajar
        if (word === 'pelajar') {
            return 'ajar';
        }
        const matches = word.match(/^pe(l[aiueo])(.*)/);
        if (matches) {
            return matches[1] + matches[2];
        }
    }
    PrefixRules.DisambiguatorPrefixRule32 = function (word) {
        // Push rule 32
        const disambiguateRules = [];
        disambiguateRules.push(disambiguateRule32);
        return runDisambiguator(disambiguateRules, word);
    };
    // RULE 34
    function disambiguateRule34(word) {
        // Rule 34 : peCP -> pe-CP where C != {r|w|y|l|m|n} and P != 'er'
        const matches = word.match(/^pe([bcdfghjklmnpqrstvwxyz])(.*)$/);
        if (matches) {
            if (matches[2].match(/^er(.*)$/)) {
                return;
            }
            return matches[1] + matches[2];
        }
    }
    PrefixRules.DisambiguatorPrefixRule34 = function (word) {
        // Push rule 34
        const disambiguateRules = [];
        disambiguateRules.push(disambiguateRule34);
        return runDisambiguator(disambiguateRules, word);
    };
    // RULE 35
    function disambiguateRule35(word) {
        // Rule 35 : terC1erC2 -> ter-C1erC2 where C1 != {r}
        const matches = word.match(/^ter([bcdfghjkpqstvxz])(er[bcdfghjklmnpqrstvwxyz])(.*)$/);
        if (matches) {
            return matches[1] + matches[2] + matches[3];
        }
    }
    PrefixRules.DisambiguatorPrefixRule35 = function (word) {
        // Push rule 35
        const disambiguateRules = [];
        disambiguateRules.push(disambiguateRule35);
        return runDisambiguator(disambiguateRules, word);
    };
    // RULE 36
    function disambiguateRule36(word) {
        // Rule 36 : peC1erC2 -> pe-C1erC2 where C1 != {r|w|y|l|m|n}
        const matches = word.match(/^pe([bcdfghjkpqstvxz])(er[bcdfghjklmnpqrstvwxyz])(.*)$/);
        if (matches) {
            return matches[1] + matches[2] + matches[3];
        }
    }
    PrefixRules.DisambiguatorPrefixRule36 = function (word) {
        // Push rule 36
        const disambiguateRules = [];
        disambiguateRules.push(disambiguateRule36);
        return runDisambiguator(disambiguateRules, word);
    };
    // RULE 37
    function disambiguateRule37a(word) {
        // Rule 37a : CerV -> CerV
        const matches = word.match(/^([bcdfghjklmnpqrstvwxyz])(er[aiueo])(.*)$/);
        if (matches) {
            return matches[1] + matches[2] + matches[3];
        }
    }
    function disambiguateRule37b(word) {
        // Rule 37b : CerV -> CV
        const matches = word.match(/^([bcdfghjklmnpqrstvwxyz])er([aiueo])(.*)$/);
        if (matches) {
            return matches[1] + matches[2] + matches[3];
        }
    }
    PrefixRules.DisambiguatorPrefixRule37 = function (word) {
        // Push rule 37
        const disambiguateRules = [];
        disambiguateRules.push(disambiguateRule37a);
        disambiguateRules.push(disambiguateRule37b);
        return runDisambiguator(disambiguateRules, word);
    };
    // RULE 38
    function disambiguateRule38a(word) {
        // Rule 38a : CelV -> CelV
        const matches = word.match(/^([bcdfghjklmnpqrstvwxyz])(el[aiueo])(.*)$/);
        if (matches) {
            return matches[1] + matches[2] + matches[3];
        }
    }
    function disambiguateRule38b(word) {
        // Rule 38b : CelV -> CV
        const matches = word.match(/^([bcdfghjklmnpqrstvwxyz])el([aiueo])(.*)$/);
        if (matches) {
            return matches[1] + matches[2] + matches[3];
        }
    }
    PrefixRules.DisambiguatorPrefixRule38 = function (word) {
        // Push rule 38
        const disambiguateRules = [];
        disambiguateRules.push(disambiguateRule38a);
        disambiguateRules.push(disambiguateRule38b);
        return runDisambiguator(disambiguateRules, word);
    };
    // RULE 39
    function disambiguateRule39a(word) {
        // Rule 39a : CemV -> CemV
        const matches = word.match(/^([bcdfghjklmnpqrstvwxyz])(em[aiueo])(.*)$/);
        if (matches) {
            return matches[1] + matches[2] + matches[3];
        }
    }
    function disambiguateRule39b(word) {
        // Rule 39b : CemV -> CV
        const matches = word.match(/^([bcdfghjklmnpqrstvwxyz])em([aiueo])(.*)$/);
        if (matches) {
            return matches[1] + matches[2] + matches[3];
        }
    }
    PrefixRules.DisambiguatorPrefixRule39 = function (word) {
        // Push rule 39
        const disambiguateRules = [];
        disambiguateRules.push(disambiguateRule39a);
        disambiguateRules.push(disambiguateRule39b);
        return runDisambiguator(disambiguateRules, word);
    };
    // RULE 40
    function disambiguateRule40a(word) {
        // Rule 40a : CinV -> CinV
        const matches = word.match(/^([bcdfghjklmnpqrstvwxyz])(in[aiueo])(.*)$/);
        if (matches) {
            return matches[1] + matches[2] + matches[3];
        }
    }
    function disambiguateRule40b(word) {
        // Rule 40b : CinV -> CV
        const matches = word.match(/^([bcdfghjklmnpqrstvwxyz])in([aiueo])(.*)$/);
        if (matches) {
            return matches[1] + matches[2] + matches[3];
        }
    }
    PrefixRules.DisambiguatorPrefixRule40 = function (word) {
        // Push rule 40
        const disambiguateRules = [];
        disambiguateRules.push(disambiguateRule40a);
        disambiguateRules.push(disambiguateRule40b);
        return runDisambiguator(disambiguateRules, word);
    };
    // RULE 41
    function disambiguateRule41(word) {
        // Rule 41 : kuA -> ku-A
        const matches = word.match(/^ku(.*)$/);
        if (matches) {
            return matches[1];
        }
    }
    PrefixRules.DisambiguatorPrefixRule41 = function (word) {
        // Push rule 41
        const disambiguateRules = [];
        disambiguateRules.push(disambiguateRule41);
        return runDisambiguator(disambiguateRules, word);
    };
    // RULE 42
    function disambiguateRule42(word) {
        // Rule 42 : kauA -> kau-A
        const matches = word.match(/^kau(.*)$/);
        if (matches) {
            return matches[1];
        }
    }
    PrefixRules.DisambiguatorPrefixRule42 = function (word) {
        // Push rule 42
        const disambiguateRules = [];
        disambiguateRules.push(disambiguateRule42);
        return runDisambiguator(disambiguateRules, word);
    };
}
// Initalize prefix rules array
const rules = [];
const pr = new PrefixRules();
// Push all rules
rules.push(pr.RemovePlainPrefix);
rules.push(pr.DisambiguatorPrefixRule1);
rules.push(pr.DisambiguatorPrefixRule2);
rules.push(pr.DisambiguatorPrefixRule3);
rules.push(pr.DisambiguatorPrefixRule4);
rules.push(pr.DisambiguatorPrefixRule5);
rules.push(pr.DisambiguatorPrefixRule6);
rules.push(pr.DisambiguatorPrefixRule7);
rules.push(pr.DisambiguatorPrefixRule8);
rules.push(pr.DisambiguatorPrefixRule9);
rules.push(pr.DisambiguatorPrefixRule10);
rules.push(pr.DisambiguatorPrefixRule11);
rules.push(pr.DisambiguatorPrefixRule12);
rules.push(pr.DisambiguatorPrefixRule13);
rules.push(pr.DisambiguatorPrefixRule14);
rules.push(pr.DisambiguatorPrefixRule15);
rules.push(pr.DisambiguatorPrefixRule16);
rules.push(pr.DisambiguatorPrefixRule17);
rules.push(pr.DisambiguatorPrefixRule18);
rules.push(pr.DisambiguatorPrefixRule19);
rules.push(pr.DisambiguatorPrefixRule20);
rules.push(pr.DisambiguatorPrefixRule21);
rules.push(pr.DisambiguatorPrefixRule23);
rules.push(pr.DisambiguatorPrefixRule24);
rules.push(pr.DisambiguatorPrefixRule25);
rules.push(pr.DisambiguatorPrefixRule26);
rules.push(pr.DisambiguatorPrefixRule27);
rules.push(pr.DisambiguatorPrefixRule28);
rules.push(pr.DisambiguatorPrefixRule29);
rules.push(pr.DisambiguatorPrefixRule30);
rules.push(pr.DisambiguatorPrefixRule31);
rules.push(pr.DisambiguatorPrefixRule32);
rules.push(pr.DisambiguatorPrefixRule34);
rules.push(pr.DisambiguatorPrefixRule35);
rules.push(pr.DisambiguatorPrefixRule36);
rules.push(pr.DisambiguatorPrefixRule37);
rules.push(pr.DisambiguatorPrefixRule38);
rules.push(pr.DisambiguatorPrefixRule39);
rules.push(pr.DisambiguatorPrefixRule40);
rules.push(pr.DisambiguatorPrefixRule41);
rules.push(pr.DisambiguatorPrefixRule42);
PrefixRules.rules = rules;
export default PrefixRules;
