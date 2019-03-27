export default {
  init: function ($, componentName) {
    function Rate ($el, options) {
      this.$el = $el;
      this.options = options;
    }

    Rate.prototype = {
      constructor: Rate,
      init: function () {
        if (this.hasInit) {
          return;
        }
        var options = this.options,
          that = this;
        this.$el.attr({
          'role': 'slider',
          'aria-valuemin': 0,
          'tabindex': 0,
          'aria-valuemax': options.max
        }).addClass('el-rate');
        this.$rates = [];
        for( var i = 0; i < 5; i++) {
          (function(_i){
            var _rate = $('<span class="el-rate__item" style="cursor: pointer;"></span>');
            var _iconp = $('<i class="el-rate__icon el-icon-star-off" style="color: rgb(198, 209, 222);"></i>');
            var _iconc = $('<i class="el-rate__decimal el-icon-star-on" style="color: rgb(247, 186, 42); width: 50%;"></i>');
            _iconp.append(_iconc);
            _rate.append(_iconp);
            that.$el.append(_rate);
            that.$rates.push({
              rate: _rate,
              iconp: _iconp,
              iconc: _iconc
            });
          })(i);
        }
      }
    };
    $.fn[componentName] = function () {
      var option = arguments[0],
        value,
        allowedMethods = ['show', 'disabled'];
      this.each(function () {
        var $this = $(this),
          data = $this.data('u-rate'),
          options = $.extend({}, $.fn[componentName].defaults,
            $this.data(), typeof option === 'object' && option);
        if (!data) {
          data = new Rate($this, options);
          $this.data('u-rate', data);
          data.init();
        }
        if (typeof option === 'string') {
          if ($.inArray(option, allowedMethods) < 0) {
            throw 'Unknown method: ' + option;
          }
          value = data[option]();
        }
      });
      return typeof value !== 'undefined' ? value : this;
    };
    $.fn[componentName].defaults = {
      'disabled': false,
      'allowHalf': false,
      'max': 5,
      'lowThreshold': 2,
      'highThreshold': 4,
      'colors': ['#F7BA2A', '#F7BA2A', '#F7BA2A'],
      'voidColor': '#C6D1DE',
      'disabledVoidColor': '#EFF2F7',
      'iconClasses': ['el-icon-star-on', 'el-icon-star-on','el-icon-star-on'],
      'voidIconClass': '#EFF2F7',
      'disabledVoidIconClass': 'el-icon-star-on',
      'showText': false,
      'showScore': false,
      'textColor': '#1F2D3D',
      'texts': ['极差', '失望', '一般', '满意', '惊喜'],
      'scoreTemplate': '{value}',
      'onchange': ''
    };
  },
  componentName: 'rate'
};
