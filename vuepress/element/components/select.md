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
    value: '选项2',
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

### 基础多选
适用性较广的基础多选，用 Tag 展示已选项
::: demo 设置`multiple`属性即可启用多选，此时`value`的值为当前选中值所组成的数组。默认情况下选中值会以 Tag 的形式展现，你也可以设置`collapseTags`属性将它们合并为一段文字。

``` html
<select id="demo-select5"></select>
<select id="demo-select6"></select>

<script>
  $('#demo-select5').select({
    multiple: true,
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
  $('#demo-select6').select({
      multiple: true,
      collapseTags: true,
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

### 自定义模板
可以自定义备选项
::: demo 自定义`optionTemplate`函数，其接受参数`{value: xx, label: xx, disabled: xx}`，返回一个html。

``` html
<select id="demo-select7"></select>

<script>
  $('#demo-select7').select({
    data: [{
      value: 'Beijing',
      label: '北京'
    }, {
      value: 'Shanghai',
      label: '上海'
    }, {
      value: 'Nanjing',
      label: '南京'
    }, {
      value: 'Chengdu',
      label: '成都'
    }, {
      value: 'Shenzhen',
      label: '深圳'
    }, {
      value: 'Guangzhou',
      label: '广州'
    }],
    optionTemplate: function(option) {
      return '<span>' + option.label + '</span>' +
        '<span style="float: right; color: #8492a6; font-size: 13px">' + option.value + '</span>';
    }
  });
</script>
```
:::

### 分组
备选项进行分组展示
::: demo `data`中，item 内置`options`并声明`label`，将被认定为一个分组。

``` html
<select id="demo-select8"></select>

<script>
  $('#demo-select8').select({
    data: [{
      label: '热门城市',
      options: [{
        value: 'Shanghai',
        label: '上海'
      }, {
        value: 'Beijing',
        label: '北京'
      }]
    }, {
      label: '城市名',
      options: [{
        value: 'Nanjing',
        label: '南京'
      }, {
        value: 'Chengdu',
        label: '成都'
      }, {
        value: 'Shenzhen',
        label: '深圳'
      }, {
        value: 'Guangzhou',
        label: '广州'
      }]
    }]
  });
</script>
```
:::

### 可搜索
可以利用搜索功能快速查找选项
::: demo 设置`filterable`参数即可启用搜索功能。默认情况下，Select 会找出所有`label`属性包含输入值的选项。如果希望使用其他的搜索逻辑，可以通过传入一个`filterMethod`来实现。`filterMethod`为一个`Function`，它会在输入值发生变化时调用，参数为当前输入值。

``` html
<select id="demo-select9"></select>

<script>
  $('#demo-select9').select({
    filterable: true,
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

### 创建条目
可以创建并选中选项中不存在的条目
::: demo 使用`allowCreate`属性即可通过在输入框中输入文字来创建新的条目。注意此时`filterable`必须为真。本例还使用了`default-first-option`属性，在该属性打开的情况下，按下回车就可以选中当前选项列表中的第一个选项，无需使用鼠标或键盘方向键进行定位。

``` html
<select id="demo-select10"></select>

<script>
  $('#demo-select10').select({
    allowCreate: true,
    filterable: true,
    data: [{
      value: 'HTML',
      label: 'HTML'
    }, {
      value: 'CSS',
      label: 'CSS'
    }, {
      value: 'JavaScript',
      label: 'JavaScript'
    }]
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
