## ColorPicker 颜色选择器
用于颜色选择，支持多种格式。

### 基础用法
移动到下拉菜单上，展开更多操作。
::: demo 利用`$(el).colorPicker()`快速初始化颜色选择器。

``` html
<p>有默认值</p>
<div id="demo-color-picker1"></div>

<script>
  $('#demo-color-picker1').colorPicker();
</script>
```
:::

### 触发对象
可使用按钮触发下拉菜单。
::: demo 可自定义触发内容；也可设置`splitButton`属性来让触发下拉元素呈现为按钮组，左边是功能按钮，右边是触发下拉菜单的按钮，设置为`true`即可。。

``` html
<button id="demo-dropdown2" class="el-button el-button--primary">自定义Button</button>
<span id="demo-dropdown3">自动生成Button</span>

<script>
  $('#demo-dropdown2').dropdown(['黄金糕', '狮子头', '螺蛳粉', '双皮奶', '蚵仔煎']);
  $('#demo-dropdown3').dropdown({
    splitButton: true,
    type: 'primary',
    data: ['黄金糕', '狮子头', '螺蛳粉', '双皮奶', '蚵仔煎']
  });
</script>
```
:::

### 触发方式
可以配置 click 激活或者 hover 激活。
::: demo 将`trigger`属性设置为`click`即可。。

``` html
<style>#demo-dropdown4,#demo-dropdown5 { cursor: pointer; color: rgb(64, 158, 255);}</style>

<span id="demo-dropdown4">hover触发</span>
|==============|
<span id="demo-dropdown5">click触发</span>

<script>
  $('#demo-dropdown4').dropdown({
    trigger: 'hover',
    data: ['黄金糕', '狮子头', '螺蛳粉', '双皮奶', '蚵仔煎']
  });
  $('#demo-dropdown5').dropdown({
    trigger: 'click',
    data: ['黄金糕', '狮子头', '螺蛳粉', '双皮奶', '蚵仔煎']
  });
</script>
```
:::

### 菜单隐藏方式
可以`hideOnClick`属性来配置。
::: demo 下拉菜单默认在点击菜单项后会被隐藏，将`hideOnClick`属性默认为`false`可以关闭此功能。

``` html
<style>#demo-dropdown6 { cursor: pointer; color: rgb(64, 158, 255);}</style>

<span id="demo-dropdown6">点击子菜单不关闭</span>

<script>
  $('#demo-dropdown6').dropdown({
    hideOnClick: false,
    data: ['黄金糕', '狮子头', '螺蛳粉', '双皮奶', '蚵仔煎']
  });
</script>
```
:::

### 指令事件
点击菜单项后会触发事件，用户可以通过相应的菜单项 key 进行不同的操作。
::: demo

``` html
<style>#demo-dropdown7 { cursor: pointer; color: rgb(64, 158, 255);}</style>

<span id="demo-dropdown7">点击子菜单触发事件</span>

<script>
  $('#demo-dropdown7').dropdown({
    command: function (command) {
      $.message('click on item ' + command);
    },
    data: [
      {content: '黄金糕', command: 'a'},
      {content: '狮子头', command: 'b'},
      {content: '螺蛳粉', command: 'c'},
      {content: '双皮奶', command: 'd'},
      {content: '蚵仔煎', command: 'e'}
    ]
  });
</script>
```
:::

### 不同尺寸
Dropdown 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的尺寸。
::: demo 额外的尺寸：`medium`、`small`、`mini`，通过设置`size`属性来配置它们。

``` html
<span id="demo-dropdown8">默认尺寸</span>
<span id="demo-dropdown9">中等尺寸</span>
<span id="demo-dropdown10">小型尺寸</span>
<span id="demo-dropdown11">超小尺寸</span>

<script>
  $('#demo-dropdown8').dropdown({
    splitButton: true,
    type: 'primary',
    data: ['黄金糕', '狮子头', '螺蛳粉', '双皮奶', '蚵仔煎']
  });
  $('#demo-dropdown9').dropdown({
    splitButton: true,
    type: 'primary',
    size: 'medium',
    data: ['黄金糕', '狮子头', '螺蛳粉', '双皮奶', '蚵仔煎']
  });
  $('#demo-dropdown10').dropdown({
    splitButton: true,
    type: 'primary',
    size: 'small',
    data: ['黄金糕', '狮子头', '螺蛳粉', '双皮奶', '蚵仔煎']
  });
  $('#demo-dropdown11').dropdown({
    splitButton: true,
    type: 'primary',
    size: 'mini',
    data: ['黄金糕', '狮子头', '螺蛳粉', '双皮奶', '蚵仔煎']
  });
</script>
```
:::

### 参数
你可以通过修改`$.fn.dropdown.defaults`来修改全局默认配置，也可以在初始化时传入指定配置`$(el).dropdown({xx: xx})`。
参数默认为 Json ，若为数组，则会被当做`data`赋值。
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|-------------  |---------------- |---------------- |---------------- |-------- |
| data          | 子菜单数组，具体配置见下方【data参数】   | array  | - | `[]` |
| type          | 菜单按钮类型，同 Button 组件(只在`splitButton`为 true 的情况下有效)   | string  | - | - |
| size          | 菜单尺寸，在`splitButton`为 true 的情况下也对触发按钮生效  | string | medium / small / mini | - |
| splitButton  | 下拉触发元素呈现为按钮组    | boolean  |    -  |  `false` |
| placement    | 菜单弹出位置     | string | top/top-start/top-end/bottom/bottom-start/bottom-end  | `bottom-end` |
| trigger       | 触发下拉的行为     | string    | hover, click  | `hover` |
| hideOnClick | 是否在点击菜单项后隐藏菜单     | boolean          | - | `true` |
| hideOnOutside | 是否在点击元素外内容后隐藏菜单     | boolean          | - | `true` |
| showTimeout  | 展开下拉菜单的延时（仅在 trigger 为 hover 时有效）| number          | - | `250` |
| hideTimeout  | 收起下拉菜单的延时（仅在 trigger 为 hover 时有效）| number          | - | `150` |
| click  | `splitButton` 为 true 时，点击左侧按钮的回调 | function | - | - |
| command  | 点击菜单项触发的事件回调，参数为data对象的command | function | - | - |
| visibleChange | 下拉框出现/隐藏时触发，参数出现为 true，隐藏为 false | function | - | - |

### data参数
参数默认为 Json ，若为string，则会被当做`content`赋值。
| 参数          | 说明            | 类型            | 可选值    | 默认值   |
|-------------  |---------------- |---------------- |------------ |-------- |
| content       | 本子菜单内容     | string  | - | - |
| command       | 指令     | - | - | 与content一致 |
| disabled      | 禁用     | boolean          | - | `false` |
| divided       | 显示分割线     | boolean          | - | `false` |
