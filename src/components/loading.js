const init = function($, componentName){
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
          this.$el.addClass('loading-container');
        }
        this.$el.append('<div id="' + this.lid + '" class="loading-cover hide"></div>');
      }
      this.$load = $('#' + this.lid);
      if (!!this.options.html) {
        this.$load.html(this.options.html);
      } else {
        var _loadingIcon = '<span class="loading-icon"><i class="iconfont icon-reload"></i></span>';
        var _text = this.options.text ? '&nbsp;' + this.options.text : '';
        this.$load.html('<div class="loading-body">' + _loadingIcon + _text + '</div>');
      }
    },
    show: function () {
      this.$load.removeClass('hide');
    },
    hide: function () {
      this.$load.addClass('hide');
    }
  };
  $.fn.loading = function () {
    var option = arguments[0],
      value,
      allowedMethods = ['show', 'hide'];
    this.each(function () {
      var $this = $(this),
        data = $this.data('loading'),
        options = $.extend({}, $.fn.loading.defaults,
          $this.data(), typeof option === 'object' && option);
      if (!data) {
        data = new Loading($this, options);
        $this.data('loading', data);
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
  $.fn.loading.defaults = {
    'autoShow': true,
    'html': '',
    'text': ''
  };
};

export default {
  init: init,
  componentName: 'loading'
}
