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
        this.$el.addClass('el-tabs el-tabs--top');
        this.$header = $('<div class="el-tabs__header is-top">' +
          '  <div class="el-tabs__nav-wrap is-top">' +
          '    <div class="el-tabs__nav-scroll">' +
          '      <div role="tablist" class="el-tabs__nav is-top" style="transform: translateX(0px);">' +
          '        <div class="el-tabs__active-bar is-top"></div>' +
          '</div></div></div></div>');
        this.$content = $('<div class="el-tabs__content"></div>');
        this.$tablist = this.$header.find('.el-tabs__nav');
        this.$tabActiveBar = this.$header.find('.el-tabs__active-bar');
        this.contents = {};
        this.tabs = {};

        $.each(options.tabs, function (idx, val) {
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
          var _header = $('<div aria-controls="pane-' + _option.name + '" role="tab" tabindex="-1" class="el-tabs__item is-top">' + _option.label + '</div>');
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
        var translateX = this.tabs[newValue].position().left + parseInt(this.tabs[newValue].css('padding-left').replace('px', ''));
        this.$tabActiveBar.css({
          'width': this.tabs[newValue].width() + 'px',
          'transform': 'translateX(' + translateX + 'px)'
        });
        this.contents[newValue] && this.contents[newValue].show();
        this.options.value = newValue;
      },
      tabClick: function (e) {
        var that = this,
          $el = $(e.target),
          oldValue = this.options.value,
          newValue = $el.data('u-tabs-tab-name');
        this.options.tabClick && this.options.tabClick($el, newValue, oldValue);
        if (newValue === oldValue) {
          return;
        }

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
      'tabPosition': '',
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
