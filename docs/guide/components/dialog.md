## Dialog 对话框
模拟系统的消息提示框而实现的一套模态对话框组件，用于消息提示、确认消息和自定义对话框。
::: tip 提示
Dialog 可用于美化系统自带的`alert`、`confirm` 和`prompt`，也可用于自定义复杂的对话框。
:::

### 基本用法
基础的对话框用法。
::: demo 调用`$.dialog();`方法，设置标题和内容。

```html
<button onclick="dialog1()" class="el-button">提示框Alert</button>
<button onclick="dialog2()" class="el-button">对话框Confirm</button>
<button onclick="dialog3()" class="el-button">输入弹框Prompt</button>

<script>
function dialog1() {
  $.dialog({
    title: 'Tip',
    content: 'Hello World!',
    showCancel: false
  });
}
function dialog2() {
  $.dialog({
    title: 'Tip',
    content: 'Hello World!',
    confirm: function(){
      console.log('Dialog confirm');
      return true;
    }
  });
}
function dialog3() {
  $.dialog({
    title: 'Tip',
    content: '请输入：<input type="text" id="dialog3-input">',
    confirm: function(){
      console.log($('#dialog3-input').val());
      return true;
    }
  });
}
</script>
```
:::

### 自定义
自定义对话框样式或内容。
::: demo 支持设置`coverBGColor`、`showHeader`、`width`等配置对话框样式。也支持丰富的自定义内容。

```html
<button onclick="dialog4()" class="el-button">自定义样式对话框</button>
<button onclick="dialog5()" class="el-button">多层对话框</button>

<script>
function dialog4() {
  $.dialog({
    content: 'Hello World!',
    showHeader: false,
    showCancel: false,
    coverBGColor: '#000000aa',
    coverClick: true,
    top: '40vh',
    width: '50%',
    footer: '<span>请点击=></span>',
    footerCenter: true
  });
}
function dialog5() {
  $.dialog({
    title: 'Tip',
    content: '<button onclick="dialog6()" class="el-button">打开新对话框</button>',
  });
}
function dialog6() {
  $.dialog({
    id: 'u-dialog-1',
    top: '40vh',
    content: 'Hello World!',
  });
}
</script>
```
:::

### 参数
你可以通过修改`$.dialogDefaults`来修改全局默认配置，也可以在初始化时传入指定配置`$(el).dialog({xx: xx})`。
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| id     | 对话框id（你可以再次调用对话框函数，设置一个新id值，来弹出一个新的对话框） | string | - | `'u-confirm-0'` |
| coverBGColor | 遮罩背景色 | string | - | `'rgba(0, 0, 0, .5)'` |
| coverClick | 遮罩是否可点击，以隐藏对话框 | boolean | - | `false` |
| zIndex | 弹窗z-index样式 | string / number | - | `'100'` |
| top | 对话框`margin-top`值 | string | - | `'15vh'` |
| width | 对话框宽度 | string | - | `'420px'` |
| headerCenter | 头部居中 | boolean | - | `false` |
| footerCenter | 底部居中 | boolean | - | `false` |
| content | 对话框内容，支持html | string | - | `''` |
| confirm | 点击“确定”按钮触发的事件，返回`true`将关闭对话框，否则不会关闭。你可以设置某元素的属性为`u-type="confirm"`来绑定这个事件 | function | - | `function () {return true}` |
| cancel | 点击"遮罩"关闭对话框/"取消"按钮/右上角“关闭”按钮触发的事件，返回`true`将关闭对话框，否则不会关闭。你可以设置某元素的属性为`u-type="cancel"`来绑定这个事件 | function | - | `function () {return true}` |
| beforeHide | 关闭对话框前触发的函数，返回`true`将关闭对话框，否则不会关闭 | function | - | `function () {return true}` |
| afterHide | 关闭对话框后触发的函数 | function | - | `function () {}` |
| showHeader | 是否显示头部布局（标题和关闭按钮） | boolean | - | `true` |
| showClose | 是否显示“关闭”按钮 | boolean | - | `true` |
| showCancel | 是否显示“取消”按钮 | boolean | - | `true` |
| showConfirm | 是否显示“确定”按钮 | boolean | - | `true` |
| footer | 底部额外扩展插入的html（位于“取消”按钮前） | string | - | `''` |
| title | 标题文字，支持函数返回字符串（国际化时可使用） | string / function | - | 由国际化组件获取的`i18n.title`值对应的文本或`'提示'` |
| labelConfirm | “确定”按钮文本，支持函数返回字符串（国际化时可使用） | string / function | - | 由国际化组件获取的`i18n.confirm`值对应的文本或`'确定'` |
| labelCancel | “取消”按钮文本，支持函数返回字符串（国际化时可使用） | string / function | - | 由国际化组件获取的`i18n.cancel`值对应的文本或`'取消'` |
| i18n.title | 国际化时`title`标题文本对应的key值 | string | - | `'uConfirmTitle'` |
| i18n.confirm | 国际化时`labelConfirm`“确定”按钮文本对应的key值 | string | - | `'uConfirmConfirm'` |
| i18n.cancel | 国际化时`labelCancel`“取消”按钮文本对应的key值 | string | - | `'uConfirmCancel'` |
