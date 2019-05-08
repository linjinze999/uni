import draggable from '../utils/draggable';
import debounce from '../utils/debounce';
import repeatClick from '../utils/repeatClick';

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
        }).addClass('el-slider ' + (options.vertical ? 'is-vertical' : ''));
        // runway
        this.$runway = $('<div class="el-slider__runway ' + (options.disabled ? 'disabled' : '') + '"></div>');
        this.$runway.on('click', function () {
          if (options.disabled || that.dragging) return;
        });
        options.vertical && this.$runway.css('height', options.height);
        this.$bar = $('<div class="el-slider__bar"></div>');
        // button1
        this.$wrapperFirst = $('<div tabindex="0" class="el-slider__button-wrapper" style="outline:none;"></div>');
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
          this.$wrapperSecond = $('<div tabindex="0" class="el-slider__button-wrapper" style="outline:none;"></div>');
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
        // marks
        var markList = this.markList();
        if (markList.length) {
          that.$markStops = $('<div></div>');
          that.$marks = $('<div class="el-slider__marks"></div>');
          markList.forEach(function (point) {
            if (typeof point.mark === 'string') {
              point.mark = {label: point.mark};
            }
            that.$markStops.append('<div class="el-slider__stop el-slider__marks-stop" style="' + that._pos + ': ' + point.position + '%;"></div>');
            var _text = $('<div class="el-slider__marks-text" style="' + that._pos + ': ' + point.position + '%;">' + point.mark.label + '</div>');
            _text.css(point.mark.style || {});
            that.$marks.append(_text);
          });
        }
        this.$runway.append(this.$bar, this.$wrapperFirst, this.$wrapperSecond || '', that.$markStops || '', that.$marks || '' );
        // input
        if (options.showInput && !options.range) {
          this.$el.addClass('el-slider--with-input');
          this.$runway.addClass('show-input');
          this.$inputParent = $('<div class="el-slider__input el-input-number ' +
            (options.inputSize ? ('el-input-number--' + options.inputSize) : '') + '"></div>');
          if (options.showInputControls) {
            this.$inputDecrease = $('<span role="button" class="el-input-number__decrease"><i class="el-icon-minus"></i></span>');
            repeatClick.bind(this.$inputDecrease[0], function () {
              !that.inputDecreaseDisabled && that.set(options.value - options.step);
            });
            this.$inputIncrease = $('<span role="button" class="el-input-number__increase"><i class="el-icon-plus"></i></span>');
            repeatClick.bind(this.$inputIncrease[0], function () {
              !that.inputIncreaseDisabled && that.set(options.value + options.step);
            });
            this.$inputParent.append(this.$inputDecrease, this.$inputIncrease);
          }
          this.$input = $('<input type="text" autocomplete="off" class="el-input__inner" role="spinbutton" ' +
            'max="' + options.max + '" min="' + options.min + '" step="' + options.step + '" ' +
            'aria-valuemax="' + options.max + '" aria-valuemin="' + options.min + '" aria-valuenow="' + options.value + '">');
          this.$inputParent.append($('<div class="el-input ' + (options.inputSize ? ('el-input--' + options.inputSize) : '') + '"></div>').append(this.$input));
          this.$input.on('change', debounce(function (e) {
            that.set(e.target.value.replace(/[^\-?\d.]/g, ''));
          }, options.debounce));
        }
        this.$el.append(this.$inputParent || '', this.$runway);
        this.set(options.value);
        options.disabled && this.disable();
      },
      markList: function () {
        var options = this.options;
        var marksKeys = Object.keys(options.marks);
        return marksKeys.map(parseFloat)
          .sort((a, b) => a - b)
          .filter(point => point <= options.max && point >= options.min)
          .map(point => ({
            point: point,
            position: (point - options.min) * 100 / (options.max - options.min),
            mark: options.marks[point]
          }));
      },
      setPosition (value, button) {
        if (value === null || isNaN(value)) return;
        var options = this.options;
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
          result = this.stops.filter(function (step) {
            return step < 100 * (that.minValue() - options.min) / (options.max - options.min) ||
              step > 100 * (that.maxValue() - options.min) / (options.max - options.min);
          });
        } else {
          result = this.stops.filter(function (step) {
            return step > 100 * (options.value - options.min) / (options.max - options.min);
          });
        }
        this.$runway.find('> .el-slider__stop').remove();
        result.forEach(function (stop) {
          that.$runway.append('<div class="el-slider__stop" style="' + that._pos + ': ' + stop + '%;"></div>');
        });
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
        options.showStops && this.showStops();
      },
      minValue: function () {
        return Math.min(this.options.value[0], this.options.value[1]);
      },
      maxValue: function () {
        return Math.max(this.options.value[0], this.options.value[1]);
      },
      limitValue: function (value) {
        if (value < this.options.min) {
          value = this.options.min;
        } else if (value > this.options.max) {
          value = this.options.max;
        }
        var options = this.options;
        var newPosition = (value - options.min) / (options.max - options.min) * 100;
        var lengthPerStep = 100 / ((options.max - options.min) / options.step);
        var steps = Math.round(newPosition / lengthPerStep);
        var percent = steps * lengthPerStep;
        value = percent * 0.01 * (options.max - options.min) + options.min;
        value = parseFloat(value.toFixed(this.precision));
        return value;
      },
      updateInput: function () {
        if (!this.$inputParent) return;
        var options = this.options;
        this.$input.val(options.value).attr('aria-valuenow', options.value);
        if (options.showInputControls) {
          if (options.value <= options.min || options.disabled) {
            this.$inputDecrease.addClass('is-disabled');
            this.inputDecreaseDisabled = true;
          } else {
            this.$inputDecrease.removeClass('is-disabled');
            this.inputDecreaseDisabled = false;
          }
          if (options.value >= options.max || options.disabled) {
            this.$inputIncrease.addClass('is-disabled').attr('disabled', true);
            this.inputIncreaseDisabled = true;
          } else {
            this.$inputIncrease.removeClass('is-disabled').attr('disabled', false);
            this.inputIncreaseDisabled = false;
          }
        }
      },
      disable: function () {
        this.$el.attr('aria-disabled', true);
        this.$runway.addClass('disabled');
        this.options.disabled = true;
        if (this.$inputParent) {
          this.$inputParent.addClass('is-disabled');
          this.$inputParent.find('.el-input').addClass('is-disabled');
          this.$input.attr({
            'disabled': true,
            'aria-disabled': true
          });
          this.updateInput();
        }
      },
      enable: function () {
        this.$el.attr('aria-disabled', false);
        this.$runway.removeClass('disabled');
        this.options.disabled = false;
        if (this.$inputParent) {
          this.$inputParent.removeClass('is-disabled');
          this.$inputParent.find('.el-input').removeClass('is-disabled');
          this.$input.attr({
            'disabled': false,
            'aria-disabled': false
          });
          this.updateInput();
        }
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
        this.updateInput();
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
      'marks': {},
      'change': ''
    };
  },
  componentName: 'slider'
};
