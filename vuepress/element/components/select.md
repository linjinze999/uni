## Select 选择器
当选项过多时，使用下拉菜单展示并选择内容。

### 基础用法
适用广泛的基础单选
::: demo 直接传入数组将被当做`data`参数处理。

``` html
<select id="demo-select1"></select>

<script>
  $('#demo-select1').select([
    {
      value: '选项1',
      label: '黄金糕'
    }, {
      value: '选项2',
      label: '双皮奶'
    }, {
      value: '选项3',
      label: '蚵仔煎'
    }, {
      value: '选项4',
      label: '龙须面'
    }, {
      value: '选项5',
      label: '北京烤鸭'
    }
  ]);
</script>
```
:::

### 有禁用选项
::: demo 设定`disabled`值为 `true`，即可禁用该选项。

``` html
<select id="demo-select2"></select>

<script>
  $('#demo-select2').select([
    {
      value: '选项1',
      label: '黄金糕'
    }, {
      value: '选项2',
      label: '双皮奶',
      disabled: true
    }, {
      value: '选项3',
      label: '蚵仔煎'
    }, {
      value: '选项4',
      label: '龙须面'
    }, {
      value: '选项5',
      label: '北京烤鸭'
    }
  ]);
</script>
```
:::

### 禁用状态
选择器不可用状态
::: demo 设置`disabled`属性，则整个选择器不可用。

``` html
<select id="demo-select3"></select>

<script>
  $('#demo-select3').select({
    disabled: true,
    data: [
      {
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }
    ]
  });
</script>
```
:::

### 可清空单选
包含清空按钮，可将选择器清空为初始状态
::: demo 设置`clearable`属性，则可将选择器清空。需要注意的是，`clearable`属性仅适用于单选。

``` html
<select id="demo-select4"></select>

<script>
  $('#demo-select4').select({
    clearable: true,
    data: [
      {
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }
    ]
  });
</script>
```
:::

### 参数
你可以通过修改`$.fn.input.defaults`来修改全局默认配置，也可以在初始化时传入指定配置`$(el).input({xx: xx})`。
| 参数      | 说明                       | 类型      | 可选值 | 默认值  |
|---------- |--------------------------- |---------- |------  |-------- |
| type         | 类型   | string  | text，textarea 和其他 [原生 input 的 type 值](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types) | `'text'` / `'textarea'` |
| showWordLimit | 是否显示输入字数统计，只在 `type = "text"` 或 `type = "textarea"` 时有效 | boolean    |  -  | `false` |
| clearable     | 是否可清空，只在 `type!="textarea"` 时有效        | boolean         | - | `false` |
| showPassword | 是否显示切换密码图标，只在 `type!="textarea"` 时有效| boolean         | - | `false` |
| size          | 输入框尺寸，只在 `type!="textarea"` 时有效      | string          | medium / small / mini  | - |
| prefixIcon   | 输入框头部图标，只在 `type!="textarea"` 时有效    | string          | - | - |
| suffixIcon   | 输入框尾部图标，只在 `type!="textarea"` 时有效    | string          | - | - |
| autosize      | 自适应内容高度，只对 `type="textarea"` 有效，可传入对象，如，`{ minRows: 2, maxRows: 6 }`  |  boolean / object | - |  false   |

### 方法
你可以通过调用`$(el).input('xxx')`来调用组件方法。
| 方法      | 说明          | 举例  |
|---------- |-------------- |-------- |
| disable | 禁用 | `$(el).input('disable')` |
| enable | 取消禁用 | `$(el).input('enable')` |
