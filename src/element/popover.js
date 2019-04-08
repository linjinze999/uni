export default {
  init: function ($, componentName) {
    function Popover ($el, options) {
      this.$el = $el;
      this.options = options;
    }

    Popover.prototype = {
      constructor: Popover,
      init: function () {
        var that = this, options = this.options;
        if (this.$el.css('position') === 'static' && !this.$el.is('body') && !this.$el.is('html')) {
          this.$el.css('position', 'relative');
        }
        this._onEnter = function () {
          that.show();
        };
        this._onLeave = function () {
          that.hide();
        };
        this._onClick = function () {
          if (that._visible) {
            that._onLeave();
          } else {
            that._onEnter();
          }
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
        // 重置popover
        var _display = that.$popover ? that.$popover.css('display') : 'none';
        that.$popover && that.$popover.remove();
        that.$popover = $('<div role="tooltip" aria-hidden="true" class="el-popover el-popper el-popover--plain ' +
          options.popoverClass + '" style="z-index: 2000;display: ' +
          _display + ';"></div>');
        if (options.width) {
          that.$popover.css('width', options.width);
        }
        that.$el.append(that.$popover);
        // 激活方式
        this.$el.off('mouseenter', that._onEnter);
        this.$el.off('mouseleave', that._onLeave);
        this.$el.off('click', that._onClick);
        this.$el.off('focus', that._onEnter);
        this.$el.off('blur', that._onLeave);
        if (options.trigger === 'hover') {
          this.$el.on('mouseenter', that._onEnter);
          this.$el.on('mouseleave', that._onLeave);
          this.$popover.on('mouseenter', that._onEnter);
          this.$popover.on('mouseleave', that._onLeave);
        } else if (options.trigger === 'click') {
          this.$el.on('click', that._onClick);
        } else if (options.trigger === 'focus') {
          this.$el.on('focus', that._onEnter);
          this.$el.on('blur', that._onLeave);
        }
        // 标题内容
        if (options.title) {
          that.$popover.prepend('<div class="el-popover__title">' + options.title + '</div>');
        }
        that.$popover.append('<p style="white-space: normal;">' + options.content + '</p>');
        // 箭头
        that.$arrow = $('<div class="popper__arrow"></div>');
        if (that.options.visibleArrow) {
          that.$popover.append(that.$arrow);
        }
        // 位置
        if (that.options.placement === 'top') {
          this.$popover.css({
            bottom: '100%',
            left: '50%',
            transform: 'translate(-50%, ' + (-options.offset) + 'px)'
          }).attr('x-placement', 'top');
          that.$arrow.css({
            left: '50%',
            transform: 'translate(-50%, 0)'
          });
        } else if (that.options.placement === 'top-left') {
          this.$popover.css({
            bottom: '100%',
            left: '0',
            transform: 'translate(0, ' + (-options.offset) + 'px)'
          }).attr('x-placement', 'top');
          that.$arrow.css({
            left: (this.$el.innerWidth() / 2) + 'px',
            transform: 'translate(-50%, 0)'
          });
        } else if (that.options.placement === 'top-right') {
          this.$popover.css({
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
          this.$popover.css({
            top: '50%',
            right: '100%',
            transform: 'translate(' + (-options.offset) + 'px, -50%)'
          }).attr('x-placement', 'left');
        } else if (that.options.placement === 'left-top') {
          that.$arrow.css({
            top: (this.$el.innerHeight() / 2) + 'px',
            transform: 'translate(0, -50%)'
          });
          this.$popover.css({
            top: '0',
            right: '100%',
            transform: 'translate(' + (-options.offset) + 'px, 0)'
          }).attr('x-placement', 'left');
        } else if (that.options.placement === 'left-bottom') {
          that.$arrow.css({
            bottom: (this.$el.innerHeight() / 2) + 'px',
            transform: 'translate(0, 50%)'
          });
          this.$popover.css({
            top: '100%',
            right: '100%',
            transform: 'translate(' + (-options.offset) + 'px, -100%)'
          }).attr('x-placement', 'left');
        } else if (that.options.placement === 'right') {
          that.$arrow.css({
            top: '50%',
            transform: 'translate(0, -50%)'
          });
          this.$popover.css({
            top: '50%',
            left: '100%',
            transform: 'translate(' + options.offset + 'px, -50%)'
          }).attr('x-placement', 'right');
        } else if (that.options.placement === 'right-top') {
          that.$arrow.css({
            top: (this.$el.innerHeight() / 2) + 'px',
            transform: 'translate(0, -50%)'
          });
          this.$popover.css({
            top: '0',
            left: '100%',
            transform: 'translate(' + options.offset + 'px, 0)'
          }).attr('x-placement', 'right');
        } else if (that.options.placement === 'right-bottom') {
          that.$arrow.css({
            bottom: (this.$el.innerHeight() / 2) + 'px',
            transform: 'translate(0, 50%)'
          });
          this.$popover.css({
            top: '100%',
            left: '100%',
            transform: 'translate(' + options.offset + 'px, -100%)'
          }).attr('x-placement', 'right');
        } else if (that.options.placement === 'bottom-left') {
          that.$arrow.css({
            left: (this.$el.innerWidth() / 2) + 'px',
            transform: 'translate(-50%, 0)'
          });
          this.$popover.css({
            top: '100%',
            left: '0',
            transform: 'translate(0, ' + options.offset + 'px)'
          }).attr('x-placement', 'bottom');
        } else if (that.options.placement === 'bottom-right') {
          that.$arrow.css({
            right: (this.$el.innerWidth() / 2) + 'px',
            transform: 'translate(50%, 0)'
          });
          this.$popover.css({
            top: '100%',
            left: '100%',
            transform: 'translate(-100%, ' + options.offset + 'px)'
          }).attr('x-placement', 'bottom');
        } else {
          that.$arrow.css({
            left: '50%',
            transform: 'translate(-50%, 0)'
          });
          this.$popover.css({
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
          that.$popover.attr('aria-hidden', false).show();
          that.options.afterEnter && that.options.afterEnter();
        }, (typeof that.options.openDelay === 'number') ? that.options.openDelay : 0);
      },
      hide: function () {
        if (this.options.disabled) return;
        var that = this;
        clearTimeout(that.timeout);
        that.timeout = setTimeout(function () {
          that._visible = false;
          that.$popover.attr('aria-hidden', true).hide();
          that.options.afterLeave && that.options.afterLeave();
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
          data = $this.data('u-popover'),
          options = $.extend({}, $.fn[componentName].defaults,
            $this.data(), typeof option === 'object' && option);
        if (!data || options.override) {
          data && data.$popover && data.$popover.remove();
          data = new Popover($this, options);
          $this.data('u-popover', data);
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
      'trigger': 'click',
      'title': '',
      'content': '',
      'width': '',
      'placement': 'bottom',
      'disabled': false,
      'offset': 0,
      'transition': '',
      'visibleArrow': true,
      'openDelay': 0,
      'popoverClass': '',
      'afterEnter': '',
      'afterLeave': ''
    };
  },
  componentName: 'popover'
};
