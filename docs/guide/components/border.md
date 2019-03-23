## Border 边框
我们对边框进行统一规范，可用于按钮、卡片、弹窗等组件里。

### 边框
我们提供了一下几种边框样式，以供选择。
| 名称      | 粗细         |举例                           |
|---------- |------------- |-----------------------------  |
| 实线 | 1px |  <div style="border: 1px solid #eee; height: 0; width: 200px;"></div> |
| 虚线 | 2px |  <div style="border: 2px dashed #eee; height: 0; width: 200px;"></div> |

### 圆角
我们提供了一下几种圆角样式，以供选择。
<style>
.demo-radius .radius {
    height: 60px;
    width: 70%;
    border: 1px solid #d7dae2;
    border-radius: 0;
    margin-top: 20px;
}
</style>
<div class="demo-radius el-row" style="margin-left: -6px; margin-right: -6px;">
  <div class="el-col el-col-6 el-col-xs-12" style="padding-left: 6px; padding-right: 6px;">
    <div class="title">无圆角</div><div class="value">border-radius: 0px</div><div class="radius"></div>
  </div>
  <div class="el-col el-col-6 el-col-xs-12" style="padding-left: 6px; padding-right: 6px;">
    <div class="title">小圆角</div><div class="value">border-radius: 2px</div><div class="radius" style="border-radius: 2px;"></div>
  </div>
  <div class="el-col el-col-6 el-col-xs-12" style="padding-left: 6px; padding-right: 6px;">
    <div class="title">大圆角</div><div class="value">border-radius: 4px</div><div class="radius" style="border-radius: 4px;"></div>
  </div>
  <div class="el-col el-col-6 el-col-xs-12" style="padding-left: 6px; padding-right: 6px;">
    <div class="title">圆形圆角</div><div class="value">border-radius: 30px</div><div class="radius" style="border-radius: 30px;"></div>
  </div>
</div>

### 投影
我们提供了一下几种投影样式，以供选择。
<style>
.demo-shadow { height: 100px; width: 50%; border: 1px solid #eee; margin: 10px 0; }
</style>
<div class="demo-shadow" style="box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 4px, rgba(0, 0, 0, 0.04) 0px 0px 6px;"></div>
基础投影：`box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)`
<div class="demo-shadow" style="box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;"></div>
浅色投影：`box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)`
