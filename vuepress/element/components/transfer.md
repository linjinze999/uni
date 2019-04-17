## Transfer 穿梭框

### 基础用法
::: demo Transfer 的数据通过 `data` 属性传入。数据需要是一个对象数组，每个对象有以下属性：`value` 为数据的唯一性标识，`label` 为显示文本，`disabled` 表示该项数据是否禁止使用。

``` html
<div id="demo-transfer1"></div>

<script>
  $('#demo-transfer1').transfer(['选项1', '选项2','选项3', '选项4', '选项5']);
</script>
```
:::

### 可搜索
在数据很多的情况下，可以对数据进行搜索和过滤。
::: demo 设置 `filterable` 为 `true` 即可开启搜索模式。默认情况下，若数据项的 `label` 属性包含搜索关键字，则会在搜索结果中显示。你也可以使用 `filterMethod` 定义自己的搜索逻辑。`filterMethod` 是一个方法，当搜索关键字变化时，会将当前的关键字和每个数据项传给该方法。若方法返回 `true`，则会在搜索结果中显示对应的数据项。

``` html
<div id="demo-transfer2"></div>

<script>
  $('#demo-transfer2').transfer({
    value: ['上海', '北京'],
    filterable: true,
    filterPlaceholder: '请输入城市拼音',
    filterMethod: function(query, item){
      return item.pinyin.indexOf(query) > -1;
    },
    data: [
      {value: '上海', pinyin: 'shanghai'},
      {value: '北京', pinyin: 'beijing'},
      {value: '广州', pinyin: 'guangzhou'},
      {value: '深圳', pinyin: 'shenzhen'},
      {value: '南京', pinyin: 'nanjing'},
      {value: '西安', pinyin: 'xian'},
      {value: '成都', pinyin: 'chengdu'}
    ]
  });
</script>
```
:::

### 可自定义
可以对列表标题文案、按钮文案、数据项的渲染函数、列表顶部的勾选状态文案、列表底部的内容区等进行自定义。
::: demo 可以使用 `titles`、`buttonTexts`、`renderContent` 和 `format` 属性分别对列表标题文案、按钮文案、数据项的渲染函数和列表顶部的勾选状态文案进行自定义。对于列表底部的内容区，提供了两个参数：`leftFooter `和 `rightFooter`。此外，如果希望某些数据项在初始化时就被勾选，可以使用 `defaultChecked` 属性。最后，本例还展示了 change 事件的用法。

``` html
<div id="demo-transfer3"></div>

<script>
  $('#demo-transfer3').transfer({
    value: ['shanghai', 'beijing'],
    defaultChecked: ['shanghai', 'shenzhen'],
    filterable: true,
    titles: ['Source', 'Target'],
    buttonTexts: ['到左边', '到右边'],
    renderContent: function(item){
      return '<span>' + item.label + '-' + item.value + '</span>';
    },
    format: {noChecked: '已选择${checked}/${total}', hasChecked: '已选择${checked}/${total}'},
    data: [
      {label: '上海', value: 'shanghai'},
      {label: '北京', value: 'beijing'},
      {label: '广州', value: 'guangzhou', disabled: true},
      {label: '深圳', value: 'shenzhen'},
      {label: '南京', value: 'nanjing'},
      {label: '西安', value: 'xian'},
      {label: '成都', value: 'chengdu'}
    ],
    change: function(value, type){
      console.log('change=>', value, type);
    },
    leftCheckChange: function(item, checked, checks){
      console.log('leftCheckChange=>', item, checked, checks);
    },
    rightCheckChange: function(item, checked, checks){
      console.log('rightCheckChange=>', item, checked, checks);
    },
    leftFooter: '<button type="button" class="el-button el-button--small" style="margin-left: 5px">操作</button>',
    rightFooter: '<button type="button" class="el-button el-button--small" style="margin-left: 5px">操作</button>'
  });
</script>
```
:::

### 数据项属性别名
默认情况下，Transfer 仅能识别数据项中的 `value`、`label` 和 `disabled` 字段。如果你的数据的字段名不同，可以使用 `props` 属性为它们设置别名。
::: demo 本例中的数据源没有 `value` 和 `label` 字段，在功能上与它们相同的字段名为 `id` 和 `desc`。因此可以使用`props` 属性为 `value` 和 `label` 设置别名。

