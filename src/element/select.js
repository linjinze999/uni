import calcTextareaHeight from '../utils/calcTextareaHeight';

export default {
  init: function ($, componentName) {
    function Select ($el, options) {
      this.$el = $el;
      this.options = options;
    }

    Select.prototype = {
      constructor: Select,
      init: function () {
        const that = this, options = this.options;
        // $input
        $.each(attributes, function (key, value) {
          $this.attr(key, value);
        });
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
          if (this.isWordLimitVisible()) {
            this.$count = $('<span class="el-input__count">' + this.$el.val().length + '/' + this.$el.attr('maxlength') + '</span>');
            this.$input.append(this.$count);
            this.$el.on('input change', function () {
              that.$count.text(that.$el.val().length + '/' + that.$el.attr('maxlength'));
            });
          }
          if (options.autosize) {
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
              options.clear && options.clear();
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
          if (this.isWordLimitVisible()) {
            this.$count = $('<span class="el-input__count-inner">' + this.$el.val().length + '/' + this.$el.attr('maxlength') + '</span>');
            this.$suffixInner.append($('<span class="el-input__count"></span>').append(this.$count));
            this.$el.on('input change', function () {
              that.$count.text(that.$el.val().length + '/' + that.$el.attr('maxlength'));
            });
          }
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
        args = arguments,
        value,
        allowedMethods = ['enable', 'disable', 'focus', 'blur'];
      this.each(function () {
        var $this = $(this),
          data = $this.data('u-select'),
          attributes = {};
        if (!data) {
          $.each(this.attributes, function () {
            if (this.specified) {
              attributes[this.name] = this.value;
            }
          });
          var options = $.extend({}, $.fn[componentName].defaults, attributes,
            $this.data(), typeof option === 'object' && option, {attributes: attributes});
          data = new Select($this, options);
          $this.data('u-select', data);
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
      'clearable': false,
      'size': '',
      'collapseTags': false,
      'multipleLimit': 0,
      'filterable': false,
      'allowCreate': false,
      'filterMethod': function () {
      },
      'remote': false,
      'remoteMethod': function () {
      },
      'loadingText': '加载中',
      'noMatchText': '无匹配数据',
      'noDataText': '无数据',
      'popperClass': '',
      'reserveKeyword': false,
      'defaultFirstOption': false,
      'popperAppendToBody': false,
      'automaticDropdown': false,
      'prefix': '',
      'empty': '',
      'change': '',
      'visibleChange': '',
      'removeTag': '',
      'clear': '',
      'blur': '',
      'focus': ''
    };
  },
  componentName: 'select'
};
