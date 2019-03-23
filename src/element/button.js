export default {
  init: function ($, componentName) {
    var Button = {
      disabled: function ($el) {
        $el.attr('disabled', 'disabled').addClass('is-disabled');
      },
      loading: function ($el) {
        $el.attr('disabled', 'disabled').addClass('is-loading');
      },
      show: function ($el) {
        $el.attr('disabled', false).removeClass('is-loading is-disabled');
      }
    };
    $.fn[componentName] = function () {
      var option = arguments[0],
        args = arguments,
        value,
        allowedMethods = Object.keys(Button);
      this.each(function () {
        var $this = $(this);
        if (typeof option === 'string') {
          if ($.inArray(option, allowedMethods) < 0) {
            throw 'Unknown method: ' + option;
          }
          value = Button[option]($this, args[1]);
        }
      });
      return typeof value !== 'undefined' ? value : this;
    };
  },
  componentName: 'button'
};
