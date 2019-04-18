import clickOutSide from '../utils/clickoutside';
import Color from '../utils/color';
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
        // 触发按钮
        this.$el.attr({
          'role': 'slider',
          'aria-valuemin': options.min,
          'aria-valuemax': options.max,
          'aria-orientation': options.vertical ? 'vertical' : 'horizontal',
          'aria-valuetext': options.value,
          'aria-label': 'slider between ' + options.min + ' and ' + options.max
        }).addClass('el-slider');
        this.$runway = $('<div class="el-slider__runway"></div>');
        this.$bar = $('<div class="el-slider__bar" style="width: 10%; left: 0%;"></div>');
        this.$buttonWrapper = $('<div tabindex="0" class="el-slider__button-wrapper" style="left: 10%;"></div>');
        this.$button = $('<div class="el-tooltip el-slider__button" aria-describedby="el-tooltip-2975" tabindex="0"></div>');
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
          ? (100 * (this.maxValue - this.minValue) / (options.max - options.min))
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
