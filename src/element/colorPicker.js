import clickOutSide from '../utils/clickoutside';
import Color from '../utils/color';
import draggable from '../utils/draggable';

export default {
  init: function ($, componentName) {
    function ColorPicker ($el, options) {
      this.$el = $el;
      this.options = options;
      this.color = new Color({
        enableAlpha: options.showAlpha,
        format: options.colorFormat
      });
    }

    ColorPicker.prototype = {
      constructor: ColorPicker,
      init: function () {
        var that = this,
          options = this.options;
        // 触发按钮
        this.$trigger = $('<div class="el-color-picker__trigger"><span class="el-color-picker__color ' +
          (options.showAlpha ? 'is-alpha' : '') + '"></span>' +
          '<span class="el-color-picker__icon el-icon-arrow-down"></span></div>');
        this.$arrowDown = this.$trigger.find('.el-icon-arrow-down');
        this.$colorInner = $('<span class="el-color-picker__color-inner" style="background-color: transparent;"></span>');
        this.$empty = $('<span class="el-color-picker__empty el-icon-close"></span>');
        this.showPanelColor = false;
        this.$trigger.find('.el-color-picker__color').append(this.$colorInner, this.$empty);
        // 下拉选择器
        this.$colorDropdown = $('<div class="el-color-dropdown el-color-picker__panel ' + options.popperClass + '" style="transform-origin: center top;' +
          ' z-index: 2069; position: absolute; left: 50%; transform: translateX(-50%); display: none;" x-placement="bottom"></div>');
        // 颜色选择
        this.$wrapper = $('  <div class="el-color-dropdown__main-wrapper"><div class="el-color-hue-slider is-vertical" style="float: right;">' +
          '      <div class="el-color-hue-slider__bar"></div>' +
          '      <div class="el-color-hue-slider__thumb" style="left: 0px; top: 0px;"></div>' +
          '    </div>' +
          '    <div class="el-color-svpanel" style="background-color: rgb(255, 0, 0);">' +
          '      <div class="el-color-svpanel__white"></div><div class="el-color-svpanel__black"></div>' +
          '      <div class="el-color-svpanel__cursor" style="top: 0px; left: 280px;"><div></div></div>' +
          '    </div>' +
          '  </div>');
        this.$hue = this.$wrapper.find('.el-color-hue-slider');
        this.$svpanel = this.$wrapper.find('.el-color-svpanel');
        this.dragHue();
        this.dragSV();
        // 透明度
        this.$alpha = $('');
        if (options.showAlpha) {
          this.$alpha = $('<div class="el-color-alpha-slider">' +
            '<div class="el-color-alpha-slider__bar" style="background: linear-gradient(to right, rgba(255, 0, 0, 0) 0%, rgb(255, 0, 0) 100%);"></div>' +
            '<div class="el-color-alpha-slider__thumb" style="left: 0px; top: 0px;"></div></div>');
          this.dragAlpha();
        }
        // 预定义颜色
        this.$predefine = '';
        if (options.predefine.length > 0) {
          this.$predefine = $('<div class="el-color-predefine"><div class="el-color-predefine__colors"></div></div>');
          this.$predefineColors = this.$predefine.find('.el-color-predefine__colors');
          $.each(options.predefine, function (index, color) {
            var c = new Color();
            c.enableAlpha = true;
            c.format = 'rgba';
            c.fromString(color);
            var _color = $('<div class="el-color-predefine__color-selector ' + (c._alpha < 100 ? 'is-alpha' : '') +
              '"><div style="background-color: ' + c.value + ';"></div></div>');
            _color.on('click', function () {
              that.$input.val(c.value);
              that.handleInput();
            });
            that.$predefineColors.append(_color);
            c.$el = _color;
            options.predefine[index] = c;
          });
        }
        // 控制按钮组
        this.$btns = $('<div class="el-color-dropdown__btns"><span class="el-color-dropdown__value"><div class="el-input el-input--mini">' +
          '      <input type="text" autocomplete="off" class="el-input__inner"></div></span>' +
          '    <button type="button" class="el-button el-color-dropdown__link-btn el-button--text el-button--mini">清空</button>' +
          '    <button type="button" class="el-button el-color-dropdown__btn el-button--default el-button--mini is-plain">确定</button>' +
          '  </div>');
        this.$input = this.$btns.find('.el-input__inner');
        this.$input.on('blur', function () {
          that.handleInput();
        });
        this.$input.on('keyup', function (event) {
          if (event.keyCode === 13) {
            that.handleInput();
          }
        });
        this.$clear = this.$btns.find('.el-color-dropdown__link-btn');
        this.$clear.on('click', function () {
          that.clearValue();
        });
        this.$ok = this.$btns.find('.el-color-dropdown__btn');
        this.$ok.on('click', function () {
          that.confirmValue();
        });
        // 插入$el
        this.$colorDropdown.append(this.$wrapper, this.$alpha, this.$predefine, this.$btns);
        this.$el.addClass('el-color-picker el-color-picker--' + options.size).append(this.$trigger, this.$colorDropdown);
        this.$trigger.on('click', function () {
          if (!options.disabled) {
            that._show ? that.hide() : that.show();
          }
        });
        clickOutSide.bind(function (e) {
          return !$(e.target).parents().is(that.$el);
        }, function () {
          that.hide();
        });
        // 默认值
        if (options.value) {
          this.$input.val(options.value);
          this.handleInput();
        }
        if (options.disabled) {
          this.disable();
        }
      },
      dragSV: function () {
        var that = this, options = this.options;
        var $svpanel = this.$wrapper.find('.el-color-svpanel');
        var $cursor = this.$wrapper.find('.el-color-svpanel__cursor');

        function handleDrag (event) {
          var el = $svpanel[0];
          var rect = el.getBoundingClientRect();

          let left = event.clientX - rect.left;
          let top = event.clientY - rect.top;
          left = Math.max(0, left);
          left = Math.min(left, rect.width);

          top = Math.max(0, top);
          top = Math.min(top, rect.height);

          $cursor.css({left: left, top: top});
          that.color.set({
            saturation: left / rect.width * 100,
            value: 100 - top / rect.height * 100
          });
          that.showPanelColor = true;
          that.updateColor();
          event.stopPropagation();
        }

        var dragConfig = {
          drag: handleDrag,
          end: handleDrag
        };
        draggable($svpanel[0], dragConfig);
      },
      dragHue: function () {
        var that = this, options = this.options;
        var $bar = that.$wrapper.find('.el-color-hue-slider__bar');
        var $thumb = that.$wrapper.find('.el-color-hue-slider__thumb');

        function handleDrag (event) {
          var rect = that.$wrapper[0].getBoundingClientRect();
          var thumb = $thumb[0];

          var top = event.clientY - rect.top;
          top = Math.max(0, top);
          top = Math.min(top, rect.height - thumb.offsetHeight / 2);
          var hue = Math.round((top - thumb.offsetHeight / 2) / (rect.height - thumb.offsetHeight) * 360);

          $thumb.css('top', top);
          that.color.set('hue', hue);
          that.showPanelColor = true;
          that.updateColor();
          event.stopPropagation();
        }

        var dragConfig = {
          drag: handleDrag,
          end: handleDrag
        };
        draggable($bar[0], dragConfig);
        draggable($thumb[0], dragConfig);
      },
      dragAlpha: function () {
        var that = this;
        var $bar = that.$alpha.find('.el-color-alpha-slider__bar');
        var $thumb = that.$alpha.find('.el-color-alpha-slider__thumb');

        function handleDrag (event) {
          var rect = that.$alpha[0].getBoundingClientRect();
          var thumb = $thumb[0];

          var left = event.clientX - rect.left;
          left = Math.max(thumb.offsetWidth / 2, left);
          left = Math.min(left, rect.width - thumb.offsetWidth / 2);
          $thumb.css('left', left);
          that.color.set('alpha', Math.round((left - thumb.offsetWidth / 2) / (rect.width - thumb.offsetWidth) * 100));
          that.showPanelColor = true;
          that.updateColor();
          event.stopPropagation();
        }

        var dragConfig = {
          drag: handleDrag,
          end: handleDrag
        };
        draggable($bar[0], dragConfig);
        draggable($thumb[0], dragConfig);
      },
      handleInput: function () {
        this.showPanelColor = true;
        this.color.fromString(this.$input.val());
        this.updateColor();
        this.updateDrag();
      },
      clearValue: function () {
        this.showPanelColor = false;
        this.options.value = null;
        this.hide();
      },
      confirmValue: function () {
        this.showPanelColor = true;
        this.options.value = this.color.value;
        this.hide();
      },
      resetColor () {
        this.color.fromString(this.options.value);
        if (this.options.value) {
          this.$input.val(this.color.value);
        } else {
          this.showPanelColor = false;
          this.$input.val('');
        }
        this.updateColor();
        this.updateDrag();
      },
      updateColor: function () {
        var alphaBG = null;
        var bg = '';
        if (this.color && this.color.value) {
          bg = this.color.value;
          var rgb = this.color.toRgb();
          alphaBG = 'linear-gradient(to right, rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b +
            ', 0) 0%, rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 1) 100%)';
        }
        this.$svpanel.css('background', bg);
        this.$alpha.find('.el-color-alpha-slider__bar').css('background', alphaBG);
        if (!this.showPanelColor) {
          this.$input.val('');
          this.$colorInner.css('background', 'transparent');
          this.$empty.show();
          this.$arrowDown.hide();
        } else {
          this.$input.val(bg);
          this.$colorInner.css('background', bg);
          this.$empty.hide();
          this.$arrowDown.show();
        }
        var _inputValue = this.$input.val();
        $.each(this.options.predefine, function (index, color) {
          if (color.value === _inputValue) {
            color.$el.addClass('selected');
          } else {
            color.$el.removeClass('selected');
          }
        });
        this.options.activeChange && this.options.activeChange(_inputValue);
      },
      updateDrag: function () {
        this.$wrapper.find('.el-color-hue-slider__thumb').css('top', this.getHueThumbTop());
        this.$alpha.find('.el-color-alpha-slider__thumb').css('left', this.getAlphaThumbLeft());

        var saturation = this.color.get('saturation');
        var value = this.color.get('value');
        this.$svpanel.find('.el-color-svpanel__cursor').css({
          left: saturation * this.$svpanel.width() / 100,
          top: (100 - value) * this.$svpanel.height() / 100
        });
      },
      getHueThumbTop: function () {
        var hue = this.color.get('hue');
        var $thumb = this.$wrapper.find('.el-color-hue-slider__thumb');
        return Math.round(hue * (this.$hue.height() - $thumb.height() / 2) / 360);
      },
      getAlphaThumbLeft: function () {
        var $thumb = this.$alpha.find('.el-color-alpha-slider__thumb');
        if ($thumb.length === 0) return 0;
        var alpha = this.color._alpha;
        return Math.round(alpha * (this.$alpha.width() - $thumb.width() / 2) / 100);
      },
      confirm: function () {
        this.set(this.$input.val());
      },
      show: function () {
        this.$colorDropdown.show();
        this._show = true;
      },
      hide: function () {
        this.$colorDropdown.hide();
        this.resetColor();
        this._show = false;
      },
      disable: function () {
        this.$el.addClass('is-disabled');
        this.options.disabled = true;
      },
      enable: function () {
        this.$el.removeClass('is-disabled');
        this.options.disabled = false;
      },
      set: function (value) {
        var oldValue = this.options.value;
        this.options.value = value;
        this.$input.val(value);
        this.handleInput();
        oldValue !== value && this.options.change && this.options.change(value);
      },
      get: function () {
        return this.options.value;
      }
    };
    $.fn[componentName] = function () {
      var option = arguments[0],
        args = arguments,
        value,
        allowedMethods = ['disable', 'enabled', 'set', 'get'];
      this.each(function () {
        var $this = $(this),
          data = $this.data('u-colorPicker');
        if (!data) {
          var options = $.extend({}, $.fn[componentName].defaults, $this.data(), option);
          options.colorFormat = options.colorFormat || (options.showAlpha ? 'rgb' : 'hex');
          data = new ColorPicker($this, options);
          $this.data('u-colorPicker', data);
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
      'value': '',
      'disabled': '',
      'size': '',
      'showAlpha': false,
      'colorFormat': '',
      'popperClass': '',
      'predefine': [],
      'change': '',
      'activeChange': ''
    };
  },
  componentName: 'colorPicker'
};
