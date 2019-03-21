export default {
  init: function($, componentName, optionsName, i18nName){
    var $extend = {};
    $extend[optionsName] = {
      id: 'u-dialog-0',
      coverBGColor: 'rgba(0, 0, 0, .5)',
      coverClick: false,
      top: '15vh',
      width: '420px',
      zIndex: '100',
      headerCenter: false,
      footerCenter: false,
      content: '',
      confirm: function () {return true},
      cancel: function () {return true},
      afterShow: function () {},
      beforeHide: function () {return true},
      afterHide: function () {},
      showHeader: true,
      showClose: true,
      showCancel: true,
      showConfirm: true,
      footer: '',
      title: $[i18nName] ? function () {
        return $[i18nName].getString(this.i18n.title, '提示');
      } : '提示',
      labelConfirm: $[i18nName] ? function () {
        return $[i18nName].getString(this.i18n.confirm, '确定');
      } : '确定',
      labelCancel: $[i18nName] ? function () {
        return $[i18nName].getString(this.i18n.cancel, '取消');
      } : '取消',
      i18n: {
        title: 'uConfirmTitle',
        confirm: 'uConfirmConfirm',
        cancel: 'uConfirmCancel'
      }
    };
    $extend[componentName] = function(options){
      options = $.extend(true, {}, $[optionsName], options || {});
      // 获取文本
      var _title = typeof options.title === 'function' ? options.title() : options.title,
        _labelConfirm = typeof options.labelConfirm === 'function' ? options.labelConfirm() : options.labelConfirm,
        _labelCancel = typeof options.labelCancel === 'function' ? options.labelCancel() : options.labelCancel;
      // 获取显示可配置的html
      var _htmlClose = options.showClose ? '<button type="button" aria-label="Close" class="el-dialog__headerbtn" ' +
        'u-type="cancel"><i class="el-dialog__close el-icon el-icon-close"></i></button>' : '';
      var _htmlHeader = options.showHeader ? '<div class="el-dialog__header ' + (options.headerCenter ? 'el-dialog--center' : '') +
        '"><div class="el-message-box__title">' + _title + '</div>' + _htmlClose + '</div>' : '';
      var _htmlCancel = options.showCancel ? '<button class="el-button el-button--default el-button--small" u-type="cancel">' +
        _labelCancel + '</button>' : '';
      var _htmlConfirm = options.showConfirm ? '<button class="el-button el-button--default el-button--small el-button--primary" u-type="confirm">' +
        _labelConfirm + '</button>' : '';
      // 整体html
      var dialogHtml = '<div class="el-dialog__wrapper" id="' + options.id +
        '" style="background-color: ' + options.coverBGColor + '; z-index: ' + options.zIndex + '; display: none;">' +
        '<div class="el-dialog" style="width:' + options.width + '; margin-top: ' + options.top + ';">' + _htmlHeader +
        '<div class="el-dialog__body">' + options.content + '</div>' +
        '<div class="el-dialog__footer ' + (options.footerCenter ? 'el-dialog--center' : '') +
        '"><span class="dialog-footer">' + options.footer + _htmlCancel + _htmlConfirm +
        '</span></div></div></div>';
      var _dialog = $('#' + options.id);
      if (!_dialog.length) {
        $('body').append(dialogHtml);
      } else {
        _dialog.prop('outerHTML', dialogHtml);
      }
      _dialog = $('#' + options.id);

      // 关闭对话框函数
      function hide() {
        if (options.beforeHide()) {
          _dialog.css('display', 'none');
          options.afterHide();
        }
      }

      // 按钮事件绑定
      _dialog.find('[u-type=cancel]').on('click', function () {
        options.cancel() && hide();
      });
      if (options.coverClick) {
        _dialog.on('click', function(){
          options.cancel() && hide();
        });
      }
      _dialog.find('[u-type=confirm]').on('click', function () {
        options.confirm() && hide();
      });

      // 显示对话框
      _dialog.css('display', 'block');
      options.afterShow();
    };
    $.extend($extend);
  },
  componentName: 'dialog',
  optionsName: 'dialogDefault'
}
