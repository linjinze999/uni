export default {
  init: function ($, componentName) {
    function Carousel ($el, options) {
      this.$el = $el;
      this.options = options;
      this.CARD_SCALE = 0.83;
    }

    Carousel.prototype = {
      constructor: Carousel,
      init: function () {
        var that = this,
          options = this.options;
        if (this.hasInit) return;
        options.initialIndex = options.initialIndex >= options.data.length ? 0 : options.initialIndex;
        this.$el.addClass('el-carousel');
        this.$contailer = $('<div class="el-carousel__container" style="height:' + options.height + '"></div>');
        this.$prev = $('<button type="button" class="el-carousel__arrow el-carousel__arrow--left">' +
          '<i class="el-icon-arrow-left"></i></button>');
        this.$next = $('<button type="button" class="el-carousel__arrow el-carousel__arrow--right">' +
          '<i class="el-icon-arrow-right"></i></button>');
        this.$prev.on('click', function () {
          that.set(that.active - 1);
        });
        this.$next.on('click', function () {
          that.set(that.active + 1);
        });
        if (options.arrow === 'always') {
          this.$prev.show();
          this.$next.show();
        } else if (options.arrow === 'never') {
          this.$prev.hide();
          this.$next.hide();
        } else {
          this.$prev.hide();
          this.$next.hide();
          this.$el.on('mouseenter', function () {
            that.$prev.show();
            that.$next.show();
          });
          this.$el.on('mouseleave', function () {
            that.$prev.hide();
            that.$next.hide();
          });
        }
        this.$contailer.append(this.$prev).append(this.$next);
        this.$indicators = $('<ul class="el-carousel__indicators"></ul>');
        $.each(options.data, function (index, item) {
          var _default = {
            name: index,
            label: '',
            content: ''
          };
          if (typeof item === 'string') {
            item = {content: item};
          }
          var _option = $.extend({}, _default, item);
          _option.$item = $('<div class="el-carousel__item is-animating">' + _option.content + '</div>');
          _option.$indicator = $('<li class="el-carousel__indicator"><button class="el-carousel__button">' + _option.label + '</button></li>');
          _option.$indicator.on((options.trigger === 'click' ? 'click' : 'mouseover'), function () {
            that.set(index);
          });
          that.$contailer.append(_option.$item);
          that.$indicators.append(_option.$indicator);
          options.data[index] = _option;
        });
        this.$el.append(this.$contailer).append(this.$indicators);
        this.set(options.initialIndex);
        if (options.autoplay) {
          this.$el.on('mouseenter', function () {
            that.pauseTimer();
          });
          this.$el.on('mouseleave', function () {
            that.startTimer;
          });
        }
        this.hasInit = true;
      },
      startTimer: function () {
        var that = this, options = this.options;
        this.timmer = setInterval(function () {
          that.set(that.active + 1);
        }, options.interval);
      },
      pauseTimer: function () {
        if (this.timer) {
          clearInterval(this.timer);
          this.timer = null;
        }
      },
      set: function (active) {
        var _width = this.$el.width();
        var _len = this.options.data.length;
        active = active > (_len - 1) ? 0 : active;
        active = active < 0 ? (_len - 1) : active;
        this.oldActive = this.active;
        this.active = active;
        var that = this;
        $.each(this.options.data, function (index, item) {
          if(index === that.active || index === that.oldActive){
            item.$item.addClass('is-animating');
          } else {
            item.$item.removeClass('is-animating');
          }
          if (index === active) {
            item.$indicator.addClass('is-active');
            item.$item.addClass('is-active');
          } else {
            item.$indicator.removeClass('is-active');
            item.$item.removeClass('is-active');
          }
          if (index === active) {
            item.$item.css('transform', 'translateX(0px) scale(1)');
          } else if (index === active - 1 || (active === 0 && index === (_len - 1))) {
            item.$item.css('transform', 'translateX(-' + _width + 'px) scale(1)');
          } else if (index === active + 1 || (active === (_len - 1) && index === 0)) {
            item.$item.css('transform', 'translateX(' + _width + 'px) scale(1)');
          } else {
            item.$item.css('transform', 'translateX(' + (_width * ((index - active))) + 'px) scale(1)');
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
      'height': '300px',
      'initialIndex': 0,
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
