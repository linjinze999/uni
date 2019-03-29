export default {
  init: function ($, componentName) {
    function Badge ($el, options) {
      this.$el = $el;
      this.options = options;
    }

    Badge.prototype = {
      constructor: Loading,
      init: function () {
        var options = this.options;
        // 初始化遮罩
        this.lid = new Date().getTime();
        if (this.$el.css('position') === 'static' && !this.$el.is('body') && !this.$el.is('html')) {
          this.$el.addClass('el-loading-parent--relative');
        }
        var _background = options.background ? ('background-color: ' + options.background + ';') : '';
        this.$el.append('<div id="' + this.lid + '" class="el-loading-mask" style="display: none;' + _background + '"></div>');
        this.$load = $('#' + this.lid);
        this.update();
      },
      update: function() {
        var options = this.options;
        var _main = typeof options.main === 'function' ? options.main() : options.main;
        if (_main) {
          this.$load.html(_main);
        } else {
          var _icon = options.icon || '<svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" ' +
            'fill="none" class="path"></circle></svg>';
          var _text = typeof options.text === 'function' ? options.text() : options.text;
          _text = _text ? ('<p class="el-loading-text">' + _text + '</p>') : '';
          this.$load.html('<div class="el-loading-spinner">' + _icon + _text + '</div>');
        }
      },
      show: function () {
        this.update();
        this.$load.show();
      },
      hide: function () {
        this.$load.hide();
      }
    };
    $.fn[componentName] = function () {
      var option = arguments[0],
        value,
        allowedMethods = ['show', 'hide'];
      this.each(function () {
        var $this = $(this),
          data = $this.data('u-badge'),
          options = $.extend({}, $.fn[componentName].defaults,
            $this.data(), typeof option === 'object' && option);
        if (!data || options.override) {
          data && data.lid && $('#' + data.lid).remove();
          data = new Badge($this, options);
          $this.data('u-badge', data);
          data.init();
        }
        if (typeof option === 'string') {
          if ($.inArray(option, allowedMethods) < 0) {
            throw 'Unknown method: ' + option;
          }
          value = data[option]();
        } else {
          options.autoShow && data.show();
        }
      });
      return typeof value !== 'undefined' ? value : this;
    };
    $.fn[componentName].defaults = {
      'icon': '',
      'text': '',
      'main': '',
      'background': '',
      'autoShow': true,
      'override': false
    };
  },
  componentName: 'badge'
};
