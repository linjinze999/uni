import clickoutside from '../utils/clickoutside';
import debounce from '../utils/debounce';

export default {
  init: function ($, componentName, i18nName) {
    function Cascader ($el, options) {
      this.$el = $el;
      this.options = options;
    }

    Cascader.prototype = {
      constructor: Cascader,
      init: function () {
        const that = this, options = this.options;
        this.placeholderI18nAttr = $[i18nName] ? $[i18nName].getAttr(options.i18n.placeholder) : '';
        this.noDataI18nAttr = $[i18nName] ? $[i18nName].getAttr(options.i18n.noData) : '';
        this.noMatchI18nAttr = $[i18nName] ? $[i18nName].getAttr(options.i18n.noMatch) : '';
        this.$parent = $('<div class="el-select" style="width: ' + options.width + '"></div>');
        options.size && this.$parent.addClass('el-select--' + options.size);
        this.$el.wrap(this.$parent);
        this.$el.hide();
        this.$parent = this.$el.parent();
        this.$el.on('change', function () {
          that.set(that.$el.val());
        });
        // 展开/收起
        this.showDrop = false;
        this.$parent.on('click', function () {
          if (options.multiple && options.filterable) {
            !that.showDrop && that.show();
            that.$filter.focus();
          } else if (that.showDrop) {
            that.hide();
            that.$input.blur();
          } else {
            that.show();
            that.$input.focus();
          }
          that.$inputParent.addClass('is-focus');
        });
        clickoutside.bind(function (e) {
          return !that.$parent.is(e.target) && that.$parent.has(e.target).length === 0;
        }, function () {
          that.hide();
          that.$inputParent.removeClass('is-focus');
        });
        // 多选值
        if (options.multiple) {
          this.$el.attr('multiple', true);
          this.$tagsParent = $('<div class="el-select__tags" style="width: 100%;"></div>');
          this.$tags = $('<span></span>');
          this.$tagsParent.append(this.$tags);
          // 可筛选
          if (options.filterable) {
            this.$filter = $('<input type="text" autocomplete="' + options.autocomplete +
              '" class="el-select__input" style="flex-grow: 1; width: 1%; cursor:pointer;">');
            options.size && this.$filter.addClass('is-' + options.size);
            this.$tagsParent.append(this.$filter);
            this.$filter.on('input', debounce(function () {
              that.setPlaceholder();
              if (options.allowCreate) {
                that.createOption(that.$filter.val());
              }
              that.filterOptions();
            }, 100));
            this.$filter.on('blur', function () {
              that.$filter.val('').trigger('input');
            });
            this.$filter.keydown(function (event) {
              if (event.keyCode === 13) {
                that.$dropdownList.find('.el-select-dropdown__item.hover').click();
              } else if (event.keyCode === 38) {
                that.navigateOptions('prev');
              } else if (event.keyCode === 40) {
                that.navigateOptions('next');
              } else if (event.keyCode === 8 && !that.$filter.val()) {
                var _selected = that.$tags.find('.el-tag.is-hit');
                _selected.length
                  ? _selected.find('.el-tag__close').click()
                  : that.$tags.find('.el-tag__close').last().parent().addClass('is-hit');
              }
              event.stopPropagation();
            });
          }
          this.$parent.append(this.$tagsParent);
          this.collapseTagSize = ['small', 'mini'].indexOf(options.size) > -1 ? 'mini' : 'small';
        } else {
          this.$el.attr('multiple', false);
        }
        // 占位输入框
        this.$inputParent = $('<div class="el-input el-input--suffix"></div>');
        options.size && this.$inputParent.addClass('el-input--' + options.size);
        this.$input = $('<input type="text" autocomplete="' + options.autocomplete + '" class="el-input__inner" ' + this.placeholderI18nAttr + '>');
        this.$input.on('focus', function () {
          that.$inputParent.addClass('is-focus');
        });
        this.$input.on('blur', function () {
          that.$inputParent.removeClass('is-focus');
        });
        this.$input.keydown(function (event) {
          if (event.keyCode === 13) {
            that.$dropdownList.find('.el-select-dropdown__item.hover').click();
          } else if (event.keyCode === 38) {
            that.navigateOptions('prev');
            event.preventDefault();
          } else if (event.keyCode === 40) {
            that.navigateOptions('next');
            event.preventDefault();
          }
          event.stopPropagation();
        });
        if (!options.multiple && options.filterable) {
          this.$input.on('focus', function () {
            setTimeout(function () {
              if (that.showDrop) {
                that.$input.val('').trigger('input');
                options.value ? that.$input.attr('placeholder', that.dataMap[options.value]) : that.setPlaceholder();
              }
            }, 0);
          });
          this.$input.on('blur', function () {
            that.$input.val(that.dataMap[options.value]);
            that.setPlaceholder();
          });
          this.$input.on('input', debounce(function () {
            if (options.allowCreate) {
              that.createOption(that.$input.val());
            }
            that.filterOptions();
          }, 100));
        } else {
          this.$input.attr('readonly', true);
        }
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
        this.$dropdown = $('<div class="el-select-dropdown el-popper ' + (options.multiple ? 'is-multiple ' : '') + options.popperClass + '" ' +
          'style="min-width: ' + options.width + '; transform: translateX(-50%); z-index: 2000; position: absolute; top: 100%; left: 50%; display: none;"' +
          ' x-placement="bottom-start">' +
          '<div class="el-select-dropdown__wrap" style="overflow:auto;"></div>' +
          '<p class="el-select-dropdown__empty"></p>' +
          '<div class="popper__arrow" style="transform: translateX(-50%); left: 50%;"></div>' +
          '</div>');
        this.$empty = this.$dropdown.find('.el-select-dropdown__empty');
        this.$dropdownWrap = this.$dropdown.find('.el-select-dropdown__wrap');
        this.$dropdown.on('click', function (e) {
          e.stopPropagation();
        });
        this.$dropdownList = $('<ul class="el-select-dropdown__list"></ul>');
        this.$dropdownWrap.append(this.$dropdownList);
        this.$parent.append(this.$inputParent, this.$dropdown);
        this.initialInputHeight = this.$inputParent.height();
        this.inputWidth = this.$inputParent.width();
        this.$tagsParent && this.$tagsParent.css('max-width', (this.inputWidth - 32) + 'px');
        this.$filter && this.$filter.css('max-width', (this.inputWidth - 42) + 'px');
        options.value = options.value || this.$el.val() || (options.multiple ? [] : '');
        this.setData(options.data);
        this.set(options.value, true);
        options.disabled && this.disable();
      },
      setData: function (data) {
        const that = this, options = this.options;
        options.data = data;
        that.dataMap = {};
        this.$dropdownList.empty();
        this.$el.empty();
        if (!options.multiple && !options.value) {
          this.$el.append('<option disabled selected value></option>');
        }
        options.data.forEach(function (_option, index) {
          if (typeof _option === 'string') {
            _option = {value: _option};
          }
          _option.label = _option.label || _option.value;
          _option.disabled = !!_option.disabled;
          options.data[index] = _option;
          if (Array.isArray(_option.options)) {
            // optgroup
            var $group = $('<ul class="el-select-group__wrap"></ul>');
            $group.append('<li class="el-select-group__title">' + _option.label + '</li>');
            var optgroup = $('<optgroup label="' + _option.label + '"></optgroup>');
            var $li = $('<li></li>');
            var $subUl = $('<ul class="el-select-group"></ul>');
            _option.options.forEach(function (_subOption, subIndex) {
              // option
              if (typeof _subOption === 'string') {
                _subOption = {value: _subOption};
              }
              _subOption.label = _subOption.label || _subOption.value;
              _subOption.disabled = !!_subOption.disabled;
              options.data[index].options[subIndex] = _subOption;
              var $subLi = that.optionHtml(_subOption);
              $subUl.append($subLi);
              optgroup.append('<option value ="' + _subOption.value + '">' + _subOption.label + '</option>');
              that.dataMap[_subOption.value] = _subOption.label;
            });
            $li.append($subUl);
            $group.append($li);
            that.$dropdownList.append($group);
            that.$el.append(optgroup);
          } else {
            // option
            var $li = that.optionHtml(_option);
            that.$dropdownList.append($li);
            that.$el.append('<option value ="' + _option.value + '">' + _option.label + '</option>');
            that.dataMap[_option.value] = _option.label;
          }
        });
        this.noData = options.data.length === 0;
        this.setNoData();
      },
      optionHtml: function (_option) {
        var that = this, options = this.options;
        var $li = $('<li class="el-select-dropdown__item" data-value="' + _option.value + '" data-label="' + _option.label + '"></li>');
        $li.data('option', _option);
        var template = typeof options.optionTemplate === 'function' ? options.optionTemplate(_option) : '';
        var $content = template ? template : _option.label;
        $li.append($content);
        if (_option.disabled) {
          $li.addClass('is-disabled');
        } else {
          $li.on('click', function () {
            if ($li.hasClass('is-disabled')) return;
            if (!options.multiple) {
              that.set(_option.value);
              that.hide();
            } else if (options.value.includes(_option.value)) {
              var _newValue = [].concat(options.value);
              _newValue.splice(options.value.indexOf(_option.value), 1);
              that.set(_newValue);
            } else {
              var _newValue = [].concat(options.value);
              _newValue.push(_option.value);
              that.set(_newValue);
            }
            that.$inputParent.addClass('is-focus');
          });
          $li.on('mouseenter', function () {
            that.setHover($li);
          });
        }
        return $li;
      },
      createOption: function (value) {
        var _option = {value: value, label: value, disabled: false};
        var that = this, options = this.options;
        that.$dropdownList.find('.el-select-dropdown__item').remove('[data-u-create=uni]');
        that.$el.find('option[data-u-create=uni]').each(function () {
          var _$this = $(this);
          var _v = _$this.attr('value');
          if (options.multiple ? !options.value.includes(_v) : _v !== options.value) {
            _$this.remove();
            delete that.dataMap[_v];
          }
        });
        if (value && !that.$dropdownList.find('.el-select-dropdown__item[data-value=' + value + ']').length) {
          var $li = that.optionHtml(_option);
          $li.attr('data-u-create', 'uni');
          that.$dropdownList.prepend($li);
          that.$el.prepend('<option value ="' + _option.value + '" data-u-create="uni">' + _option.label + '</option>');
          that.dataMap[_option.value] = _option.label;
        }
      },
      setHover: function ($li) {
        if (!$li || $li.length === 0 || $li.hasClass('is-disabled')) return;
        this.$dropdownList.find('.el-select-dropdown__item').removeClass('hover');
        $li.addClass('hover');
      },
      navigateOptions: function (direction) {
        var $li = this.$dropdownList.find('.el-select-dropdown__item.hover');
        var $selects = this.$dropdownList.find('.el-select-dropdown__item:visible').not('.is-disabled');
        if ($li.length === 0) {
          this.setHover($selects.first());
          return;
        }
        var index = $selects.index($li);
        if (direction === 'prev') {
          if (index === -1 || index === 0) {
            this.setHover($selects.last());
          } else {
            this.setHover($selects.eq(index - 1));
          }
        } else {
          if (index === -1 || index === ($selects.length - 1)) {
            this.setHover($selects.first());
          } else {
            this.setHover($selects.eq(index + 1));
          }
        }
      },
      filterOptions: function () {
        var options = this.options;
        var value = options.multiple ? this.$filter.val() : this.$input.val();
        var noMatch = true;
        this.$dropdownList.find('> .el-select-dropdown__item').each(function () {
          var $this = $(this);
          var option = $this.data('option');
          if (options.filterMethod(value, option)) {
            $this.show();
            noMatch = false;
          } else {
            $this.hide();
          }
        });
        this.$dropdownList.find('.el-select-group__wrap').each(function () {
          var $that = $(this);
          var items = $that.find('.el-select-dropdown__item');
          var show = false;
          items.each(function () {
            var $this = $(this);
            var option = $this.data('option');
            if (options.filterMethod(value, option)) {
              $this.show();
              show = true;
              noMatch = false;
            } else {
              $this.hide();
            }
          });
          show ? $that.show() : $that.hide();
        });
        this.setNoMatch(noMatch);
        if (options.defaultFirstOption && value) {
          this.setHover(this.$dropdownList.find('.el-select-dropdown__item:visible').first());
        }
      },
      setNoData: function () {
        if (this.noData) {
          this.$dropdownWrap.hide();
          var _nodata = typeof this.options.noDataText === 'function' ? this.options.noDataText() : this.options.noDataText;
          this.$empty.html($('<span ' + this.noDataI18nAttr + '></span>').append(_nodata)).show();
        } else {
          this.$empty.hide();
          this.$dropdownWrap.show();
        }
      },
      setNoMatch: function (noMatch) {
        if (noMatch) {
          this.$dropdownWrap.hide();
          var _noMatch = typeof this.options.noMatchText === 'function' ? this.options.noMatchText() : this.options.noMatchText;
          this.$empty.html($('<span ' + this.noMatchI18nAttr + '></span>').append(_noMatch)).show();
        } else if (this.noData) {
          this.setNoData();
        } else {
          this.$empty.hide();
          this.$dropdownWrap.show();
        }
      },
      resetInputHeight: function () {
        const options = this.options;
        if (!options.multiple || (options.collapseTags && !options.filterable)) return;
        const sizeInMap = this.initialInputHeight || 40;
        this.$input.css('height', options.value.length === 0
          ? sizeInMap + 'px'
          : Math.max(this.$tagsParent.height() + (this.$tagsParent.height() > sizeInMap ? 6 : 0), sizeInMap) + 'px');
      },
      show: function () {
        if (!this.options.disabled && !this.showDrop) {
          this.$inputIcon.addClass('is-reverse');
          this.$input.focus();
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
      set: function (value, init) {
        const that = this, options = this.options;
        if (!options.multiple) {
          // 单选
          if (value !== options.value || init) {
            var _old = this.$dropdownList.find('.selected').removeClass('selected');
            if (_old.attr('data-u-create') === 'uni') {
              that.$dropdownList.find('.el-select-dropdown__item').remove('[data-u-create=uni]');
              that.$el.find('option').remove('[data-u-create=uni]');
            }
            value && this.$dropdownList.find('[data-value=' + value + ']').addClass('selected');
            options.value = value;
            this.$input.val(this.dataMap[value] || '');
            this.setPlaceholder();
            typeof options.change === 'function' && options.change(options.value);
          }
          if (value !== this.$el.val()) {
            this.$el.val(value).trigger('change');
          }
          return;
        }
        // 多选
        // 设置值
        function setValue () {
          if (value.toString() !== options.value.toString() || init) {
            that.$dropdownList.find('.selected').removeClass('selected');
            value.forEach(_v => {
              _v && that.$dropdownList.find('[data-value=' + _v + ']').addClass('selected');
            });
            options.value = value;
            that.$tags.empty();
            if (options.collapseTags) {
              if (options.value.length > 0) {
                var _v = options.value[0];
                var $closeIcon = $('<i class="el-tag__close el-icon-close"></i>');
                $closeIcon.on('click', function (e) {
                  typeof options.removeTag === 'function' && options.removeTag(_v);
                  that.$el.find('option[data-u-create=uni][value=' + _v + ']').remove();
                  var _newValue = [].concat(options.value);
                  _newValue.splice(_newValue.indexOf(_v), 1);
                  that.set(_newValue);
                  that.$inputParent.addClass('is-focus');
                  e.stopPropagation();
                });
                that.$tags.append($('<span class="el-tag el-tag--info el-tag--' + that.collapseTagSize +
                  '"><span class="el-select__tags-text">' + that.dataMap[_v] + '</span></span>').append($closeIcon));
              }
              if (options.value.length > 1) {
                that.$tags.append('<span class="el-tag el-tag--info el-tag--' + that.collapseTagSize +
                  '"><span class="el-select__tags-text">+' + (options.value.length - 1) + '</span></span>');
              }
            } else {
              value.forEach(_v => {
                var $closeIcon = $('<i class="el-tag__close el-icon-close"></i>');
                $closeIcon.on('click', function (e) {
                  typeof options.removeTag === 'function' && options.removeTag(_v);
                  that.$el.find('option[data-u-create=uni][value=' + _v + ']').remove();
                  var _newValue = [].concat(options.value);
                  _newValue.splice(_newValue.indexOf(_v), 1);
                  that.set(_newValue);
                  that.$inputParent.addClass('is-focus');
                  e.stopPropagation();
                });
                that.$tags.append($('<span class="el-tag el-tag--info el-tag--' + that.collapseTagSize +
                  '"><span class="el-select__tags-text">' + that.dataMap[_v] + '</span></span>').append($closeIcon));
              });
            }
            that.$dropdownList.find('.el-select-dropdown__item').remove('[data-u-create=uni]');
            that.$filter && !options.reserveKeyword && that.$filter.val('').trigger('input');
            that.setPlaceholder();
            that.resetInputHeight();
            typeof options.change === 'function' && options.change(options.value);
          }
          if (value.toString() !== that.$el.val().toString()) {
            that.$el.val(value).trigger('change');
          }
        }

        // 数量限制
        if (options.multipleLimit > 0) {
          if (value.length > options.multipleLimit) {
            return;
          } else if (value.length === options.multipleLimit) {
            setValue();
            that.$dropdownList.find('.el-select-dropdown__item').each(function () {
              var _$this = $(this);
              if (!value.includes(_$this.attr('data-value'))) {
                _$this.addClass('is-disabled').attr('data-u-disabled', 'limit');
              }
            });
          } else {
            setValue();
            that.$dropdownList.find('.el-select-dropdown__item[data-u-disabled=limit]').removeClass('is-disabled');
          }
        } else {
          setValue();
        }
      },
      get: function () {
        return this.options.value;
      },
      setPlaceholder: function () {
        if (this.options.multiple && ((this.options.value || '').length > 0 || (this.$filter && this.$filter.val()))) {
          this.$input.attr('placeholder', '');
        } else {
          this.$input.attr('placeholder', typeof this.options.placeholder === 'function'
            ? this.options.placeholder()
            : this.options.placeholder);
        }
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
        allowedMethods = ['enable', 'disable', 'show', 'hide', 'set', 'get'];
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
          data = new Cascader($this, options);
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
      'separator': '/',
      'disabled': '',
      'expandTrigger': 'click',
      'showAllLevels': true,
      'debounce': 300,
      'changeOnSelect': false,
      'optionTemplate': '',
      'size': '',
      'clearable': false,
      'beforeFilter': function(){return true},
      'placeholder': $[i18nName] ? function () {
        return $[i18nName].prop(this.i18n.placeholder, '请选择');
      } : '请选择',
      'filterable': false,
      'allowCreate': false,
      'filterMethod': function (value, option) {
        return option.label.toLowerCase().indexOf(value.toLowerCase()) > -1;
      },
      'noMatchText': $[i18nName] ? function () {
        return $[i18nName].prop(this.i18n.noMatch, '无匹配数据');
      } : '无匹配数据',
      'noDataText': $[i18nName] ? function () {
        return $[i18nName].prop(this.i18n.noData, '无数据');
      } : '无数据',
      'popperClass': '',
      'reserveKeyword': false,
      'defaultFirstOption': false,
      'change': '',
      'visibleChange': '',
      'activeItemChange': '',
      'i18n': {
        placeholder: 'uSelectPlaceholder',
        noMatch: 'uSelectNoMatch',
        noData: 'uSelectNoData'
      }
    };
  },
  componentName: 'select'
};
