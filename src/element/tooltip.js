export default {
  init: function ($, componentName) {
    function Tooltip ($el, options) {
      this.$el = $el;
      this.options = options;
    }

    Tooltip.prototype = {
      constructor: Tooltip,
      init: function () {
        var that = this, options = this.options;
        if (this.$el.css('position') === 'static' && !this.$el.is('body') && !this.$el.is('html')) {
          this.$el.css('position', 'relative');
        }
        this._onElEnter = function () {
          that.show();
        };
        this._onElLeave = function () {
          that.hide();
        };
        this._onTooltipEnter = function () {
          that.show();
        };
        this._onTooltipLeave = function () {
          that.hide();
        };
        this.set(options);
      },
      set: function (_option) {
        var that = this, options = this.options;
        if (typeof _option === 'string') {
          _option = {content: _option};
        }
        that.options = $.extend(true, {}, options, _option);
        options = that.options;
        // 重置tooltip
        var _display = that.$tooltip ? that.$tooltip.css('display') : 'none';
        that.$tooltip && that.$tooltip.remove();
        that.$tooltip = $('<div role="tooltip" aria-hidden="true" class="el-tooltip__popper" style="z-index: 2000;display: ' +
          _display + ';"><div class="el-tooltip__content"></div></div>');
        that.$el.append(that.$tooltip);
        // 主题
        that.$tooltip.addClass('is-' + options.effect + ' ' + options.tooltipClass);
        // 提示框是否可进入
        if (options.enterable && !options.manual) {
          this.$tooltip.on('mouseenter', that._onTooltipEnter);
          this.$tooltip.on('mouseleave', that._onTooltipLeave);
        }
        this.$el.off('mouseenter', that._onElEnter);
        this.$el.off('mouseleave', that._onElLeave);
        // 是否手动控制
        if (!options.manual) {
          this.$el.on('mouseenter', that._onElEnter);
          this.$el.on('mouseleave', that._onElLeave);
        }
        // 内容
        that.$tooltip.find('.el-tooltip__content').html(options.content);
        // 箭头
        that.$arrow = $('<div class="popper__arrow"></div>');
        if (that.options.visibleArrow) {
          that.$tooltip.append(that.$arrow);
        }
        // 位置
        if (that.options.placement === 'top') {
          this.$tooltip.css({
            bottom: '100%',
            left: '50%',
            transform: 'translate(-50%, ' + (-options.offset) + 'px)'
          }).attr('x-placement', 'top');
          that.$arrow.css({
            left: '50%',
            transform: 'translate(-50%, 0)'
          });
        } else if (that.options.placement === 'top-left') {
          this.$tooltip.css({
            bottom: '100%',
            left: '0',
            transform: 'translate(0, ' + (-options.offset) + 'px)'
          }).attr('x-placement', 'top');
          that.$arrow.css({
            left: (this.$el.innerWidth() / 2) + 'px',
            transform: 'translate(-50%, 0)'
          });
        } else if (that.options.placement === 'top-right') {
          this.$tooltip.css({
            bottom: '100%',
            left: '100%',
            transform: 'translate(-100%, ' + (-options.offset) + 'px)'
          }).attr('x-placement', 'top');
          that.$arrow.css({
            right: (this.$el.innerWidth() / 2) + 'px',
            transform: 'translate(50%, 0)'
          });
        } else if (that.options.placement === 'left') {
          that.$arrow.css({
            top: '50%',
            transform: 'translate(0, -50%)'
          });
          this.$tooltip.css({
            top: '50%',
            right: '100%',
            transform: 'translate(' + (-options.offset) + 'px, -50%)'
          }).attr('x-placement', 'left');
        } else if (that.options.placement === 'left-top') {
          that.$arrow.css({
            top: (this.$el.innerHeight() / 2) + 'px',
            transform: 'translate(0, -50%)'
          });
          this.$tooltip.css({
            top: '0',
            right: '100%',
            transform: 'translate(' + (-options.offset) + 'px, 0)'
          }).attr('x-placement', 'left');
        } else if (that.options.placement === 'left-bottom') {
          that.$arrow.css({
            bottom: (this.$el.innerHeight() / 2) + 'px',
            transform: 'translate(0, 50%)'
          });
          this.$tooltip.css({
            top: '100%',
            right: '100%',
            transform: 'translate(' + (-options.offset) + 'px, -100%)'
          }).attr('x-placement', 'left');
        } else if (that.options.placement === 'right') {
          that.$arrow.css({
            top: '50%',
            transform: 'translate(0, -50%)'
          });
          this.$tooltip.css({
            top: '50%',
            left: '100%',
            transform: 'translate(' + options.offset + 'px, -50%)'
          }).attr('x-placement', 'right');
        } else if (that.options.placement === 'right-top') {
          that.$arrow.css({
            top: (this.$el.innerHeight() / 2) + 'px',
            transform: 'translate(0, -50%)'
          });
          this.$tooltip.css({
            top: '0',
            left: '100%',
            transform: 'translate(' + options.offset + 'px, 0)'
          }).attr('x-placement', 'right');
        } else if (that.options.placement === 'right-bottom') {
          that.$arrow.css({
            bottom: (this.$el.innerHeight() / 2) + 'px',
            transform: 'translate(0, 50%)'
          });
          this.$tooltip.css({
            top: '100%',
            left: '100%',
            transform: 'translate(' + options.offset + 'px, -100%)'
          }).attr('x-placement', 'right');
        } else if (that.options.placement === 'bottom-left') {
          that.$arrow.css({
            left: (this.$el.innerWidth() / 2) + 'px',
            transform: 'translate(-50%, 0)'
          });
          this.$tooltip.css({
            top: '100%',
            left: '0',
            transform: 'translate(0, ' + options.offset + 'px)'
          }).attr('x-placement', 'bottom');
        } else if (that.options.placement === 'bottom-right') {
          that.$arrow.css({
            right: (this.$el.innerWidth() / 2) + 'px',
            transform: 'translate(50%, 0)'
          });
          this.$tooltip.css({
            top: '100%',
            left: '100%',
            transform: 'translate(-100%, ' + options.offset + 'px)'
          }).attr('x-placement', 'bottom');
        } else {
          that.$arrow.css({
            left: '50%',
            transform: 'translate(-50%, 0)'
          });
          this.$tooltip.css({
            top: '100%',
            left: '50%',
            transform: 'translate(-50%, ' + options.offset + 'px)'
          }).attr('x-placement', 'bottom');
        }
      },
      show: function () {
        if (this.options.disabled) return;
        var that = this;
        clearTimeout(that.timeout);
        that.timeout = setTimeout(function () {
          that._visible = true;
          that.$tooltip.attr('aria-hidden', false).show();
          if ((typeof that.options.hideAfter === 'number') && that.options.hideAfter > 0) {
            setTimeout(function () {
              that.hide();
            }, that.options.hideAfter);
          }
        }, (typeof that.options.openDelay === 'number') ? that.options.openDelay : 0);
      },
      hide: function () {
        if (this.options.disabled) return;
        var that = this;
        clearTimeout(that.timeout);
        that.timeout = setTimeout(function () {
          that._visible = false;
          that.$tooltip.attr('aria-hidden', true).hide();
        }, 100);
      }
    };
    $.fn[componentName] = function () {
      var option = arguments[0],
        args = arguments,
        value,
        allowedMethods = ['set', 'show', 'hide'];
      this.each(function () {
        var $this = $(this),
          data = $this.data('u-tooltip'),
          options = $.extend({}, $.fn[componentName].defaults,
            $this.data(), typeof option === 'object' && option);
        if (!data || options.override) {
          data && data.$tooltip && data.$tooltip.remove();
          data = new Tooltip($this, options);
          $this.data('u-tooltip', data);
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
      'effect': 'dark',
      'content': '',
      'placement': 'bottom',
      'disabled': false,
      'offset': 0,
      'transition': '',
      'visibleArrow': true,
      'openDelay': 0,
      'manual': false,
      'tooltipClass': '',
      'enterable': true,
      'hideAfter': 0
    };
  },
  componentName: 'tooltip'
};
