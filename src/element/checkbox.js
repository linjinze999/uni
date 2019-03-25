export default {
  init: function ($, componentName) {
    function Checkbox ($el, options) {
      this.$el = $el;
      this.options = options;
    }

    Checkbox.prototype = {
      constructor: Checkbox,
      init: function () {
        if(this.hasInit) {
          return;
        }
        var options = this.options,
          that = this;
        if (options.button){
          // 按钮checkbox
          this.$label = $('<label role="checkbox"></label>');
          var _classPrefix = 'el-checkbox-button';
          var _classSize = options.size ? (_classPrefix + '--' + options.size) : '';
          var _classChecked = this.$el.is(':checked') ? 'is-checked' : '';
          this.$label.addClass([_classPrefix, _classSize, _classChecked].join(' '));
          this.$inner = $('<span class="' + _classPrefix + '__inner">'+ (this.$el.attr('label') || '') + '</span>');
          var _classCheckbox = 'el-checkbox-button__original';
          this.$el.addClass(_classCheckbox).attr('aria-hidden', true);
          if (this.$el.is(':checked')){
            this.$label.attr('aria-checked', true);
          }
          this.$el.wrap(this.$label);
          this.$label = $(this.$el.parent()[0]);
          this.$el.after(this.$inner);
          $(this.$label.parent()[0]).addClass('el-checkbox-group').attr('role', 'group').attr('aria-label', 'checkbox-group');
        } else {
          // 普通checkbox
          this.$label = $('<label role="checkbox"></label>');
          var _classPrefix = 'el-checkbox';
          var _classSize = (options.size && options.border) ? (_classPrefix + '--' + options.size) : '';
          var _classBorder = options.border ? 'is-bordered' : '';
          var _classChecked = this.$el.is(':checked') ? 'is-checked' : '';
          this.$label.addClass([_classPrefix, _classSize, _classBorder, _classChecked].join(' '));
          this.$inner = $('<span class="' + _classPrefix + '__inner"></span>');
          var _classCheckbox = 'el-checkbox__original';
          this.$el.addClass(_classCheckbox).attr('aria-hidden', true);
          var _classIndeterminate = options.indeterminate ? 'is-indeterminate' : '';
          this.$parent = $('<span class="el-checkbox__input ' + _classIndeterminate + '" aria-checked="mixed"></span>');
          if (this.$el.is(':checked')){
            this.$parent.addClass('is-checked');
            this.$label.attr('aria-checked', true);
          }
          this.$el.wrap(this.$parent);
          this.$parent = $(this.$el.parent()[0]);
          this.$el.before(this.$inner);
          this.$parent.wrap(this.$label);
          this.$label = $(this.$parent.parent()[0]);
          this.$parent.after('<span class="el-checkbox__label">'+ (this.$el.attr('label') || '') + '</span>');
          $(this.$label.parent()[0]).addClass('el-checkbox-group').attr('role', 'group').attr('aria-label', 'checkbox-group');
        }
        (options.disabled || this.$el.attr('disabled')) && this.disabled();
        options.disabled = Boolean(this.$el.attr('disabled'));
        // 监听设置选中状态
        this.$el.on('change', function(e){
          that.onchange(e, options, that, false);
        });
        this.hasInit = true;
        if (options.checked === true ||
          (Array.isArray(options.checked) && options.checked.indexOf(this.$el.attr('value')) > -1)) {
          this.$el.attr('checked', true);
        }
        this.onchange('', options, that, true);
      },
      onchange: function(e, options, that, local) {
        var _values = [];
        $('input[type=checkbox][name=' + that.$el.attr('name') + ']:checked').each(function(){
          _values.push($(this).val());
        });
        if (options.min && options.min > _values.length && !that.$el.is(':checked')) {
          that.$el.prop('checked', true);
        }
        if (options.max && options.max < _values.length && that.$el.is(':checked')) {
          that.$el.prop('checked', false);
        }
        if (options.button) {
          // 按钮
          if( that.$el.is(':checked') !== that.$label.hasClass('is-checked')){
            if(that.$el.is(':checked')){
              that.$label.addClass('is-checked').attr('aria-checked', true);
            }else{
              that.$label.removeClass('is-checked').attr('aria-checked', false);
            }
          }
        } else {
          // 普通checkbox
          if( that.$el.is(':checked') !== that.$parent.hasClass('is-checked')){
            if(that.$el.is(':checked')){
              that.$parent.addClass('is-checked');
              that.$label.addClass('is-checked').attr('aria-checked', true);
            }else{
              that.$parent.removeClass('is-checked');
              that.$label.removeClass('is-checked').attr('aria-checked', false);
            }
          }
        }
        !local && options.onchange && options.onchange(e);
      },
      disabled: function () {
        if (this.options.button) {
          this.$label.addClass('is-disabled').attr('aria-disabled', true);
          this.$el.attr('disabled', true);
        } else {
          this.$label.addClass('is-disabled').attr('aria-disabled', true);
          this.$parent.addClass('is-disabled');
          this.$el.attr('disabled', true);
        }
      },
      show: function () {
        if (this.options.button) {
          this.$label.removeClass('is-disabled').attr('aria-disabled', false);
          this.$el.attr('disabled', false);
        } else {
          this.$label.removeClass('is-disabled').attr('aria-disabled', false);
          this.$parent.removeClass('is-disabled');
          this.$el.attr('disabled', false);
        }
      }
    };
    $.fn[componentName] = function () {
      var option = arguments[0],
        value,
        allowedMethods = ['show', 'disabled'];
      this.each(function () {
        var $this = $(this),
          data = $this.data('u-checkbox'),
          options = $.extend({}, $.fn[componentName].defaults,
            $this.data(), typeof option === 'object' && option);
        if (!data) {
          data = new Checkbox($this, options);
          $this.data('u-checkbox', data);
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
      'disabled': false,
      'border': false,
      'size': '',
      'button': false,
      'checked': false
    };
  },
  componentName: 'checkbox'
};
