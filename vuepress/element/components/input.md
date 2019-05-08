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

### 文本域
用于输入多行文本信息。
::: demo

``` html
<textarea id="demo-input9" rows="2" placeholder="请输入内容"></textarea>

<script>
  $('#demo-input9').input();
</script>
```
:::

### 可自适应文本高度的文本域
通过设置 `autosize` 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 `autosize` 还可以设定为一个对象，指定最小行数和最大行数。
::: demo

``` html
<textarea id="demo-input10" placeholder="请输入内容"></textarea>
<br><br>
<textarea id="demo-input11" placeholder="请输入内容"></textarea>

<script>
  $('#demo-input10').input({autosize: true});
  $('#demo-input11').input({autosize: { minRows: 2, maxRows: 4}});
</script>
```
:::

### 尺寸
::: demo 可通过 `size` 属性指定输入框的尺寸，除了默认的大小外，还提供了 large、small 和 mini 三种尺寸。

``` html
<div style="width: 150px; display: inline-block"><input type="text" id="demo-input12" placeholder="请输入内容"></div>
<div style="width: 150px; display: inline-block"><input type="text" id="demo-input13" placeholder="请输入内容"></div>
<div style="width: 150px; display: inline-block"><input type="text" id="demo-input14" placeholder="请输入内容"></div>
<div style="width: 150px; display: inline-block"><input type="text" id="demo-input15" placeholder="请输入内容"></div>

<script>
  $('#demo-input12').input({suffixIcon: 'el-icon-date'});
  $('#demo-input13').input({suffixIcon: 'el-icon-date', size: 'medium'});
  $('#demo-input14').input({suffixIcon: 'el-icon-date', size: 'small'});
  $('#demo-input15').input({suffixIcon: 'el-icon-date', size: 'mini'});
</script>
```
:::

### 输入长度限制
::: demo `maxlength` 和 `minlength` 是原生属性，用来限制输入框的字符长度，其中字符长度是用 Javascript 的字符串长度统计的。对于类型为 `text` 或 `textarea` 的输入框，在使用 `maxlength` 属性限制最大输入长度的同时，可通过设置 `showWordLimit` 属性来展示字数统计。

``` html
<input id="demo-input16" placeholder="请输入内容" maxlength="10">
<br><br>
<textarea id="demo-input17" placeholder="请输入内容" maxlength="30"></textarea>


<script>
  $('#demo-input16').input({showWordLimit: true});
  $('#demo-input17').input({showWordLimit: true});
</script>
```
:::

### 参数
你可以通过修改`$.fn.input.defaults`来修改全局默认配置，也可以在初始化时传入指定配置`$(el).input({xx: xx})`。
| 参数      | 说明                       | 类型      | 可选值 | 默认值  |
|---------- |--------------------------- |---------- |------  |-------- |
| type         | 类型   | string  | text，textarea 和其他 [原生 input 的 type 值](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types) | `'text'` / `'textarea'` |
| showWordLimit | 是否显示输入字数统计，只在 `type = "text"` 或 `type = "textarea"` 时有效 | boolean    |  -  | `false` |
| clearable     | 是否可清空，只在 `type!="textarea"` 时有效        | boolean         | - | `false` |
| showPassword | 是否显示切换密码图标，只在 `type!="textarea"` 时有效| boolean         | - | `false` |
| size          | 输入框尺寸，只在 `type!="textarea"` 时有效      | string          | medium / small / mini  | - |
| prefixIcon   | 输入框头部图标，只在 `type!="textarea"` 时有效    | string          | - | - |
| suffixIcon   | 输入框尾部图标，只在 `type!="textarea"` 时有效    | string          | - | - |
| autosize      | 自适应内容高度，只对 `type="textarea"` 有效，可传入对象，如，`{ minRows: 2, maxRows: 6 }`  |  boolean / object | - |  false   |

### 方法
你可以通过调用`$(el).input('xxx')`来调用组件方法。
| 方法      | 说明          | 举例  |
|---------- |-------------- |-------- |
| disable | 禁用 | `$(el).input('disable')` |
| enable | 取消禁用 | `$(el).input('enable')` |
