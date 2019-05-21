## Link 文字链接
文字超链接

### 基础用法
基础的文字链接用法。
::: demo

``` html
<div>
  <a href="#" target="_blank" class="el-link el-link--default is-underline"><span class="el-link--inner">默认链接</span></a>
  <a href="#" target="_blank" class="el-link el-link--primary is-underline"><span class="el-link--inner">主要链接</span></a>
  <a href="#" target="_blank" class="el-link el-link--success is-underline"><span class="el-link--inner">成功链接</span></a>
  <a href="#" target="_blank" class="el-link el-link--warning is-underline"><span class="el-link--inner">警告链接</span></a>
  <a href="#" target="_blank" class="el-link el-link--danger is-underline"><span class="el-link--inner">危险链接</span></a>
  <a href="#" target="_blank" class="el-link el-link--info is-underline"><span class="el-link--inner">信息链接</span></a>
</div>
```
:::

### 禁用状态
文字链接不可用状态。
::: demo

``` html
<div>
  <a class="el-link el-link--default is-disabled"><span class="el-link--inner">默认链接</span></a>
  <a class="el-link el-link--primary is-disabled"><span class="el-link--inner">主要链接</span></a>
  <a class="el-link el-link--success is-disabled"><span class="el-link--inner">成功链接</span></a>
  <a class="el-link el-link--warning is-disabled"><span class="el-link--inner">警告链接</span></a>
  <a class="el-link el-link--danger is-disabled"><span class="el-link--inner">危险链接</span></a>
  <a class="el-link el-link--info is-disabled"><span class="el-link--inner">信息链接</span></a>
</div>
```
:::

### 下划线
文字链接下划线。
::: demo

``` html
<div>
  <a class="el-link el-link--default"><span class="el-link--inner">无下划线</span></a>
  <a class="el-link el-link--default is-underline"><span class="el-link--inner">有下划线</span></a>
</div>
```
:::

### 图标
带图标的文字链接可增强辨识度。
::: demo

``` html
<div>
  <a class="el-link el-link--default is-underline"><i class="el-icon-edit"></i><span class="el-link--inner">编辑</span></a>
  <a class="el-link el-link--default is-underline"><i class="el-icon--right el-icon-view"></i><span class="el-link--inner">查看</span></a>
</div>
```
:::
