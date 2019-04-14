## Transfer 穿梭框

### 基础用法
::: demo Transfer 的数据通过 data 属性传入。数据需要是一个对象数组，每个对象有以下属性：key 为数据的唯一性标识，label 为显示文本，disabled 表示该项数据是否禁止转移。目标列表中的数据项会同步到绑定至 v-model 的变量，值为数据项的 key 所组成的数组。当然，如果希望在初始状态时目标列表不为空，可以像本例一样为 v-model 绑定的变量赋予一个初始值。

``` html
<div id="demo-transfer1"></div>

<script>
  $('#demo-transfer1').transfer(['选项1', '选项2','选项3', '选项4', '选项5']);
</script>
```
:::

### 禁用状态
单选框不可用的状态，可初始化时指定，也可动态设置。
::: demo 通过`$(el).checkbox({disabled: true})`在初始化时快速设置`checkbox`禁用样式，或`$(el).checkbox('disabled'})`、`$(el).checkbox('show'})`动态设置禁用状态。

``` html
<div>
  <input name="Demo2" type="checkbox" value="1" label="苹果"/>
  <input name="Demo2" type="checkbox" value="2" label="葡萄"/>
</div><br>
<div>
  <button onclick="demoCheckbox1()" class="el-button">禁用Checkbox</button>
  <button onclick="demoCheckbox2()" class="el-button">启用Checkbox</button>
</div>

<script>
  $('[name=Demo2]').checkbox({disabled: true});
  function demoCheckbox1() {
    $('[name=Demo2]').checkbox('disabled');
  }
  function demoCheckbox2() {
    $('[name=Demo2]').checkbox('show');
  }
</script>
```
:::

### indeterminate 状态
`indeterminate`属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果。
::: demo 使用`$(el).checkbox('set', xxx)`来设置`checkbox`状态，避免重复触发`change`事件。

``` html
<div>
  <input name="Demo12All" type="checkbox" label="全选"/><br><br>
  <input name="Demo12" type="checkbox" value="1" label="苹果"/>
  <input name="Demo12" type="checkbox" value="2" label="葡萄"/>
  <input name="Demo12" type="checkbox" value="3" label="香蕉"/>
  <input name="Demo12" type="checkbox" value="4" label="其他"/>
</div>

<script>
  $('[name=Demo12]').checkbox({
    onchange: function(){
      var _all = $('[name=Demo12]').length;
      var _checked = $('[name=Demo12]:checked').length;
      if (_all === _checked) {
        $('[name=Demo12All]').checkbox('set', true);
      } else if (_checked === 0) {
        $('[name=Demo12All]').checkbox('set', false);
      } else {
        $('[name=Demo12All]').checkbox('set', 'indeterminate');
      }
    }
  });
  $('[name=Demo12All]').checkbox({
    onchange: function () {
      $('[name=Demo12]').checkbox('set', $('[name=Demo12All]').is(':checked'));
    }
  });

</script>
```
:::

### 可选项目数量的限制
使用`min`和`max`属性能够限制可以被勾选的项目的数量。
::: demo 通过`$(el).checkbox({min: 1, max: 3})`在初始化时设置`checkbox`最小/大选择数。

``` html
<div>
  <input name="Demo11" type="checkbox" value="1" label="苹果"/>
  <input name="Demo11" type="checkbox" value="2" label="葡萄"/>
  <input name="Demo11" type="checkbox" value="3" label="香蕉"/>
  <input name="Demo11" type="checkbox" value="4" label="其他"/>
</div>

<script>
  $('[name=Demo11]').checkbox({min: 1, max: 3});
</script>
```
:::

### 按钮样式
按钮样式的单选组合。
::: demo 通过`$(el).checkbox({button: true})`在初始化时快速设置`checkbox`按钮样式。通过一个`class="el-checkbox-group"`的父元素包裹起来。

