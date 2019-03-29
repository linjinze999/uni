export default {
  init: function ($, componentName) {
    function Badge ($el, options) {
      this.$el = $el;
      this.options = options;
    }

    Badge.prototype = {
      constructor: Badge,
      init: function () {
        if (this.hasInit) {
          return;
        }
        var options = this.options;
        this.$parent = $('<div class="el-badge"></div>');
        this.$badge = $('<sup class="el-badge__content el-badge__content--' + options.type + ' is-fixed"></sup>');
        options.hidden && this.$badge.hide();
        options.isDot && this.$badge.addClass('is-dot');
        if (typeof options.value === 'number' && typeof options.max === 'number') {
          this.$badge.html(options.value > options.max ? options.max + '+' : options.value);
        } else if (!options.isDot) {
          this.$badge.html(options.value);
        }
        this.$el.wrap(this.$parent);
        this.$parent = $(this.$el.parent()[0]);
        this.$parent.append(this.$badge);
        this.hasInit = true;
      },
      update: function () {
        if (this.options.hidden) {
          this.$badge.hide();
        } else {
          this.$badge.show();
        }
        if (this.options.isDot) {
          this.$badge.addClass('is-dot');
        } else {
          this.$badge.removeClass('is-dot');
        }
        if (typeof this.options.value === 'number' && typeof this.options.max === 'number') {
          this.$badge.html(this.options.value > this.options.max ? this.options.max + '+' : this.options.value);
        } else if (!this.options.isDot) {
          this.$badge.html(this.options.value);
        } else {
          this.$badge.html('');
        }
      },
      set: function (value) {
        if (typeof value === 'string' || typeof value === 'number') {
          this.options.value = value;
        } else {
          value = value || {};
          this.options.value = value.hasOwnProperty('value') ? value.value : this.options.value;
          this.options.max = value.hasOwnProperty('max') ? value.max : this.options.max;
          this.options.isDot = value.hasOwnProperty('isDot') ? value.isDot : this.options.isDot;
          this.options.hidden = value.hasOwnProperty('hidden') ? value.hidden : this.options.hidden;
          this.options.type = value.hasOwnProperty('type') ? value.type : this.options.type;
        }
        this.update();
      },
      get: function () {
        return this.options.value;
      }
    };
    $.fn[componentName] = function () {
      var option = arguments[0],
        args = arguments,
        value,
        allowedMethods = ['set', 'get'];
      this.each(function () {
        var $this = $(this),
          data = $this.data('u-badge'),
          options = $.extend({}, $.fn[componentName].defaults,
            $this.data(), typeof option === 'object' && option);
        if (!data) {
          data = new Badge($this, options);
          $this.data('u-badge', data);
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
      'value': '',
      'max': '',
      'isDot': false,
      'hidden': false,
      'type': '',
    };
  },
  componentName: 'badge'
};
