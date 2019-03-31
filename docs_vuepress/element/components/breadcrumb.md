## Breadcrumb 面包屑
显示当前页面的路径，快速返回之前的任意页面。

### 基础用法
适用广泛的基础用法。
::: demo 仿照以下代码，通过设置样式编写路径。

``` html
<div aria-label="Breadcrumb" role="navigation" class="el-breadcrumb">
  <span class="el-breadcrumb__item">
    <span role="link" class="el-breadcrumb__inner is-link">首页</span>
    <span role="presentation" class="el-breadcrumb__separator">/</span>
  </span>
  <span class="el-breadcrumb__item">
    <span role="link" class="el-breadcrumb__inner"><a href="#">活动管理</a></span>
    <span role="presentation" class="el-breadcrumb__separator">/</span>
  </span>
  <span class="el-breadcrumb__item">
    <span role="link" class="el-breadcrumb__inner">活动列表</span>
    <span role="presentation" class="el-breadcrumb__separator">/</span>
  </span>
  <span class="el-breadcrumb__item" aria-current="page">
    <span role="link" class="el-breadcrumb__inner">活动详情</span>
    <span role="presentation" class="el-breadcrumb__separator">/</span>
  </span>
</div>
<br>
<div aria-label="Breadcrumb" role="navigation" class="el-breadcrumb">
  <span class="el-breadcrumb__item">
    <span role="link" class="el-breadcrumb__inner is-link">首页</span>
    <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
  </span>
  <span class="el-breadcrumb__item">
    <span role="link" class="el-breadcrumb__inner">活动管理</span>
    <i class="el-breadcrumb__separator el-icon-arrow-right"></i></span>
  <span class="el-breadcrumb__item">
    <span role="link" class="el-breadcrumb__inner">活动列表</span>
    <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
  </span>
  <span class="el-breadcrumb__item" aria-current="page">
    <span role="link" class="el-breadcrumb__inner">活动详情</span>
    <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
    </span>
</div>
```
:::

### 快速初始化
::: demo 利用`$(el).breadcrumb()`快速初始化面包屑路径。

``` html
<style>
  #demo-breadcrumb-pack1 a { text-decoration: none; }
</style>

<div id="demo-breadcrumb-pack1">
  <div id="demo-breadcrumb1"></div>
  <br>
  <div id="demo-breadcrumb2"></div>
</div>

<script>
  $('#demo-breadcrumb1').breadcrumb([
    { inner: '首页', isLink: true, separatorClass: 'el-icon-d-arrow-right' },
    { inner: '<a href="#">活动管理</a>', isLink: true, separator: '→' },
    { inner: '活动列表', isLink: true },
    '活动详情'
  ]);
  $('#demo-breadcrumb2').breadcrumb({
    separatorClass: 'el-icon-arrow-right',
    data: [
      { inner: '首页', isLink: true, separatorClass: 'el-icon-d-arrow-right' },
      { inner: '<a href="#">活动管理</a>', isLink: true },
      { inner: '活动列表' },
      '活动详情'
    ]
  });
</script>
```
:::
::: warning 注意
`$(el)`的`innerHtml`将被替换。
:::

### 参数
你可以通过修改`$.fn.breadcrumb.defaults`来修改全局默认配置，也可以在初始化时传入指定配置`$(el).breadcrumb({xx: xx})`。
参数默认为 Json ，若为数组，则会被当做`data`赋值。
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| separator     | 分隔符           | string | - | `'/'` |
| separatorClass | 图标分隔符 class（覆盖`separator`） | string | - | - |
| isLink | 是否链接样式 | boolean | - | `false` |
| data | 路径数据数组。若子项值为字符串，则被当做`inner`文本，否则会和以上三个配置参数合并 | array(string) / array({inner: string, separator: string, separatorClass: string, isLink: boolean}}) | - | `[]` |
