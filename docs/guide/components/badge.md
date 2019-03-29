## Badge 标记
出现在按钮、图标旁的数字或状态标记。

### 基本用法
展示新消息数量。
::: demo 调用`$(el).badge()`方法初始化标记。

```html
<style>
#demo-badge-parent1 .el-badge{ margin-right: 40px; }
</style>

<div id="demo-badge-parent1">
  <button class="el-button" id="demo-badge1">评论</button>
  <button class="el-button" id="demo-badge2">回复</button>
  <button class="el-button" id="demo-badge3">评论</button>
  <button class="el-button" id="demo-badge4">回复</button>
  <span id="demo-badge5">评论</span>
</div>

<script>
$('#demo-badge1').badge({value: 12});
$('#demo-badge2').badge({value: 12, max: 9});
$('#demo-badge3').badge({value: 1, type: 'primary'});
$('#demo-badge4').badge({value: 2, type: 'warning'});
$('#demo-badge5').badge({value: 0, hidden: true});
</script>
```
:::

### 自定义内容
可以显示数字以外的文本内容，或以红点的形式标注需要关注的内容。
::: demo `value`可以是`number`或`string`。

```html
<style>
#demo-badge-parent2 .el-badge{ margin-right: 40px; }
</style>

<div id="demo-badge-parent2">
  <button class="el-button" id="demo-badge6">评论</button>
  <button class="el-button" id="demo-badge7">回复</button>
  <button class="el-button el-button--primary" id="demo-badge8"><i class="el-icon-share"></i></button>
  <span id="demo-badge9">数据查询</span>
</div>

<script>
$('#demo-badge6').badge({value: 'new'});
$('#demo-badge7').badge({value: 'hot'});
$('#demo-badge8').badge({isDot: true});
$('#demo-badge9').badge({isDot: true});
</script>
```
:::

### 方法
::: demo 通过调用`$(el).badge('set', xxx)`、`$(el).badge('get')`设置、获取值，设置值可以直接传入`value`，也可以传入新的配置参数。

```html
<style>
#demo-badge-parent3 .el-badge{ margin-right: 40px; }
</style>

<div id="demo-badge-parent3">
  <button class="el-button" id="demo-badge10" onclick="demoBadge1()">设置值</button>
  <button class="el-button" id="demo-badge11" onclick="demoBadge2()">获取值</button>
  <button class="el-button" id="demo-badge12" onclick="demoBadge3()">重新设置</button>
</div>

<script>
$('#demo-badge10').badge({value: 9});
$('#demo-badge11').badge({value: 5});
$('#demo-badge12').badge({isDot: true});
function demoBadge1 () {
  $('#demo-badge10').badge('set', 8);
}
function demoBadge2 () {
  alert($('#demo-badge11').badge('get'));
}
function demoBadge3 () {
  $('#demo-badge12').badge('set', {max: 5, value: 3, isDot: false});
}
</script>
```
:::

### 参数
你可以通过修改`$.fn.badge.defaults`来修改全局默认配置，也可以在初始化时传入指定配置`$(el).badge({xx: xx})`。
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value | 显示值 | number / string | - | `''` |
| max | 最大值，超过最大值会显示 '{max}+'，要求 value 是 Number 类型 | number | - | - |
| isDot | 小圆点 | boolean | - | `false` |
| hidden | 隐藏 badge | boolean | - | `false` |
| type | 类型 | string | primary / success / warning / danger / info | - |

### 方法
你可以通过调用`$(el).badge('xxx')`来调用**已被初始化过**的元素的Badge方法。
| 方法      | 说明          | 举例  |
|---------- |-------------- |-------- |
| set | 重新设置Badge（可直接传入值，也可传入新的配置参数） | `$(el).badge('set', 9)`或`$(el).badge('set', {'hidden', true})` |
| get | 获取值 | `$(el).badge('get')` |
