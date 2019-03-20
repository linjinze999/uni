export default {
  init: function($, componentName){
    function Loading($el, options) {
      this.$el = $el;
      this.options = options;
    }

    Loading.prototype = {
      constructor: Loading,
      init: function () {
        if (!this.lid) {
          this.lid = new Date().getTime();
          if (this.$el.css('position') === 'static' && !this.$el.is('body') && !this.$el.is('html')) {
            this.$el.addClass('el-loading-parent--relative');
          }
          this.$el.append('<div id="' + this.lid + '" class="el-loading-mask hide"></div>');
        }
        this.$load = $('#' + this.lid);
        if (!!this.options.html) {
          this.$load.html(this.options.html);
        } else {
          var _loadingIcon = '<svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg>';
          var _text = this.options.text ? '&nbsp;' + this.options.text : '';
          this.$load.html('<div class="el-loading-spinner">' + _loadingIcon + _text + '</div>');
        }
      },
      show: function () {
        this.$load.removeClass('hide');
      },
      hide: function () {
        this.$load.addClass('hide');
      }
    };
    $.fn[componentName] = function () {
      var option = arguments[0],
        value,
        allowedMethods = ['show', 'hide'];
      this.each(function () {
        var $this = $(this),
          data = $this.data('u-loading'),
          options = $.extend({}, $.fn[componentName].defaults,
            $this.data(), typeof option === 'object' && option);
        if (!data) {
          data = new Loading($this, options);
          $this.data('u-loading', data);
          data.init();
        }
        if (typeof option === 'string') {
          if ($.inArray(option, allowedMethods) < 0) {
            throw 'Unknown method: ' + option;
          }
          value = data[option]();
        }else{
          options.autoShow && data.show();
        }
      });
      return typeof value !== 'undefined' ? value : this;
    };
    $.fn[componentName].defaults = {
      'autoShow': true,
      'html': '',
      'text': ''
    };
  },
  componentName: 'loading'
}
