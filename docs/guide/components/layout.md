## Layout 布局
通过基础的 24 分栏，迅速简便地创建布局。

### 基础布局
使用单一分栏创建基础的栅格布局。
::: demo 通过`el-row`和`el-col`样式来布局。

``` html
<div class="demo-layout1">
  <div class="el-row">
    <div class="el-col el-col-24"><div class="grid-content bg-purple-dark"></div></div>
  </div>
  <div class="el-row">
    <div class="el-col el-col-12"><div class="grid-content bg-purple"></div></div>
    <div class="el-col el-col-12"><div class="grid-content bg-purple-light"></div></div>
  </div>
  <div class="el-row">
    <div class="el-col el-col-8"><div class="grid-content bg-purple"></div></div>
    <div class="el-col el-col-8"><div class="grid-content bg-purple-light"></div></div>
    <div class="el-col el-col-8"><div class="grid-content bg-purple"></div></div>
  </div>
  <div class="el-row">
    <div class="el-col el-col-6"><div class="grid-content bg-purple"></div></div>
    <div class="el-col el-col-6"><div class="grid-content bg-purple-light"></div></div>
    <div class="el-col el-col-6"><div class="grid-content bg-purple"></div></div>
    <div class="el-col el-col-6"><div class="grid-content bg-purple-light"></div></div>
  </div>
  <div class="el-row">
    <div class="el-col el-col-4"><div class="grid-content bg-purple"></div></div>
    <div class="el-col el-col-4"><div class="grid-content bg-purple-light"></div></div>
    <div class="el-col el-col-4"><div class="grid-content bg-purple"></div></div>
    <div class="el-col el-col-4"><div class="grid-content bg-purple-light"></div></div>
    <div class="el-col el-col-4"><div class="grid-content bg-purple"></div></div>
    <div class="el-col el-col-4"><div class="grid-content bg-purple-light"></div></div>
  </div>
</div>

<style>
.demo-layout1 .el-row { margin-bottom: 20px; }
.demo-layout1 .grid-content { border-radius: 4px; min-height: 36px; }
.demo-layout1 .bg-purple-dark { background: #99a9bf; }
.demo-layout1 .bg-purple { background: #d3dce6; }
.demo-layout1 .bg-purple-light { background: #e5e9f2; }
</style>
```
:::

### 分栏间隔
分栏之间存在间隔。
::: demo 通过为`el-col`设置`padding`来实现间隔。

``` html
<div class="demo-layout2">
  <div class="el-row">
    <div class="el-col el-col-6"><div class="grid-content bg-purple"></div></div>
    <div class="el-col el-col-6"><div class="grid-content bg-purple-light"></div></div>
    <div class="el-col el-col-6"><div class="grid-content bg-purple"></div></div>
    <div class="el-col el-col-6"><div class="grid-content bg-purple-light"></div></div>
  </div>
</div>

<style>
.demo-layout2 .el-col { padding: 0 10px; }
.demo-layout2 .grid-content { border-radius: 4px; min-height: 36px; }
.demo-layout2 .bg-purple { background: #d3dce6; }
.demo-layout2 .bg-purple-light { background: #e5e9f2; }
</style>
```
:::

### 混合布局
通过基础的 1/24 分栏任意扩展组合形成较为复杂的混合布局。
::: demo 将`el-col`设置为任意`n * (1/24)`宽度。

``` html
<div class="demo-layout3">
  <div class="el-row">
    <div class="el-col el-col-16"><div class="grid-content bg-purple"></div></div>
    <div class="el-col el-col-8"><div class="grid-content bg-purple"></div></div>
  </div>
  <div class="el-row">
    <div class="el-col el-col-8"><div class="grid-content bg-purple"></div></div>
    <div class="el-col el-col-8"><div class="grid-content bg-purple"></div></div>
    <div class="el-col el-col-4"><div class="grid-content bg-purple"></div></div>
    <div class="el-col el-col-4"><div class="grid-content bg-purple"></div></div>
  </div>
  <div class="el-row">
    <div class="el-col el-col-4"><div class="grid-content bg-purple"></div></div>
    <div class="el-col el-col-16"><div class="grid-content bg-purple"></div></div>
    <div class="el-col el-col-4"><div class="grid-content bg-purple"></div></div>
  </div>
</div>

<style>
.demo-layout3 .el-col { padding: 10px 10px; }
.demo-layout3 .grid-content { border-radius: 4px; min-height: 36px; }
.demo-layout3 .bg-purple { background: #d3dce6; }
</style>
```
:::

### 分栏偏移
支持偏移指定的栏数。
::: demo 通过设置`el-col-offset`指定分栏偏移的栏数。

``` html
<div class="demo-layout4">
  <div class="el-row">
    <div class="el-col el-col-6"><div class="grid-content bg-purple"></div></div>
    <div class="el-col el-col-6 el-col-offset-6"><div class="grid-content bg-purple"></div></div>
  </div>
  <div class="el-row">
    <div class="el-col el-col-6 el-col-offset-6"><div class="grid-content bg-purple"></div></div>
    <div class="el-col el-col-6 el-col-offset-6"><div class="grid-content bg-purple"></div></div>
  </div>
  <div class="el-row">
    <div class="el-col el-col-12 el-col-offset-6"><div class="grid-content bg-purple"></div></div>
  </div>
</div>

<style>
.demo-layout4 .el-col { padding: 10px 10px; }
.demo-layout4 .grid-content { border-radius: 4px; min-height: 36px; }
.demo-layout4 .bg-purple { background: #d3dce6; }
</style>
```
:::

