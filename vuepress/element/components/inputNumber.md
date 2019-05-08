## InputNumber 计数器
仅允许输入标准的数字值，可定义范围

### 基础用法
::: demo 使用`inputNumber`初始化`type="text"`的 input。

``` html
<input type="text" id="demo-input-number1" >

<script>
  $('#demo-input-number1').inputNumber();
</script>
```
:::

### 禁用状态
::: demo 通过 `disabled` 属性指定是否禁用

``` html
<input type="text" id="demo-input-number2" disabled value="1">

<script>
  $('#demo-input-number2').inputNumber();
</script>
```
:::

### 步数
允许定义递增递减的步数控制
::: demo 设置`step`属性可以控制步长。

``` html
<input type="text" id="demo-input-number3" step="2">

<script>
  $('#demo-input-number3').inputNumber();
</script>
```
:::

### 严格步数
::: demo `stepStrictly`属性接受一个Boolean。如果这个属性被设置为true，则只能输入步数的倍数。

``` html
<input type="text" id="demo-input-number4" step="2">

<script>
  $('#demo-input-number4').inputNumber({stepStrictly: true});
</script>
```
:::

### 精度
::: demo 设置 `precision` 属性可以控制数值精度，接收一个 `Number`。

``` html
<input type="text" id="demo-input-number5" step="0.1" max="10">

<script>
  $('#demo-input-number5').inputNumber({precision: 2});
</script>
```
:::

### 尺寸
额外提供了 `medium`、`small`、`mini` 三种尺寸的数字输入框
::: demo

``` html
<input type="text" id="demo-input-number6">
<input type="text" id="demo-input-number7">
<input type="text" id="demo-input-number8">
<input type="text" id="demo-input-number9">

<script>
  $('#demo-input-number6').inputNumber();
  $('#demo-input-number7').inputNumber({size: 'medium'});
  $('#demo-input-number8').inputNumber({size: 'small'});
  $('#demo-input-number9').inputNumber({size: 'mini'});
</script>
```
:::

### 按钮位置
::: demo 设置 `controlsPosition` 属性可以控制按钮位置。

``` html
<input type="text" id="demo-input-number10" min="0" max="10">

<script>
  $('#demo-input-number10').inputNumber({controlsPosition: 'right'});
</script>
```
:::

### 参数
你可以通过修改`$.fn.inputNumber.defaults`来修改全局默认配置，也可以在初始化时传入指定配置`$(el).inputNumber({xx: xx})`。
| 参数      | 说明                       | 类型      | 可选值 | 默认值  |
|---------- |--------------------------- |---------- |------  |-------- |
| value    | 绑定值         | number | - | 0 |
| min      | 设置计数器允许的最小值 | number | - | -Infinity |
| max      | 设置计数器允许的最大值 | number | - | Infinity |
| step     | 计数器步长           | number   | - | 1 |
| stepStrictly | 是否只能输入 step 的倍数 | boolean   | - | false |
| precision| 数值精度             | number   | - | - |
| size     | 计数器尺寸           | string   | medium, small, mini | - |
| controls | 是否使用控制按钮        | boolean | - | true |
| controlsPosition | 控制按钮位置 | string | right | - |

### 方法
你可以通过调用`$(el).inputNumber('xxx')`来调用组件方法。
| 方法      | 说明          | 举例  |
|---------- |-------------- |-------- |
| disable | 禁用 | `$(el).inputNumber('disable')` |
| enable | 取消禁用 | `$(el).inputNumber('enable')` |
