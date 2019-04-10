export default {
  init: function ($, componentName) {
    function Timeline ($el, options) {
      this.$el = $el;
      this.options = options;
    }

    Timeline.prototype = {
      constructor: Timeline,
      init: function () {
        var that = this,
          options = this.options;
        this.$timeline = $('<ul class="el-timeline"></ul>');
        var _default = {
          timestamp: '',
          hideTimestamp: false,
          placement: 'bottom',
          type: '',
          color: '',
          size: 'normal',
          icon: '',
          content: ''
        };
        $.each(options.data, function (index, time) {
          time = $.extend({}, _default, time);
          // html
          time.$item = $('<li class="el-timeline-item"><div class="el-timeline-item__tail"></div>' +
            '<div class="el-timeline-item__node el-timeline-item__node--normal el-timeline-item__node--"></div>' +
            '<div class="el-timeline-item__wrapper"><div class="el-timeline-item__content">' + time.content +
            '</div><div class="el-timeline-item__timestamp is-bottom">' + time.timestamp + '</div></div></li>');
          that.$timeline.append(time.$item);
        });
        this.$el.append(this.$timeline);
      }
    };
    $.fn[componentName] = function () {
      var option = arguments[0],
        args = arguments,
        value,
        allowedMethods = [];
      this.each(function () {
        var $this = $(this),
          data = $this.data('u-timeline');
        if (!data) {
          var _option = {};
          if (Array.isArray(option)) {
            _option = {data: option};
          } else if (typeof option === 'object') {
            _option = option;
          }
          var options = $.extend({}, $.fn[componentName].defaults, $this.data(), _option);
          data = new Timeline($this, options);
          $this.data('u-timeline', data);
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
      'reverse': '',
      'data': []
    };
  },
  componentName: 'timeline'
};
