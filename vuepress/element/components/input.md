## Input 输入框
通过鼠标或键盘输入字符。

### 基础用法
::: demo 可为`<input>`添加`el-input__inner`样式，也可使用`input`初始化。

``` html
<div style="width: 180px;">
  <p>自行设置样式</p>
  <input type="text" class="el-input__inner" placeholder="请输入内容">
  <p>使用input初始化</p>
  <input type="text" id="demo-input1" placeholder="请输入内容">
</div>

<script>
  $('#demo-input1').input();
</script>
```
:::

### 禁用状态
::: demo 通过 `disabled` 属性指定是否禁用 input 组件

``` html
<div style="width: 180px;">
  <input type="text" id="demo-input2" disabled placeholder="请输入内容">
</div>

<script>
  $('#demo-input2').input();
</script>
```
:::

### 可清空
::: demo 使用`clearable`属性即可得到一个可清空的输入框

``` html
<div style="width: 180px;">
  <input type="text" id="demo-input3" placeholder="请输入内容">
</div>

<script>
  $('#demo-input3').input({clearable: true});
</script>
```
:::

### 密码框

::: demo 使用`showPassword`属性即可得到一个可切换显示隐藏的密码框

``` html
<div style="width: 180px;">
  <input type="text" id="demo-input4" placeholder="请输入密码">
</div>

<script>
  $('#demo-input4').input({showPassword: true});
</script>
```
:::

### 带 icon 的输入框
带有图标标记输入类型
::: demo 可以通过 `prefixIcon` 和 `suffixIcon` 属性在 input 组件首部和尾部增加显示图标，也可以通过 `prefix` 和 `suffix` 来放置图标。

``` html
<div>
  <span>设置图标</span>
  <div style="width: 180px; display: inline-block"><input type="text" id="demo-input5" placeholder="请选择日期"></div>
  <div style="width: 180px; display: inline-block"><input type="text" id="demo-input6" placeholder="请输入内容"></div>
  <br><br>
  <span>设置内容</span>
  <div style="width: 180px; display: inline-block"><input type="text" id="demo-input7" placeholder="请选择日期"></div>
  <div style="width: 180px; display: inline-block"><input type="text" id="demo-input8" placeholder="请输入内容"></div>
  <br>
</div>

<script>
  $('#demo-input5').input({suffixIcon: 'el-icon-date'});
  $('#demo-input6').input({prefixIcon: 'el-icon-search'});
  $('#demo-input7').input({suffix: '<i class="el-input__icon el-icon-date"></i>'});
  $('#demo-input8').input({prefix: '<i class="el-input__icon el-icon-search"></i>'});
</script>
```
:::

### 方法
你可以通过调用`$(#id).button('xxx')`来快速设置按钮状态。
| 方法      | 说明          | 举例  |
|---------- |-------------- |-------- |
| disabled | 禁用按钮 | `$(#id).button('disabled')` |
| loading | 按钮显示加载中 | `$(#id).button('loading')` |
| show | 取消禁用和加载状态 | `$(#id).button('show')` |
