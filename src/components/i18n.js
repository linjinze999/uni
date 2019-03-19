const tpI18n = {
  'on': !!$.i18n,
  'attrName': 'i18n',
  'getAttr': function (value) {
    return $.tpI18n.on ? (' ' + $.tpI18n.attrName + '="' + value + '"') : '';
  },
  'getString': function (key, defaultValue) {
    defaultValue = defaultValue || '';
    try {
      return $.tpI18n.on ? $.tpI18n.getI18nProp(key) : defaultValue;
    } catch (err) {
      return defaultValue;
    }
  },
  'getI18nProp': function (key) {
    return $.i18n.prop(key);
  }
};
