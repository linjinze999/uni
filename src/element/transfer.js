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
        var title1 = options.titles[0] || '',
          title2 = options.titles[1] || '';
        title1 = typeof title1 === 'function' ? title1() : title1;
        title2 = typeof title2 === 'function' ? title2() : title2;
        // left
        this.$left = $('<div class="el-transfer-panel"></div>');
        this.$leftHeader = $('<p class="el-transfer-panel__header">' +
          '      <label role="checkbox" class="el-checkbox">' +
          '        <span aria-checked="mixed" class="el-checkbox__input">' +
          '          <span class="el-checkbox__inner"></span>' +
          '          <input type="checkbox" aria-hidden="true" class="el-checkbox__original" value="">' +
          '        </span>' +
          '        <span class="el-checkbox__label">' + title1 + '<span></span></span>' +
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
        this.$buttonsLeft.on('click', function () {
          that.toLeft();
        });
        this.$buttonsRight = $('<button type="button" class="el-button el-button--primary is-disabled el-transfer__button" disabled="disabled">' +
          '<span><i class="el-icon-arrow-right"></i></span></button>');
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
          '        <span class="el-checkbox__label">' + title2 + '<span></span></span>' +
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
          item.position = 'left';
          if (!item.disabled) {
            item.$el.on('change', function () {
              that.changeCheck(item, item.$checkbox.is(':checked'));
              if (item.position === 'left') {
                that.leftCheck();
              } else {
                that.rightCheck();
              }
            });
          }
          that.left.push(item);
          that.$leftBodyCheckboxGroup.append(item.$el);
        });
        //
        this.$el.addClass('el-transfer').append(this.$left, this.$buttons, this.$right);
      },
      updateLeftHeaderText: function(){
        var _checked = this.left.filter(function (item) {
          return item.$checkbox.is(':checked');
        });
        this.$leftHeaderText.html(this.options.format.noChecked.replace(/\${ *checked *}/g, _checked.length.toString())
          .replace(/\${ *total *}/g, this.left.length.toString()));
      },
      updateRightHeaderText: function(){
        var _checked = this.right.filter(function (item) {
          return item.$checkbox.is(':checked');
        });
        this.$rightHeaderText.html(this.options.format.hasChecked.replace(/\${ *checked *}/g, _checked.length.toString())
          .replace(/\${ *total *}/g, this.right.length.toString()));
      },
      updateButtonsLeft: function(){
        var _checked = this.right.some(function (item) {
          return item.$checkbox.is(':checked');
        });
        if(_checked){
          this.$buttonsLeft.attr('disabled', false).removeClass('is-disabled');
        }else{
          this.$buttonsLeft.attr('disabled', true).addClass('is-disabled');
        }
      },
      updateButtonsRight: function(){
        var _checked = this.left.some(function (item) {
          return item.$checkbox.is(':checked');
        });
        if(_checked){
          this.$buttonsRight.attr('disabled', false).removeClass('is-disabled');
        }else{
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
        if (_checked) {
          this.$leftHeaderLabel.addClass('is-checked').attr('aria-checked', true);
          this.$leftHeaderInput.addClass('is-checked');
        } else {
          this.$leftHeaderLabel.removeClass('is-checked').attr('aria-checked', false);
          this.$leftHeaderInput.removeClass('is-checked');
        }
        for (var index in this.left) {
          !this.left[index].disabled && this.changeCheck(this.left[index], _checked);
        }
        this.updateLeftHeaderText();
        this.updateButtonsRight();
      },
      leftCheck: function () {
        var _checked = this.left.filter(function (item) {
          return item.$checkbox.is(':checked');
        });
        if (_checked.length === 0) {
          this.$leftHeaderLabel.removeClass('is-checked');
          this.$leftHeaderInput.removeClass('is-checked is-indeterminate');
          this.$leftHeaderCheckbox.prop('checked', false);
        } else if (_checked.length === this.left.length) {
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
        var that = this, options = that.options;
        for (var index = 0; index < this.left.length; index++) {
          var item = this.left[index];
          if (item.$checkbox.is(':checked')) {
            item.position = 'right';
            that.changeCheck(item, false);
            that.right.push(item);
            that.$rightBodyCheckboxGroup.append(item.$el);
            that.left.splice(index, 1);
            index--;
          }
        }
        this.leftCheck();
        this.rightCheck();
      },
      rightCheckAll: function () {
        var _checked = this.$rightHeaderCheckbox.is(':checked');
        if (_checked) {
          this.$rightHeaderLabel.addClass('is-checked').attr('aria-checked', true);
          this.$rightHeaderInput.addClass('is-checked');
        } else {
          this.$rightHeaderLabel.removeClass('is-checked').attr('aria-checked', false);
          this.$rightHeaderInput.removeClass('is-checked');
        }
        for (var index in this.right) {
          !this.right[index].disabled && this.changeCheck(this.right[index], _checked);
        }
        this.updateRightHeaderText();
        this.updateButtonsLeft();
      },
      rightCheck: function () {
        var _checked = this.right.filter(function (item) {
          return item.$checkbox.is(':checked');
        });
        if (_checked.length === 0) {
          this.$rightHeaderLabel.removeClass('is-checked');
          this.$rightHeaderInput.removeClass('is-checked is-indeterminate');
          this.$rightHeaderCheckbox.prop('checked', false);
        } else if (_checked.length === this.right.length) {
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
        var that = this, options = that.options;
        for (var index = 0; index < this.right.length; index++) {
          var item = this.right[index];
          if (item.$checkbox.is(':checked')) {
            item.position = 'left';
            that.changeCheck(item, false);
            that.left.push(item);
            that.$leftBodyCheckboxGroup.append(item.$el);
            that.right.splice(index, 1);
            index--;
          }
        }
        this.rightCheck();
        this.leftCheck();
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
