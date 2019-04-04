## Icon 图标
提供了一套常用的图标集合。

### 使用方法
直接通过设置类名为`el-icon-iconName`来使用即可。例如：
::: demo

```html
<div class="demo-icon1">
  <i class="el-icon-edit"></i>
  <i class="el-icon-share"></i>
  <i class="el-icon-delete"></i>
  <button type="button" class="el-button el-button--primary">
    <i class="el-icon-search"></i><span>搜索</span>
  </button>
</div>

<style>
.demo-icon1 > i { color: #606266; margin: 0 20px; font-size: 1.5em; vertical-align: middle; }
</style>
```
:::

### 图标集合
<style lang="scss">
.demo-icon-list {
    margin: 10px 0;
    padding: 0;
    font-size: 14px;
    color: #5e6d82;
    line-height: 2em;
    overflow: hidden;
    list-style: none;
    padding: 0;
    border: 1px solid #eaeefb;
    border-radius: 4px;
    li {
        float: left;
        width: 16.66%;
        text-align: center;
        height: 120px;
        line-height: 120px;
        color: #666;
        font-size: 13px;
        border-right: 1px solid #eee;
        border-bottom: 1px solid #eee;
        margin-right: -1px;
        margin-bottom: -1px;
        > span {
            display: inline-block;
            vertical-align: middle;
            line-height: normal;
            font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
            color: #606266;
            transition: color .15s linear;
            i {
                display: block;
                font-size: 32px;
                margin-bottom: 15px;
                transition: color .15s linear;
            }
            .icon-name{
                display: inline-block;
                padding: 0 5px;
                height: 1em;
            }
        }
        > span:hover {
            color: #409EFF;
        }
    }
}
</style>
<ul class="demo-icon-list">
  <li><span><i class="el-icon-info"></i><span class="icon-name">el-icon-info</span></span></li>
  <li><span><i class="el-icon-error"></i><span class="icon-name">el-icon-error</span></span></li>
  <li><span><i class="el-icon-success"></i><span class="icon-name">el-icon-success</span></span></li>
  <li><span><i class="el-icon-warning"></i><span class="icon-name">el-icon-warning</span></span></li>
  <li><span><i class="el-icon-question"></i><span class="icon-name">el-icon-question</span></span></li>
  <li><span><i class="el-icon-back"></i><span class="icon-name">el-icon-back</span></span></li>
  <li><span><i class="el-icon-arrow-left"></i><span class="icon-name">el-icon-arrow-left</span></span></li>
  <li><span><i class="el-icon-arrow-down"></i><span class="icon-name">el-icon-arrow-down</span></span></li>
  <li><span><i class="el-icon-arrow-right"></i><span class="icon-name">el-icon-arrow-right</span></span></li>
  <li><span><i class="el-icon-arrow-up"></i><span class="icon-name">el-icon-arrow-up</span></span></li>
  <li><span><i class="el-icon-caret-left"></i><span class="icon-name">el-icon-caret-left</span></span></li>
  <li><span><i class="el-icon-caret-bottom"></i><span class="icon-name">el-icon-caret-bottom</span></span></li>
  <li><span><i class="el-icon-caret-top"></i><span class="icon-name">el-icon-caret-top</span></span></li>
  <li><span><i class="el-icon-caret-right"></i><span class="icon-name">el-icon-caret-right</span></span></li>
  <li><span><i class="el-icon-d-arrow-left"></i><span class="icon-name">el-icon-d-arrow-left</span></span></li>
  <li><span><i class="el-icon-d-arrow-right"></i><span class="icon-name">el-icon-d-arrow-right</span></span></li>
  <li><span><i class="el-icon-minus"></i><span class="icon-name">el-icon-minus</span></span></li>
  <li><span><i class="el-icon-plus"></i><span class="icon-name">el-icon-plus</span></span></li>
  <li><span><i class="el-icon-remove"></i><span class="icon-name">el-icon-remove</span></span></li>
  <li><span><i class="el-icon-circle-plus"></i><span class="icon-name">el-icon-circle-plus</span></span></li>
  <li><span><i class="el-icon-remove-outline"></i><span class="icon-name">el-icon-remove-outline</span></span></li>
  <li><span><i class="el-icon-circle-plus-outline"></i><span class="icon-name">el-icon-circle-plus-outline</span></span></li>
  <li><span><i class="el-icon-close"></i><span class="icon-name">el-icon-close</span></span></li>
  <li><span><i class="el-icon-check"></i><span class="icon-name">el-icon-check</span></span></li>
  <li><span><i class="el-icon-circle-close"></i><span class="icon-name">el-icon-circle-close</span></span></li>
  <li><span><i class="el-icon-circle-check"></i><span class="icon-name">el-icon-circle-check</span></span></li>
  <li><span><i class="el-icon-circle-close-outline"></i><span class="icon-name">el-icon-circle-close-outline</span></span></li>
  <li><span><i class="el-icon-circle-check-outline"></i><span class="icon-name">el-icon-circle-check-outline</span></span></li>
  <li><span><i class="el-icon-zoom-out"></i><span class="icon-name">el-icon-zoom-out</span></span></li>
  <li><span><i class="el-icon-zoom-in"></i><span class="icon-name">el-icon-zoom-in</span></span></li>
  <li><span><i class="el-icon-d-caret"></i><span class="icon-name">el-icon-d-caret</span></span></li>
  <li><span><i class="el-icon-sort"></i><span class="icon-name">el-icon-sort</span></span></li>
  <li><span><i class="el-icon-sort-down"></i><span class="icon-name">el-icon-sort-down</span></span></li>
  <li><span><i class="el-icon-sort-up"></i><span class="icon-name">el-icon-sort-up</span></span></li>
  <li><span><i class="el-icon-tickets"></i><span class="icon-name">el-icon-tickets</span></span></li>
  <li><span><i class="el-icon-document"></i><span class="icon-name">el-icon-document</span></span></li>
  <li><span><i class="el-icon-goods"></i><span class="icon-name">el-icon-goods</span></span></li>
  <li><span><i class="el-icon-sold-out"></i><span class="icon-name">el-icon-sold-out</span></span></li>
  <li><span><i class="el-icon-news"></i><span class="icon-name">el-icon-news</span></span></li>
  <li><span><i class="el-icon-message"></i><span class="icon-name">el-icon-message</span></span></li>
  <li><span><i class="el-icon-date"></i><span class="icon-name">el-icon-date</span></span></li>
  <li><span><i class="el-icon-printer"></i><span class="icon-name">el-icon-printer</span></span></li>
  <li><span><i class="el-icon-time"></i><span class="icon-name">el-icon-time</span></span></li>
  <li><span><i class="el-icon-bell"></i><span class="icon-name">el-icon-bell</span></span></li>
  <li><span><i class="el-icon-mobile-phone"></i><span class="icon-name">el-icon-mobile-phone</span></span></li>
  <li><span><i class="el-icon-service"></i><span class="icon-name">el-icon-service</span></span></li>
  <li><span><i class="el-icon-view"></i><span class="icon-name">el-icon-view</span></span></li>
  <li><span><i class="el-icon-menu"></i><span class="icon-name">el-icon-menu</span></span></li>
  <li><span><i class="el-icon-more"></i><span class="icon-name">el-icon-more</span></span></li>
  <li><span><i class="el-icon-more-outline"></i><span class="icon-name">el-icon-more-outline</span></span></li>
  <li><span><i class="el-icon-star-on"></i><span class="icon-name">el-icon-star-on</span></span></li>
  <li><span><i class="el-icon-star-off"></i><span class="icon-name">el-icon-star-off</span></span></li>
  <li><span><i class="el-icon-location"></i><span class="icon-name">el-icon-location</span></span></li>
  <li><span><i class="el-icon-location-outline"></i><span class="icon-name">el-icon-location-outline</span></span></li>
  <li><span><i class="el-icon-phone"></i><span class="icon-name">el-icon-phone</span></span></li>
  <li><span><i class="el-icon-phone-outline"></i><span class="icon-name">el-icon-phone-outline</span></span></li>
  <li><span><i class="el-icon-picture"></i><span class="icon-name">el-icon-picture</span></span></li>
  <li><span><i class="el-icon-picture-outline"></i><span class="icon-name">el-icon-picture-outline</span></span></li>
  <li><span><i class="el-icon-delete"></i><span class="icon-name">el-icon-delete</span></span></li>
  <li><span><i class="el-icon-search"></i><span class="icon-name">el-icon-search</span></span></li>
  <li><span><i class="el-icon-edit"></i><span class="icon-name">el-icon-edit</span></span></li>
  <li><span><i class="el-icon-edit-outline"></i><span class="icon-name">el-icon-edit-outline</span></span></li>
  <li><span><i class="el-icon-rank"></i><span class="icon-name">el-icon-rank</span></span></li>
  <li><span><i class="el-icon-refresh"></i><span class="icon-name">el-icon-refresh</span></span></li>
  <li><span><i class="el-icon-share"></i><span class="icon-name">el-icon-share</span></span></li>
  <li><span><i class="el-icon-setting"></i><span class="icon-name">el-icon-setting</span></span></li>
  <li><span><i class="el-icon-upload"></i><span class="icon-name">el-icon-upload</span></span></li>
  <li><span><i class="el-icon-upload2"></i><span class="icon-name">el-icon-upload2</span></span></li>
  <li><span><i class="el-icon-download"></i><span class="icon-name">el-icon-download</span></span></li>
  <li><span><i class="el-icon-loading"></i><span class="icon-name">el-icon-loading</span></span></li>
</ul>
