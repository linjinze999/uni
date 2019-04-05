import clickOutSide from '../utils/clickoutside';

export default {
  init: function ($, componentName) {
    function Dropdown ($el, options) {
      this.$el = $el;
      this.options = options;
    }

    Dropdown.prototype = {
      constructor: Dropdown,
      init: function () {
        var that = this,
          options = this.options;
        this.$dropdown = $('<div class="el-dropdown"> </div>');
        // 下拉框
        if (options.splitButton) {
          this.$buttonGroup = $('<div class="el-button-group"></div>');
          this.$elButton = $('<button type="button" class="el-button" aria-haspopup="list" role="button" tabindex="0"></button>');
          this.$dropicon = $('<button type="button" class="el-button el-dropdown__caret-button" aria-haspopup="list" tabindex="0"><span><i class="el-dropdown__icon el-icon-arrow-down"></i></span></button>');
          options.size && this.$elButton.addClass('el-button--' + options.size) && this.$dropicon.addClass('el-button--' + options.size);
          options.type && this.$elButton.addClass('el-button--' + options.type) && this.$dropicon.addClass('el-button--' + options.type);
          this.$elButton = $(this.$el.wrap(this.$elButton).parent().eq(0));
          this.$buttonGroup = $(this.$elButton.wrap(this.$buttonGroup).parent().eq(0));
          this.$buttonGroup.append(this.$dropicon);
          this.$trigger = this.$dropicon;
          options.click && this.$elButton.on('click', options.click);
          this.$dropdown = $(this.$buttonGroup.wrap(this.$dropdown).parent().eq(0));
        } else {
          this.$dropicon = $('<i class="el-icon-arrow-down el-icon--right"></i>');
          this.$el.addClass('el-dropdown-selfdefine').attr({
            'aria-haspopup': 'list',
            'role': 'button',
            'tabindex': '0'
          });
          this.$el.append(this.$dropicon);
          this.$el.wrap(this.$dropdown);
          this.$dropdown = $(this.$el.parent().eq(0));
          this.$trigger = this.$el;
        }
        // 下拉菜单
        this.$list = $('<ul class="el-dropdown-menu el-popper" style="z-index: 2000; display: none;"></ul>');
        options.size && this.$list.addClass('el-dropdown-menu--' + options.size);
        // 显示位置
        if(options.placement === 'top'){
          this.$list.css({
            'top': '-12px',
            'left': '50%',
            'transform': 'translate(-50%, -100%)'
          });
        }else if(options.placement === 'top-start'){
          this.$list.css({
            'top': '-12px',
            'left': '0',
            'transform': 'translate(0, -100%)'
          });
        }else if(options.placement === 'top-end'){
          this.$list.css({
            'top': '-12px',
            'left': '100%',
            'transform': 'translate(-100%, -100%)'
          });
        }else if(options.placement === 'bottom'){
          this.$list.css({
            'top': '100%',
            'left': '50%',
            'transform': 'translate(-50%, 0)'
          });
        }else if(options.placement === 'bottom-start'){
          this.$list.css({
            'top': '100%',
            'left': '0',
            'transform': 'translate(0, 0)'
          });
        }else{
          this.$list.css({
            'top': '100%',
            'left': '100%',
            'transform': 'translate(-100%, 0)'
          });
        }
        var _defaults = {
          'command': '',
          'disabled': false,
          'divided': false,
          'content': ''
        };
        // 子菜单
        $.each(options.data, function (idx, item) {
          var _option;
          if (typeof item === 'string') {
            item = {content: item};
          }
          _option = $.extend({}, _defaults, item);
          _option.command = _option.command || _option.content;
          var $li = $('<li tabindex="-1" class="el-dropdown-menu__item" style="width: max-content">' + _option.content + '</li>');
          _option.disabled && $li.addClass('is-disabled');
          _option.divided && $li.addClass(' el-dropdown-menu__item--divided');
          $li.on('click', function () {
            if (_option.disabled) return;
            options.command && options.command(_option.command);
            if (options.hideOnClick) {
              that._visible = false;
              that.$list.hide();
            }
          });
          that.$list.append($li);
        });
        that.$list.append($('<div x-arrow="" class="popper__arrow"></div>'));
        // 展开 / 隐藏
        if (options.trigger === 'hover') {
          this.$trigger.on('mouseenter', function () {
            that.show();
          });
          this.$trigger.on('mouseleave', function () {
            that.hide();
          });
          this.$list.on('mouseenter', function () {
            that.show();
          });
          this.$list.on('mouseleave', function () {
            that.hide();
          });
        } else if (options.trigger === 'click') {
          this.$trigger.on('click', function () {
            that._visible ? that.hide() : that.show();
          });
          if (options.hideOnOutside) {
            clickOutSide.bind(function (e) {
              return !$(e.target).parents().is(that.$dropdown);
            }, function () {
              that.hide();
            });
          }
        }
        this.$dropdown.append(that.$list);
      },
      show: function () {
        var that = this;
        clearTimeout(that.timeout);
        that.timeout = setTimeout(function () {
          that._visible = true;
          that.$list.show();
          that.options.visibleChange && that.options.visibleChange(true);
        }, that.options.trigger === 'click' ? 0 : that.options.showTimeout);
      },
      hide: function () {
        var that = this;
        clearTimeout(that.timeout);
        that.timeout = setTimeout(function () {
          that._visible = false;
          that.$list.hide();
          that.options.visibleChange && that.options.visibleChange(false);
        }, that.options.trigger === 'click' ? 0 : that.options.hideTimeout);
      }
    };
    $.fn[componentName] = function () {
      var option = arguments[0],
        args = arguments,
        value,
        allowedMethods = [];
      this.each(function () {
        var $this = $(this),
          data = $this.data('u-dropdown');
        if (!data) {
          var _option = {};
          if (Array.isArray(option)) {
            _option = {data: option};
          } else if (typeof option === 'object') {
            _option = option;
          }
          var options = $.extend({}, $.fn[componentName].defaults, $this.data(), _option);
          data = new Dropdown($this, options);
          $this.data('u-dropdown', data);
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
      'data': [],
      'type': '',
      'size': '',
      'splitButton': false,
      'placement': 'bottom-end',
      'trigger': 'hover',
      'hideOnClick': true,
      'hideOnOutside': true,
      'showTimeout': 250,
      'hideTimeout': 150,
      'click': '',
      'command': '',
      'visibleChange': ''
    };
  },
  componentName: 'dropdown'
};
