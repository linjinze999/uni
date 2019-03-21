## Loading 加载
加载数据时显示动效。

### 基本用法
基础的加载动效用法。
::: demo 调用`$('#id').loading()`方法初始化加载动效，调用`$('#id').loading('hide')`取消加载。

```html
<style>
.loading1 { text-align: center; height: 100px; padding-top: 36px;
  box-sizing: border-box; border: 1px solid #ccc; }
</style>

<div id="loading1" class="loading1">Loading ...</div><br>
<button onclick="loading1()" class="el-button">显示加载动效</button>
<button onclick="loading2()" class="el-button">隐藏加载动效</button>

<script>
function loading1() { $('#loading1').loading(); }
function loading2() { $('#loading1').loading('hide'); }
</script>
```
:::

### 自定义
自定义加载特效。
::: demo 通过配置`icon`、`text`、`main`、`background`来自定义特效。

```html
<style>
.loading2 { text-align: center; height: 100px; padding-top: 36px;
  box-sizing: border-box; border: 1px solid #ccc; }
</style>

<div id="loading2" class="loading2">Loading ...</div><br>
<button onclick="loading3()" class="el-button">配置型动效</button>
<button onclick="loading4()" class="el-button">自定义动效</button>

<script>
function loading3() {
  $('#loading2').loading({
    icon: '<i class="el-icon-loading"></i>',
    text: 'Loading ...',
    override: true
  });
}
function loading4() {
  $('#loading2').loading({
    main: '<div class="el-loading-spinner" style="color: #fff;">Loading ...</div>',
    background: 'rgba(0, 0, 0, 0.8)',
    override: true
  });
}
</script>
```
:::

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
