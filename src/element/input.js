import calcTextareaHeight from '../utils/calcTextareaHeight';

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
        var inputClass = [];
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
        this.$input.on('mouseenter', function () {
          that.hovering = true;
        });
        this.$input.on('mouseleave', function () {
          that.hovering = false;
        });
        if (options.type === 'textarea') {
          /* textarea */
          this.$el.addClass('el-textarea__inner');
          if(options.autosize){
            var _autosize = options.autosize;
            options.autosize = {
              minRows: _autosize.minRows || 1,
              maxRows: _autosize.maxRows || null
            };
            this.$el.on('propertychange input focus', function () {
              that.areaResize();
            });
            this.areaResize();
          }
        } else {
          /* input */
          this.$el.addClass('el-input__inner');
          // 前置元素
          options.prepend && this.$input.prepend('<div class="el-input-group__prepend">' + options.prepend + '</div>');
          // 前置内容
          (options.prefix || options.prefixIcon) && this.$input.append('<span class="el-input__prefix">' +
            options.prefix + (options.prefixIcon ? '<i class="el-input__icon ' + options.prefixIcon + '"></i>' : '') +
            '</span>');
          // 后置内容
          this.$suffix = $('<span class="el-input__suffix"></span>');
          this.$suffixInner = $('<span class="el-input__suffix-inner"></span>');
          this.$suffix.append(this.$suffixInner);
          options.suffix && this.$suffixInner.append(options.suffix);
          options.suffixIcon && this.$suffixInner.append('<i class="el-input__icon ' + options.suffixIcon + '"></i>');
          if (options.clearable) {
            this.$clear = $('<i class="el-input__icon el-icon-circle-close el-input__clear" style="display: none;"></i>');
            this.$clear.on('click', function () {
              that.$el.val('').trigger('input').trigger('change');
            });
            this.$input.on('mouseenter', function () {
              that.$el.val().length > 0 && that.$clear.show();
            });
            this.$input.on('mouseleave', function () {
              !that.$el.is(':focus') && that.$clear.hide();
            });
            this.$el.on('focus input change', function () {
              that.$el.val().length > 0 ? that.$clear.show() : that.$clear.hide();
            });
            this.$el.on('blur', function () {
              !that.hovering && !that.$el.is(':focus') && that.$clear.hide();
            });
            this.$suffixInner.append(this.$clear);
          }
          if (options.showPassword) {
            this.$password = $('<i class="el-input__icon el-icon-view el-input__clear" style="display: none;"></i>');
            this.$password.on('click', function () {
              that.$el.attr('type', that.$el.attr('type') === 'password' ? 'text' : 'password');
              that.$el.focus();
            });
            this.$el.on('focus', function () {
              that.$password.show();
            });
            this.$el.on('blur', function () {
              !that.hovering && that.$password.hide();
            });
            this.$suffixInner.append(this.$password);
          }
          this.isWordLimitVisible() && this.$suffixInner.append('<span class="el-input__count"><span class="el-input__count-inner">1/1</span></span>');
          this.$input.append(this.$suffix);
          // 后置元素
          options.append && this.$input.append('<div class="el-input-group__append">' + options.append + '</div>');
        }
        if (options.hasOwnProperty('disabled')) {
          options.disabled ? this.disable() : this.enable();
        }
      },
      isWordLimitVisible: function () {
        return this.options.showWordLimit &&
          this.$el.attr('maxlength') &&
          (this.options.type === 'text' || this.options.type === 'textarea');
      },
      areaResize: function () {
        var options = this.options;
        var _style = calcTextareaHeight(this.$el[0], options.autosize.minRows, options.autosize.maxRows);
        this.$el.css(_style);
      },
      onchange: function (options, that) {
        // todo
      },
      disable: function () {
        this.options.disabled = true;
        this.$input.addClass('is-disabled');
        this.$el.attr('disabled', true);
      },
      enable: function () {
        this.options.disabled = false;
        this.$input.removeClass('is-disabled');
        this.$el.attr('disabled', false);
      }
    };
    $.fn[componentName] = function () {
      var option = arguments[0],
        value,
        allowedMethods = ['enable', 'disable', 'focus', 'blur', 'select'];
      this.each(function () {
        var $this = $(this),
          data = $this.data('u-radio'),
          attributes = {};
        if (!data) {
          $.each(this.attributes, function () {
            if (this.specified) {
              attributes[this.name] = this.value;
            }
          });
          var options = $.extend({}, $.fn[componentName].defaults, attributes,
            $this.data(), typeof option === 'object' && option);
          options.type = $this.is('textarea') ? 'textarea' : options.type;
          $.each(attributes, function (key, value) {
            $this.attr(key, value);
          });
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
