import util from "util";
import SingularPluralInflector from "./singular_plural_inflector.js";
import FormSet from "./form_set.js";
/*
function attach () {
  const inflector = this

  String.prototype.singularizePresentVerb = function () {
    return inflector.singularize(this)
  }

  String.prototype.pluralizePresentVerb = function () {
    return inflector.pluralize(this)
  }
}
*/
const VerbInflector = function () {
    this.ambiguous = [
        'will'
    ];
    // this.attach = attach
    this.customPluralForms = [];
    this.customSingularForms = [];
    this.singularForms = new FormSet();
    this.pluralForms = new FormSet();
    this.addIrregular('am', 'are');
    this.addIrregular('is', 'are');
    this.addIrregular('was', 'were');
    this.addIrregular('has', 'have');
    this.singularForms.regularForms.push([/ed$/i, 'ed']);
    this.singularForms.regularForms.push([/ss$/i, 'sses']);
    this.singularForms.regularForms.push([/x$/i, 'xes']);
    this.singularForms.regularForms.push([/(h|z|o)$/i, '$1es']);
    this.singularForms.regularForms.push([/$zz/i, 'zzes']);
    this.singularForms.regularForms.push([/([^a|e|i|o|u])y$/i, '$1ies']);
    this.singularForms.regularForms.push([/$/i, 's']);
    this.pluralForms.regularForms.push([/sses$/i, 'ss']);
    this.pluralForms.regularForms.push([/xes$/i, 'x']);
    this.pluralForms.regularForms.push([/([cs])hes$/i, '$1h']);
    this.pluralForms.regularForms.push([/zzes$/i, 'zz']);
    this.pluralForms.regularForms.push([/([^h|z|o|i])es$/i, '$1e']);
    this.pluralForms.regularForms.push([/ies$/i, 'y']); // flies->fly
    this.pluralForms.regularForms.push([/e?s$/i, '']);
};
util.inherits(VerbInflector, SingularPluralInflector);
export default VerbInflector;
