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
<button onclick="progress2()" class="el-button">更新50%</button>
<button onclick="progress3()" class="el-button">更新100%</button>
<button onclick="progress4()" class="el-button">显示失败</button>

<script>
(function () {
  $('#progress1').progress();
  $('#progress2').progress({textInside: true, strokeWidth: 18});
})();
function progress1() {
  $('#progress1, #progress2').progress('update', {
    text: '',
    percentage: 0,
    color: ''
  });
}
function progress2() {
  $('#progress1, #progress2').progress('update', 50);
}
function progress3() {
  $('#progress1, #progress2').progress('update', {
    text: 'Done',
    percentage: 100,
    color: '#67c23a'
  });
}
function progress4() {
  $('#progress1, #progress2').progress('update', {
    text: 'Fail',
    percentage: 100,
    color: '#ff4949'
  });
}
</script>
```
:::

### 线形进度条 — 百分比内显


### 参数
你可以通过修改`$.fn.loading.defaults`来修改全局默认配置，也可以在初始化时传入指定配置`$(#id).loading({xx: xx})`。
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| icon | 自定义加载图标，支持html | string | - | `''` |
| text | 自定义加载文本 | string | - | `''` |
| main | 自定义加载特效（覆盖`icon`和`text`），支持html，你可以添加`el-loading-spinner`类让其居中 | string | - | `''` |
| background | 遮罩背景色 | string | - | `''` |
| autoShow | 初始化时自动显示特效 | boolean | - | `true` |
| override | 若有旧特效，是否重新覆盖 | boolean | - | `false` |

### 方法
你可以通过调用`$(#id).loading('xxx')`来调用**已被初始化过**的元素的Loading方法。
| 方法      | 说明          | 举例  |
|---------- |-------------- |-------- |
| show | 显示加载特效 | `$(#id).loading('show')` |
| hide | 隐藏加载特效 | `$(#id).loading('hide')` |
