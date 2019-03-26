## Switch 开关
表示两种相互对立的状态间的切换，多用于触发「开/关」。

### 基础用法
你可以使用原生的checkbox，也可以按照以下方法快速设置 checkbox 样式。
::: demo 通过`$(el).checkbox()`快速设置`checkbox`样式，`label`属性表示文本值。

``` html
<div id="demo-switch1"></div>

<script>
  $('#demo-switch1').switch();
</script>
```
:::

### 禁用状态
单选框不可用的状态，可初始化时指定，也可动态设置。
::: demo 通过`$(el).checkbox({disabled: true})`在初始化时快速设置`checkbox`禁用样式，或`$(el).checkbox('disabled'})`、`$(el).checkbox('show'})`动态设置禁用状态。

``` html
<div id="demo-switch2"></div>

<script>
  $('#demo-switch2').switch();
</script>
```
:::

### 参数
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
