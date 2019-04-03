export default {
  init: function ($, componentName) {
    function Tabs ($el, options) {
      this.$el = $el;
      this.options = options;
    }

    Tabs.prototype = {
      constructor: Tabs,
      init: function () {
        var that = this,
          options = this.options;
        // 位置设置
        options.tabPosition = (['left', 'right', 'top', 'bottom'].indexOf(options.tabPosition) > -1) ? options.tabPosition : 'top';
        this.vertical = (['left', 'right'].indexOf(options.tabPosition) > -1) ? true : false;
        this.$el.addClass('el-tabs el-tabs--' + options.tabPosition);
        // 样式设置
        if (options.type === 'card') {
          this.$el.addClass('el-tabs--card');
        } else if (options.type === 'border-card') {
          this.$el.addClass('el-tabs--border-card');
        }
        var positionClass = 'is-' + options.tabPosition;
        // 插入的html
        this.$header = $('<div class="el-tabs__header ' + positionClass + '">' +
          '  <div class="el-tabs__nav-wrap ' + positionClass + '">' +
          '    <div class="el-tabs__nav-scroll">' +
          '      <div role="tablist" class="el-tabs__nav ' + positionClass + '" style="transform: translate' + (this.vertical ? 'Y' : 'X') + '(0px);">' +
          '</div></div></div></div>');
        this.$content = $('<div class="el-tabs__content"></div>');
        this.$tablist = this.$header.find('.el-tabs__nav');
        if (['border-card', 'card'].indexOf(options.type) === -1) {
          this.$tabActiveBar = $('<div class="el-tabs__active-bar ' + positionClass + '"></div>');
          this.$tablist.append(this.$tabActiveBar);
        }
        this.contents = {};
        this.tabs = {};
        // tabs
        $.each(options.tabs, function (idx, val) {
          // 设置参数
          var _option;
          var _defaults = {
            'label': '',
            'disabled': false,
            'name': '',
            'closable': false,
            'lazy': false,
            'content': '',
            'selector': ''
          };
          if (typeof val === 'string') {
            _option = $.extend({}, _defaults, {'name': val});
          } else {
            _option = $.extend({}, _defaults, val);
          }
          _option.label = _option.label || _option.name;
          // 插入tab
          var _header = $('<div aria-controls="pane-' + _option.name + '" role="tab" tabindex="-1" class="el-tabs__item ' + positionClass + '">' + _option.label + '</div>');
          _header.data('u-tabs-tab-name', _option.name);
          var _content = $('<div role="tabpanel" aria-labelledby="tab-' + _option.name + '" class="el-tab-pane" style="display: none;" aria-hidden="true"></div>');
          if (_option.selector) {
            _content.append($(_option.selector));
          } else {
            _content.html(_option.content);
          }
          _header.on('click', function (e) {
            that.tabClick(e);
          });
          that.contents[_option.name] = _content;
          that.tabs[_option.name] = _header;
          that.$tablist.append(_header);
          that.$content.append(_content);
        });
        // 初始化
        options.value = options.value || options.tabs[0].name;
        this.$el.append(this.$header).append(this.$content);
        this.changeTab(options.value);
      },
      changeTab: function (newValue) {
        var oldValue = this.options.value;
        this.contents[oldValue] && this.contents[oldValue].hide();
        this.tabs[oldValue] && this.tabs[oldValue].removeClass('is-active').attr({
          'tabindex': -1,
          'aria-selected': false
        });
        this.tabs[newValue] && this.tabs[newValue].addClass('is-active').attr({'tabindex': 0, 'aria-selected': true});
        if (this.$tabActiveBar && this.vertical) {
          var translateY = this.tabs[newValue].position().top + parseInt(this.tabs[newValue].css('padding-top').replace('px', ''));
          this.$tabActiveBar.css({
            'height': this.tabs[newValue].height() + 'px',
            'transform': 'translateY(' + translateY + 'px)'
          });
        } else if (this.$tabActiveBar && !this.vertical) {
          var translateX = this.tabs[newValue].position().left + parseInt(this.tabs[newValue].css('padding-left').replace('px', ''));
          this.$tabActiveBar.css({
            'width': this.tabs[newValue].width() + 'px',
            'transform': 'translateX(' + translateX + 'px)'
          });
        }
        this.contents[newValue] && this.contents[newValue].show();
        this.options.value = newValue;
      },
      tabClick: function (e) {
        var that = this,
          $el = $(e.target),
          oldValue = this.options.value,
          newValue = $el.data('u-tabs-tab-name');
        this.options.tabClick && this.options.tabClick($el, newValue, oldValue);
        // 不用切换
        if (newValue === oldValue) {
          return;
        }
        // 切换前调用 beforeLeave()
        if (this.options.beforeLeave) {
          var before = this.options.beforeLeave(newValue, oldValue);
          if (before && before.then) {
            before.then(function () {
              that.changeTab(newValue);
            });
          } else if (before !== false) {
            that.changeTab(newValue);
          }
        } else {
          that.changeTab(newValue);
        }
      }
    };
    $.fn[componentName] = function () {
      var option = arguments[0],
        args = arguments,
        value,
        allowedMethods = ['add', 'delete', 'set', 'get'];
      this.each(function () {
        var $this = $(this),
          data = $this.data('u-tabs');
        if (!data) {
          var _option = {};
          if (Array.isArray(option)) {
            _option = {tabs: option};
          } else if (typeof option === 'object') {
            _option = option;
          }
          var options = $.extend({}, $.fn[componentName].defaults, $this.data(), _option);
          data = new Tabs($this, options);
          $this.data('u-tabs', data);
          data.init();
        }
        if (typeof option === 'string') {
          if ($.inArray(option, allowedMethods) < 0) {
            throw 'Unknown method: ' + option;
          }
          value = data[option](args[1]);
        }
      });
      return typeof value !== 'undefined' ? value : this;
    };
    $.fn[componentName].defaults = {
      'value': '',
      'type': '',
      'closable': false,
      'addable': false,
      'editable': false,
      'tabPosition': 'top',
      'stretch': '',
      'beforeLeave': function () {
        return true;
      },
      'tabClick': '',
      'tabRemove': '',
      'tabAdd': '',
      'edit': '',
      'tabs': []
    };
  },
  componentName: 'tabs'
};
