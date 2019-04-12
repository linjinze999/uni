## ColorPicker 颜色选择器
用于颜色选择，支持多种格式。

### 基础用法
移动到下拉菜单上，展开更多操作。
::: demo 利用`$(el).colorPicker()`快速初始化颜色选择器。

``` html
<p>有默认值</p>
<div id="demo-color-picker1"></div>
<p>无默认值</p>
<div id="demo-color-picker2"></div>

<script>
  $('#demo-color-picker1').colorPicker({ value: '#409EFF' });
  $('#demo-color-picker2').colorPicker();
</script>
```
:::

### 选择透明度
::: demo ColorPicker 支持普通颜色，也支持带 Alpha 通道的颜色，通过`showAlpha`属性即可控制是否支持透明度的选择。

``` html
<div id="demo-color-picker3"></div>

<script>
  $('#demo-color-picker3').colorPicker({
    showAlpha: true,
    value: 'rgba(19, 206, 102, 0.8)'
  });
</script>
```
:::

### 预定义颜色
::: demo ColorPicker 支持预定义颜色

``` html
<div id="demo-color-picker4"></div>

<script>
  $('#demo-color-picker4').colorPicker({
    showAlpha: true,
    value: 'rgba(255, 69, 0, 0.68)',
    predefine: [
      '#ff4500',
      '#ff8c00',
      '#ffd700',
      '#90ee90',
      '#00ced1',
      '#1e90ff',
      '#c71585',
      'rgba(255, 69, 0, 0.68)',
      'rgb(255, 120, 0)',
      'hsv(51, 100, 98)',
      'hsva(120, 40, 94, 0.5)',
      'hsl(181, 100%, 37%)',
      'hsla(209, 100%, 56%, 0.73)',
      '#c7158577'
    ]
  });
</script>
```
:::

### 不同尺寸
::: demo

``` html
<span id="demo-color-picker5"></span>&nbsp;
<span id="demo-color-picker6"></span>&nbsp;
<span id="demo-color-picker7"></span>&nbsp;
<span id="demo-color-picker8"></span>&nbsp;

<script>
  $('#demo-color-picker5').colorPicker({ value: '#409EFF' });
  $('#demo-color-picker6').colorPicker({ value: '#409EFF', size: 'medium' });
  $('#demo-color-picker7').colorPicker({ value: '#409EFF', size: 'small' });
  $('#demo-color-picker8').colorPicker({ value: '#409EFF', size: 'mini' });
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
