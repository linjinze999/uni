## Slider 滑块
通过拖动滑块在一个固定区间内进行选择

### 基础用法
在拖动滑块时，显示当前值
::: demo 利用`$(el).slider()`快速初始化滑块。

``` html
<p>默认</p>
<div id="demo-slider1"></div>
<hr>
<p>自定义初始值</p>
<div id="demo-slider2"></div>
<hr>
<p>隐藏 Tooltip</p>
<div id="demo-slider3"></div>
<hr>
<p>格式化 Tooltip</p>
<div id="demo-slider4"></div>
<hr>
<p>禁用</p>
<div id="demo-slider5"></div>

<script>
  $('#demo-slider1').slider();
  $('#demo-slider2').slider({ value: 50 });
  $('#demo-slider3').slider({ value: 36, showTooltip: false });
  $('#demo-slider4').slider({ value: 48, formatTooltip: function (value) { return value + '%' } });
  $('#demo-slider5').slider({ value: 42, disabled: true });
</script>
```
:::

### 离散值
选项可以是离散的
::: demo 改变`step`的值可以改变步长，通过设置`showStops`属性可以显示间断点

``` html
<p>不显示间断点</p>
<div id="demo-slider6"></div>
<hr>
<p>显示间断点</p>
<div id="demo-slider7"></div>

<script>
  $('#demo-slider6').slider({ step: 10 });
  $('#demo-slider7').slider({ max: 10, showStops: true });
</script>
```
:::

### 带有输入框
通过输入框设置精确数值
::: demo 非范围选择滑块，设置`showInput`属性会在右侧显示一个输入框

``` html
<div id="demo-slider8"></div>

<script>
  $('#demo-slider8').slider({ showInput: true });
</script>
```
:::

### 范围选择
支持选择某一数值范围
::: demo 设置`range`即可开启范围选择，此时绑定值是一个数组，其元素分别为最小边界值和最大边界值

``` html
<div id="demo-slider9"></div>

<script>
  $('#demo-slider9').slider({ value: [4, 8], max: 10, showStops: true, range: true });
</script>
```
:::

### 竖向模式
::: demo 设置`vertical`可使 Slider 变成竖向模式

``` html
<div id="demo-slider10"></div>

<script>
  $('#demo-slider10').slider({ vertical: true, height: '200px' });
</script>
```
:::

### 展示标记
::: demo 设置 `marks` 属性可以展示标记

``` html
<div id="demo-slider11"></div>

<script>
  $('#demo-slider11').slider({ value: [30, 60], range: true, marks: {
    0: '0°C',
    8: '8°C',
    37: '37°C',
    50: {
      style: {
         color: '#1989FA'
      },
      label: '<b>50%</b>'
    }
  }});
</script>
```
:::

### 参数
你可以通过修改`$.fn.slider.defaults`来修改全局默认配置，也可以在初始化时传入指定配置`$(el).slider({xx: xx})`。
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value | 绑定值 | number / array | - | `0` |
| min | 最小值 | number | - | `0` |
| max | 最大值 | number | - | `100` |
| disabled | 是否禁用 | boolean | - | `false` |
| step | 步长 | number | - | `1` |
| showInput | 是否显示输入框，仅在非范围选择时有效 | boolean | - | `false` |
| showInputControls | 在显示输入框的情况下，是否显示输入框的控制按钮 | boolean | - | `true` |
| inputSize | 输入框的尺寸 | string | large / medium / small / mini | `'small'` |
| showStops | 是否显示间断点 | boolean | - | `false` |
| showTooltip | 是否显示 tooltip | boolean | - | `true` |
| formatTooltip | 格式化 tooltip message | function(value) | - | - |
| range | 是否为范围选择 | boolean | - | `false` |
| vertical | 是否竖向模式 | boolean | - | `false` |
| height | Slider 高度 | string | - | `200px` |
| label | 屏幕阅读器标签 | string | - | - |
| debounce | 输入时的去抖延迟，毫秒，仅在`showInput`等于true时有效 | number | - | `300` |
| tooltipClass | tooltip 的自定义类名 | string | - | - |
| marks | 标记， key 的类型必须为 number 且取值在闭区间 `[min, max]` 内，每个标记可以单独设置样式 | object | - | - |
| change | 值改变时触发（使用鼠标拖曳时，只在松开鼠标后触发），回调参数为改变后的值 | function(value) | - | - |

### 方法
你可以通过调用`$(el).slider('xxx')`来调用滑块方法。
| 方法      | 说明          | 举例  |
|---------- |-------------- |-------- |
| disable | 禁用滑块 | `$(el).slider('disable')` |
| enable | 取消禁用状态 | `$(el).slider('enable')` |
| set | 设置滑块值 | `$(el).slider('set', 50 / [20, 50])` |
| get | 获取滑块值 | `$(el).slider('get')` |
