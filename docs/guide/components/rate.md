## Rate 评分
评分组件

### 基础用法
::: demo 评分被分为三个等级，可以利用颜色对分数及情感倾向进行分级（默认情况下不区分颜色）。三个等级所对应的颜色用过`colors`属性设置，而它们对应的两个阈值则通过 `lowThreshold` 和 `highThreshold` 设定。

``` html
默认不区分颜色
<div id="demo-rate1"></div><br>
区分颜色
<div id="demo-rate2"></div>

<script>
  $('#demo-rate1').rate();
  $('#demo-rate2').rate({colors: ['#99A9BF', '#F7BA2A', '#FF9900']});
</script>
```
:::

### 辅助文字
用辅助文字直接地表达对应分数
::: demo 为组件设置 `showText` 属性会在右侧显示辅助文字。通过设置 `texts` 可以为每一个分值指定对应的辅助文字。`texts` 为一个数组，长度应等于最大值 `max`。

``` html
显示文本
<div id="demo-rate3"></div><br>
显示分数
<div id="demo-rate4"></div>

<script>
  $('#demo-rate3').rate({showText: true});
  $('#demo-rate4').rate({showScore: true});
</script>
```
:::

### 其它 icon
当有多层评价时，可以用不同类型的 icon 区分评分层级
::: demo 设置`iconClasses`属性可以自定义对应 3 个不同分段的图标。本例还使用`voidIconClass`指定了未选中时的图标类名。

``` html
<div id="demo-rate5"></div>

<script>
  $('#demo-rate5').rate({
    iconClasses: ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3'],
    voidIconClass: 'icon-rate-face-off',
    colors: ['#99A9BF', '#F7BA2A', '#FF9900']
  });
</script>
```
:::

### 只读
只读的评分用来展示分数，允许出现半星
::: demo 为组件设置 `disabled` 属性表示组件为只读，支持小数分值。此时若设置 `showScore`，则会在右侧显示目前的分值。可以提供 `scoreTemplate` 作为显示模板，模板为一个包含了 `{value}` 的字符串，`{value}` 会被解析为分值。。

``` html
<div id="demo-rate6"></div>

<script>
  $('#demo-rate6').rate({
    value: 3.7,
    disabled: true,
    showScore: true,
    textColor: '#ff9900',
    scoreTemplate: '{value}'
  });
</script>
```
:::

### 方法
调用方法
::: demo 示模板，模板为一个包含了 `{value}` 的字符串，`{value}` 会被解析为分值。。

``` html
<div id="demo-rate7"></div>

<script>
  $('#demo-rate7').rate({ allowHalf: true, showScore: true });
</script>
```
:::

### 参数
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value | 分数值 | number | - | `0` |
| max | 最大分值 | number | - | `5` |
| disabled | 是否为只读 | boolean | - | `false` |
| allowHalf | 是否允许半选 | boolean | - | `false` |
| lowThreshold | 低分和中等分数的界限值，值本身被划分在低分中 | number | - | `2` |
| highThreshold | 高分和中等分数的界限值，值本身被划分在高分中 | number | - | `4` |
| colors | icon 的颜色数组，共有 3 个元素，为 3 个分段所对应的颜色 | array | - | `['#F7BA2A', '#F7BA2A', '#F7BA2A']` |
| voidColor | 未选中 icon 的颜色 | string | - | `'#C6D1DE'` |
| disabledVoidColor | 只读时未选中 icon 的颜色 | string | - | `'#EFF2F7'` |
| iconClasses | icon 的类名数组，共有 3 个元素，为 3 个分段所对应的类名 | array | - | `['el-icon-star-on', 'el-icon-star-on','el-icon-star-on']` |
| voidIconClass | 未选中 icon 的类名 | string | - | `'el-icon-star-off'` |
| disabledVoidIconClass | 只读时未选中 icon 的类名 | string | - | `'el-icon-star-on'` |
| showText | 是否显示辅助文字，若为真，则会从 texts 数组中选取当前分数对应的文字内容 | boolean | - | `false` |
| showScore | 是否显示当前分数，（优先级低于 show-text ） | boolean | - | `false` |
| textColor | 辅助文字的颜色 | string | - | `'#1F2D3D'` |
| texts | 辅助文字数组 | array | - | `['极差', '失望', '一般', '满意', '惊喜']` |
| scoreTemplate | 分数显示模板 | string | - | `'{value}'` |
| onchange | 值改变时触发的事件（参数`(newValue, oldValue)`） | function | - | - |

### 方法
你可以通过调用`$(el).rate('xxx')`来调用开关方法。
| 方法      | 说明          | 举例  |
|---------- |-------------- |-------- |
| disabled | 禁用评分 | `$(el).rate('disabled')` |
| show | 取消禁用状态 | `$(el).rate('show')` |
| set | 设置分数（不会触发 change 事件） | `$(el).rate('set', 3)` |
| get | 获取分数 | `$(el).rate('get')` |
