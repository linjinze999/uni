export default {
  init: function ($, componentName) {
    function Breadcrumb ($el, options) {
      this.$el = $el;
      this.options = options;
    }

    Breadcrumb.prototype = {
      constructor: Breadcrumb,
      init: function () {
        var options = this.options;
        this.$el.attr('role', 'navigation').attr('aria-label', 'Breadcrumb').addClass('el-breadcrumb');
        var _innerHtml = [];
        $.each(options.data, function (idx, val) {
          var _option;
          var _defaults = {
            'separator': options.separator,
            'separatorClass': options.separatorClass,
            'isLink': options.isLink
          };
          if (typeof val === 'string') {
            _option = $.extend({}, _defaults, {'inner': val});
          } else {
            _option = $.extend({}, _defaults, val);
          }
          var _separator = _option.separatorClass ?
            '<i class="el-breadcrumb__separator ' + _option.separatorClass + '"></i>' :
            '<span class="el-breadcrumb__separator" role="presentation">' + _option.separator + '</span>';
          var _item = '<span class="el-breadcrumb__item"><span role="link" class="el-breadcrumb__inner ' +
            (_option.isLink ? ' is-link' : '') + '">' + _option.inner + '</span>' + _separator + '  </span>';
          _innerHtml.push(_item);
        });
        this.$el.html(_innerHtml.join(''));
      }
    };
    $.fn[componentName] = function () {
      var option = arguments[0];
      this.each(function () {
        var $this = $(this),
          data = $this.data('u-breadcrumb');
        var _option = {};
        if (Array.isArray(option)) {
          _option = {data: option};
        } else if (typeof option === 'object') {
          _option = option;
        }
        var options = $.extend({}, $.fn[componentName].defaults, $this.data(), _option);
        if (!data) {
          data = new Breadcrumb($this, options);
          $this.data('u-breadcrumb', data);
        } else {
          data.options = options;
        }
        data.init();
      });
      return this;
    };
    $.fn[componentName].defaults = {
      'separator': '/',
      'separatorClass': '',
      'isLink': false,
      'data': []
    };
  },
  componentName: 'breadcrumb'
};
