# Confirm 对话框
模拟系统的消息提示框而实现的一套模态对话框组件，用于消息提示、确认消息和自定义内容。
::: tip 提示
Confirm可用于美化系统自带的`alert`、`confirm` 和`prompt`，也可用于自定义复杂的`Dialog`。
:::

## 基本用法
基础的对话框用法。
::: demo 调用`$.confirm();`方法，设置标题和内容。

```html
<button onclick="confirm1()" class="el-button">
  弹窗
</button>

<script>
function confirm1() {
  $.confirm({
    title: 'Tip',
    content: 'Hello World!'
  });
}
</script>
```
:::


## 参数
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| id     | 对话框id（你可以再次调用对话框函数，设置一个新id值，来弹出一个新的对话框） | string | - | `'u-confirm-0'` |
| coverBGColor | 遮罩背景色 | string | - | `'rgba(0, 0, 0, .5)'` |
| coverClick | 遮罩是否可点击，以隐藏对话框 | boolean | - | `false` |
| zIndex | 弹窗z-index样式 | string / number | - | `'100'` |
| width | 对话框宽度 | string | - | `'420px'` |
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