### 对齐方式
通过`flex`布局来对分栏进行灵活的对齐。
::: demo 通过设置`el-row--flex`启用`flex`布局，然后指定` `、`is-justify-center`、`is-justify-end`、`is-justify-space-between`、`is-justify-space-around`、排版方式。

``` html
<div class="demo-layout5">
  <div class="el-row row-bg el-row el-row--flex">
    <div class="el-col el-col-6"><div class="grid-content bg-purple"></div></div>
    <div class="el-col el-col-6"><div class="grid-content bg-purple-light"></div></div>
    <div class="el-col el-col-6"><div class="grid-content bg-purple"></div></div>
  </div>
  <div class="el-row row-bg el-row el-row--flex is-justify-center">
    <div class="el-col el-col-6"><div class="grid-content bg-purple"></div></div>
    <div class="el-col el-col-6"><div class="grid-content bg-purple-light"></div></div>
    <div class="el-col el-col-6"><div class="grid-content bg-purple"></div></div>
  </div>
  <div class="el-row row-bg el-row el-row--flex is-justify-end">
    <div class="el-col el-col-6"><div class="grid-content bg-purple"></div></div>
    <div class="el-col el-col-6"><div class="grid-content bg-purple-light"></div></div>
    <div class="el-col el-col-6"><div class="grid-content bg-purple"></div></div>
  </div>
  <div class="el-row row-bg el-row el-row--flex is-justify-space-between">
    <div class="el-col el-col-6"><div class="grid-content bg-purple"></div></div>
    <div class="el-col el-col-6"><div class="grid-content bg-purple-light"></div></div>
    <div class="el-col el-col-6"><div class="grid-content bg-purple"></div></div>
  </div>
  <div class="el-row row-bg el-row el-row--flex is-justify-space-around">
    <div class="el-col el-col-6"><div class="grid-content bg-purple"></div></div>
    <div class="el-col el-col-6"><div class="grid-content bg-purple-light"></div></div>
    <div class="el-col el-col-6"><div class="grid-content bg-purple"></div></div>
  </div>
</div>

<style>
.demo-layout5 .el-row { margin-bottom: 20px; }
.demo-layout5 .row-bg { padding: 10px 0; background-color: #f9fafc; }
.demo-layout5 .grid-content { border-radius: 4px; min-height: 36px; }
.demo-layout5 .bg-purple { background: #d3dce6; }
.demo-layout5 .bg-purple-light { background: #e5e9f2; }
</style>
```
:::

### 响应式布局
参照了 Bootstrap 的 响应式设计，预设了五个响应尺寸：`xs`、`sm`、`md`、`lg` 和 `xl`。
::: demo 屏幕分辨率关系：`xs: <768px`，`sm: ≥768px`，`md: ≥992px`，`lg: ≥1200px`，`xl: ≥1920px`。

``` html
<div class="demo-layout6">
  <div class="el-row">
    <div class="el-col el-col-24 el-col-xs-8 el-col-sm-6 el-col-md-4 el-col-lg-3 el-col-xl-1">
      <div class="grid-content bg-purple"></div>
    </div>
    <div class="el-col el-col-24 el-col-xs-4 el-col-sm-6 el-col-md-8 el-col-lg-9 el-col-xl-11">
      <div class="grid-content bg-purple-light"></div>
    </div>
    <div class="el-col el-col-24 el-col-xs-4 el-col-sm-6 el-col-md-8 el-col-lg-9 el-col-xl-11">
      <div class="grid-content bg-purple"></div>
    </div>
    <div class="el-col el-col-24 el-col-xs-8 el-col-sm-6 el-col-md-4 el-col-lg-3 el-col-xl-1">
      <div class="grid-content bg-purple-light"></div>
    </div>
  </div>
</div>

<style>
.demo-layout6 .el-col { padding: 0 5px; }
.demo-layout6 .grid-content { border-radius: 4px; min-height: 36px; }
.demo-layout6 .bg-purple { background: #d3dce6; }
.demo-layout6 .bg-purple-light { background: #e5e9f2; }
</style>
```
:::

### 基于断点的隐藏类

Element 额外提供了一系列类名，用于在某些条件下隐藏元素。这些类名可以添加在任何 DOM 元素或自定义组件上。如果需要，请自行引入以下文件：
```html
<link rel="stylesheet" href="display.css">
```

包含的类名及其含义为：
- `hidden-xs-only` - 当视口在 `xs` 尺寸时隐藏
- `hidden-sm-only` - 当视口在 `sm` 尺寸时隐藏
- `hidden-sm-and-down` - 当视口在 `sm` 及以下尺寸时隐藏
- `hidden-sm-and-up` - 当视口在 `sm` 及以上尺寸时隐藏
- `hidden-md-only` - 当视口在 `md` 尺寸时隐藏
- `hidden-md-and-down` - 当视口在 `md` 及以下尺寸时隐藏
- `hidden-md-and-up` - 当视口在 `md` 及以上尺寸时隐藏
- `hidden-lg-only` - 当视口在 `lg` 尺寸时隐藏
- `hidden-lg-and-down` - 当视口在 `lg` 及以下尺寸时隐藏
- `hidden-lg-and-up` - 当视口在 `lg` 及以上尺寸时隐藏
- `hidden-xl-only` - 当视口在 `xl` 尺寸时隐藏
