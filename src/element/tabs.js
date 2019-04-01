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
          '        <div class="el-tabs__active-bar is-top" style="width: 56px; transform: translateX(0px);"></div>' +
          '</div></div></div></div>');
        this.$content = $('<div class="el-tabs__content"></div>');
        this.$tablist = this.$header.find('.el-tabs__nav');

        $.each(options.tabs, function (idx, val) {
          var _option;
          var _defaults = {
            'label': '',
            'disabled': false,
            'name': '' || options.name || options.label,
            'closable': false,
            'lazy': false,
            'content': ''
          };
          if (typeof val === 'string') {
            _option = $.extend({}, _defaults, {'name': val});
          } else {
            _option = $.extend({}, _defaults, val);
          }
          _option.label = _option.label || _option.name;
          var _header = $('<div aria-controls="pane' + (idx + 1) + '" role="tab" tabindex="-1" class="el-tabs__item is-top">' + _option.label + '</div>');
          var _content = $('<div role="tabpanel" aria-labelledby="tab' + (idx + 1) + '" class="el-tab-pane" style="display: none;" aria-hidden="true">' + _option.content + '</div>');
          that.$tablist.append(_header);
          that.$content.append(_content);
        });
        this.$el.append(this.$header).append(this.$content);
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
