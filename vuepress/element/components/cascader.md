## Cascader 级联选择器
当一个数据集合有清晰的层级结构时，可通过级联选择器逐级查看并选择。

### 基础用法
有两种触发子菜单的方式
::: demo 直接传入数组将被当做`data`参数处理。

``` html
<div id="demo-cascaderPanel1"></div>

<script>
  $('#demo-cascaderPanel1').cascaderPanel({checkStrictly:true,data:[{
                                                    value: 'zhinan',
                                                    label: '指南',
                                                    children: [{
                                                      value: 'shejiyuanze',
                                                      label: '设计原则',
                                                      children: [{
                                                        value: 'yizhi',
                                                        label: '一致'
                                                      }, {
                                                        value: 'fankui',
                                                        label: '反馈'
                                                      }, {
                                                        value: 'xiaolv',
                                                        label: '效率'
                                                      }, {
                                                        value: 'kekong',
                                                        label: '可控'
                                                      }]
                                                    }, {
                                                      value: 'daohang',
                                                      label: '导航',
                                                      children: [{
                                                        value: 'cexiangdaohang',
                                                        label: '侧向导航'
                                                      }, {
                                                        value: 'dingbudaohang',
                                                        label: '顶部导航'
                                                      }]
                                                    }]
                                                  }, {
                                                    value: 'zujian',
                                                    label: '组件',
                                                    children: [{
                                                      value: 'basic',
                                                      label: 'Basic',
                                                      children: [{
                                                        value: 'layout',
                                                        label: 'Layout 布局'
                                                      }, {
                                                        value: 'color',
                                                        label: 'Color 色彩'
                                                      }, {
                                                        value: 'typography',
                                                        label: 'Typography 字体'
                                                      }, {
                                                        value: 'icon',
                                                        label: 'Icon 图标'
                                                      }, {
                                                        value: 'button',
                                                        label: 'Button 按钮'
                                                      }]
                                                    }, {
                                                      value: 'form',
                                                      label: 'Form',
                                                      children: [{
                                                        value: 'radio',
                                                        label: 'Radio 单选框'
                                                      }, {
                                                        value: 'checkbox',
                                                        label: 'Checkbox 多选框'
                                                      }, {
                                                        value: 'input',
                                                        label: 'Input 输入框'
                                                      }, {
                                                        value: 'input-number',
                                                        label: 'InputNumber 计数器'
                                                      }, {
                                                        value: 'select',
                                                        label: 'Select 选择器'
                                                      }, {
                                                        value: 'cascader',
                                                        label: 'Cascader 级联选择器'
                                                      }, {
                                                        value: 'switch',
                                                        label: 'Switch 开关'
                                                      }, {
                                                        value: 'slider',
                                                        label: 'Slider 滑块'
                                                      }, {
                                                        value: 'time-picker',
                                                        label: 'TimePicker 时间选择器'
                                                      }, {
                                                        value: 'date-picker',
                                                        label: 'DatePicker 日期选择器'
                                                      }, {
                                                        value: 'datetime-picker',
                                                        label: 'DateTimePicker 日期时间选择器'
                                                      }, {
                                                        value: 'upload',
                                                        label: 'Upload 上传'
                                                      }, {
                                                        value: 'rate',
                                                        label: 'Rate 评分'
                                                      }, {
                                                        value: 'form',
                                                        label: 'Form 表单'
                                                      }]
                                                    }, {
                                                      value: 'data',
                                                      label: 'Data',
                                                      children: [{
                                                        value: 'table',
                                                        label: 'Table 表格'
                                                      }, {
                                                        value: 'tag',
                                                        label: 'Tag 标签'
                                                      }, {
                                                        value: 'progress',
                                                        label: 'Progress 进度条'
                                                      }, {
                                                        value: 'tree',
                                                        label: 'Tree 树形控件'
                                                      }, {
                                                        value: 'pagination',
                                                        label: 'Pagination 分页'
                                                      }, {
                                                        value: 'badge',
                                                        label: 'Badge 标记'
                                                      }]
                                                    }, {
                                                      value: 'notice',
                                                      label: 'Notice',
                                                      children: [{
                                                        value: 'alert',
                                                        label: 'Alert 警告'
                                                      }, {
                                                        value: 'loading',
                                                        label: 'Loading 加载'
                                                      }, {
                                                        value: 'message',
                                                        label: 'Message 消息提示'
                                                      }, {
                                                        value: 'message-box',
                                                        label: 'MessageBox 弹框'
                                                      }, {
                                                        value: 'notification',
                                                        label: 'Notification 通知'
                                                      }]
                                                    }, {
                                                      value: 'navigation',
                                                      label: 'Navigation',
                                                      children: [{
                                                        value: 'menu',
                                                        label: 'NavMenu 导航菜单'
                                                      }, {
                                                        value: 'tabs',
                                                        label: 'Tabs 标签页'
                                                      }, {
                                                        value: 'breadcrumb',
                                                        label: 'Breadcrumb 面包屑'
                                                      }, {
                                                        value: 'dropdown',
                                                        label: 'Dropdown 下拉菜单'
                                                      }, {
                                                        value: 'steps',
                                                        label: 'Steps 步骤条'
                                                      }]
                                                    }, {
                                                      value: 'others',
                                                      label: 'Others',
                                                      children: [{
                                                        value: 'dialog',
                                                        label: 'Dialog 对话框'
                                                      }, {
                                                        value: 'tooltip',
                                                        label: 'Tooltip 文字提示'
                                                      }, {
                                                        value: 'popover',
                                                        label: 'Popover 弹出框'
                                                      }, {
                                                        value: 'card',
                                                        label: 'Card 卡片'
                                                      }, {
                                                        value: 'carousel',
                                                        label: 'Carousel 走马灯'
                                                      }, {
                                                        value: 'collapse',
                                                        label: 'Collapse 折叠面板'
                                                      }]
                                                    }]
                                                  }, {
                                                    value: 'ziyuan',
                                                    label: '资源',
                                                    children: [{
                                                      value: 'axure',
                                                      label: 'Axure Components'
                                                    }, {
                                                      value: 'sketch',
                                                      label: 'Sketch Templates'
                                                    }, {
                                                      value: 'jiaohu',
                                                      label: '组件交互文档'
                                                    }]
                                                  }]});
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
::: demo 使用`allowCreate`属性即可通过在输入框中输入文字来创建新的条目。注意此时`filterable`必须为真。本例还使用了`defaultFirstOption`属性，在该属性打开的情况下，按下回车就可以选中当前选项列表中的第一个选项，无需使用鼠标或键盘方向键进行定位。

``` html
<select id="demo-select10"></select>

