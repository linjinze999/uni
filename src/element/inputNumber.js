import repeatClick from '../utils/repeatClick';

export default {
  init: function ($, componentName) {
    function InputNumber ($el, options) {
      this.$el = $el;
      this.options = options;
    }

    InputNumber.prototype = {
      constructor: InputNumber,
      init: function () {
        const that = this, options = this.options;
        this.$el.attr('type', 'text').addClass('el-input__inner').val(options.value);
        var parentClass = [];
        parentClass.push('el-input-number');
        options.size && parentClass.push('el-input-number--' + options.size);
        !options.controls && parentClass.push('is-without-controls');
        options.controlsPosition === 'right' && parentClass.push('is-controls-right');
        this.$parent = $('<div class="' + parentClass.join(' ') + '"></div>');
        this.$input = $('<div class="el-input ' + (options.size ? ('el-input--' + options.size) : '') + '"></div>');
        this.$el.wrap(this.$input);
        this.$input = $(this.$el.parent()[0]);
        this.$input.wrap(this.$parent);
        this.$parent = $(this.$input.parent()[0]);
        if (options.controls) {
          this.$inputDecrease = $('<span role="button" class="el-input-number__decrease"><i class="el-icon-' +
            (options.controlsPosition === 'right' ? 'arrow-down' : 'minus')+'"></i></span>');
          repeatClick.bind(this.$inputDecrease[0], function () {
            !that.inputDecreaseDisabled && that.$el.val( Number(that.$el.val()) - Number(options.step)).trigger('change');
          });
          this.$inputIncrease = $('<span role="button" class="el-input-number__increase"><i class="el-icon-'+
            (options.controlsPosition === 'right' ? 'arrow-up' : 'plus')+'"></i></span>');
          repeatClick.bind(this.$inputIncrease[0], function () {
            !that.inputIncreaseDisabled && that.$el.val( Number(that.$el.val()) + Number(options.step)).trigger('change');
          });
          this.$parent.prepend(this.$inputDecrease, this.$inputIncrease);
        }
        this.$el.on('change', function (e) {
          var newVal = Number(e.target.value);
          if (isNaN(newVal)) {
            that.$el.val(options.value);
            that.updateInput();
            return;
          }
          if (newVal >= Number(options.max)) newVal = Number(options.max);
          if (newVal <= Number(options.min)) newVal = Number(options.min);
          if (options.stepStrictly) {
            var stepPrecision = that.getPrecision(options.step);
            var precisionFactor = Math.pow(10, stepPrecision);
            newVal = Math.round(newVal / options.step) * precisionFactor * options.step / precisionFactor;
          }
          if (options.precision !== undefined) {
            newVal = that.toPrecision(newVal, options.precision);
          }
          options.value = newVal;
          that.$el.val(newVal);
          that.updateInput();
        });
        if (options.hasOwnProperty('disabled')) {
          options.disabled ? this.disable() : this.enable();
        }
        this.$el.val(options.value).trigger('change');
      },
      toPrecision(num, precision) {
        return parseFloat(Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision)).toFixed(precision);
      },
      updateInput: function () {
        var options = this.options;
        if (options.controls) {
          if (Number(this.$el.val()) <= Number(options.min) || options.disabled) {
            this.$inputDecrease.addClass('is-disabled');
            this.inputDecreaseDisabled = true;
          } else {
            this.$inputDecrease.removeClass('is-disabled');
            this.inputDecreaseDisabled = false;
          }
          if (Number(this.$el.val()) >= Number(options.max) || options.disabled) {
            this.$inputIncrease.addClass('is-disabled').attr('disabled', true);
            this.inputIncreaseDisabled = true;
          } else {
            this.$inputIncrease.removeClass('is-disabled').attr('disabled', false);
            this.inputIncreaseDisabled = false;
          }
        }
      },
      getPrecision: function(value) {
        if (value === undefined) return 0;
        var valueString = value.toString();
        var dotPosition = valueString.indexOf('.');
        let precision = 0;
        if (dotPosition !== -1) {
          precision = valueString.length - dotPosition - 1;
        }
        return precision;
      },
      disable: function () {
        this.options.disabled = true;
        this.updateInput();
        this.$parent.addClass('is-disabled');
        this.$input.addClass('is-disabled');
        this.$el.attr('disabled', true);
      },
      enable: function () {
        this.options.disabled = false;
        this.updateInput();
        this.$parent.removeClass('is-disabled');
        this.$input.removeClass('is-disabled');
        this.$el.attr('disabled', false);
      }
    };
    $.fn[componentName] = function () {
      var option = arguments[0],
        value,
        allowedMethods = ['enable', 'disable'];
      this.each(function () {
        var $this = $(this),
          data = $this.data('u-input-number'),
          attributes = {};
        if (!data) {
          $.each(this.attributes, function () {
            if (this.specified) {
              attributes[this.name] = this.value;
            }
          });
          var options = $.extend({}, $.fn[componentName].defaults, attributes,
            $this.data(), typeof option === 'object' && option);
          $.each(attributes, function (key, value) {
            $this.attr(key, value);
          });
          data = new InputNumber($this, options);
          $this.data('u-input-number', data);
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
      'max': Infinity,
      'min': -Infinity,
      'step': 1,
      'stepStrictly': false,
      'precision': undefined,
      'size': '',
      'controls': true,
      'controlsPosition': ''
    };
  },
  componentName: 'inputNumber'
};
