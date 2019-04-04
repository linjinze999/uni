export default {
  init: function ($, componentName) {
    function Dropdown ($el, options) {
      this.$el = $el;
      this.options = options;
    }

    Dropdown.prototype = {
      constructor: Dropdown,
      init: function () {
        var that = this,
          options = this.options;
        // 位置设置
        this.$dropdown = $('<div class="el-dropdown"> </div>');
        this.$dropicon = $('<i class="el-icon-arrow-down el-icon--right"></i>');
        if(options.splitButton){
          this.$dropdownDefine = $('<button type="button" class="el-button el-button--primary el-dropdown-selfdefine" aria-haspopup="list" role="button" tabindex="0"></button>');
        } else {
          this.$dropdownDefine = $('<span class="el-dropdown-link el-dropdown-selfdefine" aria-haspopup="list" role="button" tabindex="0"></span>');
        }
        this.$dropdown.append(this.$dropdownDefine);
        this.$dropdownDefine.append(this.$el);
        this.$dropdownDefine.append(this.$dropicon);
      }
    };
    $.fn[componentName] = function () {
      var option = arguments[0],
        args = arguments,
        value,
        allowedMethods = [];
      this.each(function () {
        var $this = $(this),
          data = $this.data('u-dropdown');
        if (!data) {
          var _option = {};
          if (Array.isArray(option)) {
            _option = {tabs: option};
          } else if (typeof option === 'object') {
            _option = option;
          }
          var options = $.extend({}, $.fn[componentName].defaults, $this.data(), _option);
          data = new Dropdown($this, options);
          $this.data('u-dropdown', data);
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
      'type': '',
      'size': '',
      'splitButton': false,
      'placement': 'bottom-end',
      'trigger': 'hover',
      'hideOnClick': true,
      'showTimeout': 250,
      'hideTimeout': 150,
      'click': '',
      'command': '',
      'visibleChange': ''
    };
  },
  componentName: 'dropdown'
};
