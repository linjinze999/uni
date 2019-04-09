## Carousel 走马灯
在有限空间内，循环播放同一类型的图片、文字等内容。

### 基础用法
适用广泛的基础用法
::: demo 通过`$(el).carousel()`初始化走马灯，可传入参数配置，也可直接传入播放数组。

```html
<style>.demo-carouse {line-height: 300px; text-align: center;}</style>

默认 Hover 指示器触发
<div id="demo-carousel1"></div>
<br>
Click 指示器触发
<div id="demo-carousel2"></div>

<script>
  $('#demo-carousel1').carousel([
    '<div class="demo-carouse" style="background-color: #d3dce6">1</div>',
    '<div class="demo-carouse" style="background-color: #99a9bf">2</div>',
    '<div class="demo-carouse" style="background-color: #d3dce6">3</div>',
    '<div class="demo-carouse" style="background-color: #99a9bf">4</div>'
  ]);
  $('#demo-carousel2').carousel({
    trigger: 'click',
    data: [
      '<div class="demo-carouse" style="background-color: #d3dce6">1</div>',
      '<div class="demo-carouse" style="background-color: #99a9bf">2</div>',
      '<div class="demo-carouse" style="background-color: #d3dce6">3</div>',
      '<div class="demo-carouse" style="background-color: #99a9bf">4</div>'
    ]
  });
</script>
```
:::

### 指示器
可以将指示器的显示位置设置在容器外部
::: demo `indicatorPosition`属性定义了指示器的位置。默认情况下，它会显示在走马灯内部，设置为`outside`则会显示在外部；设置为`none`则不会显示指示器。

```html
<style>.demo-carouse {line-height: 300px; text-align: center;}</style>

<div id="demo-carousel3"></div>

<script>
  $('#demo-carousel3').carousel({
    indicatorPosition: 'outside',
    data: [
      '<div class="demo-carouse" style="background-color: #d3dce6">1</div>',
      '<div class="demo-carouse" style="background-color: #99a9bf">2</div>',
      '<div class="demo-carouse" style="background-color: #d3dce6">3</div>',
      '<div class="demo-carouse" style="background-color: #99a9bf">4</div>'
    ]
  });
</script>
```
:::

### 切换箭头
可以设置切换箭头的显示时机
::: demo `arrow`属性定义了切换箭头的显示时机。默认情况下，切换箭头只有在鼠标 `hover` 到走马灯上时才会显示；若将`arrow`设置为`always`，则会一直显示；设置为`never`，则会一直隐藏。

```html
<style>.demo-carouse {line-height: 300px; text-align: center;}</style>

<div id="demo-carousel4"></div>

<script>
  $('#demo-carousel4').carousel({
    arrow: 'always',
    data: [
      '<div class="demo-carouse" style="background-color: #d3dce6">1</div>',
      '<div class="demo-carouse" style="background-color: #99a9bf">2</div>',
      '<div class="demo-carouse" style="background-color: #d3dce6">3</div>',
      '<div class="demo-carouse" style="background-color: #99a9bf">4</div>'
    ]
  });
</script>
```
:::

### 卡片化
当页面宽度方向空间空余，但高度方向空间匮乏时，可使用卡片风格
::: demo 将`type`属性设置为`card`即可启用卡片模式。从交互上来说，卡片模式和一般模式的最大区别在于，可以通过直接点击两侧的幻灯片进行切换。

```html
<style>.demo-carouse {line-height: 300px; text-align: center;}</style>

<div id="demo-carousel5"></div>

<script>
  $('#demo-carousel5').carousel({
    type: 'card',
    data: [
      '<div class="demo-carouse" style="background-color: #d3dce6">1</div>',
      '<div class="demo-carouse" style="background-color: #99a9bf">2</div>',
      '<div class="demo-carouse" style="background-color: #d3dce6">3</div>',
      '<div class="demo-carouse" style="background-color: #99a9bf">4</div>',
      '<div class="demo-carouse" style="background-color: #d3dce6">5</div>',
      '<div class="demo-carouse" style="background-color: #99a9bf">6</div>'
    ]
  });
</script>
```
:::

### 参数
你可以通过修改`$.fn.carousel.defaults`来修改全局默认配置，也可以在初始化时传入指定配置`$(el).carousel({xx: xx})`。
参数默认为 Json ，若为数组，则会被当做`data`赋值。
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| data          | 具体走马灯内容数组，具体配置见下方【data参数】   | array  | - | `[]` |
| height | 走马灯的高度 | string | - | `'300px'` |
| initialIndex | 初始状态激活的幻灯片的索引，从 0 开始 | number | - | `0` |
| trigger | 指示器的触发方式 | string | click | - |
| autoplay | 是否自动切换 | boolean | - | true |
| interval | 自动切换的时间间隔，单位为毫秒 | number | - | 3000 |
| indicatorPosition | 指示器的位置 | string | outside/none | - |
| arrow | 切换箭头的显示时机 | string | always/hover/never | `'hover'` |
| type | 走马灯的类型 | string | card | - |
| loop | 是否循环显示 | boolean | - | `true` |
| change | 幻灯片切换时触发，参数为`(目前激活的幻灯片的 name，原幻灯片的 name)` | function | - | - |

### data参数
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| name | 幻灯片的名字，可用作 `set` 方法的参数 | string | - | 数组的索引index |
| label | 该幻灯片所对应指示器的文本 | string | - | - |
| content | 该幻灯片所对应内容 | string | - | - |

### 方法
你可以通过调用`$(el).carousel('xxx', xxx)`来调用**已被初始化过**的走马灯的方法。
| 方法名    | 说明          | 参数 | 举例 |
|---------- |-------------- |  --  | ------ |
| set  | 手动切换幻灯片 | 需要切换的幻灯片的索引，从 0 开始；或相应的 `name` 值 | `$(el).carousel('set', 3)` |
| prev | 切换至上一张幻灯片 | - | `$(el).carousel('prev')` |
| next | 切换至下一张幻灯片 | - | `$(el).carousel('next')` |
