## Progress 进度条
用于展示操作进度，告知用户当前状态和预期。

### 线形进度条
::: demo 调用`$('#id').progress()`方法初始化进度条；调用`$('#id').progress('update')`方法更新进度条，`update`方法支持传入number或object，number表示更新百分比，object支持更新三个参数：`percentage`、`color`、`text`。

```html
百分比外显：
<div id="progress1"></div>
百分比内显：
<div id="progress2"></div>
<br>
<button onclick="progress1()" class="el-button">重置</button>
<button onclick="progress2()" class="el-button">更新30%</button>
<button onclick="progress3()" class="el-button">更新60%</button>
<button onclick="progress4()" class="el-button">更新100%</button>
<button onclick="progress5()" class="el-button">显示失败</button>

<script>
(function () {
  $('#progress1').progress();
  $('#progress2').progress({textInside: true, strokeWidth: 18});
})();
function progress1() {
  $('#progress1, #progress2').progress('update', {
    text: '',
    percentage: 0,
    color: '#20a0ff'
  });
}
function progress2() {
  $('#progress1, #progress2').progress('update', 30);
}
function progress3() {
  $('#progress1, #progress2').progress('update', 60);
}
function progress4() {
  $('#progress1, #progress2').progress('update', {
    text: 'Done',
    percentage: 100,
    color: '#67c23a'
  });
}
function progress5() {
  $('#progress1, #progress2').progress('update', {
    text: 'Fail',
    percentage: 100,
    color: '#ff4949'
  });
}
</script>
```
:::

### 环形进度条
::: demo 配置`type`为`'circle'`，显示环形进度条。

```html
<div id="progress3"></div>
<br><br>
<button onclick="progress6()" class="el-button">重置</button>
<button onclick="progress7()" class="el-button">更新30%</button>
<button onclick="progress8()" class="el-button">更新60%</button>
<button onclick="progress9()" class="el-button">更新100%</button>
<button onclick="progress10()" class="el-button">显示失败</button>

<script>
(function () {
  $('#progress3').progress({type: 'circle'});
})();
function progress6() {
  $('#progress3').progress('update', {
    text: '',
    percentage: 0,
    color: '#20a0ff'
  });
}
function progress7() {
  $('#progress3').progress('update', 30);
}
function progress8() {
  $('#progress3').progress('update', 60);
}
function progress9() {
  $('#progress3').progress('update', {
    text: 'Done',
    percentage: 100,
    color: '#67c23a'
  });
}
function progress10() {
  $('#progress3').progress('update', {
    text: 'Fail',
    percentage: 100,
    color: '#ff4949'
  });
}
</script>
```
:::

### 参数
你可以通过修改`$.fn.progress.defaults`来修改全局默认配置，也可以在初始化时传入指定配置`$(#id).progress({xx: xx})`。
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| type | 进度条类型 | string | line/circle | `'line'` |
| percentage | 百分比进度 | number | - | `0` |
| strokeWidth | 进度条的宽度，单位`px` | number | - | `6` |
| textInside | 进度条显示文字内置在进度条内（只在 type=line 时可用） | boolean | - | `false` |
| color | 进度条背景色 | string | - | `'#20a0ff'` |
| circleWidth | 环形进度条画布宽度（只在 type=circle 时可用） | number | - | `126` |
| showText | 是否显示进度条文字内容（自定义文字或百分比） | boolean | - | `true` |
| text | 自定义文字（覆盖百分比显示） | string | - | `''` |

### 方法
你可以通过调用`$(#id).progress('update', xxx)`来更新**已被初始化过**的元素的进度状态。
| 方法      | 说明          | 举例  |
|---------- |-------------- |-------------------------- |
| update | 更新进度条状态，传入number表示更新百分比进度，传入object支持更新进度条的三种状态：`percentage`、`color`、`text`。 | `$(#id).progress('update', 20)`或`$(#id).progress('update', {text: 'Done', percentage: 100, color: '#67c23a'}})` |
