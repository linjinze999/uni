## Ui18n 国际化
组件库内部提供国际化的手段。
::: tip 提示
你需要在引用脚本前导入jQuery.i18n.properties插件。
各个组件内部涉及文本的配置，默认使用本组件获取文本值。
:::

### 值
| 值      | 说明          | 类型      | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| on     | 是否开启国际化（会根据是否已导入`i18n`设置初始化值） | boolean | `!!$.i18n` |
| attrName | 存放i18n key值的属性名 | string | `'i18n'` |
| prop | 根据key获取i18n的value，可传入默认值 | function | - |
| getI18nProp | 定义根据key获取i18n值的方法 | function | - |
| getAttr | 根据是否开启国际化，返回带key的属性字符串（如`i18n="uSelectPlaceholder"`），组件会利用这个函数在html属性中嵌入i18n属性 | function | - |

### 源码
``` javascript
$.ui18n = {
  'on': !!$.i18n,
  'attrName': 'i18n',
  'getAttr': function (key) {
    return $.ui18n.on ? (' ' + $.ui18n.attrName + '="' + key + '"') : '';
  },
  'prop': function (key, defaultValue) {
    defaultValue = defaultValue || '';
    try {
      return $.ui18n.on ? $.ui18n.getI18nProp(key) : defaultValue;
    } catch (err) {
      return defaultValue;
    }
  },
  'getI18nProp': function (key) {
    return $.i18n.prop(key);
  }
}
```
