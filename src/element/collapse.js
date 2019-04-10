export default {
  init: function ($, componentName) {
    function Collapse ($el, options) {
      this.$el = $el;
      this.options = options;
    }

    Collapse.prototype = {
      constructor: Collapse,
      init: function () {
        var that = this,
          options = this.options;
        if (this.hasInit) return;
        this.$el.attr('role', 'tablist').attr('aria-multiselectable', 'true').addClass('el-collapse');
        $.each(options.data, function (index, item) {
          var _default = {
            name: index,
            title: '',
            content: ''
          };
          if (typeof item === 'string') {
            item = {content: item};
          }
          var _option = $.extend({}, _default, item);
          _option.$item = $('<div class="el-collapse-item"></div>');
          _option.$tab = $('<div role="tab"><div role="button" class="el-collapse-item__header">' + _option.title +
            '<i class="el-collapse-item__arrow el-icon-arrow-right"></i></div></div>');
          _option.$tab.on('click', function () {
            that.triggerActive(index);
          });
          _option.$tabpanel = $('<div role="tabpanel" class="el-collapse-item__wrap" style="display: none;"><div class="el-collapse-item__content">' +
            _option.content + '</div></div>');
          _option.$item.append(_option.$tab).append(_option.$tabpanel);
          _option.isActive = false;
          that.$el.append(_option.$item);
          _option.$tabpanelHeight = _option.$tabpanel.css('height');
          options.data[index] = _option;
        });
        this.set(options.active);
        this.hasInit = true;
      },
      set: function (active) {
        var options = this.options, _isChange = false;
        if (options.accordion) {
          active = ['string', 'number'].indexOf(typeof active) > -1 ? active : active.toString();
        } else {
          active = Array.isArray(active) ? active : (active.toString() ? [active.toString()] : []);
        }
        options.active = active;
        if (options.accordion) {
          active = [active];
        }
        $.each(options.data, function (index, item) {
          var _isActive = false;
          for (var _idx in active) {
            if (item.name == active[_idx]) {
              _isActive = true;
              break;
            }
          }
          _isActive = _isActive || (active.indexOf(index) > -1);
          if (_isActive) {
            item.$item.addClass('is-active');
            item.$tab.attr('aria-expanded', true);
            item.$tab.find('.el-collapse-item__header').attr('tabindex', 0).addClass('is-active');
            item.$tab.find('.el-collapse-item__arrow').addClass('is-active');
            item.$tabpanel.attr('aria-hidden', false).show().animate({
              height: item.$tabpanelHeight
            }, 250);
          } else {
            item.$item.removeClass('is-active');
            item.$tab.attr('aria-expanded', false);
            item.$tab.find('.el-collapse-item__header').attr('tabindex', -1).removeClass('is-active');
            item.$tab.find('.el-collapse-item__arrow').removeClass('is-active');
            item.$tabpanel.attr('aria-hidden', true).animate({
              height: 0
            }, 250, function () {
              item.$tabpanel.hide();
            });
          }
          if (_isActive !== item.isActive) {
            _isChange = true;
            item.isActive = _isActive;
          }
        });
        if (_isChange && this.options.change) {
          this.options.change(options.active);
        }
      },
      triggerActive: function (index) {
        var that = this, options = this.options;
        var tab = options.data[index];
        if (options.accordion) {
          that.set(tab.isActive ? '' : index);
        } else {
          if (tab.isActive) {
            var _index = options.active.indexOf(index);
            if (_index === -1) {
              _index = options.active.indexOf(options.data[index].name);
            }
            options.active.splice(_index, 1);
          } else {
            options.active.push(index);
          }
          that.set(options.active);
        }
      }
    };
    $.fn[componentName] = function () {
      var option = arguments[0],
        args = arguments,
        value,
        allowedMethods = ['set'];
      this.each(function () {
        var $this = $(this),
          data = $this.data('u-collapse');
        if (!data) {
          var _option = {};
          if (Array.isArray(option)) {
            _option = {data: option};
          } else if (typeof option === 'object') {
            _option = option;
          }
          var options = $.extend({}, $.fn[componentName].defaults, $this.data(), _option);
          data = new Collapse($this, options);
          $this.data('u-collapse', data);
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
      'active': '',
      'accordion': false,
      'change': '',
      'data': []
    };
  },
  componentName: 'collapse'
};
