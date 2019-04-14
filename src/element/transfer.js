export default {
  init: function ($, componentName) {
    function Transfer ($el, options) {
      this.$el = $el;
      this.options = options;
    }

    Transfer.prototype = {
      constructor: Transfer,
      init: function () {
        var options = this.options,
          that = this;
        // left
        this.$left = $('<div class="el-transfer-panel"></div>');
        this.$leftHeader = $('<p class="el-transfer-panel__header">' +
          '      <label role="checkbox" class="el-checkbox">' +
          '        <span aria-checked="mixed" class="el-checkbox__input">' +
          '          <span class="el-checkbox__inner"></span>' +
          '          <input type="checkbox" aria-hidden="true" class="el-checkbox__original" value="">' +
          '        </span>' +
          '        <span class="el-checkbox__label">' +
          '          列表 1' +
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
        this.$leftBodyNoFilter = $('<p class="el-transfer-panel__empty" style="display: none;">无匹配数据</p>');
        this.$leftBodyNoData = $('<p class="el-transfer-panel__empty" style="display: none;">无数据</p>');
        this.$leftBody.append(this.$leftBodyCheckboxGroup, this.$leftBodyNoFilter, this.$leftBodyNoData);
        this.$left.append(this.$leftHeader, this.$leftBody);
        // buttons
        this.$buttons = $('<div class="el-transfer__buttons"></div>');
        this.$buttonsLeft = $('<button disabled="disabled" type="button" class="el-button el-button--primary is-disabled el-transfer__button">' +
          '<span><i class="el-icon-arrow-left"></i></span></button>');
        this.$buttonsRight = $('<button type="button" class="el-button el-button--primary is-disabled el-transfer__button" disabled="disabled">' +
          '<span><i class="el-icon-arrow-right"></i></span></button>');
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
          '          列表 2' +
          '          <span></span>' +
          '        </span>' +
          '      </label>' +
          '    </p>');
        this.$rightHeaderLabel = this.$rightHeader.find('.el-checkbox');
        this.$rightHeaderLabel.on('change', function () {
          that.rightCheckAll();
        });
        this.$rightHeaderInput = this.$rightHeader.find('.el-checkbox__input');
        this.$rightHeaderCheckbox = this.$rightHeader.find('input[type=checkbox]');
        this.$rightHeaderText = this.$rightHeader.find('.el-checkbox__label span');
        this.$rightBody = $('<div class="el-transfer-panel__body"></div>');
        this.$rightBodyCheckboxGroup = $('<div role="group" aria-label="checkbox-group" class="el-checkbox-group el-transfer-panel__list"></div>');
        this.$rightBodyNoFilter = $('<p class="el-transfer-panel__empty" style="display: none;">无匹配数据</p>');
        this.$rightBodyNoData = $('<p class="el-transfer-panel__empty" style="display: none;">无数据</p>');
        this.$rightBody.append(this.$rightBodyCheckboxGroup, this.$rightBodyNoFilter, this.$rightBodyNoData);
        this.$right.append(this.$rightHeader, this.$rightBody);

        // data
        this.left = [];
        this.right = [];
        var _default = {
          'value': '',
          'label': '',
          'disabled': false
        };
        $.each(options.data, function (index, item) {
          if (typeof item === 'string') {
            item = {value: item};
          }
          item = $.extend({}, _default, item);
          item.label = item.label || item.value;
          item.$el = $('<label role="checkbox" class="el-checkbox el-transfer-panel__item">' +
            '          <span aria-checked="mixed" class="el-checkbox__input ' + (item.disabled ? 'is-disabled' : '') + '">' +
            '            <span class="el-checkbox__inner"></span>' +
            '            <input type="checkbox" aria-hidden="true" class="el-checkbox__original" value="' + item.value + '">' +
            '          </span>' +
            '          <span class="el-checkbox__label">' +
            '            <span>' + item.label + '</span>' +
            '          </span>' +
            '        </label>');
          item.$checkbox = item.$el.find('input[type=checkbox]');
          item.$input = item.$el.find('.el-checkbox__input');
          if (!item.disabled) {
            item.$el.on('change', function () {
              that.changeCheck(item, item.$checkbox.is(':checked'));
              that.leftCheck();
            });
          }
          that.left.push(item);
          that.$leftBodyCheckboxGroup.append(item.$el);
        });
        //
        this.$el.addClass('el-transfer').append(this.$left, this.$buttons, this.$right);
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
        if (_checked) {
          this.$leftHeaderLabel.addClass('is-checked').attr('aria-checked', true);
          this.$leftHeaderInput.addClass('is-checked');
          this.$buttonsRight.attr('disabled', false).removeClass('is-disabled');
        } else {
          this.$leftHeaderLabel.removeClass('is-checked').attr('aria-checked', false);
          this.$leftHeaderInput.removeClass('is-checked');
          this.$buttonsRight.attr('disabled', true).addClass('is-disabled');
        }
        for (var index in this.left) {
          !this.left[index].disabled && this.changeCheck(this.left[index], _checked);
        }
      },
      leftCheck: function (item) {
        var _checked = this.left.filter(function (item) {
          return item.$checkbox.is(':checked');
        });
        if (_checked.length === 0) {
          this.$buttonsRight.attr('disabled', true).addClass('is-disabled');
          this.$leftHeaderLabel.removeClass('is-checked');
          this.$leftHeaderInput.removeClass('is-checked is-indeterminate');
          this.$leftHeaderCheckbox.prop('checked', false);
        } else if (_checked.length === this.left.length) {
          this.$buttonsRight.attr('disabled', false).removeClass('is-disabled');
          this.$leftHeaderLabel.addClass('is-checked');
          this.$leftHeaderInput.removeClass('is-indeterminate').addClass('is-checked');
          this.$leftHeaderCheckbox.prop('checked', true);
        } else {
          this.$buttonsRight.attr('disabled', false).removeClass('is-disabled');
          this.$leftHeaderLabel.removeClass('is-checked');
          this.$leftHeaderInput.removeClass('is-checked').addClass('is-indeterminate');
          this.$leftHeaderCheckbox.prop('checked', false);
        }
      },
      toRight: function () {

      },
      rightCheckAll: function () {
        var _checked = this.$rightHeaderCheckbox.is(':checked');
        if (_checked) {
          this.$rightHeaderLabel.addClass('is-checked').attr('aria-checked', true);
          this.$rightHeaderInput.addClass('is-checked');
          this.$buttonsLeft.attr('disabled', false).removeClass('is-disabled');
        } else {
          this.$rightHeaderLabel.removeClass('is-checked').attr('aria-checked', false);
          this.$rightHeaderInput.removeClass('is-checked');
          this.$buttonsLeft.attr('disabled', true).addClass('is-disabled');
        }
        for (var index in this.right) {
          !this.right[index].disabled && this.changeCheck(this.right[index], _checked);
        }
      },
      rightCheck: function (item) {
        var _checked = this.right.filter(function (item) {
          return item.$checkbox.is(':checked');
        });
        if (_checked.length === 0) {
          this.$buttonsLeft.attr('disabled', true).addClass('is-disabled');
          this.$rightHeaderLabel.removeClass('is-checked');
          this.$rightHeaderInput.removeClass('is-checked is-indeterminate');
          this.$rightHeaderCheckbox.prop('checked', false);
        } else if (_checked.length === this.left.length) {
          this.$buttonsLeft.attr('disabled', false).removeClass('is-disabled');
          this.$rightHeaderLabel.addClass('is-checked');
          this.$rightHeaderInput.removeClass('is-indeterminate').addClass('is-checked');
          this.$rightHeaderCheckbox.prop('checked', true);
        } else {
          this.$buttonsLeft.attr('disabled', false).removeClass('is-disabled');
          this.$rightHeaderLabel.removeClass('is-checked');
          this.$rightHeaderInput.removeClass('is-checked').addClass('is-indeterminate');
          this.$rightHeaderCheckbox.prop('checked', false);
        }
      },
      toLeft: function () {

      }
    };
    $.fn[componentName] = function () {
      var option = arguments[0],
        args = arguments[1],
        value,
        allowedMethods = ['show', 'disabled', 'set', 'get', 'update'];
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
      'filterPlaceholder': '',
      'filterMethod': '',
      'targetOrder': 'original',
      'titles': ['列表1', '列表2'],
      'buttonTexts': [],
      'renderContent': '',
      'format': {noChecked: '${checked}/${total}', hasChecked: '${checked}/${total}'},
      'props': '',
      'leftDefaultChecked': [],
      'rightDefaultChecked': [],
      'leftFooter': '',
      'rightFooter': '',
      'change': '',
      'leftCheckChange': '',
      'rightCheckChange': ''
    };
  },
  componentName: 'transfer'
};
