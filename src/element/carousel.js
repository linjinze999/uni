export default {
  init: function ($, componentName) {
    function Carousel ($el, options) {
      this.$el = $el;
      this.options = options;
    }

    Carousel.prototype = {
      constructor: Carousel,
      init: function () {
        var that = this,
          options = this.options;
        this.$el.empty();
        var _direction = options.direction === 'vertical' ? 'vertical' : 'horizontal';
        this.$el.addClass('el-steps el-steps--' + (options.simple ? 'simple' : _direction));
        var _default = {
          icon: '',
          title: '',
          description: '',
          status: ''
        };
        var dataLength = options.data.length;
        var space = (typeof options.space === 'number' ? options.space + 'px' : options.space
          ? options.space
          : 100 / (options.data.length - (options.alignCenter ? 0 : 1)) + '%');
        var stepClass = options.simple ?
          'is-simple' :
          ('is-' + _direction + ((options.alignCenter && _direction !== 'vertical') ? ' is-center' : ''));
        // 各个步骤
        $.each(options.data, function (index, step) {
          if (typeof step === 'string') {
            step = {title: step};
          }
          step = $.extend({}, _default, step);
          var _status = 'wait';
          if ((index + 1) < options.active) {
            _status = options.finishStatus;
          } else if ((index + 1) == options.active) {
            _status = options.processStatus;
          }
          if (step.status) {
            _status = step.status;
          }
          var _isLast = (index === (dataLength - 1));
          // html
          step.$el = $('<div class="el-step ' + stepClass + ((_isLast && !options.simple && !options.alignCenter) ? ' is-flex' : '') +
            '" style="flex-basis: ' + space + ';' + (_isLast ? 'max-width:' + Math.floor(100 / dataLength * 10000) / 10000 + '%' : 'margin-right:-0px') +
            '"><div class="el-step__head is-' + _status + '"><div class="el-step__line" style="margin-right: 0px;">' +
            '<i class="el-step__line-inner" style="transition-delay: 0ms;border-width: 0px; width: 0%;"></i></div>' +
            '<div class="el-step__icon"></div></div><div class="el-step__main"><div class="el-step__title is-' + _status + '">' +
            step.title + '</div></div></div>');
          if (step.icon) {
            step.$el.find('.el-step__icon').addClass('is-icon').append('<i class="el-step__icon-inner ' + step.icon + '"></i>');
          } else {
            var _icon = step.$el.find('.el-step__icon');
            _icon.addClass('is-text');
            if(_status === 'success'){
              _icon.append('<i class="el-step__icon-inner is-status el-icon-check"></i>');
            } else if (_status === 'error') {
              _icon.append('<i class="el-step__icon-inner is-status el-icon-close"></i>');
            }else{
              _icon.append('<div class="el-step__icon-inner">' + (options.simple ? '' : (index + 1)) + '</div>');
            }
          }
          if (step.description && !options.simple) {
            step.$el.find('.el-step__main').append('<div class="el-step__description is-' + _status + '">' + step.description + '</div>');
          }
          if(options.simple){
            step.$el.find('.el-step__main').append('<div class="el-step__arrow"></div>');
          }
          options.data[index] = step;
          that.$el.append(step.$el);
        });
      },
      set: function (active) {
        var options = this.options;
        options.active = parseInt(active);
        $.each(options.data, function (index, step) {
          var _status = 'wait';
          if ((index + 1) < options.active) {
            _status = options.finishStatus;
          } else if ((index + 1) == options.active) {
            _status = options.processStatus;
          }
          if (step.status) {
            _status = step.status;
          }
          step.$el.find('.el-step__head,.el-step__title,.el-step__description')
            .removeClass('is-wait is-process is-finish is-error is-success').addClass('is-' + _status);
          if (!step.icon) {
            var _icon = step.$el.find('.el-step__icon');
            _icon.empty();
            if(_status === 'success'){
              _icon.append('<i class="el-step__icon-inner is-status el-icon-check"></i>');
            } else if (_status === 'error') {
              _icon.append('<i class="el-step__icon-inner is-status el-icon-close"></i>');
            }else{
              _icon.append('<div class="el-step__icon-inner">' + (options.simple ? '' : (index + 1)) + '</div>');
            }
          }
        });
      }
    };
    $.fn[componentName] = function () {
      var option = arguments[0],
        args = arguments,
        value,
        allowedMethods = ['set', 'prev', 'next'];
      this.each(function () {
        var $this = $(this),
          data = $this.data('u-carousel');
        if (!data) {
          var _option = {};
          if (Array.isArray(option)) {
            _option = {data: option};
          } else if (typeof option === 'object') {
            _option = option;
          }
          var options = $.extend({}, $.fn[componentName].defaults, $this.data(), _option);
          data = new Carousel($this, options);
          $this.data('u-carousel', data);
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
      'height': '',
      'initialIndex': 1,
      'trigger': '',
      'autoplay': true,
      'interval': 3000,
      'indicatorPosition': '',
      'arrow': 'hover',
      'type': '',
      'loop': '',
      'change': '',
      'data': []
    };
  },
  componentName: 'carousel'
};
