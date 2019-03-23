## Color 色彩
Element 为了避免视觉传达差异，使用一套特定的调色板来规定颜色，为你所搭建的产品提供一致的外观视觉感受。

<style lang="scss">
  .demo-color-box {
    border-radius: 4px;
    padding: 20px;
    height: 114px;
    margin: 5px 0;
    box-sizing: border-box;
    color: #fff;
    font-size: 14px;
    position: relative;

    & .value {
      font-size: 12px;
      opacity: 0.69;
      line-height: 24px;
    }
  }
  .demo-color-box-group {
    .demo-color-box {
      border-radius: 0;
      margin: 0;
    }
    .demo-color-box:first-child {
      border-radius: 4px 4px 0 0;
    }
    .demo-color-box:last-child {
      border-radius: 0 0 4px 4px;
    }
  }
  .bg-blue {
    background-color: #409EFF;
  }

  .bg-color-sub {
      width: 100%;
      height: 40px;
      left: 0;
      bottom: 0;
      position: absolute;
      border-radius: 0 0 4px 4px;
      div {
          height: 100%;
          width: 50%;
          display: inline-block;
          margin: 0 -4px 0 0;
      }
      :first-child {
          border-radius: 0 0 0 4px;
      }
      :last-child {
          border-radius: 0 0 4px 0;
      }
      .bg-blue-sub-item {
          width: 11.1111111%;
          padding: 0;
      }
  }

  .bg-success {
    background-color: #67C23A;
  }
  .bg-warning {
    background-color: #E6A23C;
  }
  .bg-danger {
    background-color: #F56C6C;
  }
  .bg-info {
    background-color: #909399;
  }

  .bg-text-primary {
    background-color: #303133;
  }
  .bg-text-regular {
    background-color: #606266;
  }
  .bg-text-secondary {
    background-color: #909399;
  }
  .bg-text-placeholder {
    background-color: #c0c4cc;
  }

  .bg-border-base {
    background-color: #dcdfe6;
  }
  .bg-border-light {
    background-color: #e4e7ed;
  }
  .bg-border-lighter {
    background-color: #ebeef5;
  }
  .bg-border-extra-light {
    background-color: #f2f6fc;
  }

  [class*=" bg-border-"] {
    color: #303133;
  }

  .demo-color-box-lite {
      color: #303133;
  }

  .demo-color-box-other {
      margin: 10px 0!important;
      border-radius: 4px 4px 4px 4px!important;
      padding: 15px 20px;
  }
</style>

### 主色
Element 主要品牌颜色是鲜艳、友好的蓝色。
<div class="el-row" style="margin-left: -6px; margin-right: -6px;">
  <div class="el-col el-col-10 el-col-xs-12" style="padding-left: 6px; padding-right: 6px;">
    <div class="demo-color-box bg-blue">
      Blue<div class="value">#409EFF</div>
      <div class="bg-color-sub" style="background: rgb(236, 245, 255);width: 100%; height: 40px;">
        <div class="bg-blue-sub-item" style="background: rgb(83, 168, 255);"></div>
        <div class="bg-blue-sub-item" style="background: rgb(102, 177, 255);"></div>
        <div class="bg-blue-sub-item" style="background: rgb(121, 187, 255);"></div>
        <div class="bg-blue-sub-item" style="background: rgb(140, 197, 255);"></div>
        <div class="bg-blue-sub-item" style="background: rgb(160, 207, 255);"></div>
        <div class="bg-blue-sub-item" style="background: rgb(179, 216, 255);"></div>
        <div class="bg-blue-sub-item" style="background: rgb(198, 226, 255);"></div>
        <div class="bg-blue-sub-item" style="background: rgb(217, 236, 255);"></div>
      </div>
    </div>
  </div>
</div>

