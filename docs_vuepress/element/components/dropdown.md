## Dropdown 下拉菜单
将动作或菜单折叠到下拉菜单中。

### 基础用法
基础的、简洁的标签页。
::: demo 利用`$(el).tabs()`快速初始化标签页。

``` html
<div id="demo-tabs1"></div>

<script>
  $('#demo-tabs1').tabs([
    { name: '用户管理', content: '<div>用户管理内容</div>' },
    { name: '配置管理', content: '<div>配置管理内容</div>' },
    { name: '角色管理', content: '<div>角色管理内容</div>' },
    { name: '定时任务补偿', content: '<div>定时任务补偿内容</div>' },
  ]);
</script>
```
:::
::: warning 注意
`$(el)`的`innerHtml`将被替换。
:::

### 选项卡样式
选项卡样式的标签页。
::: demo 指定`type`类型为'card'。

``` html
<div id="demo-tabs2"></div>
<div id="demo-tabs2-1">用户管理内容</div>
<div id="demo-tabs2-2">配置管理内容</div>
<div id="demo-tabs2-3">角色管理内容</div>
<div id="demo-tabs2-4">定时任务补偿内容</div>

<script>
  $('#demo-tabs2').tabs({
    type: 'card',
    tabs: [
      { name: '用户管理', selector: '#demo-tabs2-1', disabled: true },
      { name: '配置管理', selector: '#demo-tabs2-2' },
      { name: '角色管理', selector: '#demo-tabs2-3' },
      { name: '定时任务补偿', selector: '#demo-tabs2-4' },
    ]
  });
</script>
```
:::

### 卡片化
卡片化的标签页。
::: demo 指定`type`类型为'border-card'。

``` html
<div id="demo-tabs3"></div>
<div id="demo-tabs3-1">用户管理内容</div>
<div id="demo-tabs3-2">配置管理内容</div>
<div id="demo-tabs3-3">角色管理内容</div>
<div id="demo-tabs3-4">定时任务补偿内容</div>

<script>
  $('#demo-tabs3').tabs({
    type: 'border-card',
    tabs: [
      { name: '用户管理', selector: '#demo-tabs3-1' },
      { name: '配置管理', selector: '#demo-tabs3-2' },
      { name: '角色管理', selector: '#demo-tabs3-3' },
      { name: '定时任务补偿', selector: '#demo-tabs3-4' },
    ]
  });
</script>
```
:::

### 位置
可以通过 `tabPosition` 设置标签的位置
::: demo 标签一共有四个方向的设置 `tabPosition="left|right|top|bottom"`。

``` html
<div id="demo-tabs4"></div>

<script>
  $('#demo-tabs4').tabs({
    tabPosition: 'left',
    tabs: [
      { name: '用户管理', content: '<div>用户管理内容</div>' },
      { name: '配置管理', content: '<div>配置管理内容</div>' },
      { name: '角色管理', content: '<div>角色管理内容</div>' },
      { name: '定时任务补偿', content: '<div>定时任务补偿内容</div>' }
    ]
  });
</script>
```
:::

### 自定义标签页
通过`label`设置标签显示文本。
::: demo

``` html
<div id="demo-tabs5"></div>

<script>
  $('#demo-tabs5').tabs({
    tabs: [
      { name: '用户管理', label: '<i class="el-icon-date"></i> 用户管理', content: '<div>用户管理内容</div>' },
      { name: '配置管理', content: '<div>配置管理内容</div>' },
      { name: '角色管理', content: '<div>角色管理内容</div>' },
      { name: '定时任务补偿', content: '<div>定时任务补偿内容</div>' }
    ]
  });
</script>
```
:::

### 动态增减标签页
增减标签页按钮只能在选项卡样式的标签页下使用
::: demo

``` html
<div id="demo-tabs6"></div>

<script>
  var demoTabs6New = 0;
  $('#demo-tabs6').tabs({
    type: 'card',
    addable: true,
    closable: true,
    tabs: [
      { name: '用户管理', content: '<div>用户管理内容</div>' },
      { name: '配置管理', content: '<div>配置管理内容</div>' },
    ],
    tabAdd: function () {
      demoTabs6New += 1;
      $('#demo-tabs6').tabs('add', { name: '新标签' + demoTabs6New, content: '新标签内容' });
      $('#demo-tabs6').tabs('set', '新标签' + demoTabs6New);
    },
    tabRemove:function (name) {
      $('#demo-tabs6').tabs('remove', name );
    }
  });
</script>
```
:::

### 参数
你可以通过修改`$.fn.tabs.defaults`来修改全局默认配置，也可以在初始化时传入指定配置`$(el).tabs({xx: xx})`。
参数默认为 Json ，若为数组，则会被当做`tabs`赋值。
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| tabs     | tabs数据数组，每个选项为一个tab配置的json，详情见下方的“tab配置”   | array   |  -  |     -    |
| type     | 风格类型   | string   | card/border-card  |     -    |
| closable  | 标签是否可关闭（type为`card/border-card`时有效）   | boolean   | — |  false  |
| addable  | 标签是否可增加   | boolean   | - |  false  |
| value  | 绑定值，选中选项卡的 name  | string   |  -  |  第一个非disabled的选项卡的 name |
| tabPosition  | 选项卡所在位置 | string   |  top/right/bottom/left  |  `'top'` |
| stretch  | 标签的宽度是否自撑开 | boolean   |  -  |  `false` |
| beforeLeave | 切换标签之前的钩子，若返回 false 或者返回 Promise 且被 reject，则阻止切换。 | Function(newName, oldName) | - | - |
| tabClick  | tab 被选中时触发 | Function(newName, oldName) | - | - |
| tabRemove  | 点击 tab 移除按钮后触发 | Function(name) | - | - |
| tabAdd  | 点击 tabs 的新增按钮后触发 | Function | - | - |

### tab配置
| 参数       | 说明     | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label     | 选项卡标题   | string   | - |    对应`name`的值     |
| disabled | 是否禁用 | boolean | - | false |
| name      | 必填，选项卡标识符 | string | - | - |
| closable  | 标签是否可关闭   | boolean   | - |  上方整体参数配置的`closable`  |
| selector  | 本tab标签控制的显示元素，其css选择器 | string   | - |  -  |
| content  | tab标签对应的主体内容，支持html（优先级低于selector） | string   | - |  -  |

### 方法
通过 `$(el).tabs(xxx, yyy)` 调用 tabs 的`xxx`方法，传入`yyy`参数（可参考【动态增减标签页】）。
| 事件名称 | 说明 | 参数 |
|---------- |-------- |---------- |
| add  | 添加一个标签 | tab配置 |
| remove  | 移除某一个标签  | 被删除的标签的 name |
| set  | 设置新的激活标签  | 新激活标签的name |
| get  | 获取当前激活的标签页的name  | - |
