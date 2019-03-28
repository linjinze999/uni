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
            var _rate = $('<span class="el-rate__item" style="cursor: pointer"></span>');
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
            _rate.on('click', function (e) {
              var oldValue = that.options.value,
                newValue = (_i + 1);
              that.options.value = newValue;
              that.update(_i + 1);
              oldValue !== newValue && that.onchange && that.onchange(newValue, oldValue);
            });
            _rate.on('mousemove', function (e) {
              !that.options.disabled && _iconp.addClass('hover');
              that.update(_i + 1, true);
            });
            _rate.on('mouseleave', function (e) {
              !that.options.disabled && _iconp.removeClass('hover');
              that.update(_i + 1);
            });
          })(i);
        }
        that.$text = $('<span class="el-rate__text" style="color: ' + options.textColor + '"></span>');
        that.$el.append(that.$text);
        that.update(0, false, true);
        options.disabled && that.disabled();
      },
      update: function (idx, isTemp, local) {
        if (this.options.disabled && !local) {
          return;
        }
        var options = this.options,
          that = this,
          _i = 0,
          _color = 0,
          _score = '';
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
          _score = options.scoreTemplate.replace(/{ *value *}/g, idx);
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
          _score = options.scoreTemplate.replace(/{ *value *}/g, options.value);
        }
        // 显示文本/分数
        if (options.showText && options.value > 0) {
          that.$text.html(options.texts[Math.floor(options.value) - 1]);
        } else if (options.showScore) {
          that.$text.html(_score);
        } else {
          that.$text.html('');
        }
      },
      disabled: function () {
        this.options.disabled = true;
        this.$el.find('.el-rate__item').css('cursor', 'auto');
      },
      show: function () {
        this.options.disabled = false;
        this.$el.find('.el-rate__item').css('cursor', 'pointer');
      },
      set: function (value) {
        this.options.value = value;
        this.update(0, false, true);
      },
      get: function () {
        return this.options.value;
      }
    };
    $.fn[componentName] = function () {
      var option = arguments[0],
        value,
        allowedMethods = ['show', 'disabled', 'set', 'get'];
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
