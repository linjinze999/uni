export default {
  init: function ($, componentName) {
    function Radios ($el, options) {
      this.$el = $el;
      this.options = options;
    }

    Radios.prototype = {
      constructor: Radios,
      init: function () {
        if(this.hasInit) {
          return;
        }
        var options = this.options,
          that = this;
        if (options.button){
          // 按钮radio
          this.$label = $('<label role="radio" tabindex="0"></label>');
          var _classPrefix = 'el-radio-button';
          var _classSize = options.size ? (_classPrefix + '-' + options.size) : '';
          var _classChecked = this.$el.is(':checked') ? 'is-active' : '';
          this.$label.addClass([_classPrefix, _classSize, _classChecked].join(' '));
          this.$inner = $('<span class="' + _classPrefix + '__inner">'+ (this.$el.attr('label') || '') + '</span>');
          var _classRadio = 'el-radio-button__orig-radio';
          this.$el.addClass(_classRadio).attr('aria-hidden', true).attr('tabindex', -1);
          if (this.$el.is(':checked')){
            this.$label.attr('aria-checked', true).attr('tabindex', 0);
          }
          this.$el.wrap(this.$label);
          this.$label = $(this.$el.parent()[0]);
          this.$el.after(this.$inner);
        } else {
          // 普通radio
          this.$label = $('<label role="radio" tabindex="0"></label>');
          var _classPrefix = 'el-radio';
          var _classSize = (options.size && options.border) ? (_classPrefix + '-' + options.size) : '';
          var _classBorder = options.border ? 'is-bordered' : '';
          var _classChecked = this.$el.is(':checked') ? 'is-checked' : '';
          this.$label.addClass([_classPrefix, _classSize, _classBorder, _classChecked].join(' '));
          this.$inner = $('<span class="' + _classPrefix + '__inner"></span>');
          var _classRadio = 'el-radio__original';
          this.$el.addClass(_classRadio).attr('aria-hidden', true).attr('tabindex', -1);
          this.$parent = $('<span class="el-radio__input"></span>');
          if (this.$el.is(':checked')){
            this.$parent.addClass('is-checked');
            this.$label.attr('aria-checked', true);
          }
          this.$el.wrap(this.$parent);
          this.$parent = $(this.$el.parent()[0]);
          this.$el.before(this.$inner);
          this.$el.after('<span class="el-radio__label">'+ (this.$el.attr('label') || '') + '</span>');
          this.$parent.wrap(this.$label);
          this.$label = $(this.$parent.parent()[0]);
        }
        // 监听设置选中状态
        this.$label.on('click', function(){ this.$el.click(); });
        this.$el.on('change', function(){
          if (options.button) {
            // 按钮
            if( that.$el.is(':checked') !== that.$label.hasClass('is-active')){
              if(that.$el.is(':checked')){
                that.$label.addClass('is-active').attr('tabindex', 0).attr('aria-checked', true);
              }else{
                that.$label.removeClass('is-active').attr('tabindex', -1).attr('aria-checked', false);
              }
              $('input[type=radio][name=' + that.$el.attr('name') + ']').not(that.$el).trigger('change');
            }
          } else {
            // 普通radio
            if( that.$el.is(':checked') !== that.$parent.hasClass('is-checked')){
              if(that.$el.is(':checked')){
                that.$parent.addClass('is-checked');
                that.$label.addClass('is-checked').attr('aria-checked', true);
              }else{
                that.$parent.removeClass('is-checked');
                that.$label.removeClass('is-checked').attr('aria-checked', false);
              }
              $('input[type=radio][name=' + that.$el.attr('name') + ']').not(that.$el).trigger('change');
            }
          }
        });
        this.hasInit = true;
      },
      disabled: function () {
        if (this.options.button) {
          this.$label.addClass('is-disabled').attr('aria-disabled', true).attr('tabindex', -1);
          this.$el.attr('disabled', true);
        } else {
          this.$label.addClass('is-disabled').attr('aria-disabled', true).attr('tabindex', -1);
          this.$parent.addClass('is-disabled');
          this.$el.attr('disabled', true);
        }
      },
      show: function () {
        if (this.options.button) {
          this.$label.removeClass('is-disabled').attr('aria-disabled', false);
          this.$el.is(':checked') ? this.$label.attr('tabindex',0) : this.$label.attr('tabindex',-1);
          this.$el.attr('disabled', false);
        } else {
          this.$label.removeClass('is-disabled').attr('aria-disabled', false).attr('tabindex', 0);
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
          data = $this.data('u-radio'),
          options = $.extend({}, $.fn[componentName].defaults,
            $this.data(), typeof option === 'object' && option);
        if (!data) {
          data = new Radios($this, options);
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
      'disabled': false,
      'border': false,
      'size': '',
      'button': false,
      'textColor': '#ffffff'
    };
  },
  componentName: 'radio'
};
