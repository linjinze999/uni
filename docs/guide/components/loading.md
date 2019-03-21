## Loading 加载
加载数据时显示动效。

### 基本用法
基础的加载动效用法。
::: demo 调用`$('#id').loading();`方法显示加载动效，调用`$('#id').loading('hide');`取消加载。

```html
<div id="loading1" style="height: 100px;">
  <button onclick="loading1()" class="el-button">
    显示加载动效
  </button>
</div>
<button onclick="loading2()" class="el-button">
    隐藏加载动效
</button>

<script>
function loading1() {
  $('#loading1').loading();
}
function loading2() {
  $('#loading1').loading('hide');
}
</script>
```
:::

### 自定义
自定义对话框样式或内容。
::: demo 支持设置`coverBGColor`、`showHeader`、`width`等配置对话框样式。也支持丰富的自定义内容。

```html
<button onclick="loading1()" class="el-button">
  自定义样式对话框
</button>
```
:::

### 参数
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| autoShow     | 对话框id（你可以再次调用对话框函数，设置一个新id值，来弹出一个新的对话框） | string | - | `'u-confirm-0'` |
| html | 遮罩背景色 | string | - | `'rgba(0, 0, 0, .5)'` |
| text | 遮罩背景色 | string | - | `'rgba(0, 0, 0, .5)'` |
| background | 遮罩是否可点击，以隐藏对话框 | boolean | - | `false` |
| spinner | 弹窗z-index样式 | string / number | - | `'100'` |
