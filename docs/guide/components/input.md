## Input 输入框
通过鼠标或键盘输入字符。

### 基础用法
::: demo 为`<input>`添加`el-input__inner`样式，并以一个`class="el-input"`的父元素包裹它，可通过`el-input--medium`、`el-input--small`、`el-input--mini`设置大小。

``` html
<div id="demo-input-base">
  <div class="el-input">
    <input type="text" class="el-input__inner" autocomplete="off" placeholder="正常大小">
  </div>
  <div class="el-input el-input--medium">
    <input type="text" class="el-input__inner" autocomplete="off" placeholder="中等大小">
  </div>
  <div class="el-input el-input--small">
    <input type="text" class="el-input__inner" autocomplete="off" placeholder="小型大小">
  </div>
  <div class="el-input el-input--mini">
    <input type="text" class="el-input__inner" autocomplete="off" placeholder="迷你大小">
  </div>
</div>

<style>
#demo-input-base .el-input { width: 150px; }
</style>
```
:::

### 禁用状态
::: demo 除了为Input设置`disabled`属性，还要为父元素添加`is-disabled`样式。

``` html
<div class="el-input is-disabled">
  <input type="text" disabled="disabled" class="el-input__inner" autocomplete="off" placeholder="请输入内容">
</div>
```
:::

### 带图标
带有图标标记输入类型。
::: demo

``` html
<div class="demo-inpu-icon">
  <div class="el-input el-input--suffix">
    <input type="text" autocomplete="off" placeholder="后缀图标" class="el-input__inner">
    <span class="el-input__suffix">
      <span class="el-input__suffix-inner"><i class="el-input__icon el-icon-date"></i></span>
    </span>
  </div>
  <div class="el-input el-input--prefix">
    <input type="text" autocomplete="off" placeholder="前缀图标" class="el-input__inner">
    <span class="el-input__prefix"><i class="el-input__icon el-icon-search"></i></span>
  </div>
</div><br>
<div class="demo-inpu-icon">
  <div class="el-input el-input--suffix">
    <input type="text" autocomplete="off" placeholder="悬浮显示" class="el-input__inner">
    <span class="el-input__suffix demo-input-hover">
      <span class="el-input__suffix-inner"><i class="el-input__icon el-icon-circle-close"></i></span>
    </span>
  </div>
  <div class="el-input el-input--suffix">
    <input type="text" autocomplete="off" placeholder="点击清空" class="el-input__inner" id="demo-input1">
    <span class="el-input__suffix demo-input-pointer" onclick="demoInput1()">
      <span class="el-input__suffix-inner"><i class="el-input__icon el-icon-circle-close"></i></span>
    </span>
  </div>
</div>

<script>
function demoInput1 () {
  $('#demo-input1').val('');
}
</script>

<style>
.demo-inpu-icon .el-input { width: 180px; }
.el-input .demo-input-pointer{ cursor: pointer; }
.el-input .demo-input-hover{ display: none; }
.el-input:hover .demo-input-hover{ display: inline-block; }
</style>
```
:::

### 复合型输入框
可前置或后置元素，一般为标签或按钮
::: demo 为`<input>`添加`el-input__inner`样式，并以一个`class="el-input"`的父元素包裹它。

``` html
<div class="el-input el-input-group el-input-group--prepend">
  <div class="el-input-group__prepend">Http://</div>
  <input type="text" autocomplete="off" placeholder="请输入内容" class="el-input__inner">
</div><br><br>
<div class="el-input el-input-group el-input-group--append">
  <input type="text" autocomplete="off" placeholder="请输入内容" class="el-input__inner">
  <div class="el-input-group__append">.com</div>
</div><br><br>
<div class="input-with-select el-input el-input-group el-input-group--append el-input-group--prepend">
  <div class="el-input-group__prepend">
    <div class="el-select">
      <div class="el-input el-input--suffix">
        <input type="text" readonly="readonly" autocomplete="off" placeholder="请选择" class="el-input__inner">
        <span class="el-input__suffix">
          <span class="el-input__suffix-inner">
            <i class="el-select__caret el-input__icon el-icon-arrow-up"></i>
          </span>
        </span>
      </div>
      <div class="el-select-dropdown el-popper" style="display: none; min-width: 130px;">
        <div class="el-scrollbar" style="">
          <div class="el-select-dropdown__wrap el-scrollbar__wrap" style="margin-bottom: -17px; margin-right: -17px;">
            <ul class="el-scrollbar__view el-select-dropdown__list">
              <li class="el-select-dropdown__item"><span>餐厅名</span></li>
              <li class="el-select-dropdown__item"><span>订单号</span></li>
              <li class="el-select-dropdown__item"><span>用户电话</span></li>
            </ul>
          </div>
          <div class="el-scrollbar__bar is-horizontal">
            <div class="el-scrollbar__thumb" style="transform: translateX(0%);"></div>
          </div>
          <div class="el-scrollbar__bar is-vertical">
            <div class="el-scrollbar__thumb" style="transform: translateY(0%);"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <input type="text" autocomplete="off" placeholder="请输入内容" class="el-input__inner">
  <div class="el-input-group__append">
    <button type="button" class="el-button el-button--default">
      <i class="el-icon-search"></i><!---->
    </button>
  </div>
</div>
```
:::

### 文本域
用于输入多行文本信息
::: demo 为`<input>`添加`el-input__inner`样式，并以一个`class="el-input"`的父元素包裹它。

``` html
<div class="el-textarea">
  <textarea autocomplete="off" rows="2" placeholder="请输入内容" class="el-textarea__inner" style="min-height: 33px;"></textarea>
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
