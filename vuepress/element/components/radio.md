## Radio 单选框
在一组备选项中进行单选。由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。

### 基础用法
你可以使用原生的radio，也可以按照以下方法快速设置 radio 样式。
::: demo 通过`$(el).radio()`快速设置`radio`样式，`label`属性表示文本值。

``` html
<div>
  <input name="Demo1" type="radio" value="1" label="苹果"/>
  <input name="Demo1" type="radio" value="2" label="葡萄"/>
  <input name="Demo1" type="radio" value="3" label="香蕉"/>
  <input name="Demo1" type="radio" value="4" label="其他"/>
</div>

<script>
  $('[name=Demo1]').radio({ value: '1' });
</script>
```
:::

### 禁用状态
单选框不可用的状态，可初始化时指定，也可动态设置。
::: demo 通过`$(el).radio({disabled: true})`在初始化时快速设置`radio`禁用样式，或`$(el).radio('disabled'})`、`$(el).radio('show'})`动态设置禁用状态。

``` html
<div>
  <input name="Demo2" type="radio" value="1" label="苹果"/>
  <input name="Demo2" type="radio" value="2" label="葡萄"/>
</div><br>
<div>
  <button onclick="demoRadio1()" class="el-button">禁用Radio</button>
  <button onclick="demoRadio2()" class="el-button">启用Radio</button>
</div>

<script>
  $('[name=Demo2]').radio({disabled: true});
  function demoRadio1() {
    $('[name=Demo2]').radio('disabled');
  }
  function demoRadio2() {
    $('[name=Demo2]').radio('show');
  }
</script>
```
:::

### 按钮样式
按钮样式的单选组合。
::: demo 通过`$(el).radio({button: true})`在初始化时快速设置`radio`按钮样式。通过一个`class="el-radio-group"`的父元素包裹起来。

``` html
<div>
  <input name="Demo3" type="radio" value="1" label="苹果"/>
  <input name="Demo3" type="radio" value="2" label="葡萄"/>
  <input name="Demo3" type="radio" value="3" label="香蕉"/>
  <input name="Demo3" type="radio" value="4" label="其他"/>
</div><br><br>
<div>
  <input name="Demo4" type="radio" value="1" label="苹果"/>
  <input name="Demo4" type="radio" value="2" label="葡萄"/>
  <input name="Demo4" type="radio" value="3" label="香蕉"/>
  <input name="Demo4" type="radio" value="4" label="其他"/>
</div><br><br>
<div>
  <input name="Demo5" type="radio" value="1" label="苹果"/>
  <input name="Demo5" type="radio" value="2" label="葡萄" disabled/>
  <input name="Demo5" type="radio" value="3" label="香蕉"/>
  <input name="Demo5" type="radio" value="4" label="其他"/>
</div><br><br>
<div>
  <input name="Demo6" type="radio" value="1" label="苹果"/>
  <input name="Demo6" type="radio" value="2" label="葡萄"/>
  <input name="Demo6" type="radio" value="3" label="香蕉"/>
  <input name="Demo6" type="radio" value="4" label="其他"/>
</div>

<script>
  $('[name=Demo3]').radio({button: true, value: '1'});
  $('[name=Demo4]').radio({button: true, size: 'medium', value: '1'});
  $('[name=Demo5]').radio({button: true, size: 'small', value: '1'});
  $('[name=Demo6]').radio({button: true, size: 'mini', disabled: true, value: '1'});
</script>
```
:::

### 带有边框
按钮样式的单选组合。
::: demo 通过`$(el).radio({button: true})`在初始化时快速设置`radio`按钮样式。通过一个父元素将所有 Radio 包裹起来。

``` html
<div>
  <input name="Demo7" type="radio" value="1" label="苹果"/>
  <input name="Demo7" type="radio" value="2" label="葡萄"/>
  <input name="Demo7" type="radio" value="3" label="香蕉"/>
  <input name="Demo7" type="radio" value="4" label="其他"/>
</div><br>
<div>
  <input name="Demo8" type="radio" value="1" label="苹果"/>
  <input name="Demo8" type="radio" value="2" label="葡萄"/>
  <input name="Demo8" type="radio" value="3" label="香蕉"/>
  <input name="Demo8" type="radio" value="4" label="其他"/>
</div><br><br>
<div>
  <input name="Demo9" type="radio" value="1" label="苹果"/>
  <input name="Demo9" type="radio" value="2" label="葡萄"/>
  <input name="Demo9" type="radio" value="3" label="香蕉" disabled/>
  <input name="Demo9" type="radio" value="4" label="其他"/>
</div><br><br>
<div>
  <input name="Demo10" type="radio" value="1" label="苹果"/>
  <input name="Demo10" type="radio" value="2" label="葡萄"/>
  <input name="Demo10" type="radio" value="3" label="香蕉"/>
  <input name="Demo10" type="radio" value="4" label="其他"/>
</div>

<script>
  $('[name=Demo7]').radio({border: true, value: '1'});
  $('[name=Demo8]').radio({border: true, size: 'medium', value: '1'});
  $('[name=Demo9]').radio({border: true, size: 'small', value: '1'});
  $('[name=Demo10]').radio({border: true, size: 'mini', disabled: true, value: '1'});
</script>
```
:::

### 参数
你可以通过修改`$.fn.radio.defaults`来修改全局默认配置，也可以在初始化时传入指定配置`$(el).radio({xx: xx})`。
| 参数      | 说明                       | 类型      | 可选值 | 默认值  |
|---------- |--------------------------- |---------- |------  |-------- |
| disabled     | 是否禁用radio（若 Radio 有`disabled`属性则以其为准） | boolean | - | `false` |
| button     | 是否启用按钮模式 | boolean | - | `false` |
| border     | 非按钮模式是否显示边框 | boolean | - | `false` |
| size | 按钮/边框模式的大小设置 | string | medium / small / mini | `''` |
| value | 默认选中值 | string | - | `''` |

### 方法
你可以通过调用`$(el).radio('xxx')`来快速设置按钮状态。
| 方法      | 说明          | 举例  |
|---------- |-------------- |-------- |
| disabled | 禁用radio | `$(el).radio('disabled')` |
| show | 取消禁用状态 | `$(el).radio('show')` |
