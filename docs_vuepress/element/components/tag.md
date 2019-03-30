## Tag 标签
用于标记和选择。

### 基础用法
::: demo 为`<span>`添加`el-tag`样式。

``` html
<div>
  <span class="el-tag">标签一</span>
  <span class="el-tag el-tag--success">标签二</span>
  <span class="el-tag el-tag--info">标签三</span>
  <span class="el-tag el-tag--warning">标签四</span>
  <span class="el-tag el-tag--danger">标签五</span>
</div>
```
:::

### 可移除标签
::: demo 添加一个`class="el-tag__close"`元素控制移除标签。

``` html
<div id="demo-tag1">
  <span class="el-tag">标签一<i class="el-tag__close el-icon-close"></i></span>
  <span class="el-tag el-tag--success">标签二<i class="el-tag__close el-icon-close"></i></span>
  <span class="el-tag el-tag--info">标签三<i class="el-tag__close el-icon-close"></i></span>
  <span class="el-tag el-tag--warning">标签四<i class="el-tag__close el-icon-close"></i></span>
  <span class="el-tag el-tag--danger">标签五<i class="el-tag__close el-icon-close"></i></span>
</div>

<script>
$('#demo-tag1 .el-tag__close').on('click', function(e){
  $(e.target).parent().remove();
});
</script>
```
:::

### 不同尺寸
::: demo 添加一个`class="el-tag__close"`元素控制移除标签。

``` html
<div id="demo-tag1">
  <span class="el-tag">默认标签</i></span>
  <span class="el-tag el-tag--medium">中等标签</span>
  <span class="el-tag el-tag--small">小型标签</span>
  <span class="el-tag el-tag--mini">超小标签</span>
</div>
```
:::
