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
        for (var i = 0; i < 5; i++) {
          (function (_i) {
            var _rate = $('<span class="el-rate__item" style="cursor: pointer;"></span>');
            var _iconp = $('<i class="el-rate__icon ' + options.voidIconClass + '" style="' + options.voidColor + ';"></i>');
            var _iconActive = '';
            if (_i < options.lowThreshold) {
              _iconActive = options.iconClasses[0];
            } else if (_i < options.highThreshold) {
              _iconActive = options.iconClasses[1];
            } else {
              _iconActive = options.iconClasses[2];
            }
            var _iconc = $('<i class="el-rate__decimal ' + _iconActive + '" style="width: 0;"></i>');
            _iconp.append(_iconc);
            _rate.append(_iconp);
            that.$el.append(_rate);
            that.$rates.push({
              rate: _rate,
              iconp: _iconp,
              iconc: _iconc
            });
            _iconp.on('click', function (e) {
              that.options.value = (_i + 1);
              that.update(_i);
            });
            _iconp.on('mousemove', function (e) {
              _iconp.addClass('hover');
              that.update(_i + 1, true);
            });
            _iconp.on('mouseleave', function (e) {
              _iconp.removeClass('hover');
              that.update(_i + 1);
            });

          })(i);
        }
      },
      update: function (idx, isTemp) {
        var options = this.options,
          that = this,
          _i = 0,
          _color = 0;
        if (isTemp) {
          // 临时修改
          if (idx < options.lowThreshold) {
            _color = 0;
          } else if (idx < options.highThreshold) {
            _color = 1;
          } else {
            _color = 2;
          }
          for (; _i < idx; _i++) {
            that.$rates[_i].iconc.css({'width': '100%', 'color': options.colors[_color]});
          }
          for (; _i < options.max; _i++) {
            that.$rates[_i].iconc.css('width', '0');
          }
        } else {
          // 正式修改
          if (options.value < options.lowThreshold) {
            _color = 0;
          } else if (options.value < options.highThreshold) {
            _color = 1;
          } else {
            _color = 2;
          }
          for (; _i < options.value; _i++) {
            that.$rates[_i].iconc.css({'width': '100%', 'color': options.colors[_color]});
          }
          for (; _i < options.max; _i++) {
            that.$rates[_i].iconc.css('width', '0');
          }
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
      'value': 0,
      'disabled': false,
      'allowHalf': false,
      'max': 5,
      'lowThreshold': 2,
      'highThreshold': 4,
      'colors': ['#F7BA2A', '#F7BA2A', '#F7BA2A'],
      'voidColor': '#C6D1DE',
      'disabledVoidColor': '#EFF2F7',
      'iconClasses': ['el-icon-star-on', 'el-icon-star-on', 'el-icon-star-on'],
      'voidIconClass': 'el-icon-star-off',
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
