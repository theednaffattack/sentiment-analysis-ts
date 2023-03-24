import Removal from "./removal.js";
function SuffixRules() {
    const SuffixRules = this;
    this.removal = undefined;
    this.currentWord = undefined;
    function createResultObject(result, word, type) {
        if (result !== word) {
            const removedPart = word.replace(result, '');
            const removal = new Removal(word, result, removedPart, type);
            this.removal = removal;
        }
        else {
            this.removal = undefined;
        }
        this.currentWord = result;
        return this;
    }
    SuffixRules.RemoveInflectionalParticle = function (word) {
        const result = word.replace(/-*(lah|kah|tah|pun)$/, '');
        return createResultObject(result, word, 'P');
    };
    SuffixRules.RemoveInflectionalPossessivePronoun = function (word) {
        const result = word.replace(/-*(ku|mu|nya)$/, '');
        return createResultObject(result, word, 'PP');
    };
    SuffixRules.RemoveDerivationalSuffix = function (word) {
        const result = word.replace(/(is|isme|isasi|i|kan|an)$/, '');
        return createResultObject(result, word, 'DS');
    };
}
// Initalize suffix rules array
const rules = [];
const sr = new SuffixRules();
rules.push(sr.RemoveInflectionalParticle);
rules.push(sr.RemoveInflectionalPossessivePronoun);
rules.push(sr.RemoveDerivationalSuffix);
SuffixRules.rules = rules;
export default SuffixRules;
