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
        if(this.hasInit) return;
        options.initialIndex = options.initialIndex >= options.data.length ? 0 : options.initialIndex;
        this.$el.addClass('el-carousel');
        this.$contailer = $('<div class="el-carousel__container" style="'+options.height+'"></div>');
        this.$prev = $('<button type="button" class="el-carousel__arrow el-carousel__arrow--left" style="display: none;">' +
          '<i class="el-icon-arrow-left"></i></button>');
        this.$next = $('<button type="button" class="el-carousel__arrow el-carousel__arrow--right" style="display: none;">' +
          '<i class="el-icon-arrow-right"></i></button>');
        this.$contailer.append(this.$prev).append(this.$next);
        this.$indicators = $('<ul class="el-carousel__indicators"></ul>');
        $.each(options.data, function (index, item) {
          var _default = {
            name: index,
            label: '',
            content: ''
          };
          if(typeof item === 'string'){
            item = {content: item};
          }
          var _option = $.extend({}, _default, item);
          _option.$item = $('<div class="el-carousel__item is-animating" style="transform: translateX(-349px) scale(1);">'+_option.content+'</div>');
          _option.$indicator = $('<li class="el-carousel__indicator"><button class="el-carousel__button">'+_option.label+'</button></li>');
          if(options.initialIndex === index){
            _option.$item.addClass('is-active');
          }
          that.$contailer.append(_option.$item);
          that.$indicators.append(_option.$indicator);
          options.data[index] = _option;
        });
        this.$el.append(this.$contailer).append(this.$indicators);
        this.hasInit = true;
      },
      set: function (active) {
        // todo
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
      'height': '150px',
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
