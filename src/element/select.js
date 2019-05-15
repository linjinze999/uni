import clickoutside from '../utils/clickoutside';

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
        this.$el.wrap(this.$parent);
        this.$el.hide();
        this.$parent = this.$el.parent();
        this.$el.on('change', function () {
          that.set(that.$el.val());
        });
        // 展开/收起
        this.showDrop = false;
        this.$parent.on('click', function (e) {
          that.showDrop ? that.hide() : that.show();
          e.stopPropagation();
        });
        clickoutside.bind(function (e) {
          return !that.$parent.is(e.target) && that.$parent.has(e.target).length === 0;
        }, function () {
          that.hide();
        });
        // 多选值
        if (options.multiple) {
          this.$el.attr('multiple', true);
          this.$tagsParent = $('<div class="el-select__tags" style="width: 100%; max-width: 208px;"></div>');
          this.$tags = $('<span></span>');
          this.$tagsParent.append(this.$tags);
          if (options.filterable) {
            this.$filter = $('<input type="text" autocomplete="' + options.autocomplete +
              '" class="el-select__input" style="flex-grow: 1; width: 0.0961538%; max-width: 198px;">');
            this.$tagsParent.append(this.$filter);
          }
          this.$parent.append(this.$tagsParent);
        } else {
          this.$el.attr('multiple', false);
        }
        // 占位输入框
        this.$inputParent = $('<div class="el-input el-input--suffix"></div>');
        this.$input = $('<input type="text" readonly="readonly" autocomplete="' + options.autocomplete +
          '" placeholder="' + options.placeholder + '" class="el-input__inner" style="height: 40px;">');
        this.$inputIcon = $('<i class="el-select__caret el-input__icon el-icon-arrow-up"></i>');
        this.$inputSuffix = $('<span class="el-input__suffix"></span>').append($('<span class="el-input__suffix-inner"></span>').append(this.$inputIcon));
        this.$inputParent.append(this.$input, this.$inputSuffix);
        // 清空按钮
        if (!options.multiple && options.clearable) {
          this.$clearIcon = $('<i class="el-select__caret el-input__icon el-icon-circle-close"></i>').hide();
          this.$clearIcon.on('click', function (e) {
            that.clear();
            e.stopPropagation();
          });
          this.$inputIcon.parent().append(this.$clearIcon);
          this.$inputParent.on('mouseenter', function () {
            if (options.value && !options.disabled) {
              that.$inputIcon.hide();
              that.$clearIcon.show();
            }
          });
          this.$inputParent.on('mouseleave', function () {
            that.$clearIcon.hide();
            that.$inputIcon.show();
          });
        }
        // 下拉框
        this.$dropdown = $('<div class="el-select-dropdown el-popper is-multiple" ' +
          'style="min-width: ' + options.width + '; transform: translateX(-50%); z-index: 2000; position: absolute; top: 100%; left: 50%; display: none;"' +
          ' x-placement="bottom-start"><div class="el-select-dropdown__wrap"></div>' +
          '<div class="popper__arrow" style="transform: translateX(-50%); left: 50%;"></div></div>');
        this.$dropdown.on('click', function (e) {
          e.stopPropagation();
        });
        this.$dropdownList = $('<ul class="el-select-dropdown__list"></ul>');
        this.$dropdown.find('.el-select-dropdown__wrap').append(this.$dropdownList);
        this.$parent.append(this.$inputParent, this.$dropdown);
        this.setData(options.data);
        options.disabled && this.disable();
      },
      setData: function (data) {
        const that = this, options = this.options;
        options.data = data;
        that.dataMap = {};
        this.$dropdownList.empty();
        this.$el.empty();
        options.data.forEach(function (_option, index) {
          if (typeof _option === 'string') {
            _option = {value: _option};
          }
          _option.label = _option.label || _option.value;
          _option.disabled = !!_option.disabled;
          options.data[index] = _option;
          if (Array.isArray(_option.options)) {
            var $group = $('<ul class="el-select-group__wrap"></ul>');
            $group.append('<li class="el-select-group__title">' + _option.label + '</li>');
            var optgroup = $('<optgroup label="' + _option.label + '"></optgroup>');
            var $li = $('<li></li>');
            var $subUl = $('<ul class="el-select-group"></ul>');
            _option.options.forEach(function (_subOption, subIndex) {
              if (typeof _subOption === 'string') {
                _subOption = {value: _subOption};
              }
              _subOption.label = _subOption.label || _subOption.value;
              _subOption.disabled = !!_subOption.disabled;
              options.data[index].options[subIndex] = _subOption;
              var $subLi = $('<li class="el-select-dropdown__item" data-value="' + _subOption.value + '">' + _subOption.label + '</li>');
              if (_subOption.disabled) {
                $subLi.addClass('is-disabled');
              } else {
                $subLi.on('click', function () {
                  if (!options.multiple) {
                    that.set(_subOption.value);
                    that.hide();
                  }
                });
              }
              $subUl.append($subLi);
              optgroup.append('<option value ="' + _subOption.value + '">' + _subOption.label + '</option>');
              that.dataMap[_subOption.value] = _subOption.label;
            });
            $li.append($subUl);
            $group.append($li);
            that.$dropdownList.append($group);
            that.$el.append(optgroup);
          } else {
            var $li = $('<li class="el-select-dropdown__item" data-value="' + _option.value + '">' + _option.label + '</li>');
            if (_option.disabled) {
              $li.addClass('is-disabled');
            } else {
              $li.on('click', function () {
                if (!options.multiple) {
                  that.set(_option.value);
                  that.hide();
                }
              });
            }
            that.$dropdownList.append($li);
            that.$el.append('<option value ="' + _option.value + '">' + _option.label + '</option>');
            that.dataMap[_option.value] = _option.label;
          }
        });
      },
      show: function () {
        if (!this.options.disabled && !this.showDrop) {
          this.$inputIcon.addClass('is-reverse');
          this.$dropdown.show();
          this.showDrop = true;
          typeof this.options.visibleChange === 'function' && this.options.visibleChange(true);
        }
      },
      hide: function () {
        if (!this.options.disabled && this.showDrop) {
          this.$inputIcon.removeClass('is-reverse');
          this.$dropdown.hide();
          this.showDrop = false;
          typeof this.options.visibleChange === 'function' && this.options.visibleChange(false);
        }
      },
      set: function (value) {
        if (!this.options.multiple) {
          if (value !== this.options.value) {
            this.$dropdownList.find('.selected').removeClass('selected');
            value && this.$dropdownList.find('[data-value=' + value + ']').addClass('selected');
            this.options.value = value;
            this.$input.val(this.dataMap[value] || '');
            typeof this.options.change === 'function' && this.options.change(this.options.value);
          }
          if (value !== this.$el.val()) {
            this.$el.val(value).trigger('change');
          }
        }
      },
      get: function () {
        return this.options.value;
      },
      disable: function () {
        this.options.disabled = true;
        this.$inputParent.addClass('is-disabled');
        this.$input.attr('disabled', true);
        this.$el.attr('disabled', true);
        this.hide();
      },
      enable: function () {
        this.options.disabled = false;
        this.$inputParent.removeClass('is-disabled');
        this.$input.attr('disabled', false);
        this.$el.attr('disabled', false);
      },
      clear: function () {
        typeof this.options.clear === 'function' && this.options.clear();
        this.set('');
        this.$clearIcon.hide();
        this.$inputIcon.show();
        this.hide();
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
          if (Array.isArray(option)) {
            option = {data: option};
          }
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
      'data': [],
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
