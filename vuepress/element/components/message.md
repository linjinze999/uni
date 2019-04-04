## Message 消息提示
常用于主动操作后的反馈提示。与 Notification 的区别是后者更多用于系统级通知的被动提醒。

### 基本用法
从顶部出现，3 秒后自动消失。
::: demo 调用`$.message();`方法打开消息提示。

```html
<button onclick="demoMessage1()" class="el-button">打开消息提示</button>

<script>
function demoMessage1() {
  $.message('这是一条消息提示');
}
</script>
```
:::

### 不同状态
用来显示「成功、警告、消息、错误」类的操作反馈。
::: demo 指定参数`type`。

```html
<button onclick="demoMessage2()" class="el-button">成功</button>
<button onclick="demoMessage3()" class="el-button">警告</button>
<button onclick="demoMessage4()" class="el-button">消息</button>
<button onclick="demoMessage5()" class="el-button">错误</button>

<script>
function demoMessage2() {
  $.message({
    message: '恭喜你，这是一条成功消息',
    type: 'success'
  });
}
function demoMessage3() {
  $.message({
    message: '警告哦，这是一条警告消息',
    type: 'warning'
  });
}
function demoMessage4() {
  $.message({
    message: '这是一条消息提示',
    type: 'info'
  });
}
function demoMessage5() {
  $.message({
    message: '错了哦，这是一条错误消息',
    type: 'error'
  });
}
</script>
```
:::

### 自定义
用来显示「成功、警告、消息、错误」类的操作反馈。
::: demo 指定参数`type`。

```html
<button onclick="demoMessage6()" class="el-button">自行关闭</button>
<button onclick="demoMessage7()" class="el-button">点击“打开”或“关闭”</button>
<button onclick="demoMessage8()" class="el-button">文字居中</button>
<button onclick="demoMessage9()" class="el-button">自定义HTML</button>

<script>
function demoMessage6() {
  $.message({
    message: '提供关闭按钮',
    showClose: true,
    duration: 0
  });
}
var demoMessage7El;
function demoMessage7() {
  if (demoMessage7El) {
    demoMessage7El.close();
    demoMessage7El = '';
  } else {
    demoMessage7El = $.message({
      message: '警告，再次点击按钮关闭此消息！',
      type: 'warning',
      duration: 0
    });
  }
}
function demoMessage8() {
  $.message({
    message: '居中文字',
    type: 'error',
    center: true
  });
}
function demoMessage9() {
  $.message({
    message: '注意<b>这里</b>！',
    type: 'success'
  });
}
</script>
```
:::

### 参数
你可以通过修改`$.messageDefaults`来修改全局默认配置，也可以在初始化时传入指定配置`$.message({xx: xx})`。
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| message | 消息文字，支持html | string | - | `''` |
| type | 主题 | string | success/warning/info/error | `'info'` |
| iconClass | 自定义图标的类名，会覆盖 `type` | string | - | - |
| customClass | 自定义类名 | string | - | - |
| duration | 显示时间, 毫秒。设为 0 则不会自动关闭 | number | - | 3000 |
| showClose | 是否显示关闭按钮 | boolean | - | false |
| center | 文字是否居中 | boolean | - | false |
| onClose | 关闭时的回调函数, 参数为被关闭的 message 的JQuery实例 | function | - | - |

### 方法
调用 `$.message()` 会返回当前 Message 的JQuery实例。如果需要手动关闭实例，可以调用它的 `close` 方法。
| 方法名 | 说明 | 示例 |
| ---- | ---- | ----- |
| close | 关闭当前的 Message | `_m = $.message(); _m.close();` |

::: tip 提示
你也可以用`$('.el-message').data('u-message-close')`获取`close`方法，可参考 Notification 关闭所有通知框的示例。
:::
