## Alert 警告
用于页面中展示重要的提示信息。

### 基础用法
自行编写警告信息。
::: demo 直接使用 class 样式编写 html。

``` html
<style>
#demo-alert-block1 .el-alert { margin-bottom: 20px; }
</style>

<div id="demo-alert-block1">
  <div role="alert" class="el-alert el-alert--success">
    <div class="el-alert__content">
      <span class="el-alert__title">成功提示的文案</span>
      <i class="el-alert__closebtn el-icon-close"></i>
    </div>
  </div>
  <div role="alert" class="el-alert el-alert--info">
    <div class="el-alert__content">
      <span class="el-alert__title">自定义 close-text</span>
      <i class="el-alert__closebtn is-customed">知道了</i>
    </div>
  </div>
  <div role="alert" class="el-alert el-alert--warning is-center">
    <i class="el-alert__icon el-icon-warning"></i>
    <div class="el-alert__content">
      <span class="el-alert__title">文字居中</span>
      <i class="el-alert__closebtn el-icon-close"></i>
    </div>
  </div>
  <div role="alert" class="el-alert el-alert--error">
    <i class="el-alert__icon el-icon-error is-big"></i>
    <div class="el-alert__content">
      <span class="el-alert__title is-bold">带有 icon 和辅助性文字介绍</span>
      <p class="el-alert__description">文字说明文字说明文字说明文字说明文字说明文字说明</p>
      <i class="el-alert__closebtn el-icon-close"></i>
    </div>
  </div>
</div>

<script>
$('#demo-alert1 .el-alert__closebtn').on('click', function(e){
  $(e.target).parents('.el-alert').get(0).remove();
});
</script>
```
:::

### 快速初始化
::: demo 利用`$(el).alert()`快速初始化一个警告框。

``` html
<div id="demo-alert-block2">
  <div id="demo-alert1"></div><br>
  <div id="demo-alert2"></div><br>
  <div id="demo-alert3"></div><br>
  <div id="demo-alert4"></div><br>
  <div id="demo-alert5"></div><br>
</div>

<script>
  $('#demo-alert1').alert({title: '成功提示的文案', type: 'success'});
  $('#demo-alert2').alert({title: '自定义 close-text', closeText: '知道了'});
  $('#demo-alert3').alert({title: '文字居中', center: true, showIcon: true, type: 'warning'});
  $('#demo-alert4').alert({
    title: '带有 icon 和辅助性文字介绍',
    description: '文字说明文字说明文字说明文字说明文字说明文字说明',
    showIcon: true,
    type: 'error'
  });
  $('#demo-alert5').alert({
    title: '<button class="el-button" onclick="hideDemoAlert5()">代码隐藏警告框</button>',
    closable: false
  });
  function hideDemoAlert5(){
    $('#demo-alert5').hide();
  }
</script>
```
:::
::: warning 注意
`$(el)`的`innerHtml`将被替换。
:::

### 参数
你可以通过修改`$.fn.alert.defaults`来修改全局默认配置，也可以在初始化时传入指定配置`$(el).alert({xx: xx})`。
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| title     | 标题           | string | - | `''` |
| type | 主题 | string | success/warning/info/error | `'info'` |
| description | 辅助性文字。也可通过默认 slot 传入 | string | - | - |
| closable | 是否可关闭 | boolean | - | true |
| center | 文字是否居中 | boolean | - | false |
| closeText | 关闭按钮自定义文本 | string | - | - |
| showIcon | 是否显示图标 | boolean | - | false |
| onclose | 关闭事件 | function | - | - |
