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
你可以通过修改`$.fn.checkbox.defaults`来修改全局默认配置，也可以在初始化时传入指定配置`$(el).checkbox({xx: xx})`。
| 参数      | 说明                       | 类型      | 可选值 | 默认值  |
|---------- |--------------------------- |---------- |------  |-------- |
| disabled     | 是否禁用checkbox（若 Checkbox 有`disabled`属性则以其为准） | boolean | - | `false` |
| button     | 是否启用按钮模式 | boolean | - | `false` |
| border     | 非按钮模式是否显示边框 | boolean | - | `false` |
| size | 按钮/边框模式的大小设置 | string | medium / small / mini | `''` |
| checked | 默认选中值 | boolean / array | - | `false` |
| min | 同名多选框最少选中数，0表示无限制（若没设置`checked`，默认选择前几个） | number | - | `0` |
| max | 同名多选框最多选中数，0表示无限制（若设置了`checked`，只选中前几个） | number | - | `0` |
| indeterminate | 设置 indeterminate 状态，只负责样式控制 | boolean | - | `false` |
| onchange | 当绑定值变化时触发的事件 | function | - | - |

### 方法
你可以通过调用`$(el).checkbox('xxx')`来快速设置按钮状态。
| 方法      | 说明          | 举例  |
|---------- |-------------- |-------- |
| disabled | 禁用checkbox | `$(el).checkbox('disabled')` |
| show | 取消禁用状态 | `$(el).checkbox('show')` |
| set | 设置checkbox选中状态（不会触发 change 事件） | `$(el).checkbox('set', true / false / 'checked' / 'unchecked' / 'indeterminate')` |
