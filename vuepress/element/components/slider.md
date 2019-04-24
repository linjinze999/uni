## Slider 滑块
通过拖动滑块在一个固定区间内进行选择

### 基础用法
在拖动滑块时，显示当前值
::: demo 利用`$(el).slider()`快速初始化滑块。

``` html
<p>默认</p>
<div id="demo-slider1"></div>
<p>自定义初始值</p>
<div id="demo-slider2"></div>

<script>
  $('#demo-slider1').slider();
  $('#demo-slider2').slider({ value: '50' });
</script>
```
:::


### 参数
你可以通过修改`$.fn.colorPicker.defaults`来修改全局默认配置，也可以在初始化时传入指定配置`$(el).colorPicker({xx: xx})`。
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value  | 初始值 | string | - | - |
| disabled | 是否禁用 | boolean | - | `false` |
| size | 尺寸 | string | medium / small / mini | - |
| showAlpha | 是否支持透明度选择 | boolean | - | `false` |
| colorFormat | 颜色的格式 | string | hsl / hsv / hex / rgb | `'hex'`（showAlpha 为 `false`）或 `'rgb'`（showAlpha 为 `true`） |
| popperClass | ColorPicker 下拉框的类名 | string | - | - |
| predefine | 预定义颜色 | array | - | - |
| change | 当绑定值变化时触发，回调参数为当前值 | function | - | - |
| activeChange | 面板中当前显示的颜色发生改变时触发，回调参数为当前显示的颜色值 | function | - | - |

### 方法
你可以通过调用`$(el).colorPicker('xxx')`来调用颜色选择器方法。
| 方法      | 说明          | 举例  |
|---------- |-------------- |-------- |
| disable | 禁用选择器 | `$(el).colorPicker('disable')` |
| enable | 取消禁用状态 | `$(el).colorPicker('enable')` |
| set | 设置颜色值 | `$(el).colorPicker('set', 'rgba(255, 0, 0, 0.5)')` |
| get | 获取颜色值 | `$(el).colorPicker('get')` |
