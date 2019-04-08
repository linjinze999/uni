## Popover 弹出框


### 基础用法
Popover 的属性与 Tooltip 很类似，因此对于重复属性，请参考 Tooltip 的文档，在此文档中不做详尽解释。
::: demo 调用`$(el).popover()`方法初始化弹出框。

```html
<button id="demo-popover1" class="el-button">hover激活</button>
<button id="demo-popover2" class="el-button">click激活</button>
<button id="demo-popover3" class="el-button">focus激活</button>
<button id="demo-popover4" class="el-button" onclick="demoPopover4()">手动激活</button>

<script>
  $('#demo-popover1').popover({
    trigger: 'hover',
    title: '标题',
    content: '这是一段内容,这是一段内容,这是一段内容,这是一段内容。',
    width: '200px'
  });
  $('#demo-popover2').popover({
    trigger: 'click',
    itle: '标题',
    content: '这是一段内容,这是一段内容,这是一段内容,这是一段内容。',
    width: '200px'
  });
  $('#demo-popover3').popover({
    trigger: 'focus',
    title: '标题',
    content: '这是一段内容,这是一段内容,这是一段内容,这是一段内容。',
    width: '200px'
  });
  $('#demo-popover4').popover({
    trigger: 'manual',
    title: '标题',
    content: '这是一段内容,这是一段内容,这是一段内容,这是一段内容。',
    width: '200px'
  });
  var demoPopover4Show = false;
  function demoPopover4 () {
    demoPopover4Show = !demoPopover4Show;
    if (demoPopover4Show) {
      $('#demo-popover4').popover('show');
    } else {
      $('#demo-popover4').popover('hide');
    }
  }
</script>
```
:::

### 嵌套信息
可以在 Popover 中嵌套多种类型信息，以下为嵌套表格的例子。
::: demo

```html
<button id="demo-popover5" class="el-button">click激活</button>

<script>
  $('#demo-popover5').popover({
    trigger: 'click',
    content: '<table><tr><th>Month</th><th>Savings</th></tr><tr><td>January</td><td>$100</td></tr></table>',
    width: '200px'
  });
</script>
```
:::

### 嵌套操作
当然，你还可以嵌套操作，这相比 Dialog 更为轻量：
::: demo

```html
<button id="demo-popover6" class="el-button">删除</button>

<script>
  $('#demo-popover6').popover({
    trigger: 'click',
    content: '<p>是否删除？</p><div style="text-align: right;">' +
     '<button onclick="demoPopover6()" class="el-button el-button--mini">取消</button>' +
      '<button onclick="demoPopover6()" class="el-button el-button--primary el-button--mini">确定</button></div>',
    width: '200px'
  });
  function demoPopover6 () {
    $('#demo-popover6').popover('hide');
  }
</script>
```
:::

### 参数
你可以通过修改`$.fn.popover.defaults`来修改全局默认配置，也可以在初始化时传入指定配置`$(#id).popover({xx: xx})`。
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|--------------------|----------------------------------------------------------|-------------------|-------------|--------|
|  trigger        |  触发方式  | String            | click/focus/hover/manual | `'click'`  |
|  title        | 标题  | String     | - | - |
|  content        |  显示的内容，支持html  | String     | - | - |
|  width        |  宽度  | String     | - | 最小宽度 150px |
|  placement        |  出现的位置  | String     |  top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end |  `'bottom'` |
|  disabled       |  Tooltip 是否可用  | Boolean           | - |  false |
|  offset        |  出现位置的偏移量  | Number           | - |  0 |
|  visibleArrow   |  是否显示 Tooltip 箭头， | Boolean | - | true |
| openDelay | 延迟出现，单位毫秒 | Number | - | 0 |
| popoverClass | 为 Popover 添加类名 | String | - | - |
| afterEnter | 显示后执行 | Function | - | - |
| afterAfter | 隐藏后执行 | Function | - | - |

### 方法
你可以通过调用`$(el).popover('xxx')`来调用**已被初始化过**的元素的 Popover 方法。
| 方法      | 说明          | 举例  |
|---------- |-------------- |-------- |
| set | 重新设置 Popover 参数，若传入字符串则当做`content`处理 | `$(el).popover('set', {xx: xx})` |
| show | 显示加载特效 | `$(el).popover('show')` |
| hide | 隐藏加载特效 | `$(el).popover('hide')` |
