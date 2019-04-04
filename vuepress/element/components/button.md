## Button 按钮
常用的操作按钮。

### 基础用法
基础的按钮用法。
::: demo 为`<button>`添加`el-button`样式设置按钮，添加不同的额外样式设置不同的表现。

``` html
<div>
  <div class="el-row" style="margin-bottom: 10px;">
    <button type="button" class="el-button el-button--default"><span>默认按钮</span></button>
    <button type="button" class="el-button el-button--primary"><span>主要按钮</span></button>
    <button type="button" class="el-button el-button--success"><span>成功按钮</span></button>
    <button type="button" class="el-button el-button--info"><span>信息按钮</span></button>
    <button type="button" class="el-button el-button--warning"><span>警告按钮</span></button>
    <button type="button" class="el-button el-button--danger"><span>危险按钮</span></button>
  </div>
  <div class="el-row" style="margin-bottom: 10px;">
    <button type="button" class="el-button el-button--default is-plain"><span>朴素按钮</span></button>
    <button type="button" class="el-button el-button--primary is-plain"><span>主要按钮</span></button>
    <button type="button" class="el-button el-button--success is-plain"><span>成功按钮</span></button>
    <button type="button" class="el-button el-button--info is-plain"><span>信息按钮</span></button>
    <button type="button" class="el-button el-button--warning is-plain"><span>警告按钮</span></button>
    <button type="button" class="el-button el-button--danger is-plain"><span>危险按钮</span></button>
  </div>
  <div class="el-row" style="margin-bottom: 10px;">
    <button type="button" class="el-button el-button--default is-round"><span>圆角</span></button>
    <button type="button" class="el-button el-button--primary is-round"><span>主要</span></button>
    <button type="button" class="el-button el-button--success is-round"><span>成功</span></button>
    <button type="button" class="el-button el-button--info is-round"><span>信息</span></button>
    <button type="button" class="el-button el-button--warning is-round"><span>警告</span></button>
    <button type="button" class="el-button el-button--danger is-round"><span>危险</span></button>
  </div>
  <div class="el-row" style="margin-bottom: 10px;">
    <button type="button" class="el-button el-button--default is-circle"><i class="el-icon-search"></i></button>
    <button type="button" class="el-button el-button--primary is-circle"><i class="el-icon-edit"></i></button>
    <button type="button" class="el-button el-button--success is-circle"><i class="el-icon-check"></i></button>
    <button type="button" class="el-button el-button--info is-circle"><i class="el-icon-message"></i></button>
    <button type="button" class="el-button el-button--warning is-circle"><i class="el-icon-star-off"></i></button>
    <button type="button" class="el-button el-button--danger is-circle"><i class="el-icon-delete"></i></button>
  </div>
</div>
```
:::

### 禁用状态
按钮不可用状态。
::: demo 为`<button>`添加`disabled="disabled"`属性和`is-disabled`样式设置按钮不可点击；也可以直接使用`$(el).button('disabled')`禁用按钮，`$(el).button('show')`恢复。

``` html
<div>
  <div class="el-row" style="margin-bottom: 10px;">
    <button disabled="disabled" type="button" class="el-button el-button--default is-disabled"><span>默认按钮</span></button>
    <button disabled="disabled" type="button" class="el-button el-button--primary is-disabled"><span>主要按钮</span></button>
    <button disabled="disabled" type="button" class="el-button el-button--success is-disabled"><span>成功按钮</span></button>
    <button disabled="disabled" type="button" class="el-button el-button--info is-disabled"><span>信息按钮</span></button>
    <button disabled="disabled" type="button" class="el-button el-button--warning is-disabled"><span>警告按钮</span></button>
    <button disabled="disabled" type="button" class="el-button el-button--danger is-disabled"><span>危险按钮</span></button>
  </div>
  <div class="el-row" style="margin-bottom: 10px;">
    <button disabled="disabled" type="button" class="el-button el-button--default is-plain is-disabled"><span>朴素按钮</span></button>
    <button disabled="disabled" type="button" class="el-button el-button--primary is-plain is-disabled"><span>主要按钮</span></button>
    <button disabled="disabled" type="button" class="el-button el-button--success is-plain is-disabled"><span>成功按钮</span></button>
    <button disabled="disabled" type="button" class="el-button el-button--info is-plain is-disabled"><span>信息按钮</span></button>
    <button disabled="disabled" type="button" class="el-button el-button--warning is-plain is-disabled"><span>警告按钮</span></button>
    <button disabled="disabled" type="button" class="el-button el-button--danger is-plain is-disabled"><span>危险按钮</span></button>
  </div>
  <div class="el-row" style="margin-bottom: 10px;">
    <button type="button" class="el-button el-button--default" onclick="demoLoading1(this)"><span>点击禁用</span></button>
  </div>
</div>

<script>
  function demoLoading1(_el){
    $(_el).button('disabled');
    setTimeout(function(){
      $(_el).button('show');
    }, 2000);
  }
</script>
```
:::

