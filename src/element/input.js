export default {
  init: function ($, componentName) {
    function Input ($el, options) {
      this.$el = $el;
      this.options = options;
    }

    Input.prototype = {
      constructor: Input,
      init: function () {
        const that = this, options = this.options;
        this.$el.attr('tabindex', options.tabindex);
        // $input
        const inputClass = [];
        inputClass.push(options.type === 'textarea' ? 'el-textarea' : 'el-input');
        options.size && inputClass.push('el-input--' + options.size);
        (options.prepend || options.append) && inputClass.push('el-input-group');
        options.append && inputClass.push('el-input-group--append');
        options.prepend && inputClass.push('el-input-group--prepend');
        (options.prefix || options.prefixIcon) && inputClass.push('el-input--prefix');
        (options.suffix || options.suffixIcon || options.clearable || options.showPassword) && inputClass.push('el-input--suffix');
        this.$input = $('<div class="' + inputClass.join(' ') + '"></div>');
        this.$el.wrap(this.$input);
        this.$input = $(this.$el.parent()[0]);
        if (options.type === 'textarea') {
          /* textarea */
          this.$el.addClass('el-textarea__inner');
        } else {
          this.$el.addClass('el-input__inner');
          // 前置元素
          options.prepend && this.$input.prepend('<div class="el-input-group__prepend">' + options.prepend + '</div>');
          // 前置内容
          (options.prefix || options.prefixIcon) && this.$input.append('<span class="el-input__prefix">' +
            options.prefix + (options.prefixIcon ? '<i class="el-input__icon ' + options.prefixIcon + '"></i>' : '') +
            '</span>');
          // 后置内容
          this.$suffix = $('<span class="el-input__suffix"></span>');
          options.suffix && this.$suffix.append(options.suffix);
          options.suffixIcon && this.$suffix.append('<i class="el-input__icon ' + options.suffixIcon + '"></i>');
          options.clearable && this.$suffix.append('<i class="el-input__icon el-icon-view el-input__clear"></i>');
          this.isWordLimitVisible() && this.$suffix.append('<span class="el-input__count"><span class="el-input__count-inner">1/1</span></span>');
          this.$input.append(this.$suffix);
          // 后置元素
          options.append && this.$input.append('<div class="el-input-group__append">' + options.append + '</div>');
        }
        this.$el.trigger('change');
      },
      isWordLimitVisible: function () {
        return this.options.showWordLimit &&
          this.$el.attr('maxlength') &&
          (this.options.type === 'text' || this.options.type === 'textarea') &&
          !this.options.disabled &&
          !this.$el.attr('readonly') &&
          !this.options.showPassword;
      },
      onchange: function (options, that) {
        // todo
      },
      disable: function () {
        this.options.disabled = true;
        this.$input.addClass('is-disabled');
      },
      enable: function () {
        this.options.disabled = false;
        this.$input.removeClass('is-disabled');
      }
    };
    $.fn[componentName] = function () {
      var option = arguments[0],
        value,
        allowedMethods = ['enable', 'disable', 'focus', 'blur', 'select'];
      this.each(function () {
        var $this = $(this),
          data = $this.data('u-radio'),
          options = $.extend({}, $.fn[componentName].defaults,
            $this.data(), typeof option === 'object' && option);
        if (!data) {
          options.type = $this.is('textarea') ? 'textarea' : options.type;
          data = new Input($this, options);
          $this.data('u-radio', data);
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
      'type': 'text',
      'value': '',
      'showWordLimit': false,
      'clearable': false,
      'showPassword': false,
      'disabled': false,
      'size': '',
      'prefixIcon': '',
      'suffixIcon': '',
      'rows': '',
      'autosize': false,
      'resize': '',
      'label': '',
      'tabindex': '',
      'validateEvent': true,
      'prefix': '',
      'suffix': '',
      'prepend': '',
      'append': '',
      'blur': '',
      'focus': '',
      'change': '',
      'clear': ''
    };
  },
  componentName: 'input'
};
