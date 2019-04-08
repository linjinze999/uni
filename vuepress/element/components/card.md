## Card 卡片
将信息聚合在卡片容器中展示。

### 基础用法
包含标题，内容和操作。
::: demo 为`<button>`添加`el-button`样式设置按钮，添加不同的额外样式设置不同的表现。

``` html
<div class="el-card is-always-shadow">
  <div class="el-card__header">
    <div class="clearfix">
      <span>卡片名称</span>
      <button class="el-button el-button--text" style="float: right; padding: 3px 0px;">
        操作按钮
      </button>
    </div>
  </div>
  <div class="el-card__body">
    卡片内容
  </div>
</div>
```
:::

### 简单卡片
卡片可以只有内容区域。
::: demo

``` html
<div class="el-card is-always-shadow">
  <div class="el-card__body">
    卡片内容
  </div>
</div>
```
:::

### 卡片阴影
可对阴影的显示进行配置。
::: demo 添加`is-always-shadow`、`is-hover-shadow`或`is-never-shadow`样式。

``` html
<div class="el-row">
  <div class="el-col el-col-8" style="padding: 0 6px;">
    <div class="el-card is-always-shadow">
      <div class="el-card__body">
        总是显示
      </div>
    </div>
  </div>
  <div class="el-col el-col-8" style="padding: 0 6px;">
    <div class="el-card is-hover-shadow">
      <div class="el-card__body">
        鼠标悬浮时显示
      </div>
    </div>
  </div>
  <div class="el-col el-col-8" style="padding: 0 6px;">
    <div class="el-card is-never-shadow">
      <div class="el-card__body">
        从不显示
      </div>
    </div>
  </div>
</div>
```
:::
