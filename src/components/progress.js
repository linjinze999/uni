function Progress ($el, options) {
  this.$el = $el;
  this.options = options;
}

Progress.prototype = {
  constructor: Progress,
  init: function () {
    var _html = [];
    if (this.options.type === 'circle') {
      this.$el.addClass('progress progress--circle');
      // 环形进度条
      var cWidth = this.options.circleWidth;
      var cStrokeWidth = (this.options.strokeWidth / this.options.circleWidth * 100).toFixed(1);
      var cRadius = parseInt(50 - parseFloat(cStrokeWidth) / 2, 10);
      var cTrackPath = 'M 50 50 m 0 -' + cRadius + ' a ' + cRadius + ' ' + cRadius +
        ' 0 1 1 0 ' + (cRadius * 2) + ' a ' + cRadius + ' ' + cRadius + ' 0 1 1 0 -' + (cRadius * 2);
      var cStroke = this.options.color;
      var cPerimeter = 2 * Math.PI * (50 - parseFloat(cStrokeWidth) / 2);
      this.cPerimeter = cPerimeter;
      var cPathStyle = ['stroke-dasharray: ' + cPerimeter + 'px,' + cPerimeter + 'px',
        'stroke-dashoffset: ' + (1 - this.options.percentage / 100) * cPerimeter + 'px',
        'transition: stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease 0s;'];
      _html.push('<div class="progress-circle" style="height: ' + cWidth + 'px; width: ' + cWidth + 'px;">');
      _html.push('<svg viewBox="0 0 100 100">');
      _html.push('<path d="' + cTrackPath + '" stroke="#e5e9f2" stroke-width="' +
        cStrokeWidth + '" fill="none" class="progress-circle__track"></path>');
      _html.push('<path d="' + cTrackPath + '" stroke-linecap="round" stroke="' + cStroke + '" stroke-width="' +
        cStrokeWidth + '" fill="none" class="progress-circle__path" style="' + cPathStyle.join(';') + '"></path>');
      _html.push('</svg>');
      if (this.options.showText) {
        var cSize = this.options.circleWidth * 0.111111 + 2;
        var cPercentage = this.options.percentage;
        _html.push('<div class="progress__text" style="font-size: ' + cSize + 'px;">' + cPercentage + '%</div>');
      }
      _html.push('</div>');
    } else {
      this.$el.addClass('progress progress--line');
      // 条形进度条
      var lHeight = this.options.strokeWidth;
      var lPercentage = this.options.percentage;
      var lColor = this.options.color;
      _html.push('<div class="progress-bar">');
      _html.push('<div class="progress-bar__outer" style="height: ' + lHeight + 'px;">');
      _html.push('<div class="progress-bar__inner" style="width: ' + lPercentage +
        '%; background-color: ' + lColor + ';">');
      var lSize = 12 + lHeight * 0.4;
      if (this.options.showText && this.options.textInside) {
        this.$el.addClass('progress--text-inside');
        _html.push('<div class="progress-bar__innerText">' + lPercentage + '%</div>');
      }
      _html.push('</div></div></div>');
      if (this.options.showText && !this.options.textInside) {
        _html.push('<div class="progress__text" style="font-size: ' + lSize + 'px;">' + lPercentage + '%</div>');
      }
    }
    this.$el.append(_html.join(''));
  },
  update: function (options) {
    // 更新数据
    if (typeof options === 'number') {
      this.options.percentage = options;
    } else {
      this.options.percentage = options.percentage || this.options.percentage;
      this.options.color = options.color || this.options.color;
    }
    // 更新显示
    this.$el.find('.progress-bar__innerText,.progress__text').text(this.options.percentage + '%');
    if (this.options.type === 'circle') {
      this.$el.find('.progress-circle__path').css('stroke-dashoffset',
        (1 - this.options.percentage / 100) * this.cPerimeter + 'px');
      this.$el.find('.progress-circle__path').attr('stroke', this.options.color);
    } else {
      this.$el.find('.progress-bar__inner').css({
        'width': this.options.percentage + '%',
        'background-color': this.options.color
      });
    }
  }
};
$.fn.progress = function () {
  var option = arguments[0],
    args = arguments,
    value,
    allowedMethods = ['update'];
  this.each(function () {
    var $this = $(this),
      data = $this.data('progress'),
      options = $.extend({}, $.fn.progress.defaults,
        $this.data(), typeof option === 'object' && option);
    if (!data) {
      data = new Progress($this, options);
      $this.data('progress', data);
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
$.fn.progress.defaults = {
  'type': 'line',
  'percentage': 0,
  'strokeWidth': 6,
  'textInside': false,
  'color': '#62259d',
  'circleWidth': 126,
  'showText': true
};