### 辅助色
除了主色外的场景色，需要在不同的场景中使用（例如危险色表示危险的操作）。
<div class="el-row" style="margin-left: -6px; margin-right: -6px;">
  <div class="el-col el-col-6 el-col-xs-12" style="padding-left: 6px; padding-right: 6px;">
    <div class="demo-color-box" style="background: rgb(103, 194, 58);">
      Success<div class="value">#67C23A</div>
      <div class="bg-color-sub">
        <div class="bg-success-sub-item" style="background: rgb(225, 243, 216);"></div>
        <div class="bg-success-sub-item" style="background: rgb(240, 249, 235);"></div>
      </div>
    </div>
  </div>
  <div class="el-col el-col-6 el-col-xs-12" style="padding-left: 6px; padding-right: 6px;">
    <div class="demo-color-box" style="background: rgb(230, 162, 60);">
      Warning<div class="value">#E6A23C</div>
      <div class="bg-color-sub">
        <div class="bg-success-sub-item" style="background: rgb(250, 236, 216);"></div>
        <div class="bg-success-sub-item" style="background: rgb(253, 246, 236);"></div>
      </div>
    </div>
  </div>
  <div class="el-col el-col-6 el-col-xs-12" style="padding-left: 6px; padding-right: 6px;">
    <div class="demo-color-box" style="background: rgb(245, 108, 108);">
      Danger<div class="value">#F56C6C</div>
      <div class="bg-color-sub">
        <div class="bg-success-sub-item" style="background: rgb(253, 226, 226);"></div>
        <div class="bg-success-sub-item" style="background: rgb(254, 240, 240);"></div>
      </div>
    </div>
  </div>
  <div class="el-col el-col-6 el-col-xs-12" style="padding-left: 6px; padding-right: 6px;">
    <div class="demo-color-box" style="background: rgb(144, 147, 153);">
      Info<div class="value">#909399</div>
      <div class="bg-color-sub">
        <div class="bg-success-sub-item" style="background: rgb(233, 233, 235);"></div>
        <div class="bg-success-sub-item" style="background: rgb(244, 244, 245);"></div>
      </div>
    </div>
  </div>
</div>


### 中性色
中性色用于文本、背景和边框颜色。通过运用不同的中性色，来表现层次结构。
<div class="el-row" style="margin-left: -6px; margin-right: -6px;">
  <div class="el-col el-col-6 el-col-xs-12" style="padding-left: 6px; padding-right: 6px;">
    <div class="demo-color-box-group">
      <div class="demo-color-box demo-color-box-other" style="background: rgb(48, 49, 51);">
        主要文字<div class="value">#303133</div>
      </div>
      <div class="demo-color-box demo-color-box-other" style="background: rgb(96, 98, 102);">
        常规文字<div class="value">#606266</div>
      </div>
      <div class="demo-color-box demo-color-box-other" style="background: rgb(144, 147, 153);">
        次要文字<div class="value">#909399</div>
      </div>
      <div class="demo-color-box demo-color-box-other" style="background: rgb(192, 196, 204);">
        占位文字<div class="value">#C0C4CC</div>
      </div>
    </div>
  </div>
  <div class="el-col el-col-6 el-col-xs-12" style="padding-left: 6px; padding-right: 6px;">
    <div class="demo-color-box-group">
      <div class="demo-color-box demo-color-box-other demo-color-box-lite" style="background: #DCDFE6;">
        一级边框<div class="value">#DCDFE6</div>
      </div>
      <div class="demo-color-box demo-color-box-other demo-color-box-lite" style="background: #E4E7ED;">
        二级边框<div class="value">#E4E7ED</div>
      </div>
      <div class="demo-color-box demo-color-box-other demo-color-box-lite" style="background: #EBEEF5;">
        三级边框<div class="value">#EBEEF5</div>
      </div>
      <div class="demo-color-box demo-color-box-other demo-color-box-lite" style="background: #F2F6FC;">
        四级边框<div class="value">#F2F6FC</div>
      </div>
    </div>
  </div>
  <div class="el-col el-col-6 el-col-xs-12" style="padding-left: 6px; padding-right: 6px;">
    <div class="demo-color-box-group">
      <div class="demo-color-box demo-color-box-other" style="background: rgb(0, 0, 0);">
        基础黑色<div class="value">#000000</div>
      </div>
      <div class="demo-color-box demo-color-box-other" style="background: rgb(255, 255, 255); color: rgb(48, 49, 51); border: 1px solid rgb(238, 238, 238);">
        基础白色<div class="value">#FFFFFF</div>
      </div>
      <div class="demo-color-box demo-color-box-other bg-transparent" style="border: 1px solid #fcc3c3;color: #303133;">
        透明<div class="value">Transparent</div>
      </div>
    </div>
  </div>
</div>
