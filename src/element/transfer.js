export default {
  init: function ($, componentName, i18nName) {
    function Transfer ($el, options) {
      this.$el = $el;
      this.options = options;
    }

    Transfer.prototype = {
      constructor: Transfer,
      init: function () {
        var options = this.options,
          that = this;
        var title1 = options.titles[0] || '',
          title2 = options.titles[1] || '',
          button1 = options.buttonTexts[0] || '',
          button2 = options.buttonTexts[1] || '';
        title1 = typeof title1 === 'function' ? title1() : title1;
        title2 = typeof title2 === 'function' ? title2() : title2;
        button1 = typeof button1 === 'function' ? button1() : button1;
        button2 = typeof button2 === 'function' ? button2() : button2;
        var _filterPlaceholder = (typeof options.filterPlaceholder === 'function') ? options.filterPlaceholder() : options.filterPlaceholder;
        var _noData = typeof options.noData === 'function' ? options.noData() : options.noData;
        var _noFilter = typeof options.noFilter === 'function' ? options.noFilter() : options.noFilter;
        var title1I18nAttr = $[i18nName] ? $[i18nName].getAttr(options.i18n.title1) : '';
        var title2I18nAttr = $[i18nName] ? $[i18nName].getAttr(options.i18n.title2) : '';
        var button1I18nAttr = $[i18nName] ? $[i18nName].getAttr(options.i18n.button1) : '';
        var button2I18nAttr = $[i18nName] ? $[i18nName].getAttr(options.i18n.button2) : '';
        var filterPlaceholderI18nAttr = $[i18nName] ? $[i18nName].getAttr(options.i18n.filterPlaceholder) : '';
        var noDataI18nAttr = $[i18nName] ? $[i18nName].getAttr(options.i18n.noData) : '';
        var noFilterI18nAttr = $[i18nName] ? $[i18nName].getAttr(options.i18n.noFilter) : '';
        this.props = $.extend({value: 'value', label: 'label', disabled: 'disabled'}, options.props);
        options.props = this.props;
        // left
        this.$left = $('<div class="el-transfer-panel"></div>');
        this.$leftHeader = $('<p class="el-transfer-panel__header">' +
          '      <label role="checkbox" class="el-checkbox">' +
          '        <span aria-checked="mixed" class="el-checkbox__input">' +
          '          <span class="el-checkbox__inner"></span>' +
          '          <input type="checkbox" aria-hidden="true" class="el-checkbox__original" value="">' +
          '        </span>' +
          '        <span class="el-checkbox__label">' +
          '          <b style="font-weight: normal" ' + title1I18nAttr + '>' + title1 + '</b>' +
          '          <span></span>' +
          '        </span>' +
          '      </label>' +
          '    </p>');
        this.$leftHeaderLabel = this.$leftHeader.find('.el-checkbox');
        this.$leftHeaderLabel.on('change', function () {
          that.leftCheckAll();
        });
        this.$leftHeaderInput = this.$leftHeader.find('.el-checkbox__input');
        this.$leftHeaderCheckbox = this.$leftHeader.find('input[type=checkbox]');
        this.$leftHeaderText = this.$leftHeader.find('.el-checkbox__label span');
        this.$leftBody = $('<div class="el-transfer-panel__body"></div>');
        this.$leftBodyCheckboxGroup = $('<div role="group" aria-label="checkbox-group" class="el-checkbox-group el-transfer-panel__list"></div>');
        this.$leftBodyNoFilter = $('<p class="el-transfer-panel__empty" style="display: none;" ' + noFilterI18nAttr + '>' + _noFilter + '</p>');
        this.$leftBodyNoData = $('<p class="el-transfer-panel__empty" style="display: none;" ' + noDataI18nAttr + '>' + _noData + '</p>');
        if (options.filterable) {
          this.$leftFilter = $('<div class="el-transfer-panel__filter el-input el-input--small el-input--prefix">' +
            '<input type="text" autocomplete="off" placeholder="' + _filterPlaceholder + '" class="el-input__inner" ' + filterPlaceholderI18nAttr + '>' +
            '<span class="el-input__prefix"><i class="el-input__icon el-icon-search"></i></span></div>');
          this.$leftFilterInput = this.$leftFilter.find('input');
          this.$leftFilterInput.on('input', function (e) {
            that.filterLeft(e);
            that.$leftFilter.trigger('mouseenter');
          });
          this.$leftFilterIcon = this.$leftFilter.find('.el-input__icon');
          this.$leftFilterIcon.on('click', function () {
            if (that.$leftFilterIcon.hasClass('el-icon-circle-close')) {
              that.$leftFilterInput.val('').trigger('input');
            }
          });
          this.$leftFilter.on('mouseenter', function () {
            if (that.$leftFilterInput.val().length > 0) {
              that.$leftFilterIcon.removeClass('el-icon-search').addClass('el-icon-circle-close');
            } else {
              that.$leftFilterIcon.removeClass('el-icon-circle-close').addClass('el-icon-search');
            }
          });
          this.$leftFilter.on('mouseleave', function () {
            that.$leftFilterIcon.removeClass('el-icon-circle-close').addClass('el-icon-search');
          });
          this.$leftBody.append(this.$leftFilter);
        }
        this.$leftBody.append(this.$leftBodyCheckboxGroup, this.$leftBodyNoFilter, this.$leftBodyNoData);
        this.$left.append(this.$leftHeader, this.$leftBody);
        if (options.leftFooter) {
          this.$leftBody.addClass('is-with-footer');
          this.$leftFooter = $('<p class="el-transfer-panel__footer">' + options.leftFooter + '</p>');
          this.$left.append(this.$leftFooter);
        }
        // buttons
        this.$buttons = $('<div class="el-transfer__buttons"></div>');
        this.$buttonsLeft = $('<button type="button" class="el-button el-button--primary is-disabled el-transfer__button ' +
          (button1 ? 'is-with-texts' : '') + '" disabled="disabled" ' + button1I18nAttr + '><span><i class="el-icon-arrow-left"></i>' +
          button1 + '</span></button>');
        this.$buttonsLeft.on('click', function () {
          that.toLeft();
        });
        this.$buttonsRight = $('<button type="button" class="el-button el-button--primary is-disabled el-transfer__button ' +
          (button2 ? 'is-with-texts' : '') + '" disabled="disabled" ' + button2I18nAttr + '><span><i class="el-icon-arrow-right"></i>' +
          button2 + '</span></button>');
        this.$buttonsRight.on('click', function () {
          that.toRight();
        });
        this.$buttons.append(this.$buttonsLeft, this.$buttonsRight);
        // right
        this.$right = $('<div class="el-transfer-panel"></div>');
        this.$rightHeader = $('<p class="el-transfer-panel__header">' +
          '      <label role="checkbox" class="el-checkbox">' +
          '        <span aria-checked="mixed" class="el-checkbox__input">' +
          '          <span class="el-checkbox__inner"></span>' +
          '          <input type="checkbox" aria-hidden="true" class="el-checkbox__original" value="">' +
          '        </span>' +
          '        <span class="el-checkbox__label">' +
          '          <b style="font-weight: normal" ' + title2I18nAttr + '>' + title2 + '</b>' +
          '          <span></span>' +
          '        </span>' +
          '      </label>' +
          '    </p>');
        this.$rightHeaderLabel = this.$rightHeader.find('.el-checkbox');
        this.$rightHeaderLabel.on('input', function (e) {
          that.rightCheckAll(e);
        });
        this.$rightHeaderInput = this.$rightHeader.find('.el-checkbox__input');
        this.$rightHeaderCheckbox = this.$rightHeader.find('input[type=checkbox]');
        this.$rightHeaderText = this.$rightHeader.find('.el-checkbox__label span');
        this.$rightBody = $('<div class="el-transfer-panel__body"></div>');
        this.$rightBodyCheckboxGroup = $('<div role="group" aria-label="checkbox-group" class="el-checkbox-group el-transfer-panel__list"></div>');
        this.$rightBodyNoFilter = $('<p class="el-transfer-panel__empty" style="display: none;" ' + noFilterI18nAttr + '>' + _noFilter + '</p>');
        this.$rightBodyNoData = $('<p class="el-transfer-panel__empty" style="display: none;" ' + noDataI18nAttr + '>' + _noData + '</p>');
        if (options.filterable) {
          this.$rightFilter = $('<div class="el-transfer-panel__filter el-input el-input--small el-input--prefix">' +
            '<input type="text" autocomplete="off" placeholder="' + _filterPlaceholder + '" class="el-input__inner" ' + filterPlaceholderI18nAttr + '>' +
            '<span class="el-input__prefix"><i class="el-input__icon el-icon-search"></i></span></div>');
          this.$rightFilterInput = this.$rightFilter.find('input');
          this.$rightFilterInput.on('input', function (e) {
            that.filterRight(e);
            that.$rightFilter.trigger('mouseenter');
          });
          this.$rightFilterIcon = this.$rightFilter.find('.el-input__icon');
          this.$rightFilterIcon.on('click', function () {
            if (that.$rightFilterIcon.hasClass('el-icon-circle-close')) {
              that.$rightFilterInput.val('').trigger('input');
            }
          });
          this.$rightFilter.on('mouseenter', function () {
            if (that.$rightFilterInput.val().length > 0) {
              that.$rightFilterIcon.removeClass('el-icon-search').addClass('el-icon-circle-close');
            } else {
              that.$rightFilterIcon.removeClass('el-icon-circle-close').addClass('el-icon-search');
            }
          });
          this.$rightFilter.on('mouseleave', function () {
            that.$rightFilterIcon.removeClass('el-icon-circle-close').addClass('el-icon-search');
          });
          this.$rightBody.append(this.$rightFilter);
        }
        this.$rightBody.append(this.$rightBodyCheckboxGroup, this.$rightBodyNoFilter, this.$rightBodyNoData);
        this.$right.append(this.$rightHeader, this.$rightBody);
        if (options.rightFooter) {
          this.$rightBody.addClass('is-with-footer');
          this.$rightFooter = $('<p class="el-transfer-panel__footer">' + options.rightFooter + '</p>');
          this.$right.append(this.$rightFooter);
        }
        // data
        var _default = {};
        _default[this.props.value] = '';
        _default[this.props.label] = '';
        _default[this.props.disabled] = false;
        $.each(options.data, function (index, item) {
          if (typeof item === 'string') {
            var _itemtemp = {};
            _itemtemp[that.props.value] = item;
            item = _itemtemp;
          }
          item = $.extend({}, _default, item);
          item[that.props.label] = item[that.props.label] || item[that.props.value];
          item.index = index;
          item.$el = $('<label role="checkbox" class="el-checkbox el-transfer-panel__item">' +
            '          <span aria-checked="mixed" class="el-checkbox__input ' + (item[that.props.disabled] ? 'is-disabled' : '') + '">' +
            '            <span class="el-checkbox__inner"></span>' +
            '            <input type="checkbox" aria-hidden="true" class="el-checkbox__original" value="' + item[that.props.value] + '">' +
            '          </span>' +
            '          <span class="el-checkbox__label">' +
            '            <span>' + options.renderContent(item, that.props) + '</span>' +
            '          </span>' +
            '        </label>');
          item.$checkbox = item.$el.find('input[type=checkbox]');
          item.$input = item.$el.find('.el-checkbox__input');
          item.position = 'left';
          if (!item[that.props.disabled]) {
            item.$el.on('change', function () {
              var _checked = item.$checkbox.is(':checked');
              that.changeCheck(item, _checked);
              if (item.position === 'left') {
                that.leftCheck();
                if (options.leftCheckChange) {
                  var _checks = that.left.filter(function (item) {
                    return item.$checkbox.is(':checked');
                  });
                  options.leftCheckChange(item, _checked, _checks);
                }
              } else {
                that.rightCheck();
                if (options.rightCheckChange) {
                  var _checks = that.right.filter(function (item) {
                    return item.$checkbox.is(':checked');
                  });
                  options.rightCheckChange(item, _checked, _checks);
                }
              }
            });
          }
          if (options.defaultChecked.indexOf(item[that.props.value]) !== -1 && !item[that.props.disabled]) {
            that.changeCheck(item, true);
          }
          options.data[index] = item;
        });
        // init
        this.$el.addClass('el-transfer').append(this.$left, this.$buttons, this.$right);
        this.left = [];
        this.right = [];
        this.set(options.value);
      },
      filterLeft: function (e) {
        var that = this, options = this.options, query = e.target.value;
        var _hasResult = false;
        $.each(that.left, function (index, item) {
          if (options.filterMethod(query, item, that.props)) {
            _hasResult = true;
            item.$el.show();
          } else {
            item.$el.hide();
          }
        });
        if (_hasResult) {
          this.left.length > 0 && this.$leftBodyCheckboxGroup.show();
          this.$leftBodyNoFilter.hide();
        } else {
          this.left.length > 0 && this.$leftBodyCheckboxGroup.hide();
          if (query) {
            this.$leftBodyNoData.hide();
            this.$leftBodyNoFilter.show();
          } else {
            this.$leftBodyNoData.show();
            this.$leftBodyNoFilter.hide();
          }
        }
        this.leftCheck();
      },
      filterRight: function (e) {
        var that = this, options = this.options, query = e.target.value;
        var _hasResult = false;
        $.each(that.right, function (index, item) {
          if (options.filterMethod(query, item, that.props)) {
            _hasResult = true;
            item.$el.show();
          } else {
            item.$el.hide();
          }
        });
        if (_hasResult) {
          this.right.length > 0 && this.$rightBodyCheckboxGroup.show();
          this.$rightBodyNoFilter.hide();
        } else {
          this.right.length > 0 && this.$rightBodyCheckboxGroup.hide();
          if (query) {
            this.$rightBodyNoData.hide();
            this.$rightBodyNoFilter.show();
          } else {
            this.$rightBodyNoData.show();
            this.$rightBodyNoFilter.hide();
          }
        }
        this.rightCheck();
      },
      updateLeftHeaderText: function () {
        var _checked = this.left.filter(function (item) {
          return item.$checkbox.is(':checked');
        });
        this.$leftHeaderText.html(this.options.format.noChecked.replace(/\${ *checked *}/g, _checked.length.toString())
          .replace(/\${ *total *}/g, this.left.length.toString()));
        if (this.left.length === 0) {
          this.$leftBodyCheckboxGroup.hide();
          this.$leftBodyNoData.show();
        } else {
          this.$leftBodyCheckboxGroup.show();
          this.$leftBodyNoData.hide();
        }
      },
      updateRightHeaderText: function () {
        var _checked = this.right.filter(function (item) {
          return item.$checkbox.is(':checked');
        });
        this.$rightHeaderText.html(this.options.format.hasChecked.replace(/\${ *checked *}/g, _checked.length.toString())
          .replace(/\${ *total *}/g, this.right.length.toString()));
        if (this.right.length === 0) {
          this.$rightBodyCheckboxGroup.hide();
          this.$rightBodyNoData.show();
        } else {
          this.$rightBodyCheckboxGroup.show();
          this.$rightBodyNoData.hide();
        }
      },
      updateButtonsLeft: function () {
        var _checked = this.right.some(function (item) {
          return item.$checkbox.is(':checked');
        });
        if (_checked) {
          this.$buttonsLeft.attr('disabled', false).removeClass('is-disabled');
        } else {
          this.$buttonsLeft.attr('disabled', true).addClass('is-disabled');
        }
      },
      updateButtonsRight: function () {
        var _checked = this.left.some(function (item) {
          return item.$checkbox.is(':checked');
        });
        if (_checked) {
          this.$buttonsRight.attr('disabled', false).removeClass('is-disabled');
        } else {
          this.$buttonsRight.attr('disabled', true).addClass('is-disabled');
        }
      },
      changeCheck: function (item, checked) {
        item.$checkbox.prop('checked', !!checked);
        if (!!checked) {
          item.$el.addClass('is-checked').attr('aria-checked', true);
          item.$input.addClass('is-checked');
        } else {
          item.$el.removeClass('is-checked').attr('aria-checked', false);
          item.$input.removeClass('is-checked');
        }
      },
      leftCheckAll: function () {
        var _checked = this.$leftHeaderCheckbox.is(':checked');
        for (var index in this.left) {
          !this.left[index][this.props.disabled] &&
          this.left[index].$el.css('display') !== 'none' &&
          this.changeCheck(this.left[index], _checked);
        }
        this.updateLeftHeaderText();
        this.updateButtonsRight();
        this.leftCheck();
      },
      leftCheck: function () {
        var that = this;
        var _all = this.left.filter(function (item) {
          return item.$el.css('display') !== 'none' && !item[that.props.disabled];
        });
        var _checked = _all.filter(function (item) {
          return item.$checkbox.is(':checked');
        });
        if (_checked.length === 0) {
          this.$leftHeaderLabel.removeClass('is-checked');
          this.$leftHeaderInput.removeClass('is-checked is-indeterminate');
          this.$leftHeaderCheckbox.prop('checked', false);
        } else if (_checked.length === _all.length) {
          this.$leftHeaderLabel.addClass('is-checked');
          this.$leftHeaderInput.removeClass('is-indeterminate').addClass('is-checked');
          this.$leftHeaderCheckbox.prop('checked', true);
        } else {
          this.$leftHeaderLabel.removeClass('is-checked');
          this.$leftHeaderInput.removeClass('is-checked').addClass('is-indeterminate');
          this.$leftHeaderCheckbox.prop('checked', false);
        }
        this.updateLeftHeaderText();
        this.updateButtonsRight();
      },
      toRight: function () {
        var that = this, options = that.options, _hasCheck = false;
        for (var index = 0; index < this.left.length; index++) {
          var item = this.left[index];
          if (item.$checkbox.is(':checked')) {
            _hasCheck = true;
            item.position = 'right';
            that.changeCheck(item, false);
            if (options.targetOrder === 'unshift') {
              that.right.unshift(item);
            } else {
              that.right.push(item);
            }
            that.left.splice(index, 1);
            options.value.push(item[that.props.value]);
            index--;
          }
        }
        this.showRight();
        this.leftCheck();
        this.rightCheck();
        options.filterable && this.$rightFilterInput.trigger('input');
        if (_hasCheck && options.change) {
          options.change(options.value, 'right');
        }
      },
      showRight: function () {
        var that = this, options = that.options;
        if (options.targetOrder === 'original') {
          that.right = that.right.sort(function (a, b) {
            return a.index - b.index;
          });
        }
        $.each(that.right, function (index, item) {
          that.$rightBodyCheckboxGroup.append(item.$el);
        });
      },
      rightCheckAll: function () {
        var _checked = this.$rightHeaderCheckbox.is(':checked');
        for (var index in this.right) {
          !this.right[index][this.props.disabled] &&
          this.right[index].$el.css('display') !== 'none' &&
          this.changeCheck(this.right[index], _checked);
        }
        this.updateRightHeaderText();
        this.updateButtonsLeft();
        this.rightCheck();
      },
      rightCheck: function () {
        var that = this;
        var _all = this.right.filter(function (item) {
          return item.$el.css('display') !== 'none' && !item[that.props.disabled];
        });
        var _checked = _all.filter(function (item) {
          return item.$checkbox.is(':checked');
        });
        if (_checked.length === 0) {
          this.$rightHeaderLabel.removeClass('is-checked');
          this.$rightHeaderInput.removeClass('is-checked is-indeterminate');
          this.$rightHeaderCheckbox.prop('checked', false);
        } else if (_checked.length === _all.length) {
          this.$rightHeaderLabel.addClass('is-checked');
          this.$rightHeaderInput.removeClass('is-indeterminate').addClass('is-checked');
          this.$rightHeaderCheckbox.prop('checked', true);
        } else {
          this.$rightHeaderLabel.removeClass('is-checked');
          this.$rightHeaderInput.removeClass('is-checked').addClass('is-indeterminate');
          this.$rightHeaderCheckbox.prop('checked', false);
        }
        this.updateRightHeaderText();
        this.updateButtonsLeft();
      },
      toLeft: function () {
        var that = this, options = that.options, _hasCheck = false;
        for (var index = 0; index < this.right.length; index++) {
          var item = this.right[index];
          if (item.$checkbox.is(':checked')) {
            _hasCheck = true;
            item.position = 'left';
            that.changeCheck(item, false);
            if (options.targetOrder === 'unshift') {
              that.left.unshift(item);
            } else {
              that.left.push(item);
            }
            that.right.splice(index, 1);
            options.value.splice(options.value.indexOf(item[that.props.value]), 1);
            index--;
          }
        }
        this.showLeft();
        this.rightCheck();
        this.leftCheck();
        options.filterable && this.$leftFilterInput.trigger('input');
        if (_hasCheck && options.change) {
          options.change(options.value, 'left');
        }
      },
      showLeft: function () {
        var that = this, options = that.options;
        if (options.targetOrder === 'original') {
          that.left = that.left.sort(function (a, b) {
            return a.index - b.index;
          });
        }
        $.each(that.left, function (index, item) {
          that.$leftBodyCheckboxGroup.append(item.$el);
        });
      },
      set: function (value) {
        if (!Array.isArray(value)) return;
        var that = this, options = that.options;
        var _oldValue = options.value.sort().toString();
        var _newValue = value.sort().toString();
        this.left = [];
        this.right = [];
        $.each(options.data, function (index, item) {
          if (value.indexOf(item[that.props.value]) === -1) {
            that.left.push(item);
          } else {
            that.right.push(item);
          }
        });
        this.options.value = value;
        this.showLeft();
        this.showRight();
        this.rightCheck();
        this.leftCheck();
        options.change && _oldValue !== _newValue && options.change(this.options.value, 'set');
      },
      get: function () {
        return this.options.value;
      },
      clearQuery: function (position) {
        if (!options.filterable) return;
        if (position === 'left') {
          this.$leftFilterInput.val('').trigger('input');
        } else if (position === 'right') {
          this.$rightFilterInput.val('').trigger('input');
        }
      }
    };
    $.fn[componentName] = function () {
      var option = arguments[0],
        args = arguments[1],
        value,
        allowedMethods = ['clearQuery', 'set', 'get'];
      this.each(function () {
        var $this = $(this),
          data = $this.data('u-transfer');
        if (!data) {
          var _option = {};
          if (Array.isArray(option)) {
            _option = {data: option};
          } else {
            _option = option;
          }
          var options = $.extend({}, $.fn[componentName].defaults, $this.data(), _option);
          data = new Transfer($this, options);
          $this.data('u-transfer', data);
          data.init();
        }
        if (typeof option === 'string') {
          if ($.inArray(option, allowedMethods) < 0) {
            throw 'Unknown method: ' + option;
          }
          value = data[option](args);
        }
      });
      return typeof value !== 'undefined' ? value : this;
    };
    $.fn[componentName].defaults = {
      'value': [],
      'data': [],
      'filterable': false,
      'filterPlaceholder': $[i18nName] ? function () {
        return $[i18nName].prop(this.i18n.filterPlaceholder, '请输入搜索内容');
      } : '请输入搜索内容',
      'filterMethod': function (query, item, props) {
        return item[props.label || 'label'].toLowerCase().indexOf(query.toLowerCase()) > -1;
      },
      'targetOrder': 'original',
      'titles': [
        $[i18nName] ? function () {
          return $[i18nName].prop($.fn[componentName].defaults.i18n.title1, '列表1');
        } : '列表1',
        $[i18nName] ? function () {
          return $[i18nName].prop($.fn[componentName].defaults.i18n.title2, '列表2');
        } : '列表2'
      ],
      'buttonTexts': [
        $[i18nName] ? function () {
          return $[i18nName].prop($.fn[componentName].defaults.i18n.button1, '');
        } : '',
        $[i18nName] ? function () {
          return $[i18nName].prop($.fn[componentName].defaults.i18n.button2, '');
        } : ''
      ],
      'renderContent': function(item, props){
        return item[props.label || 'label'];
      },
      'format': {noChecked: '${checked}/${total}', hasChecked: '${checked}/${total}'},
      'props': {},
      'defaultChecked': [],
      'leftFooter': '',
      'rightFooter': '',
      'change': '',
      'leftCheckChange': '',
      'rightCheckChange': '',
      'noData': $[i18nName] ? function () {
        return $[i18nName].prop(this.i18n.noData, '无数据');
      } : '无数据',
      'noFilter': $[i18nName] ? function () {
        return $[i18nName].prop(this.i18n.noFilter, '无匹配数据');
      } : '无匹配数据',
      'i18n': {
        filterPlaceholder: 'uTransferFilterPlaceholder',
        title1: 'uTransferTitle1',
        title2: 'uTransferTitle2',
        button1: 'uTransferButton1',
        button2: 'uTransferButton2',
        noData: 'uTransferNoData',
        noFilter: 'uTransferNoFilter'
      }
    };
  },
  componentName: 'transfer'
};
