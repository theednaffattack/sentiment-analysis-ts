import SingularPluralInflector from "../singular_plural_inflector.js";
import util from "util";
import FormSet from "../form_set.js";
/*
function attach () {
  const inflector = this

  String.prototype.singularizeNoun = function () {
    return inflector.singularize(this)
  }

  String.prototype.pluralizeNoun = function () {
    return inflector.pluralize(this)
  }
}
*/
/**
 * @constructor
 */
const NounInflector = function () {
    // Ambiguous a.k.a. invariant.
    this.ambiguous = [
        'ともだち', '友だち', '友達', '遊び友達', '飲み友達', '酒飲み友達', '茶飲み友達',
        '学校友達', '女友達', '男友達', '幼友達'
    ];
    this.customPluralForms = [];
    this.customSingularForms = [];
    this.singularForms = new FormSet();
    this.pluralForms = new FormSet();
    // this.attach = attach
    this.addIrregular('神', '神神');
    this.addIrregular('人', '人人');
    this.addIrregular('年', '年年');
    this.addIrregular('月', '月月');
    this.addIrregular('日', '日日');
    this.addIrregular('星', '星星');
    this.addIrregular('島', '島島');
    this.addIrregular('我', '我我');
    this.addIrregular('山', '山山');
    this.addIrregular('国', '国国');
    this.addIrregular('所', '所所');
    this.addIrregular('隅', '隅隅');
    /**
     * Notes:
     * -たち exceptions: いたち, おいたち, ついたち, かたち, かおかたち, なりかたち, いでたち, はたち, からたち, なりたち
     * -達 exceptions: 伊達, 男伊達, 栄達, 上意下達, 熟達, 上達, 下意上達, 先達, 送達, 速達, 即日速達, 書留速達, 調達, 通達, 伝達, 到達, 配達, 牛乳配達, 新聞配達, 無料配達, 四通八達, 発達, 未発達, 御用達, 宮内庁御用達, 練達, 闊達
     * -等 exceptions: 一等, 下等, 何等, 均等, 勲等, 高等, 三等, 初等, 上等, 親等, 二親等, 数等, 対等, 中等, 同等, 特等, 二等, 品等, 不等, 平等, 悪平等, 男女平等, 不平等, 優等, 劣等
     */
    // Pluralize
    this.pluralForms.regularForms.push([/^(.+)$/i, '$1たち']);
    // Singularize
    this.singularForms.regularForms.push([/^(.+)たち$/i, function (a, mask) {
            if (['い', 'おい', 'つい', 'か', 'かおか', 'なりか', 'いで', 'は', 'から',
                'なり'].indexOf(mask) >= 0) {
                return mask + 'たち';
            }
            return mask;
        }]);
    this.singularForms.regularForms.push([/^(.+)達$/i, function (a, mask) {
            if (['伊', '伊', '栄', '上意下', '熟', '上', '下意上', '先', '送', '速',
                '即日速', '書留速', '調', '通', '伝', '到', '配', '牛乳配', '新聞配', '無料配',
                '四通八', '発', '未発', '御用', '宮内庁御用', '練', '闊'].indexOf(mask) >= 0) {
                return mask + '達';
            }
            return mask;
        }]); // Singularize nouns ending by -等, but not exceptions.
    this.singularForms.regularForms.push([/^(.+)等$/i, function (a, mask) {
            if (['一', '下', '何', '均', '勲', '高', '三', '初', '親', '二親', '数', '対',
                '中', '同', '特', '二', '品', '不', '平', '悪平', '男女平', '不平', '優',
                '劣'].indexOf(mask) >= 0) {
                return mask + '等';
            }
            return mask;
        }]);
    this.singularForms.regularForms.push([/^(人間|わたくし|私|てまえ|手前|野郎|やろう|勇者|がき|ガキ|餓鬼|あくとう|悪党|猫|家来)(共|ども)$/i, '$1']);
    this.singularForms.regularForms.push([/^(神様|先生|あなた|大名|女中|奥様)(方|がた)$/i, '$1']);
    this.pluralize = function (token) {
        return this.ize(token, this.pluralForms, this.customPluralForms);
    };
    this.singularize = function (token) {
        return this.ize(token, this.singularForms, this.customSingularForms);
    };
};
util.inherits(NounInflector, SingularPluralInflector);
export default NounInflector;
