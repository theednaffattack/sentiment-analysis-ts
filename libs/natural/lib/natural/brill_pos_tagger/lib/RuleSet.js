import TFParser from "./TF_Parser.js";
import dutchRuleSet from "../data/Dutch/brill_CONTEXTRULES.json" assert { type: "json" };
import englishRuleSet from "../data/English/tr_from_posjs.json" assert { type: "json" };
/*
   Set of transformation rules
   Copyright (C) 2019 Hugo W.L. ter Doest

   This program is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, either version 3 of the License, or
   (at your option) any later version.

   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU General Public License for more details.

   You should have received a copy of the GNU General Public License
   along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
'use strict ';
const DEBUG = false;
// Constructor takes a language abbreviation and loads the right rule set
function RuleSet(language) {
    let data = englishRuleSet;
    DEBUG && console.log(data);
    switch (language) {
        case 'EN':
            data = englishRuleSet;
            break;
        case 'DU':
            data = dutchRuleSet;
            break;
    }
    if (data.rules) {
        this.rules = {};
        const that = this;
        data.rules.forEach(function (ruleString) {
            that.addRule(TFParser.parse(ruleString));
        });
    }
    DEBUG && console.log(this.rules);
    DEBUG && console.log('Brill_POS_Tagger.read_transformation_rules: number of transformation rules read: ' + Object.keys(this.rules).length);
}
RuleSet.prototype.addRule = function (rule) {
    // this.rules.push(rule);
    if (!this.rules[rule.key()]) {
        this.rules[rule.key()] = rule;
        return true;
    }
    else {
        return false;
    }
};
RuleSet.prototype.removeRule = function (rule) {
    if (this.rules[rule.key()]) {
        delete this.rules[rule.key()];
    }
};
RuleSet.prototype.getRules = function () {
    const that = this;
    return Object.keys(this.rules).map(function (key) {
        return that.rules[key];
    });
};
RuleSet.prototype.nrRules = function () {
    return Object.keys(this.rules).length;
};
RuleSet.prototype.hasRule = function (rule) {
    if (this.rules[rule.key()]) {
        return true;
    }
    else {
        return false;
    }
};
RuleSet.prototype.prettyPrint = function () {
    let result = '';
    const that = this;
    Object.keys(this.rules).forEach(function (key) {
        const rule = that.rules[key];
        result += rule.prettyPrint() + '\n';
    });
    return result;
};
export default RuleSet;
