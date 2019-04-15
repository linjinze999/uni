## Transfer 穿梭框

### 基础用法
::: demo Transfer 的数据通过 data 属性传入。数据需要是一个对象数组，每个对象有以下属性：key 为数据的唯一性标识，label 为显示文本，disabled 表示该项数据是否禁止转移。目标列表中的数据项会同步到绑定至 v-model 的变量，值为数据项的 key 所组成的数组。当然，如果希望在初始状态时目标列表不为空，可以像本例一样为 v-model 绑定的变量赋予一个初始值。

``` html
<div id="demo-transfer1"></div>

<script>
  $('#demo-transfer1').transfer(['选项1', '选项2','选项3', '选项4', '选项5']);
</script>
```
:::

### 可搜索
在数据很多的情况下，可以对数据进行搜索和过滤。
::: demo 设置 filterable 为 true 即可开启搜索模式。默认情况下，若数据项的 label 属性包含搜索关键字，则会在搜索结果中显示。你也可以使用 filter-method 定义自己的搜索逻辑。filter-method 接收一个方法，当搜索关键字变化时，会将当前的关键字和每个数据项传给该方法。若方法返回 true，则会在搜索结果中显示对应的数据项。。

``` html
<div id="demo-transfer2"></div>

<script>
  $('#demo-transfer2').transfer({
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
