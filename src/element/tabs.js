export default {
  init: function ($, componentName) {
    function Tabs ($el, options) {
      this.$el = $el;
      this.options = options;
    }

    Tabs.prototype = {
      constructor: Tabs,
      init: function () {
        var that = this,
          options = this.options;
        // 位置设置
        options.tabPosition = (['left', 'right', 'top', 'bottom'].indexOf(options.tabPosition) > -1) ? options.tabPosition : 'top';
        this.vertical = (['left', 'right'].indexOf(options.tabPosition) > -1) ? true : false;
        this.$el.addClass('el-tabs el-tabs--' + options.tabPosition);
        // 样式设置
        if (options.type === 'card') {
          this.$el.addClass('el-tabs--card');
        } else if (options.type === 'border-card') {
          this.$el.addClass('el-tabs--border-card');
        }
        this.positionClass = 'is-' + options.tabPosition;
        // 插入的html
        // $header
        this.$header = $('<div class="el-tabs__header ' + this.positionClass + '"></div>');
        // $header > $add
        if (options.addable) {
          this.$add = $('<span tabindex="0" class="el-tabs__new-tab"><i class="el-icon-plus"></i></span>');
          this.$add.on('click', function (e) {
            that.options.tabAdd && that.options.tabAdd();
          });
          this.$header.append(this.$add);
        }
        // $header > $navWrap
        this.$navWrap = $('<div class="el-tabs__nav-wrap ' + this.positionClass + '"></div>');
        this.$navPrev = $('<span class="el-tabs__nav-prev" style="display: none;"><i class="el-icon-arrow-left"></i></span>');
        this.$navPrev.on('click', function () {
          that.scrollPrev();
        });
        this.$navNext = $('<span class="el-tabs__nav-next" style="display: none;"><i class="el-icon-arrow-right"></i></span>');
        this.$navNext.on('click', function () {
          that.scrollNext();
        });
        this.$navWrap.append(this.$navPrev);
        this.$navWrap.append(this.$navNext);
        this.$header.append(this.$navWrap);
        // $header > $navWrap > $navScroll
        this.$navScroll = $('<div class="el-tabs__nav-scroll"></div>');
        this.$navWrap.append(this.$navScroll);
        // $header > $navWrap > $navScroll > $tablist
        this.tablistOffset = 0;
        this.$tablist = $('<div role="tablist" class="el-tabs__nav ' + this.positionClass +
          ((options.stretch && ['top', 'bottom'].indexOf(options.tabPosition) !== -1) ? ' is-stretch' : '') + '"></div>');
        if (['border-card', 'card'].indexOf(options.type) === -1) {
          this.$tabActiveBar = $('<div class="el-tabs__active-bar ' + this.positionClass + '"></div>');
          this.$tablist.append(this.$tabActiveBar);
        }
        this.$navScroll.append(this.$tablist);
        // $content
        this.$content = $('<div class="el-tabs__content"></div>');
        // 初始化
        this.contents = {};
        this.tabs = {};
        this.update();
        options.value = options.value || this.findNextTab(0);
        this.$el.append(this.$header).append(this.$content);
        this.set(options.value);
      },
      scrollPrev () {
        if (!this.tablistOffset) return;
        this.tablistOffset = this.tablistOffset > this.$navScroll.width() ? this.tablistOffset - this.$navScroll.width() : 0;
        this.$tablist.css('transform', 'translateX(-' + this.tablistOffset + 'px)');
      },
      scrollNext () {
        var navSize = this.$tablist.width();
        var containerSize = this.$navScroll.width();
        var currentOffset = this.tablistOffset;
        if (navSize - currentOffset <= containerSize) return;
        this.tablistOffset = navSize - currentOffset > containerSize * 2 ? currentOffset + containerSize : (navSize - containerSize);
        this.$tablist.css('transform', 'translateX(-' + this.tablistOffset + 'px)');
      },
      findNextTab: function (index) {
        var options = this.options;
        var tabsLength = options.tabs.length;
        for (var i = index; i < tabsLength; i++) {
          if (!options.tabs[i].disabled) {
            return options.tabs[i].name;
          }
        }
        for (var i = index - 1; i >= 0; i--) {
          if (!options.tabs[i].disabled) {
            return options.tabs[i].name;
          }
        }
        return null;
      },
      update: function () {
        var that = this, options = this.options;
        var _defaults = {
          'label': '',
          'disabled': false,
          'name': '',
          'closable': options.closable,
          'lazy': false,
          'content': '',
          'selector': ''
        };
        $.each(options.tabs, function (idx, val) {
          if (that.tabs[val.name]) {
            return;
          }
          // 设置参数
          var _option;
          _option = $.extend({}, _defaults, val);
          _option.label = _option.label || _option.name;
          options.tabs[idx] = _option;
          // 插入tab
          var _header = $('<div aria-controls="pane-' + _option.name + '" role="tab" tabindex="-1" class="el-tabs__item ' +
            that.positionClass + (_option.disabled ? ' is-disabled' : '') + '">' + _option.label + '</div>');
          _header.data('u-tabs-tab-name', _option.name);
          if (_option.closable && ['border-card', 'card'].indexOf(options.type) > -1) {
            var _close = $('<span class="el-icon-close"></span>');
            _close.on('click', function (e) {
              !_option.disabled && options.tabRemove && options.tabRemove(_option.name);
              e.stopPropagation();
            });
            _header.addClass('is-closable').append(_close);
          }
          var _content = $('<div role="tabpanel" aria-labelledby="tab-' + _option.name +
            '" class="el-tab-pane" style="display: none;" aria-hidden="true"></div>');
          if (_option.selector) {
            _content.append($(_option.selector));
          } else {
            _content.html(_option.content);
          }
          _header.on('click', function (e) {
            !_option.disabled && that.tabClick(e);
          });
          that.contents[_option.name] = _content;
          that.tabs[_option.name] = _header;
          that.$tablist.append(_header);
          that.$content.append(_content);
        });
        this.showScroll();
      },
      showScroll: function () {
        if (this.$navWrap.width() >= this.$tablist.outerWidth()) {
          this.$navWrap.removeClass('is-scrollable');
          this.$navPrev.hide();
          this.$navNext.hide();
        } else {
          this.$navWrap.addClass('is-scrollable');
          this.$navPrev.show();
          this.$navNext.show();
        }
      },
      add: function (tab) {
        this.options.tabs.push(tab);
        this.update();
      },
      remove: function (name) {
        var index = 0, tabsLength = this.options.tabs.length;
        for (var i = 0; i < tabsLength; i++) {
          if (name === this.options.tabs[i].name) {
            index = i;
            break;
          }
        }
        this.options.tabs = this.options.tabs.filter(function (tab) {
          return tab !== name && tab.name !== name;
        });
        this.contents[name].remove();
        this.tabs[name].remove();
        delete this.contents[name];
        delete this.tabs[name];
        this.showScroll();
        if (name === this.options.value) {
          this.set(this.findNextTab(index));
        }
      },
      set: function (newValue) {
        if (!this.tabs[newValue]) {
          return;
        }
        // 取消旧选中标签
        var oldValue = this.options.value;
        this.contents[oldValue] && this.contents[oldValue].hide();
        this.tabs[oldValue] && this.tabs[oldValue].removeClass('is-active').attr({
          'tabindex': -1,
          'aria-selected': false
        });
        // 设置新选中标签
        this.tabs[newValue].addClass('is-active').attr({'tabindex': 0, 'aria-selected': true});
        if (this.$tabActiveBar && this.vertical) {
          var translateY = this.tabs[newValue].position().top + parseInt(this.tabs[newValue].css('padding-top').replace('px', ''));
          this.$tabActiveBar.css({
            'height': this.tabs[newValue].height() + 'px',
            'transform': 'translateY(' + translateY + 'px)'
          });
        } else if (this.$tabActiveBar && !this.vertical) {
          var translateX = this.tabs[newValue].position().left + parseInt(this.tabs[newValue].css('padding-left').replace('px', ''));
          this.$tabActiveBar.css({
            'width': this.tabs[newValue].width() + 'px',
            'transform': 'translateX(' + translateX + 'px)'
          });
        }
        this.contents[newValue].show();
        this.options.value = newValue;
        // 偏移
        if (this.$navWrap.width() < this.$tablist.outerWidth()) {
          if (this.tablistOffset > this.tabs[newValue].position().left) {
            this.tablistOffset = this.tabs[newValue].position().left;
            this.$tablist.css('transform', 'translateX(-' + this.tablistOffset + 'px)');
          } else if ((this.tablistOffset + this.$navScroll.width()) < (this.tabs[newValue].position().left + this.tabs[newValue].outerWidth())) {
            this.tablistOffset = this.tabs[newValue].position().left - (this.$navScroll.width() - this.tabs[newValue].outerWidth());
            this.$tablist.css('transform', 'translateX(-' + this.tablistOffset + 'px)');
          }
        }
      },
      get: function () {
        return this.options.value;
      },
      tabClick: function (e) {
        var that = this,
          $el = $(e.target),
          oldValue = this.options.value,
          newValue = $el.data('u-tabs-tab-name');
        this.options.tabClick && this.options.tabClick(newValue, oldValue);
        // 不用切换
        if (newValue === oldValue) {
          return;
        }
        // 切换前调用 beforeLeave()
        if (this.options.beforeLeave) {
          var before = this.options.beforeLeave(newValue, oldValue);
          if (before && before.then) {
            before.then(function () {
              that.set(newValue);
            });
          } else if (before !== false) {
            that.set(newValue);
          }
        } else {
          that.set(newValue);
        }
      }
    };
    $.fn[componentName] = function () {
      var option = arguments[0],
        args = arguments,
        value,
        allowedMethods = ['add', 'remove', 'set', 'get'];
      this.each(function () {
        var $this = $(this),
          data = $this.data('u-tabs');
        if (!data) {
          var _option = {};
          if (Array.isArray(option)) {
            _option = {tabs: option};
          } else if (typeof option === 'object') {
            _option = option;
          }
          var options = $.extend({}, $.fn[componentName].defaults, $this.data(), _option);
          data = new Tabs($this, options);
          $this.data('u-tabs', data);
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
      'type': '',
      'closable': false,
      'addable': false,
      'tabPosition': 'top',
      'stretch': false,
      'beforeLeave': function () {
        return true;
      },
      'tabClick': '',
      'tabRemove': '',
      'tabAdd': '',
      'tabs': []
    };
  },
  componentName: 'tabs'
};
