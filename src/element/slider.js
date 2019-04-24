import draggable from '../utils/draggable';

export default {
  init: function ($, componentName) {
    function Slider ($el, options) {
      this.$el = $el;
      this.options = options;
    }

    Slider.prototype = {
      constructor: Slider,
      init: function () {
        var that = this,
          options = this.options;
        this.precision = (function () {
          var precisions = [options.min, options.max, options.step].map(item => {
            var decimal = ('' + item).split('.')[1];
            return decimal ? decimal.length : 0;
          });
          return Math.max.apply(null, precisions);
        })();
        if (options.range && !Array.isArray(options.value)) {
          options.value = [0, options.value];
        }
        this.oldValue = options.value;
        this._pos = options.vertical ? 'bottom' : 'left';
        this.$el.attr({
          'role': 'slider',
          'aria-valuemin': options.min,
          'aria-valuemax': options.max,
          'aria-orientation': options.vertical ? 'vertical' : 'horizontal',
          'aria-disabled': options.disabled,
          'aria-valuetext': options.value,
          'aria-label': options.label || ('slider between ' + options.min + ' and ' + options.max)
        }).addClass('el-slider');
        // input
        this.$input = $('<div class="el-slider__input el-input-number el-input-number--small" debounce="300">' +
          '<span role="button" class="el-input-number__decrease is-disabled">' +
          '<i class="el-icon-minus"></i>' +
          '</span>' +
          '<span role="button" class="el-input-number__increase">' +
          '<i class="el-icon-plus"></i>' +
          '</span>' +
          '<div class="el-input el-input--small">' +
          '<input type="text" autocomplete="off" max="100" min="0" class="el-input__inner" role="spinbutton" aria-valuemax="100" aria-valuemin="0" aria-valuenow="0" aria-disabled="undefined">' +
          '</div></div>');
        // runway
        this.$runway = $('<div class="el-slider__runway ' + (options.disabled ? 'disabled' : '') + '"></div>');
        this.$runway.on('click', function () {
          if (options.disabled || that.dragging) return;
        });
        options.vertical && this.$runway.css('height', options.height);
        this.$bar = $('<div class="el-slider__bar" style="width: 0%; left: 0%;"></div>');
        // button1
        this.$wrapperFirst = $('<div tabindex="0" class="el-slider__button-wrapper" style="left: 0%;outline:none;"></div>');
        this.$buttonFirst = $('<div class="el-tooltip el-slider__button" aria-describedby="el-tooltip-2975" tabindex="0"></div>');
        if (options.showTooltip) {
          this.$buttonFirstTooltip = $('<div role="tooltip" aria-hidden="true" class="el-tooltip__popper is-dark ' + options.tooltipClass + '" ' +
            'style="z-index: 2000;display: none;bottom: 100%;left:50%;transform: translateX(-50%);" x-placement="top">' +
            '<div class="el-tooltip__content">' + this.formatTooltip(0) + '</div>' +
            '<div class="popper__arrow" style="left: 50%;transform: translateX(-50%)"></div></div>');
          this.$buttonFirstTooltipContent = this.$buttonFirstTooltip.find('.el-tooltip__content');
          this.$buttonFirst.append(this.$buttonFirstTooltip);
          this.$wrapperFirst.on('mouseenter focus', function () {
            that.$buttonFirstTooltip.show().css('aria-hidden', false);
          });
          this.$wrapperFirst.on('mouseleave blur', function () {
            that.$buttonFirstTooltip.hide().css('aria-hidden', true);
          });
        }
        draggable(this.$wrapperFirst[0], {
          start: function (event) {
            that.dragging = true;
            var rect = that.$runway[0].getBoundingClientRect();
            if (options.vertical) {
              that.startY = rect.top + that.$runway.height();
            } else {
              that.startX = rect.left;
            }
          },
          drag: function (event) {
            if (options.disabled) return;
            event.preventDefault();
            if (event.type === 'touchmove') {
              event.clientY = event.touches[0].clientY;
              event.clientX = event.touches[0].clientX;
            }
            var _value = 0;
            if (options.vertical) {
              _value = (that.startY - event.clientY) / that.$runway.height() * (options.max - options.min) + options.min;
            } else {
              _value = (event.clientX - that.startX) / that.$runway.width() * (options.max - options.min) + options.min;
            }
            if (options.range) {
              that.set([_value, options.value[1]]);
            } else {
              that.set(_value);
            }
          },
          end: function (event) {
            that.dragging = false;
            this.drag(event);
          }
        });
        this.$wrapperFirst.append(this.$buttonFirst);
        // button2
        if (options.range) {
          this.$wrapperSecond = $('<div tabindex="0" class="el-slider__button-wrapper" style="left: 10%;outline:none;"></div>');
          this.$buttonSecond = $('<div class="el-tooltip el-slider__button" aria-describedby="el-tooltip-2975" tabindex="0"></div>');
          if (options.showTooltip) {
            this.$buttonSecondTooltip = $('<div role="tooltip" aria-hidden="true" class="el-tooltip__popper is-dark ' + options.tooltipClass + '" ' +
              'style="z-index: 2000;display: none;bottom: 100%;left:50%;transform: translateX(-50%)">' +
              '<div class="el-tooltip__content"></div><div class="popper__arrow" style="left: 50%;transform: translateX(-50%)"></div></div>');
            this.$buttonSecondTooltipContent = this.$buttonSecondTooltip.find('.el-tooltip__content');
            this.$buttonSecond.append(this.$buttonSecondTooltip);
            this.$wrapperSecond.on('mouseenter focus', function () {
              that.$buttonSecondTooltip.show().css('aria-hidden', false);
            });
            this.$wrapperSecond.on('mouseleave blur', function () {
              that.$buttonSecondTooltip.hide().css('aria-hidden', true);
            });
          }
          draggable(this.$wrapperSecond[0], {
            start: function (event) {
              that.dragging = true;
              var rect = that.$runway[0].getBoundingClientRect();
              if (options.vertical) {
                that.startY = rect.top + that.$runway.height();
              } else {
                that.startX = rect.left;
              }
            },
            drag: function (event) {
              if (options.disabled) return;
              event.preventDefault();
              if (event.type === 'touchmove') {
                event.clientY = event.touches[0].clientY;
                event.clientX = event.touches[0].clientX;
              }
              var _value = 0;
              if (options.vertical) {
                _value = (that.startY - event.clientY) / that.$runway.height() * (options.max - options.min) + options.min;
              } else {
                _value = (event.clientX - that.startX) / that.$runway.width() * (options.max - options.min) + options.min;
              }
              that.set([options.value[0], _value]);
            },
            end: function (event) {
              that.dragging = false;
              this.drag(event);
            }
          });
          this.$wrapperSecond.append(this.$buttonSecond);
        }
        // stops
        var stopCount = (options.max - options.min) / options.step;
        var stepWidth = 100 * options.step / (options.max - options.min);
        this.stops = [];
        for (let i = 1; i < stopCount; i++) {
          this.stops.push(i * stepWidth);
        }
        this.$runway.append(this.$bar, this.$wrapperFirst, this.$wrapperSecond || '');
        options.showStops && this.showStops();
        this.$el.append(this.$runway);
        this.set(options.value);
      },
      setPosition (newPosition, button) {
        if (newPosition === null || isNaN(newPosition)) return;
        var options = this.options;
        if (newPosition < 0) {
          newPosition = 0;
        } else if (newPosition > 100) {
          newPosition = 100;
        }
        var lengthPerStep = 100 / ((options.max - options.min) / options.step);
        var steps = Math.round(newPosition / lengthPerStep);
        var value = steps * lengthPerStep * (options.max - options.min) * 0.01 + options.min;
        value = parseFloat(value.toFixed(this.precision));
        if (button === 'second') {
          this.$wrapperSecond.css(this._pos, value + '%');
          options.showTooltip && this.$buttonSecondTooltipContent.html(this.formatTooltip(value));
        } else {
          this.$wrapperFirst.css(this._pos, value + '%');
          options.showTooltip && this.$buttonFirstTooltipContent.html(this.formatTooltip(value));
        }
      },
      formatTooltip: function (value) {
        value = value / 100 * (this.options.max - this.options.min) + this.options.min;
        value = parseFloat(value.toFixed(this.precision));
        return this.options.formatTooltip ? this.options.formatTooltip(value) : value;
      },
      showStops: function () {
        var that = this, options = this.options;
        var result = [];
        if (options.range) {
          result = this.stops.filter(function (index, step) {
            return step < 100 * (that.minValue() - options.min) / (options.max - options.min) ||
              step > 100 * (that.maxValue() - options.min) / (this.options - this.options);
          });
        } else {
          result = this.stops.filter(function (index, step) {
            step > 100 * (options.value - options.min) / (options.max - options.min);
          });
        }
        this.$runway.find('.el-slider__stop').remove();
        result.forEach(function (index, stop) {
          that.$runway.append('<div class="el-slider__stop" style="' + that._pos + ': ' + stop + '%;"></div>');
        });
      },
      minValue: function () {
        return Math.min(options.value[0], options.value[1]);
      },
      maxValue: function () {
        return Math.max(options.value[0], options.value[1]);
      },
      updateBar: function () {
        var options = this.options;
        var barSize = options.range
          ? (100 * (this.maxValue() - this.minValue()) / (options.max - options.min))
          : (100 * (options.value - options.min) / (options.max - options.min));
        var barStart = options.range ? (100 * (this.minValue() - options.min) / (options.max - options.min)) : 0;
        if (options.vertical) {
          this.$bar.css({
            'height': barSize + '%',
            'bottom': barStart + '%'
          });
        } else {
          this.$bar.css({
            'width': barSize + '%',
            'left': barStart + '%'
          });
        }
      },
      disable: function () {
        this.$el.attr('aria-disabled', true);
        this.$runway.addClass('disabled');
        this.options.disabled = true;
      },
      enable: function () {
        this.$el.attr('aria-disabled', false);
        this.$runway.removeClass('disabled');
        this.options.disabled = false;
      },
      limitValue: function (value) {
        if (value < this.options.min) {
          value = this.options.min;
        } else if (value > this.options.max) {
          value = this.options.max;
        }
        return value;
      },
      set: function (value) {
        var options = this.options;
        if (options.range) {
          value[0] = this.limitValue(value[0]);
          value[1] = this.limitValue(value[1]);
        } else {
          value = this.limitValue(value);
        }
        options.value = value;
        if (options.range) {
          this.setPosition((100 * (value[0] - options.min) / (options.max - options.min)), 'first');
          this.setPosition((100 * (value[1] - options.min) / (options.max - options.min)), 'second');
        } else {
          this.setPosition((100 * (value - options.min) / (options.max - options.min)), 'first');
        }
        this.updateBar();
        !this.dragging && this.oldValue.toString() !== value.toString() && options.change && options.change(value);
        this.oldValue = this.dragging ? this.oldValue : options.value;
      },
      get: function () {
        return this.options.value;
      }
    };
    $.fn[componentName] = function () {
      var option = arguments[0],
        args = arguments,
        value,
        allowedMethods = ['disable', 'enabled', 'set', 'get'];
      this.each(function () {
        var $this = $(this),
          data = $this.data('u-slider');
        if (!data) {
          var options = $.extend({}, $.fn[componentName].defaults, $this.data(), option);
          options.colorFormat = options.colorFormat || (options.showAlpha ? 'rgb' : 'hex');
          data = new Slider($this, options);
          $this.data('u-slider', data);
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
      'value': 0,
      'min': 0,
      'max': 100,
      'disabled': false,
      'step': 1,
      'showInput': false,
      'showInputControls': true,
      'inputSize': 'small',
      'showStops': false,
      'showTooltip': true,
      'formatTooltip': '',
      'range': false,
      'vertical': false,
      'height': '200px',
      'label': '',
      'debounce': 300,
      'tooltipClass': false,
      'change': ''
    };
  },
  componentName: 'slider'
};
