import clickOutSide from '../utils/clickoutside';

export default {
  init: function ($, componentName) {
    function ColorPicker ($el, options) {
      this.$el = $el;
      this.options = options;
    }

    ColorPicker.prototype = {
      constructor: ColorPicker,
      init: function () {
        var that = this,
          options = this.options;
        this.$trigger = $('<div class="el-color-picker__trigger"><span class="el-color-picker__color"></span>' +
          '<span class="el-color-picker__icon el-icon-arrow-down"></span></div>');
        this.$colorInner = $('<span class="el-color-picker__color-inner" style="background-color: transparent;"></span>');
        this.$empty = $('<span class="el-color-picker__empty el-icon-close"></span>');
        this.$trigger.find('.el-color-picker__color').append(this.$colorInner, this.$empty);
        this.$el.addClass('el-color-picker').append(this.$trigger);

        this.$colorDropdown = $('<div class="el-color-dropdown el-color-picker__panel"\n' +
          '     style="transform-origin: center top; z-index: 2069; position: absolute; top: 433px; left: 390px;"\n' +
          '     x-placement="bottom">\n' +
          '  <div class="el-color-dropdown__main-wrapper">\n' +
          '    <div class="el-color-hue-slider is-vertical" style="float: right;">\n' +
          '      <div class="el-color-hue-slider__bar"></div>\n' +
          '      <div class="el-color-hue-slider__thumb" style="left: 0px; top: 104px;"></div>\n' +
          '    </div>\n' +
          '    <div class="el-color-svpanel" style="background-color: rgb(0, 125, 255);">\n' +
          '      <div class="el-color-svpanel__white"></div>\n' +
          '      <div class="el-color-svpanel__black"></div>\n' +
          '      <div class="el-color-svpanel__cursor" style="top: 0px; left: 209.725px;">\n' +
          '        <div></div>\n' +
          '      </div>\n' +
          '    </div>\n' +
          '  </div><!----><!---->\n' +
          '  <div class="el-color-dropdown__btns"><span class="el-color-dropdown__value"><div class="el-input el-input--mini"><!----><input\n' +
          '      type="text" autocomplete="off" class="el-input__inner"><!----><!----><!----></div></span>\n' +
          '    <button type="button" class="el-button el-color-dropdown__link-btn el-button--text el-button--mini"><!---->\n' +
          '      <!----><span>\n' +
          '        清空\n' +
          '      </span></button>\n' +
          '    <button type="button" class="el-button el-color-dropdown__btn el-button--default el-button--mini is-plain"><!---->\n' +
          '      <!----><span>\n' +
          '        确定\n' +
          '      </span></button>\n' +
          '  </div>\n' +
          '</div>');
      },
      show: function () {
        var that = this;
      },
      hide: function () {
        var that = this;
      }
    };
    $.fn[componentName] = function () {
      var option = arguments[0],
        args = arguments,
        value,
        allowedMethods = [];
      this.each(function () {
        var $this = $(this),
          data = $this.data('u-colorPicker');
        if (!data) {
          var options = $.extend({}, $.fn[componentName].defaults, $this.data(), option);
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
      'value': [],
      'disabled': '',
      'size': '',
      'showAlpha': false,
      'colorFormat': '',
      'popperClass': '',
      'predefine': '',
      'change': '',
      'activeChange': ''
    };
  },
  componentName: 'colorPicker'
};
