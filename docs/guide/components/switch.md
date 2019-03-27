## Switch 开关
表示两种相互对立的状态间的切换，多用于触发「开/关」。

### 基础用法
::: demo 通过`$(el).switch()`快速初始化一个开关。

``` html
<div id="demo-switch1"></div>

<script>
  $('#demo-switch1').switch();
</script>
```
:::

### 文字描述
::: demo 通过`activeHtml`、`inactiveHtml`设置显示文本；通过`activeColor`、`inactiveColor`设置开关背景色。

``` html
<div id="demo-switch2"></div><br><br>
<div id="demo-switch3"></div>

<script>
  $('#demo-switch2').switch({
    activeHtml: '按月付费',
    inactiveHtml: '按年付费'
  });
  $('#demo-switch3').switch({
    activeHtml: '按月付费',
    inactiveHtml: '按年付费',
    activeColor: '#67C23A',
    inactiveColor: '#F56C6C'
  });
</script>
```
:::

### 禁用状态
::: demo 通过`$(el).switch({disabled: true})`在初始化时快速设置开关禁用样式，或`$(el).switch('disabled'})`、`$(el).switch('show'})`动态设置禁用状态。

``` html
<div id="demo-switch4"></div>
<div id="demo-switch5"></div>

<script>
  $('#demo-switch4').switch({disabled: true, on: true});
  $('#demo-switch5').switch({disabled: true});
</script>
```
:::

### 方法调用
::: demo 通过`$(el).switch('set', true})`、`$(el).switch('get'})`设置开关或获取值。

``` html
<div id="demo-switch6"></div><br><br>
<button onclick="demoSwitch1()" class="el-button">开</button>
<button onclick="demoSwitch2()" class="el-button">关</button>
<button onclick="demoSwitch3()" class="el-button">获取值</button>

<script>
  $('#demo-switch6').switch({
    activeValue: '100',
    inactiveValue: '0',
    onchange: function() {
      console.log();
    }
  });
  function demoSwitch1 () {
    $('#demo-switch6').switch('set', true);
  }
  function demoSwitch2 () {
    $('#demo-switch6').switch('set', false);
  }
  function demoSwitch3 () {
    alert($('#demo-switch6').switch('get'))
  }
</script>
```
:::

### 参数
| 参数      | 说明                       | 类型      | 可选值 | 默认值  |
|---------- |--------------------------- |---------- |------  |-------- |
| disabled     | 是否禁用开关 | boolean | - | `false` |
| on     | 开关是否开启 | boolean | - | `false` |
| width     | 开关宽度（单位`px`） | number | - | `40` |
| activeHtml | 开关右边文本（开状态），支持html | string | - | `''` |
| inactiveHtml | 开关左边文本（关状态），支持html | string | - | `''` |
| activeValue | 开状态的值（由`get`方法获取） | - | - | `true` |
| inactiveValue | 关状态的值（由`get`方法获取） | - | - | `false` |
| activeColor | 开状态的背景色 | string | - | - |
| inactiveColor | 关状态的背景色 | string | - | - |
| name | 开关内置`checkbox`的`name`属性 | string | - | - |
| onchange | 开关变化时触发的事件（`set`方法不会触发） | function | - | - |

### 方法
你可以通过调用`$(el).switch('xxx')`来调用开关方法。
| 方法      | 说明          | 举例  |
|---------- |-------------- |-------- |
| disabled | 禁用开关 | `$(el).switch('disabled')` |
| show | 取消禁用状态 | `$(el).switch('show')` |
| set | 设置开关选中状态（不会触发 change 事件） | `$(el).switch('set', true / false)` |
| get | 获取开关值（`activeValue`/`inactiveValue`） | `$(el).switch('get')` |
