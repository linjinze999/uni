## Tabs 标签页
分隔内容上有关联但属于不同类别的数据集合。

### 基础用法
基础的、简洁的标签页。
::: demo 利用`$(el).tabs()`快速初始化标签页。

``` html
<div id="demo-tabs1"></div>

<script>
  $('#demo-tabs1').tabs([
    { name: '用户管理', content: '用户管理内容' },
    { name: '配置管理', content: '配置管理内容' },
    { name: '角色管理', content: '角色管理内容' },
    { name: '定时任务补偿', content: '定时任务补偿内容' },
  ]);
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