### 文字按钮
没有边框和背景色的按钮。
::: demo 为`<button>`添加`el-button--text`样式设置按钮为文本。

``` html
<div>
  <div class="el-row">
    <button type="button" class="el-button el-button--text"><span>文字按钮</span></button>
    <button disabled="disabled" type="button" class="el-button el-button--text is-disabled"><span>文字按钮</span></button>
  </div>
</div>
```
:::

### 图标按钮
带图标的按钮可增强辨识度（有文字）或节省空间（无文字）。
::: demo 在内容中直接添加图标。

``` html
<div>
  <div class="el-row">
    <button type="button" class="el-button el-button--primary"><i class="el-icon-edit"></i></button>
    <button type="button" class="el-button el-button--primary"><i class="el-icon-share"></i></button>
    <button type="button" class="el-button el-button--primary"><i class="el-icon-delete"></i></button>
    <button type="button" class="el-button el-button--primary"><i class="el-icon-search"></i><span>搜索</span></button>
    <button type="button" class="el-button el-button--primary"><span>上传<i class="el-icon-upload el-icon--right"></i></span></button>
  </div>
</div>
```
:::

### 按钮组
以按钮组的方式出现，常用于多项类似操作。
::: demo 用`el-button-group`嵌套按钮。

``` html
<div>
  <div class="el-button-group">
    <button type="button" class="el-button el-button--primary"><i class="el-icon-arrow-left"></i><span>上一页</span></button>
    <button type="button" class="el-button el-button--primary"><span>下一页<i class="el-icon-arrow-right el-icon--right"></i></span></button>
  </div>
  <div class="el-button-group">
    <button type="button" class="el-button el-button--primary"><i class="el-icon-edit"></i></button>
    <button type="button" class="el-button el-button--primary"><i class="el-icon-share"></i></button>
    <button type="button" class="el-button el-button--primary"><i class="el-icon-delete"></i></button>
  </div>
</div>
```
:::

### 加载中
点击按钮后进行数据加载操作，在按钮上显示加载状态。
::: demo 添加`disabled="disabled"`属性和`is-loading`样式来使按钮处于加载中；也可以直接使用`$(el).button('loading')`加载按钮，`$(el).button('show')`恢复

``` html
<div>
  <button disabled="disabled" type="button" class="el-button el-button--primary is-loading"><i class="el-icon-loading"></i><span>加载中</span></button>
  <button type="button" class="el-button el-button--primary" onclick="demoLoading2(this)"><i class="el-icon-loading"></i><span>点击加载</span></button>
</div>

<script>
  function demoLoading2(_el){
    $(_el).button('loading');
    setTimeout(function(){
      $(_el).button('show');
    }, 2000);
  }
</script>
```
:::

### 不同尺寸
Button 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。
::: demo 通过添加`el-button--medium`、`el-button--small`、`el-button--mini`来设置按钮尺寸。

``` html
<div>
  <div class="el-row" style="margin-bottom: 10px;">
    <button type="button" class="el-button el-button--default"><span>默认按钮</span></button>
    <button type="button" class="el-button el-button--default el-button--medium"><span>中等按钮</span></button>
    <button type="button" class="el-button el-button--default el-button--small"><span>小型按钮</span></button>
    <button type="button" class="el-button el-button--default el-button--mini"><span>超小按钮</span></button>
  </div>
  <div class="el-row">
    <button type="button" class="el-button el-button--default is-round"><span>默认按钮</span></button>
    <button type="button" class="el-button el-button--default el-button--medium is-round"><span>中等按钮</span></button>
    <button type="button" class="el-button el-button--default el-button--small is-round"><span>小型按钮</span></button>
    <button type="button" class="el-button el-button--default el-button--mini is-round"><span>超小按钮</span></button>
  </div>
</div>
```
:::

### 方法
你可以通过调用`$(#id).button('xxx')`来快速设置按钮状态。
| 方法      | 说明          | 举例  |
|---------- |-------------- |-------- |
| disabled | 禁用按钮 | `$(#id).button('disabled')` |
| loading | 按钮显示加载中 | `$(#id).button('loading')` |
| show | 取消禁用和加载状态 | `$(#id).button('show')` |
