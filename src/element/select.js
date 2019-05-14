import calcTextareaHeight from '../utils/calcTextareaHeight';

export default {
  init: function ($, componentName) {
    function Select ($el, options) {
      this.$el = $el;
      this.options = options;
    }

    Select.prototype = {
      constructor: Select,
      init: function () {
        const that = this, options = this.options;
        this.$parent = $('<div class="el-select" style="width: ' + options.width + '"></div>');
        if (options.multiple) {
          this.$tagsParent = $('<div class="el-select__tags" style="width: 100%; max-width: 208px;"></div>');
          this.$tags = $('<span></span>');
          this.$tagsParent.append(this.$tags);
          if (options.filterable) {
            this.$filter = $('<input type="text" autocomplete="off" class="el-select__input" style="flex-grow: 1; width: 0.0961538%; max-width: 198px;">');
            this.$tagsParent.append(this.$filter);
          }
          this.$parent.append(this.$tagsParent);
        }
        this.$inputParent = $('<div class="el-input el-input--suffix"></div>');
        this.$input = $('<input type="text" readonly="readonly" autocomplete="off" placeholder="" class="el-input__inner" style="height: 40px;">');
        this.$inputSuffix = $('<span class="el-input__suffix">' +
          '<span class="el-input__suffix-inner"><i class="el-select__caret el-input__icon el-icon-arrow-up"></i></span>' +
          '</span>');
        this.$inputParent.append(this.$input, this.$inputSuffix);
        this.$dropdown = $('<div class="el-select-dropdown el-popper is-multiple" ' +
          'style="min-width: 240px; transform: translateX(-50%); z-index: 2000; position: absolute; top: 100%; left: 50%; display: none;"' +
          ' x-placement="bottom-start"><div class="el-select-dropdown__wrap"></div>' +
          '<div class="popper__arrow" style="transform: translateX(-50%); left: 50%;"></div></div>');
        this.$dropdownList = $('<ul class="el-select-dropdown__list"></ul>');
        this.$dropdown.find('.el-select-dropdown__wrap').append(this.$dropdownList);
        this.$parent.append(this.$dropdown);
        this.$el.wrap(this.$parent);
        this.$el.hide();
        this.$parent = this.$el.parent();
      },
      areaResize: function () {
        var options = this.options;
        var _style = calcTextareaHeight(this.$el[0], options.autosize.minRows, options.autosize.maxRows);
        this.$el.css(_style);
      },
      disable: function () {
        this.options.disabled = true;
        this.$input.addClass('is-disabled');
        this.$el.attr('disabled', true);
      },
      enable: function () {
        this.options.disabled = false;
        this.$input.removeClass('is-disabled');
        this.$el.attr('disabled', false);
      }
    };
    $.fn[componentName] = function () {
      var option = arguments[0],
        args = arguments,
        value,
        allowedMethods = ['enable', 'disable', 'focus', 'blur'];
      this.each(function () {
        var $this = $(this),
          data = $this.data('u-select'),
          attributes = {};
        if (!data) {
          $.each(this.attributes, function () {
            if (this.specified) {
              attributes[this.name] = this.value;
            }
          });
          var options = $.extend({}, $.fn[componentName].defaults, attributes,
            $this.data(), typeof option === 'object' && option);
          $.each(options.attributes, function (key, value) {
            $this.attr(key, value);
          });
          data = new Select($this, options);
          $this.data('u-select', data);
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
      'width': '240px',
      'multiple': '',
      'disabled': '',
      'valueKey': 'value',
      'size': '',
      'clearable': false,
      'collapseTags': false,
      'multipleLimit': 0,
      'autocomplete': 'off',
      'placeholder': '请选择',
      'filterable': false,
      'allowCreate': false,
      'filterMethod': function () {
      },
      'remote': false,
      'remoteMethod': function () {
      },
      'loadingText': '加载中',
      'noMatchText': '无匹配数据',
      'noDataText': '无数据',
      'popperClass': '',
      'reserveKeyword': false,
      'defaultFirstOption': false,
      'automaticDropdown': false,
      'prefix': '',
      'empty': '',
      'change': '',
      'visibleChange': '',
      'removeTag': '',
      'clear': '',
      'blur': '',
      'focus': ''
    };
  },
  componentName: 'select'
};
