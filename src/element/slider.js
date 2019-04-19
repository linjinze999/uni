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
        this.precision = (function(){
          var precisions = [options.min, options.max, options.step].map(item => {
            var decimal = ('' + item).split('.')[1];
            return decimal ? decimal.length : 0;
          });
          return Math.max.apply(null, precisions);
        })();
        this.$el.attr({
          'role': 'slider',
          'aria-valuemin': options.min,
          'aria-valuemax': options.max,
          'aria-orientation': options.vertical ? 'vertical' : 'horizontal',
          'aria-valuetext': options.value,
          'aria-label': 'slider between ' + options.min + ' and ' + options.max
        }).addClass('el-slider');
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
        this.$runway = $('<div class="el-slider__runway"></div>');
        this.$runway.on('click', function(){
          if (options.disabled || that.dragging) return;
        });
        this.$bar = $('<div class="el-slider__bar" style="width: 10%; left: 0%;"></div>');
        this.$wrapperFirst = $('<div tabindex="0" class="el-slider__button-wrapper" style="left: 10%;"></div>');
        this.$buttonFirst = $('<div class="el-tooltip el-slider__button" aria-describedby="el-tooltip-2975" tabindex="0"></div>');
        this.$buttonFirstTooltip = $('<div role="tooltip" aria-hidden="true" class="el-tooltip__popper is-dark" ' +
          'style="z-index: 2000;display: none;bottom: 100%;left:50%;transform: translateX(-50%)">' +
          '<div class="el-tooltip__content"></div><div class="popper__arrow" style="left: 50%;transform: translateX(-50%)"></div></div>');
        this.$buttonFirst.append(this.$buttonFirstTooltip);
        this.$buttonFirst.on('mouseenter focus', function(){that.$buttonFirstTooltip.show();});
        this.$buttonFirst.on('mouseleave blur', function(){that.$buttonFirstTooltip.hide();});
        draggable(this.$buttonFirst[0], {
          start: function(event){
            that.dragging = true;
            if (options.vertical) {
              that.startY = event.clientY;
            } else {
              that.startX = event.clientX;
            }
            that.startPosition = parseFloat(that.$wrapperFirst.css('left'));
            that.newPosition = that.startPosition;
          },
          drag: function(event){
            if(options.disabled) return;
            event.preventDefault();
            if (event.type === 'touchmove') {
              event.clientY = event.touches[0].clientY;
              event.clientX = event.touches[0].clientX;
            }
            var diff = 0;
            if (options.vertical) {
              diff = (that.startY - event.clientY) / that.$runway.height() * 100;
            } else {
              diff = (event.clientX - that.startX) / that.$runway.width() * 100;
            }
            that.newPosition = that.startPosition + diff;
            that.setPosition(that.newPosition);
          },
          end: function(){
            that.dragging = false;
          }
        });
        this.$wrapperFirst.append(this.$buttonFirst);
        if(options.range){
          this.$wrapperSecond = $('<div tabindex="0" class="el-slider__button-wrapper" style="left: 10%;"></div>');
          this.$buttonSecond = $('<div class="el-tooltip el-slider__button" aria-describedby="el-tooltip-2975" tabindex="0"></div>');
          this.$buttonSecondTooltip = $('<div role="tooltip" aria-hidden="true" class="el-tooltip__popper is-dark" ' +
            'style="z-index: 2000;display: none;bottom: 100%;left:50%;transform: translateX(-50%)">' +
            '<div class="el-tooltip__content"></div><div class="popper__arrow" style="left: 50%;transform: translateX(-50%)"></div></div>');
          this.$buttonSecond.append(this.$buttonSecondTooltip);
          this.$buttonSecond.on('mouseenter focus', function(){that.$buttonSecondTooltip.show();});
          this.$buttonSecond.on('mouseleave blur', function(){that.$buttonSecondTooltip.hide();});
          draggable(this.$buttonSecond[0], {
            start: function(event){
              that.dragging = true;
              if (options.vertical) {
                that.startY = event.clientY;
              } else {
                that.startX = event.clientX;
              }
              that.startPosition = parseFloat(that.$wrapperSecond.css('left'));
              that.newPosition = that.startPosition;
            },
            drag: function(event){
              if(options.disabled) return;
              event.preventDefault();
              if (event.type === 'touchmove') {
                event.clientY = event.touches[0].clientY;
                event.clientX = event.touches[0].clientX;
              }
              var diff = 0;
              if (options.vertical) {
                diff = (that.startY - event.clientY) / that.$runway.height() * 100;
              } else {
                diff = (event.clientX - that.startX) / that.$runway.width() * 100;
              }
              that.newPosition = that.startPosition + diff;
              that.setPosition(that.newPosition);
            },
            end: function(){
              that.dragging = false;
            }
          });
          this.$wrapperSecond.append(this.$buttonSecond);
        }
        this.$runway.append(this.$bar, this.$wrapperFirst, this.$wrapperSecond || '');
        this.$el.append(this.$runway);
      },
      setPosition(newPosition) {
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
        this.$nextTick(() => {
          this.$refs.tooltip && this.$refs.tooltip.updatePopper();
        });
        if (!this.dragging && this.value !== this.oldValue) {
          this.oldValue = this.value;
        }
      },
      disable: function () {
        this.$el.addClass('is-disabled');
        this.options.disabled = true;
      },
      enable: function () {
        this.$el.removeClass('is-disabled');
        this.options.disabled = false;
      },
      set: function (value) {
        var options = this.options, oldValue = options.value;
        options.value = value;
        var barSize = options.range
          ? (100 * (Math.max(options.value[0], options.value[1]) - Math.min(options.value[0], options.value[1])) / (options.max - options.min))
          : (100 * (value - options.min) / (options.max - options.min));
        oldValue !== value && this.options.change && this.options.change(value);
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
      'height': '',
      'label': '',
      'debounce': 300,
      'tooltipClass': false,
      'change': ''
    };
  },
  componentName: 'slider'
};
