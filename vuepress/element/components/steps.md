## Steps 步骤条
引导用户按照流程完成任务的分步导航条，可根据实际应用场景设定步骤，步骤不得少于 2 步。

### 基础用法
简单的步骤条。
::: demo 设置`active`属性，接受一个`Number`，表明步骤的 index，从 0 开始。需要定宽的步骤条时，设置`space`属性即可，它接受`Boolean`，单位为`px`，如果不设置，则为自适应。设置`finishStatus`属性可以改变已经完成的步骤的状态。

```html
<div id="demo-steps1"></div>
<br>
<button onclick="demoSteps1()" class="el-button">下一步</button>

<script>
  $('#demo-steps1').steps({
    finishStatus: 'success',
    active: 1,
    data: ['步骤1','步骤2','步骤3']
  });
  var demoSteps1Active = 1;
  function demoSteps1() {
    demoSteps1Active += 1;
    if (demoSteps1Active > 3) {
      demoSteps1Active = 0;
    }
    $('#demo-steps1').steps('set', demoSteps1Active);
  }
</script>
```
:::
::: warning 注意
`$(el)`的`innerHtml`将被替换。
:::

### 有描述的步骤条
每一步骤显示出该步骤的状态。
::: demo 配置`data`的`description`参数。

```html
<div id="demo-steps2"></div>

<script>
  $('#demo-steps2').steps({
    active: 1,
    alignCenter: true,
    data: [
      { title: '步骤1', description: '这是一段很长很长很长的描述性文字' },
      { title: '步骤2', description: '这是一段很长很长很长的描述性文字' },
      { title: '步骤3', description: '这是一段描述性文字' },
      { title: '步骤4', description: '这是一段描述性文字' }
    ]
  });
</script>
```
:::

### 自定义步骤条
可自定义图标、宽度、状态。
::: demo

```html
<div id="demo-steps3"></div>

<script>
  $('#demo-steps3').steps({
    active: 1,
    space: 200,
    data: [
      { title: '步骤1', icon: 'el-icon-edit', status: 'error' },
      { title: '步骤2', icon: 'el-icon-upload' },
      { title: '步骤3', icon: 'el-icon-picture' }
    ]
  });
</script>
```
:::

### 竖式步骤条
竖直方向的步骤条。
::: demo 设置`direction`属性为`vertical`，并且设置元素高度。

```html
<div id="demo-steps4" style="height: 300px;"></div>

<script>
  $('#demo-steps4').steps({
    active: 1,
    direction: 'vertical',
    data: [
      { title: '步骤1' },
      { title: '步骤2' },
      { title: '步骤3', description: '这是一段文字描述' }
    ]
  });
</script>
```
:::

### 简单风格的步骤条
设置 `simple` 可应用简洁风格，该条件下 `align-center / description / direction / space` 都将失效。
::: demo 设置`direction`属性为`vertical`，并且设置元素高度。

```html
<div id="demo-steps5"></div>

<script>
  $('#demo-steps5').steps({
    active: 1,
    simple: true,
    finishStatus: 'success',
    data: ['步骤1', '步骤2', '步骤3']
  });
</script>
```
:::

### 参数
你可以通过修改`$.fn.steps.defaults`来修改全局默认配置，也可以在初始化时传入指定配置`$(#id).steps({xx: xx})`。
参数默认为 Json ，若为数组，则会被当做`data`赋值。
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------- |---------- |-------------  |-------- |
| data          | 步骤参数数组，具体配置见下方【data参数】   | array  | - | `[]` |
| space | 每个 step 的间距，不填写将自适应间距。支持百分比。 | number / string | - | - |
| direction | 显示方向 | string | vertical/horizontal | `'horizontal'` |
| active | 设置当前激活步骤  | number | - | 1 |
| processStatus | 设置当前步骤的状态 | string | wait / process / finish / error / success | `'process'` |
| finishStatus | 设置结束步骤的状态 | string | wait / process / finish / error / success | `'finish'` |
| alignCenter | 进行居中对齐 | boolean | - | `false` |
| simple | 是否应用简洁风格 | boolean | - | `false` |

### data参数
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| title | 标题 | string | - | - |
| description | 描述性文字 | string | - | - |
| icon | 图标 | 传入 icon 的 class | string | - |
| status | 设置当前步骤的状态，不设置则根据 steps 确定状态 | string | wait / process / finish / error / success | - |

### 方法
你可以通过调用`$(#id).steps('set', xxx)`来更新**已被初始化过**的步骤条的状态。
| 方法      | 说明          | 举例  |
|---------- |-------------- |---------------- |
| set | 设置当前激活步骤，从`1`开始算 | `$(el).steps('set', 2)` |