``` html
<div>
  <input name="Demo3" type="checkbox" value="1" label="苹果"/>
  <input name="Demo3" type="checkbox" value="2" label="葡萄"/>
  <input name="Demo3" type="checkbox" value="3" label="香蕉"/>
  <input name="Demo3" type="checkbox" value="4" label="其他"/>
</div><br><br>
<div>
  <input name="Demo4" type="checkbox" value="1" label="苹果"/>
  <input name="Demo4" type="checkbox" value="2" label="葡萄"/>
  <input name="Demo4" type="checkbox" value="3" label="香蕉"/>
  <input name="Demo4" type="checkbox" value="4" label="其他"/>
</div><br><br>
<div>
  <input name="Demo5" type="checkbox" value="1" label="苹果"/>
  <input name="Demo5" type="checkbox" value="2" label="葡萄" disabled/>
  <input name="Demo5" type="checkbox" value="3" label="香蕉"/>
  <input name="Demo5" type="checkbox" value="4" label="其他"/>
</div><br><br>
<div>
  <input name="Demo6" type="checkbox" value="1" label="苹果"/>
  <input name="Demo6" type="checkbox" value="2" label="葡萄"/>
  <input name="Demo6" type="checkbox" value="3" label="香蕉"/>
  <input name="Demo6" type="checkbox" value="4" label="其他"/>
</div>

<script>
  $('[name=Demo3]').checkbox({button: true, checked: ['1']});
  $('[name=Demo4]').checkbox({button: true, size: 'medium', checked: true});
  $('[name=Demo5]').checkbox({button: true, size: 'small', checked: ['1']});
  $('[name=Demo6]').checkbox({button: true, size: 'mini', disabled: true, checked: ['1']});
</script>
```
:::

### 带有边框
按钮样式的单选组合。
::: demo 通过`$(el).checkbox({button: true})`在初始化时快速设置`checkbox`按钮样式。通过一个父元素将所有 Checkbox 包裹起来。

``` html
<div>
  <input name="Demo7" type="checkbox" value="1" label="苹果"/>
  <input name="Demo7" type="checkbox" value="2" label="葡萄"/>
  <input name="Demo7" type="checkbox" value="3" label="香蕉"/>
  <input name="Demo7" type="checkbox" value="4" label="其他"/>
</div><br>
<div>
  <input name="Demo8" type="checkbox" value="1" label="苹果"/>
  <input name="Demo8" type="checkbox" value="2" label="葡萄"/>
  <input name="Demo8" type="checkbox" value="3" label="香蕉"/>
  <input name="Demo8" type="checkbox" value="4" label="其他"/>
</div><br><br>
<div>
  <input name="Demo9" type="checkbox" value="1" label="苹果"/>
  <input name="Demo9" type="checkbox" value="2" label="葡萄"/>
  <input name="Demo9" type="checkbox" value="3" label="香蕉" disabled/>
  <input name="Demo9" type="checkbox" value="4" label="其他"/>
</div><br><br>
<div>
  <input name="Demo10" type="checkbox" value="1" label="苹果"/>
  <input name="Demo10" type="checkbox" value="2" label="葡萄"/>
  <input name="Demo10" type="checkbox" value="3" label="香蕉"/>
  <input name="Demo10" type="checkbox" value="4" label="其他"/>
</div>

<script>
  $('[name=Demo7]').checkbox({border: true, checked: ['1']});
  $('[name=Demo8]').checkbox({border: true, size: 'medium', checked: ['1']});
  $('[name=Demo9]').checkbox({border: true, size: 'small', checked: ['1']});
  $('[name=Demo10]').checkbox({border: true, size: 'mini', disabled: true, checked: ['1']});
</script>
```
:::

### 参数
你可以通过修改`$.fn.checkbox.defaults`来修改全局默认配置，也可以在初始化时传入指定配置`$(el).checkbox({xx: xx})`。
| 参数      | 说明                       | 类型      | 可选值 | 默认值  |
|---------- |--------------------------- |---------- |------  |-------- |
| disabled     | 是否禁用checkbox（若 Checkbox 有`disabled`属性则以其为准） | boolean | - | `false` |
| button     | 是否启用按钮模式 | boolean | - | `false` |
| border     | 非按钮模式是否显示边框 | boolean | - | `false` |
| size | 按钮/边框模式的大小设置 | string | medium / small / mini | `''` |
| checked | 默认选中值 | boolean / array | - | `false` |
| min | 同名多选框最少选中数，0表示无限制（若没设置`checked`，默认选择前几个） | number | - | `0` |
| max | 同名多选框最多选中数，0表示无限制（若设置了`checked`，只选中前几个） | number | - | `0` |
| indeterminate | 设置 indeterminate 状态，只负责样式控制 | boolean | - | `false` |
| onchange | 当绑定值变化时触发的事件 | function | - | - |

### 方法
你可以通过调用`$(el).checkbox('xxx')`来快速设置按钮状态。
| 方法      | 说明          | 举例  |
|---------- |-------------- |-------- |
| disabled | 禁用checkbox | `$(el).checkbox('disabled')` |
| show | 取消禁用状态 | `$(el).checkbox('show')` |
| set | 设置checkbox选中状态（不会触发 change 事件） | `$(el).checkbox('set', true / false / 'checked' / 'unchecked' / 'indeterminate')` |
