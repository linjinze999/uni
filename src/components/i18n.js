export default {
  init: function($, componentName, optionsName){
    var $extend = {};
    $extend[optionsName] = {
      'on': !!$.i18n,
      'attrName': 'i18n',
      'getAttr': function (value) {
        return $[optionsName].on ? (' ' + $[optionsName].attrName + '="' + value + '"') : '';
      },
      'getString': function (key, defaultValue) {
        defaultValue = defaultValue || '';
        try {
          return $[optionsName].on ? $[optionsName].getI18nProp(key) : defaultValue;
        } catch (err) {
          return defaultValue;
        }
      },
      'getI18nProp': function (key) {
        return $.i18n.prop(key);
      }
    };
    $.extend($extend);
  },
  componentName: '',
  optionsName: 'ui18n'
}
