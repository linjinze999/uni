## Container 布局容器
用于布局的容器组件，方便快速搭建页面的基本结构：
- `el-container`：外层容器，指定`is-vertical`垂直上下排列，否则会水平左右排列。
- `el-header`：顶栏容器。
- `el-aside`：侧边栏容器。
- `el-main`：主要区域容器。
- `el-footer`：底栏容器。
::: tip 提示
以上组件采用了 flex 布局，使用前请确定目标浏览器是否兼容。此外，`el-container`的子元素只能是后四者，
后四者的父元素也只能是`el-container`。
:::

### 常见页面布局
::: demo

``` html
<div class="demo-container1">
  <p>布局1</p>
  <section class="el-container is-vertical">
    <header class="el-header" style="height: 60px;">Header</header>
    <main class="el-main">Main</main>
  </section>
  <p>布局2</p>
  <section class="el-container is-vertical">
    <header class="el-header" style="height: 60px;">Header</header>
    <main class="el-main">Main</main>
    <footer class="el-footer" style="height: 60px;">Footer</footer>
  </section>
  <p>布局3</p>
  <section class="el-container">
    <aside class="el-aside" style="width: 200px;">Aside</aside>
    <main class="el-main">Main</main>
  </section>
  <p>布局4</p>
  <section class="el-container is-vertical">
    <header class="el-header" style="height: 60px;">Header</header>
    <section class="el-container">
      <aside class="el-aside" style="width: 200px;">Aside</aside>
      <main class="el-main">Main</main>
    </section>
  </section>
  <p>布局5</p>
  <section class="el-container is-vertical">
    <header class="el-header" style="height: 60px;">Header</header>
    <section class="el-container">
      <aside class="el-aside" style="width: 200px;">Aside</aside>
      <section class="el-container is-vertical">
        <main class="el-main">Main</main>
        <footer class="el-footer" style="height: 60px;">Footer</footer>
      </section>
    </section>
  </section>
  <p>布局6</p>
  <section class="el-container">
    <aside class="el-aside" style="width: 200px;">Aside</aside>
    <section class="el-container is-vertical">
      <header class="el-header" style="height: 60px;">Header</header>
      <main class="el-main">Main</main>
    </section>
  </section>
  <p>布局7</p>
  <section class="el-container">
    <aside class="el-aside" style="width: 200px;">Aside</aside>
    <section class="el-container is-vertical">
      <header class="el-header" style="height: 60px;">Header</header>
      <main class="el-main">Main</main>
      <footer class="el-footer" style="height: 60px;">Footer</footer>
    </section>
  </section>
</div>

<style>
.demo-container1 .el-main { background-color: #e9eef3; color: #333; text-align: center; line-height: 160px; }
.demo-container1 .el-header, .demo-container1 .el-footer { text-align: center; background-color: #b3c0d1; color: #333; line-height: 60px;}
.demo-container1 .el-aside { background-color: #d3dce6; text-align: center; line-height: 200px; }
</style>
```
:::