<script>
  $('#demo-select10').select({
    multiple: true,
    allowCreate: true,
    filterable: true,
    defaultFirstOption: true,
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
你可以通过修改`$.fn.select.defaults`来修改全局默认配置，也可以在初始化时传入指定配置`$(el).select({xx: xx})`。
| 参数      | 说明                       | 类型      | 可选值 | 默认值  |
|---------- |--------------------------- |---------- |------  |-------- |
| value | 绑定值 | string / array | - | - |
| data | 可选项，见下方【data参数】 | array[string / { value, label, disabled }] | - | `[]` |
| width | 宽度 | string | - | `240px` |
| multiple | 是否多选 | boolean | - | `false` |
| disabled | 是否禁用 | boolean | - | `false` |
| optionTemplate | 自定义模板 | function | - | - |
| size | 输入框尺寸 | string | medium/small/mini | - |
| clearable | 是否可以清空选项 | boolean | - | `false` |
| collapseTags | 多选时是否将选中值按文字的形式展示 | boolean | - | `false` |
| multipleLimit | 多选时用户最多可以选择的项目数，为 0 则不限制 | number | - | `0` |
| autocomplete | select input 的 autocomplete 属性 | string | - | `'off'` |
| placeholder | 占位符 | string | - | `'请选择'` |
| filterable | 是否可搜索 | boolean | - | `false` |
| allowCreate | 是否允许用户创建新条目，需配合 `filterable` 使用 | boolean | - | `false` |
| filterMethod | 自定义搜索方法 | function | - | - |
| noMatchText | 搜索条件无匹配时显示的文字 | string | - | `'无匹配数据'` |
| noDataText | 选项为空时显示的文字 | string | - | `'无数据'` |
| popperClass | Select 下拉框的类名 | string | - | - |
| reserveKeyword | 多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词 | boolean | - | `false` |
| defaultFirstOption | 在输入框按下回车，选择第一个匹配项。需配合 `filterable` 使用 | boolean | - | `false` |
| change | 值变更时触发的函数，参数为新值 | function(value) | - | - |
| visibleChange | 下拉框出现/隐藏时触发，参数出现为 true，隐藏为 false | function(true/false) | - | - |
| removeTag | 多选模式下移除tag时触发，参数为移除的tag值 | function(value) | - | - |
| clear | 可清空的单选模式下用户点击清空按钮时触发 | function | - | - |
| i18n | 国际化文本 key 值，参数见下方【i18n国际化】 | object | - | - |

### data参数
参数默认为 Json ，若为字符串，则会被当做`value`赋值。
| 参数     | 说明    | 类型      | 可选值       | 默认值   |
|--------- |-------- |--------- |-----------  |-------- |
| value | 值 | string | - | - |
| label | 显示文本 | string | - | - |
| disabled | 禁止使用 | boolean | - | `false` |
| options | 分组子选项数组 | array | - | - |

### 方法
你可以通过调用`$(el).select('xxx')`来调用组件方法。
| 方法      | 说明          | 举例  |
|---------- |-------------- |-------- |
| disable | 禁用 | `$(el).select('disable')` |
| enable | 取消禁用 | `$(el).select('enable')` |
| set | 设置值 | `$(el).select('set', 1 / [1, 2])` |
| get | 获取值 | `$(el).select('get')` |
| show | 显示下拉框 | `$(el).select('show')` |
| hide | 隐藏下拉框 | `$(el).select('hide')` |

### i18n国际化
| 参数      | 说明    | 默认值   |
|--------- |-------- |-------- |
| placeholder | 占位符 | `'uSelectPlaceholder'` |
| noData | 无数据 | `'uSelectNoData'` |
| noMatch | 无匹配数据 | `'uSelectNoMatch'` |
