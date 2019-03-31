## Notification 通知
常用于主动操作后的反馈提示。与 Notification 的区别是后者更多用于系统级通知的被动提醒。

### 基本用法
适用性广泛的通知栏。
::: demo 调用`$.notify();`方法打开通知，该方法接收一个`options`字面量参数，在最简单的情况下，你可以设置`title`字段和`message`字段，用于设置通知的标题和正文。默认情况下，经过一段时间后组件会自动关闭，但是通过设置`duration`，可以控制关闭的时间间隔，特别的是，如果设置为`0`，则不会自动关闭。注意：`duration`接收一个`Number`，单位为毫秒，默认为`4500`。

```html
<button onclick="demoNotify1()" class="el-button">可自动关闭</button>
<button onclick="demoNotify2()" class="el-button">不可自动关闭</button>

<script>
function demoNotify1() {
  $.notify({ title: '标题', message: '内容消息详情' });
}
function demoNotify2() {
  $.notify({ title: '标题', message: '内容消息详情', duration: 0 });
}
</script>
```
:::

### 带有倾向性
带有 icon，常用来显示「成功、警告、消息、错误」类的系统消息。
::: demo 指定参数`type`为`'success'` / `'warning'` / `'info'` / `'error'`。

```html
<button onclick="demoNotify3()" class="el-button">成功</button>
<button onclick="demoNotify4()" class="el-button">警告</button>
<button onclick="demoNotify5()" class="el-button">消息</button>
<button onclick="demoNotify6()" class="el-button">错误</button>

<script>
function demoNotify3() {
  $.notify({ title: '恭喜', message: '这是一条<b>成功</b>消息', type: 'success' });
}
function demoNotify4() {
  $.notify({ title: '警告', message: '这是一条<b>警告</b>消息', type: 'warning' });
}
function demoNotify5() {
  $.notify({ title: '消息', message: '这是一条<b>信息</b>消息', type: 'info' });
}
function demoNotify6() {
  $.notify({ title: '错误', message: '这是一条<b>错误</b>消息', type: 'error' });
}
</script>
```
:::

### 自定义弹出位置
可以让 Notification 从屏幕四角中的任意一角弹出。
::: demo 指定参数`position`为`'top-right'` / `'bottom-right'` / `'bottom-left'` / `'top-left'`。

```html
<button onclick="demoNotify7()" class="el-button">右上角</button>
<button onclick="demoNotify8()" class="el-button">右下角</button>
<button onclick="demoNotify9()" class="el-button">左下角</button>
<button onclick="demoNotify10()" class="el-button">左上角</button>

<script>
function demoNotify7() {
  $.notify({ title: '消息', message: '这是一条消息', position: 'top-right' });
}
function demoNotify8() {
  $.notify({ title: '消息', message: '这是一条消息', position: 'bottom-right' });
}
function demoNotify9() {
  $.notify({ title: '消息', message: '这是一条消息', position: 'bottom-left' });
}
function demoNotify10() {
  $.notify({ title: '消息', message: '这是一条消息', position: 'top-left' });
}
</script>
```
:::

### 其他
::: demo 指定参数`type`。

```html
<button onclick="demoNotify11()" class="el-button">带有偏移</button>
<button onclick="demoNotify12()" class="el-button">隐藏关闭按钮</button>
<button onclick="demoNotify13()" class="el-button">关闭所有通知框</button>

<script>
function demoNotify11() {
  $.notify({ title: '消息', message: '这是一条消息', offset: '50px' });
}
function demoNotify12() {
  $.notify({
    title: '警告',
    message: '点击通知框任意位置，可关闭通知框。',
    showClose: false,
    type: 'warning',
    duration: 0,
    onclick: function($el){ $el.close(); }
  });
}
function demoNotify13() {
  $('.el-notification').each(function(){
    $(this).data('u-notify-close')();
  });
}
</script>
```
:::

### 参数
你可以通过修改`$.notifyDefaults`来修改全局默认配置，也可以在初始化时传入指定配置`$.notify({xx: xx})`。
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| title | 标题，支持html | string | - | `''` |
| message | 说明文字，支持html | string | - | `''` |
| type | 主题样式，如果不在可选值内将被忽略 | string | success/warning/info/error | - |
| iconClass | 自定义图标的类名。若设置了 `type`，则 `iconClass` 会被覆盖 | string | - | - |
| customClass | 自定义类名 | string | - | - |
| duration | 显示时间, 毫秒。设为 0 则不会自动关闭 | number | - | 4500 |
| position | 自定义弹出位置 | string | top-right/top-left/bottom-right/bottom-left | `'top-right'` |
| showClose | 是否显示关闭按钮 | boolean | - | true |
| onClose | 关闭时的回调函数 | function | - | - |
| onClick | 点击 Notification 时的回调函数 | function | - | - |
| offset | 与上一个 Notification 偏移的距离，将被转换为`margin-top`或`margin-bottom` | string | - | `'16px'` |

### 方法
调用 `$.notify()` 会返回当前 Notification 的JQuery实例。如果需要手动关闭实例，可以调用它的 `close` 方法。
| 方法名 | 说明 | 示例 |
| ---- | ---- | ---- |
| close | 关闭当前的 Notification | `_n = $.notify(); _n.close();` |

::: tip 提示
你也可以用`$('.el-notification').data('u-notify-close')`获取`close`方法，参考上方关闭所有通知框示例。
:::
