## Radio 单选框
在一组备选项中进行单选。由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。

### 基础样式
你可以使用原生的radio，也可以自己修改 radio 为符合主题风格的样式。以下静态基础样式，**无法点击**，
若要实现交互可自己写样式的修改逻辑，也可参考[基础用法](#基础用法)。
::: demo

``` html
<div>
  <label role="radio" tabindex="0" class="el-radio">
    <span class="el-radio__input">
      <span class="el-radio__inner"></span>
      <input type="radio" aria-hidden="true" tabindex="-1" class="el-radio__original" value="1">
    </span>
    <span class="el-radio__label">备选项</span>
  </label>
  <label role="radio" tabindex="0" class="el-radio is-checked" aria-checked="true">
    <span class="el-radio__input is-checked">
      <span class="el-radio__inner"></span>
      <input type="radio" aria-hidden="true" tabindex="-1" class="el-radio__original" value="2">
    </span>
    <span class="el-radio__label">备选项</span>
  </label>
  <label role="radio" aria-disabled="true" tabindex="-1" class="el-radio is-disabled">
    <span class="el-radio__input is-disabled">
      <span class="el-radio__inner"></span>
      <input type="radio" aria-hidden="true" disabled="disabled" tabindex="-1" class="el-radio__original" value="禁用">
    </span>
    <span class="el-radio__label">备选项</span>
  </label>
</div>
```
:::

### 基础用法
快速设置 radio 样式的方法。
::: demo 通过`$(el).radio()`快速设置`radio`样式。

``` html
<div>
  <input name="Fruit" type="radio" value="1" label="苹果"/>
  <input name="Fruit" type="radio" value="2" label="葡萄"/>
  <input name="Fruit" type="radio" value="3" label="香蕉"/>
  <input name="Fruit" type="radio" value="4" label="其他"/>
</div>

<script>
  $('[name=Fruit]').radio();
</script>
```
:::

### 方法
你可以通过调用`$(#id).button('xxx')`来快速设置按钮状态。
| 方法      | 说明          | 举例  |
|---------- |-------------- |-------- |
| disabled | 禁用按钮 | `$(#id).button('disabled')` |
| loading | 按钮显示加载中 | `$(#id).button('loading')` |
| show | 取消禁用和加载状态 | `$(#id).button('show')` |
