## Tooltip 文字提示
常用于展示鼠标 hover 时的提示信息。

### 基础用法
在这里我们提供 9 种不同方向的展示方式，可以通过以下完整示例来理解，选择你要的效果。
::: demo 调用`$(el).tooltip()`方法初始化文字提示。

```html
<div style="width: 400px;">
  <div style="text-align: center;">
    <button id="demo-tooltip1" class="el-button">上左</button>
    <button id="demo-tooltip2" class="el-button">上边</button>
    <button id="demo-tooltip3" class="el-button">上右</button>
  </div>
  <div style="float: left; width: 60px;">
    <button id="demo-tooltip4" class="el-button">左上</button>
    <button id="demo-tooltip5" class="el-button" style="margin: 10px 0 0 0;">左边</button>
    <button id="demo-tooltip6" class="el-button" style="margin: 10px 0 0 0;">左下</button>
  </div>
  <div style="float: right; width: 60px;">
    <button id="demo-tooltip7" class="el-button">右上</button>
    <button id="demo-tooltip8" class="el-button" style="margin: 10px 0 0 0;">右边</button>
    <button id="demo-tooltip9" class="el-button" style="margin: 10px 0 0 0;">右下</button>
  </div>
  <div style="text-align: center; clear: both;">
    <button id="demo-tooltip10" class="el-button">下左</button>
    <button id="demo-tooltip11" class="el-button">下边</button>
    <button id="demo-tooltip12" class="el-button">下右</button>
  </div>
</div>

<script>
  $('#demo-tooltip1').tooltip({ placement: 'top-left', content: 'Top Left 提示文字' });
  $('#demo-tooltip2').tooltip({ placement: 'top', content: 'Top Center 提示文字' });
  $('#demo-tooltip3').tooltip({ placement: 'top-right', content: 'Top Right 提示文字' });
  $('#demo-tooltip4').tooltip({ placement: 'left-top', content: 'Left Top 提示文字' });
  $('#demo-tooltip5').tooltip({ placement: 'left', content: 'Left Center 提示文字' });
  $('#demo-tooltip6').tooltip({ placement: 'left-bottom', content: 'Left Bottom 提示文字' });
  $('#demo-tooltip7').tooltip({ placement: 'right-top', content: 'Right Top 提示文字' });
  $('#demo-tooltip8').tooltip({ placement: 'right', content: 'Right Center 提示文字' });
  $('#demo-tooltip9').tooltip({ placement: 'right-bottom', content: 'Right Bottom 提示文字' });
  $('#demo-tooltip10').tooltip({ placement: 'bottom-left', content: 'Bottom Left 提示文字' });
  $('#demo-tooltip11').tooltip({ placement: 'bottom', content: 'Bottom Center 提示文字' });
  $('#demo-tooltip12').tooltip({ placement: 'bottom-right', content: 'Bottom Right 提示文字' });
</script>
```
:::

### 主题
Tooltip 组件提供了两个不同的主题：`dark`和`light`，你也可以自行添加样式。
::: demo 通过设置`effect`属性来改变主题，默认为`dark`。

```html
<style>
.demo-tooltip15 { border-color: #f56c6c; background: #f56c6c !important; }
.demo-tooltip15 .popper__arrow, .demo-tooltip15 .popper__arrow:after { border-bottom-color: #f56c6c !important; }
</style>

<button id="demo-tooltip13" class="el-button">Dark</button>
<button id="demo-tooltip14" class="el-button" style="color: #606266">Light</button>
<button id="demo-tooltip15" class="el-button">自定义</button>

<script>
  $('#demo-tooltip13').tooltip({ effect: 'dark', content: '提示文字' });
  $('#demo-tooltip14').tooltip({ effect: 'light', content: '提示文字' });
  $('#demo-tooltip15').tooltip({ tooltipClass: 'demo-tooltip15', content: '提示文字' });
</script>
```
:::

### 高级扩展
::: demo 可通过设置`manual`修改tooltip的显示为手动控制，调用`show / hide`方法控制其显示与否。并且可通过`set`方法修改参数值。

```html
<button id="demo-tooltip16" class="el-button">提示文字</button>
<button onclick="changeTooltip()" class="el-button">修改提示</button>
<button onclick="showTooltip()" class="el-button">显示提示</button>
<button onclick="hideTooltip()" class="el-button">隐藏提示</button>

<script>
  $('#demo-tooltip16').tooltip({ content: '提示文字', manual: true });
  var demoTooltip16Index = 1;
  function changeTooltip () {
    $('#demo-tooltip16').tooltip('set', {
      content: ('提示文字' + (demoTooltip16Index++))
    });
  }
  function showTooltip () {
    $('#demo-tooltip16').tooltip('show');
  }
  function hideTooltip () {
    $('#demo-tooltip16').tooltip('hide');
  }
</script>
```
:::

### 参数
你可以通过修改`$.fn.loading.defaults`来修改全局默认配置，也可以在初始化时传入指定配置`$(#id).loading({xx: xx})`。
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|--------------------|----------------------------------------------------------|-------------------|-------------|--------|
|  effect        |  默认提供的主题  | String            | dark/light | `'dark'`  |
|  content        |  显示的内容，支持html  | String     | - | - |
|  placement        |  Tooltip 的出现位置  | String     |  top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end |  `'bottom'` |
|  disabled       |  Tooltip 是否可用  | Boolean           | - |  false |
|  offset        |  出现位置的偏移量  | Number           | - |  0 |
|  visibleArrow   |  是否显示 Tooltip 箭头， | Boolean | - | true |
| openDelay | 延迟出现，单位毫秒 | Number | - | 0 |
| manual | 手动控制模式，设置为 true 后，mouseenter 和 mouseleave 事件将不会生效 | Boolean | - | false |
| tooltipClass | 为 Tooltip 添加类名 | String | - | - |
| enterable | 鼠标是否可进入到 tooltip 中 | Boolean | - | true |
| hideAfter | Tooltip 出现后自动隐藏延时，单位毫秒，为 0 则不会自动隐藏 | number | - | 0 |

### 方法
你可以通过调用`$(el).tooltip('xxx')`来调用**已被初始化过**的元素的 Tooltip 方法。
| 方法      | 说明          | 举例  |
|---------- |-------------- |-------- |
| set | 重新设置 Tooltip 参数，若传入字符串则当做`content`处理 | `$(el).tooltip('set', {xx: xx})` |
| show | 显示加载特效 | `$(el).tooltip('show')` |
| hide | 隐藏加载特效 | `$(el).tooltip('hide')` |
