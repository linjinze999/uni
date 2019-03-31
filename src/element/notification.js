export default {
  init: function ($, componentName, optionsName, i18nName) {
    var $extend = {};
    $extend[optionsName] = {
      title: '',
      message: '',
      type: '',
      iconClass: '',
      customClass: '',
      duration: 4500,
      position: 'top-right',
      showClose: true,
      onClose: '',
      onClick: '',
      offset: '16px'
    };
    $extend[componentName] = function (options) {
      // 参数
      if (typeof options === 'string') {
        options = $.extend(true, {}, $[optionsName], {message: options});
      } else {
        options = $.extend(true, {}, $[optionsName], options || {});
      }
      // 父容器
      var _$notifyPack;
      if (options.position === 'top-left') {
        _$notifyPack = $('#u-notify-pack-top-left');
        if (_$notifyPack.length === 0) {
          _$notifyPack = $('<div id="u-notify-pack-top-left" style="position: fixed; top: 0; left: 0; z-index: 2000;"></div>');
          $('body').append(_$notifyPack);
        }
      } else if (options.position === 'bottom-left') {
        _$notifyPack = $('#u-notify-pack-bottom-left');
        if (_$notifyPack.length === 0) {
          _$notifyPack = $('<div id="u-notify-pack-bottom-left" style="position: fixed; bottom: 0; left: 0; z-index: 2000;"></div>');
          $('body').append(_$notifyPack);
        }
      } else if (options.position === 'bottom-right') {
        _$notifyPack = $('#u-notify-pack-bottom-right');
        if (_$notifyPack.length === 0) {
          _$notifyPack = $('<div id="u-notify-pack-bottom-right" style="position: fixed; bottom: 0; right: 0; z-index: 2000;"></div>');
          $('body').append(_$notifyPack);
        }
      } else {
        _$notifyPack = $('#u-notify-pack-top-right');
        if (_$notifyPack.length === 0) {
          _$notifyPack = $('<div id="u-notify-pack-top-right" style="position: fixed; top: 0; right: 0; z-index: 2000;"></div>');
          $('body').append(_$notifyPack);
        }
      }
      // html
      var $group = $('<div class="el-notification__group"><h2 class="el-notification__title">' + options.title +
        '</h2><div class="el-notification__content"><p>' + options.message + '</p></div></div>');

      var _icon = (options.type || options.iconClass) ?
        '<i class="el-notification__icon ' + (options.iconClass || ('el-icon-' + options.type)) + '"></i>' : '';
      var _cssPosition = options.position.indexOf('left') > -1 ? 'left' : 'right';
      var $notification = $('<div role="alert" class="el-notification ' + _cssPosition + ' ' + options.customClass + '">' + _icon + '</div>');
      $notification.css('position', 'relative').css((options.position.indexOf('bottom') > -1 ? 'margin-bottom' : 'margin-top'), options.offset);
      $notification.append($group);

      function close () {
        options.onclose && options.onclose($notification);
        $notification.animate({opacity: 0}, 250, function () {
          $notification.remove();
        });
      }

      if (options.showClose) {
        var $close = $('<div class="el-notification__closeBtn el-icon-close"></div>');
        $close.on('click', function () {
          close();
        });
        $group.append($close);
      }
      $notification.close = close;
      $notification.data('u-notify-close', close);
      $notification.css(_cssPosition, '-100%');
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

      $notification.on('mouseenter', clearTimer);
      $notification.on('mouseleave', startTimer);
      $notification.on('click', function(){
        options.onclick && options.onclick($notification);
      });
      _$notifyPack.append($notification);
      var _styles = {};
      _styles[_cssPosition] = '16px';
      $notification.animate(_styles, 200, startTimer);
      return $notification;
    };
    $.extend($extend);
  },
  componentName: 'notify',
  optionsName: 'notifyDefaults'
};
