export default {
  init: function ($, componentName) {
    function Alert ($el, options) {
      this.$el = $el;
      this.options = options;
    }

    Alert.prototype = {
      constructor: Alert,
      init: function () {
        var that = this,
          options = this.options;
        this.$el.attr('role', 'alert').removeClass('el-alert--success el-alert--info el-alert--waning el-alert--error is-center')
          .addClass('el-alert el-alert--' + options.type + (options.center ? ' is-center' : ''));
        var _innerHtml = [];
        if (options.showIcon) {
          _innerHtml.push('<i class="el-alert__icon el-icon-' + options.type + (options.description ? ' is-big' : '') + '"></i>');
        }
        _innerHtml.push('<div class="el-alert__content">');
        _innerHtml.push('<span class="el-alert__title is-bold">' + options.title + '</span>');
        if (options.description) {
          _innerHtml.push('<p class="el-alert__description">' + options.description + '</p>');
        }
        if (options.closable) {
          _innerHtml.push('<i class="el-alert__closebtn ' + (options.closeText ? 'is-customed' : 'el-icon-close') +
            '">' + (options.closeText || '') + '</i>');
        }
        _innerHtml.push('</div>');
        this.$el.html(_innerHtml.join(''));
        if (options.closable) {
          that.$el.find('.el-alert__closebtn').on('click', function(){
            that.$el.hide();
            that.options.onclose && that.options.onclose();
          });
        }
      }
    };
    $.fn[componentName] = function () {
      var option = arguments[0];
      this.each(function () {
        var $this = $(this),
          data = $this.data('u-alert'),
          options = $.extend({}, $.fn[componentName].defaults,
            $this.data(), typeof option === 'object' && option);
        if (!data) {
          data = new Alert($this, options);
          $this.data('u-alert', data);
        } else {
          data.options = options;
        }
        data.init();
      });
      return this;
    };
    $.fn[componentName].defaults = {
      'title': '',
      'type': 'info',
      'description': '',
      'closable': true,
      'center': false,
      'closeText': '',
      'showIcon': false,
      'onclose': ''
    };
  },
  componentName: 'alert'
};
