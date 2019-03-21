export default {
  init: function ($, componentName) {
    function Progress ($el, options) {
      this.$el = $el;
      this.options = options;
    }

    Progress.prototype = {
      constructor: Progress,
      init: function () {
        var _html = [],
          options = this.options;
        if (options.type === 'circle') {
          this.$el.addClass('el-progress el-progress--circle');
          // 环形进度条
          var cWidth = options.circleWidth;
          var cStrokeWidth = (options.strokeWidth / options.circleWidth * 100).toFixed(1);
          var cRadius = parseInt(50 - parseFloat(cStrokeWidth) / 2, 10);
          var cTrackPath = 'M 50 50 m 0 -' + cRadius + ' a ' + cRadius + ' ' + cRadius +
            ' 0 1 1 0 ' + (cRadius * 2) + ' a ' + cRadius + ' ' + cRadius + ' 0 1 1 0 -' + (cRadius * 2);
          var cStroke = options.color;
          var cPerimeter = 2 * Math.PI * (50 - parseFloat(cStrokeWidth) / 2);
          this.cPerimeter = cPerimeter;
          var cPathStyle = ['stroke-dasharray: ' + cPerimeter + 'px,' + cPerimeter + 'px',
            'stroke-dashoffset: ' + (1 - options.percentage / 100) * cPerimeter + 'px',
            'transition: stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease 0s;'];
          _html.push('<div class="el-progress-circle" style="height: ' + cWidth + 'px; width: ' + cWidth + 'px;">');
          _html.push('<svg viewBox="0 0 100 100">');
          _html.push('<path d="' + cTrackPath + '" stroke="#e5e9f2" stroke-width="' +
            cStrokeWidth + '" fill="none" class="el-progress-circle__track"></path>');
          _html.push('<path d="' + cTrackPath + '" stroke-linecap="round" stroke="' + cStroke + '" stroke-width="' +
            cStrokeWidth + '" fill="none" class="el-progress-circle__path" style="' + cPathStyle.join(';') + '"></path>');
          _html.push('</svg>');
          if (options.showText) {
            var cSize = options.circleWidth * 0.111111 + 2;
            var cPercentage = options.percentage;
            var _text = options.text || (cPercentage + '%');
            _html.push('<div class="el-progress__text" style="font-size: ' + cSize + 'px;">' + _text + '</div>');
          }
          _html.push('</div>');
        } else {
          this.$el.addClass('el-progress el-progress--line');
          // 条形进度条
          var lHeight = options.strokeWidth;
          var lPercentage = options.percentage;
          var lColor = options.color;
          var ltext = options.text || (lPercentage + '%');
          _html.push('<div class="el-progress-bar">');
          _html.push('<div class="el-progress-bar__outer" style="height: ' + lHeight + 'px;">');
          _html.push('<div class="el-progress-bar__inner" style="width: ' + lPercentage +
            '%; background-color: ' + lColor + ';">');
          var lSize = 12 + lHeight * 0.4;
          var maxlSize = 16.9;
          lSize = (lSize > maxlSize) ? maxlSize : lSize;
          if (options.showText && options.textInside) {
            this.$el.addClass('el-progress--text-inside');
            _html.push('<div class="el-progress-bar__innerText">' + ltext + '</div>');
          }
          _html.push('</div></div></div>');
          if (options.showText && !options.textInside) {
            _html.push('<div class="el-progress__text" style="font-size: ' + lSize + 'px;">' + ltext + '</div>');
          }
        }
        this.$el.append(_html.join(''));
      },
      update: function (options) {
        // 更新数据
        if (typeof options === 'number') {
          this.options.percentage = options;
        } else {
          this.options.percentage = options.hasOwnProperty('percentage') ? options.percentage : this.options.percentage;
          this.options.color = options.hasOwnProperty('color') ? options.color : this.options.color;
          this.options.text = options.hasOwnProperty('text') ? options.text : this.options.text;
        }
        // 更新显示
        var _text = this.options.text || (this.options.percentage + '%');
        this.$el.find('.el-progress-bar__innerText,.el-progress__text').text(_text);
        if (this.options.type === 'circle') {
          this.$el.find('.el-progress-circle__path').css('stroke-dashoffset',
            (1 - this.options.percentage / 100) * this.cPerimeter + 'px');
          this.$el.find('.el-progress-circle__path').attr('stroke', this.options.color);
        } else {
          this.$el.find('.el-progress-bar__inner').css({
            'width': this.options.percentage + '%',
            'background-color': this.options.color
          });
        }
      }
    };
    $.fn[componentName] = function () {
      var option = arguments[0],
        args = arguments,
        value,
        allowedMethods = ['update'];
      this.each(function () {
        var $this = $(this),
          data = $this.data('u-progress'),
          options = $.extend({}, $.fn[componentName].defaults,
            $this.data(), typeof option === 'object' && option);
        if (!data) {
          data = new Progress($this, options);
          $this.data('u-progress', data);
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
      'type': 'line',
      'percentage': 0,
      'strokeWidth': 6,
      'textInside': false,
      'color': '',
      'circleWidth': 126,
      'showText': true,
      'text': ''
    };
  },
  componentName: 'progress'
};
