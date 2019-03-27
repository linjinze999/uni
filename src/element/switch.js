export default {
  init: function ($, componentName) {
    function Switch ($el, options) {
      this.$el = $el;
      this.options = options;
    }

    Switch.prototype = {
      constructor: Switch,
      init: function () {
        if (this.hasInit) {
          return;
        }
        var options = this.options,
          that = this;
        // 设置html
        this.$checkbox = $('<input type="checkbox" class="el-switch__input">');
        this.$checkbox.attr('name', options.name);
        this.$left = $('<span class="el-switch__label el-switch__label--left"></span>');
        this.$inactive = $('<span>' + options.inactiveHtml + '</span>');
        this.$left.append(this.$inactive);
        this.$switch = $('<span class="el-switch__core"></span>');
        options.width && this.$switch.css('width', options.width + 'px');
        this.$right = $('<span class="el-switch__label el-switch__label--right"></span>');
        this.$active = $('<span>' + options.activeHtml + '</span>');
        this.$right.append(this.$active);
        this.$el.attr('role', 'switch').addClass('el-switch').append(this.$checkbox).append(this.$left)
          .append(this.$switch).append(this.$right);
        // 监听开关事件
        this.$switch.on('click', function(e){
          if (that.options.disabled) {
            return;
          }
          that.$checkbox.attr('checked', !that.$checkbox.is(':checked'));
          that.options.on = that.$checkbox.is(':checked');
          that.onchange(e, options, that, false);
        });
        options.on && this.$checkbox.attr('checked', true);
        // 更新显示
        this.update();
        options.disabled && this.disabled();
        this.hasInit = true;
      },
      update: function(){
        if(!this.$checkbox.is(':checked')){
          this.$left.addClass('is-active');
          this.$inactive.attr('aria-hidden', false);
          this.$right.removeClass('is-active');
          this.$active.attr('aria-hidden', true);
          this.$el.removeClass('is-checked').attr('aria-checked', false);
          this.options.inactiveColor && this.$switch.css({
            'borderColor': this.options.inactiveColor,
            'backgroundColor': this.options.inactiveColor
          });
        } else {
          this.$left.removeClass('is-active');
          this.$inactive.attr('aria-hidden', true);
          this.$right.addClass('is-active');
          this.$active.attr('aria-hidden', false);
          this.$el.addClass('is-checked').attr('aria-checked', true);
          this.options.activeColor && this.$switch.css({
            'borderColor': this.options.activeColor,
            'backgroundColor': this.options.activeColor
          });
        }
      },
      onchange: function (e, options, that, local) {
        that.update();
        !local && options.onchange && options.onchange(e);
      },
      disabled: function () {
        this.$el.attr('aria-disabled', true).addClass('is-disabled');
        this.$checkbox.attr('disabled', true);
        this.options.disabled = true;
      },
      show: function () {
        this.$el.attr('aria-disabled', false).removeClass('is-disabled');
        this.$checkbox.attr('disabled', false);
        this.options.disabled = false;
      },
      set: function (on) {
        this.$checkbox.attr('checked', !!on);
        this.options.on = !!on;
        this.update();
      },
      get: function () {
        return this.$checkbox.is(':checked') ? this.options.activeValue : this.options.inactiveValue;
      }
    };
    $.fn[componentName] = function () {
      var option = arguments[0],
        args = arguments[1],
        value,
        allowedMethods = ['show', 'disabled', 'set', 'get'];
      this.each(function () {
        var $this = $(this),
          data = $this.data('u-switch'),
          options = $.extend({}, $.fn[componentName].defaults,
            $this.data(), typeof option === 'object' && option);
        if (!data) {
          data = new Switch($this, options);
          $this.data('u-switch', data);
          data.init();
        }
        if (typeof option === 'string') {
          if ($.inArray(option, allowedMethods) < 0) {
            throw 'Unknown method: ' + option;
          }
          value = data[option](args);
        }
      });
      return typeof value !== 'undefined' ? value : this;
    };
    $.fn[componentName].defaults = {
      'disabled': false,
      'width': 40,
      'activeHtml': '',
      'inactiveHtml': '',
      'activeValue': true,
      'inactiveValue': false,
      'activeColor': '',
      'inactiveColor': '',
      'name': '',
      'onchange': '',
      'on': false
    };
  },
  componentName: 'switch'
};
