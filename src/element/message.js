export default {
  init: function ($, componentName, optionsName, i18nName) {
    var $extend = {};
    $extend[optionsName] = {
      message: '',
      type: 'info',
      iconClass: '',
      customClass: '',
      duration: 3000,
      showClose: false,
      center: false,
      onClose: '',
    };
    $extend[componentName] = function (options) {
      // 参数
      if (typeof options === 'string') {
        options = $.extend(true, {}, $[optionsName], {message: options});
      } else {
        options = $.extend(true, {}, $[optionsName], options || {});
      }
      // html
      var _icon = '<i class="el-message__icon ' + (options.iconClass || ('el-icon-' + options.type)) + '"></i>';
      var $message = $('<div role="alert" class="el-message el-message--' + options.type + (options.showClose ? ' is-closable' : '') +
        (options.center ? ' is-center ' : ' ') + options.customClass +
        '" style="z-index: 2030;">' + _icon + '<p class="el-message__content">' + options.message + '</p></div>');

      function close () {
        options.onclose && options.onclose($message);
        $message.animate({top: 0}, 150, function () {
          $message.remove();
        });
      }

      if (options.showClose) {
        var $close = $('<i class="el-message__closeBtn el-icon-close"></i>');
        $close.on('click', function () {
          close();
        });
        $message.append($close);
      }
      $message.close = close;
      $message.data('u-message-close', close);
      $message.css({top: 0});
      // 定时关闭
      var timer;

      function startTimer () {
        if (typeof options.duration === 'number' && options.duration > 0) {
          timer = setTimeout(close, options.duration);
        }
      }

      function clearTimer () {
        timer && clearTimeout(timer);
      }

      $message.on('mouseenter', clearTimer);
      $message.on('mouseleave', startTimer);
      $('body').append($message);
      $message.animate({top: '20px'}, 200, startTimer);
      return $message;
    };
    $.extend($extend);
  },
  componentName: 'message',
  optionsName: 'messageDefaults'
};