``` html
<div id="demo-transfer4"></div>

<script>
  $('#demo-transfer4').transfer({
    value: ['3'],
    data: [
      {desc: '选项1', id: '1'},
      {desc: '选项2', id: '2'},
      {desc: '选项3', id: '3', disabled: true},
      {desc: '选项4', id: '4'},
      {desc: '选项5', id: '5'},
      {desc: '选项6', id: '6'},
      {desc: '选项7', id: '7'}
    ],
    props: {
      value: 'id',
      label: 'desc'
    }
  });
</script>
```
:::

### 参数
你可以通过修改`$.fn.transfer.defaults`来修改全局默认配置，也可以在初始化时传入指定配置`$(el).transfer({xx: xx})`。
参数默认为 Json ，若为数组，则会被当做`data`赋值。
| 参数    | 说明             | 类型    | 可选值     | 默认值 |
|-------- |----------------- |------ |-----------  |---- |
| value | 初始值 | array | - | - |
| data | Transfer 的数据源，见下方【data参数】 | array[string / { value, label, disabled }] | - | `[]` |
| filterable | 是否可搜索 | boolean | - | false |
| filterPlaceholder | 搜索框占位符 | string/function | - | `'请输入搜索内容'` |
| filterMethod | 自定义搜索方法 | function(dataItem) | - | - |
| targetOrder | 列表元素的排序策略：若为 `original`，则保持与数据源相同的顺序；若为 `push`，则新加入的元素排在最后；若为 `unshift`，则新加入的元素排在最前 | string | original / push / unshift | `'original'` |
| titles | 自定义列表标题 | array[string/function] | - | `['列表 1', '列表 2']` |
| buttonTexts | 自定义按钮文案 | array[string/function] | - | `['', '']` |
| noData | 自定义“无数据”文案 | string/function | - | `'无数据'` |
| noFilter | 自定义“无匹配数据”文案 | string/function | - | `'无匹配数据'` |
| renderContent | 自定义数据项渲染函数 | function(dataItem) | - | - |
| format | 列表顶部勾选状态文案 | object{noChecked, hasChecked} | - | `{ noChecked: '${checked}/${total}', hasChecked: '${checked}/${total}' }` |
| props | 数据源的字段别名 | object{value, label, disabled} | - | - |
| defaultChecked | 初始状态下已勾选项的 value 数组 | array | - | `[]` |
| leftFooter | 左侧列表底部的内容 | string | - | - |
| rightFooter | 右侧列表底部的内容 | string | - | - |
| change | 右侧列表元素变化时触发 | function(value（新值）, type（触发方式：'left' / 'right' / 'set'）) | - | - |
| leftCheckChange | 左侧列表元素被用户选中 / 取消选中时触发 | function(dataItem（改变的item）, checked（当前选中状态）, checks（左侧所有已选中值）) | - | - |
| rightCheckChange | 右侧列表元素被用户选中 / 取消选中时触发 | function(dataItem（改变的item）, checked（当前选中状态）, checks（右侧所有已选中值）) | - | - |
| i18n | 国际化文本 key 值，参数见下方【i18n国际化】 | object | - | - |

### data参数
参数默认为 Json ，若为字符串，则会被当做`value`赋值。
| 参数     | 说明    | 类型      | 可选值       | 默认值   |
|--------- |-------- |--------- |-----------  |-------- |
| value | 值 | string | - | - |
| label | 显示文本 | string | - | - |
| disabled | 禁止使用 | boolean | - | `false` |

### 方法
你可以通过调用`$(el).transfer('xxx', option)`来调用 Transfer 方法。
| 方法        | 说明          |  参数 |  举例  |
|------------ |------------- |------ | ------|
| clearQuery | 清空某个面板的搜索关键词 | 'left' / 'right'，指定需要清空的面板 | `$(el).transfer('clearQuery', 'left')` |
| set | 设置 Transfer 值 | 选中值 value 数组 | `$(el).transfer('set', [1, 2])` |
| get | 获取 Transfer 值 | - | `$(el).transfer('get')` |

### i18n国际化
| 参数      | 说明    | 默认值   |
|--------- |-------- |-------- |
| filterPlaceholder | 搜索框提示符 | `'uTransferFilterPlaceholder'` |
| title1 | 左侧标题 | `'uTransferTitle1'` |
| title2 | 右侧标题 | `'uTransferTitle2'` |
| button1 | 到左边按钮文本 | `'uTransferButton1'` |
| button2 | 到右边按钮文本 | `'uTransferButton2'` |
| noData | 无数据 | `'uTransferNoData'` |
| noFilter | 无匹配数据 | `'uTransferNoFilter'` |
