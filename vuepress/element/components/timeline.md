## Timeline 时间线
可视化地呈现时间流信息。

### 基础用法
Timeline 可拆分成多个按照时间戳正序或倒序排列的 activity，时间戳是其区分于其他控件的重要特征，使⽤时注意与 Steps 步骤条等区分。
::: demo

```html
<p>正序：</p>
<div id="demo-timeline1"></div>
<p>倒序：</p>
<div id="demo-timeline2"></div>

<script>
  $('#demo-timeline1').timeline([
    { timestamp: '2019-04-01', content: '创建成功' },
    { timestamp: '2019-04-02', content: '通过审核' },
    { timestamp: '2019-04-03', content: '活动按期开始' }
  ]);
  $('#demo-timeline2').timeline({
    reverse: true,
    data: [
      { timestamp: '2019-04-01', content: '创建成功' },
      { timestamp: '2019-04-02', content: '通过审核' },
      { timestamp: '2019-04-03', content: '活动按期开始' }
    ]
  });
</script>
```
:::

### 定义节点样式
可根据实际场景自定义节点尺寸、颜色，或直接使用图标。
::: demo

```html
<div id="demo-timeline3"></div>

<script>
  $('#demo-timeline3').timeline([
    {
      content: '支持使用图标',
      timestamp: '2018-04-12 20:46',
      size: 'large',
      type: 'primary',
      icon: 'el-icon-more'
    }, {
      content: '支持自定义颜色',
      timestamp: '2018-04-03 20:46',
      color: '#0bbd87'
    }, {
      content: '支持自定义尺寸',
      timestamp: '2018-04-03 20:45',
      size: 'large'
    }, {
      content: '默认样式的节点',
      timestamp: '2018-04-03 20:44'
    }
  ]);
</script>
```
:::

### 定义时间戳
当内容在垂直方向上过高时，可将时间戳置于内容之上。
::: demo

```html
<div id="demo-timeline4"></div>

<script>
  $('#demo-timeline4').timeline([
    {
      timestamp: '2019-04-01',
      content: '<div class="el-card is-always-shadow"><div class="el-card__body"><h4>更新 Github 模板</h4> <p>王小虎 提交于 2018/4/12 20:46</p></div></div>',
      placement: 'top'
    }, {
      timestamp: '2019-04-02',
      content: '<div class="el-card is-always-shadow"><div class="el-card__body"><h4>更新 Github 模板</h4> <p>王小虎 提交于 2018/4/3 20:46</p></div></div>',
      placement: 'top'
    }, {
      timestamp: '2019-04-03',
      content: '<div class="el-card is-always-shadow"><div class="el-card__body"><h4>更新 Github 模板</h4> <p>王小虎 提交于 2018/4/2 20:46</p></div></div>',
      placement: 'top'
    }
  ]);
</script>
```
:::

### 参数
你可以通过修改`$.fn.timeline.defaults`来修改全局默认配置，也可以在初始化时传入指定配置`$(el).timeline({xx: xx})`。
参数默认为 Json ，若为数组，则会被当做`data`赋值。
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| reverse | 指定节点排序方向，默认为正序 | boolean | - | false |
| data    | 时间线参数数组，具体配置见下方【data参数】   | array  | - | `[]` |

### data参数
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| timestamp     | 时间戳 | string  | - | - |
| hideTimestamp  | 是否隐藏时间戳 | boolean | - | `false` |
| placement | 时间戳位置 | string | top / bottom | `'bottom'` |
| type | 节点类型 | string | primary / success / warning / danger / info | - |
| color | 节点颜色 | string | hsl / hsv / hex / rgb | - |
| size | 节点尺寸 | string | normal / large | `'normal'` |
| icon | 节点图标 | string | - | - |
