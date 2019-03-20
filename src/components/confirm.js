var init = function($, componentName, optionsName){
  var $extend = {};
  $extend[optionsName] = {
    id: 'u-confirm-0',
    coverBGColor: 'rgba(0, 0, 0, .5)',
    coverClick: false,
    content: '',
    confirm: function () {return true},
    cancel: function () {return true},
    afterShow: function () {},
    beforeHide: function () {return true},
    afterHide: function () {},
    showHeader: true,
    showCancel: true,
    showClose: true,
    showConfirm: true,
    htmlMain: '',
    title: $.ui18n ? function () {
      return $.ui18n.getString(this.i18n.title, '提示');
    } : '提示',
    labelConfirm: $.ui18n ? function () {
      return $.ui18n.getString(this.i18n.confirm, '确定');
    } : '确定',
    labelCancel: $.ui18n ? function () {
      return $.ui18n.getString(this.i18n.cancel, '取消');
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
    var _htmlClose = options.showClose ? '<span class="el-message-box__headerbtn" u-type="cancel">&times;</span>' : '';
    var _htmlHeader = options.showHeader ? '<div class="el-message-box__header">' +
      '<div class="el-message-box__title">' + _title + '</div>' + _htmlClose + '</div>' : '';
    var _htmlCancel = options.showCancel ? '<button class="el-button el-button--default el-button--small" u-type="cancel">' +
      _labelCancel + '</button>' : '';
    var _htmlConfirm = options.showConfirm ? '<button class="el-button el-button--default el-button--small el-button--primary" u-type="confirm">' +
      _labelConfirm + '</button>' : '';
    // 整体html
    var confirmHtml = '<div class="el-message-box__wrapper hide" id="' + options.id +
      '" style="background-color: ' + options.coverBGColor + '">' +
      '<div class="el-message-box">' + _htmlHeader +
      '<div class="el-message-box__content">' + options.content + '</div>' +
      '<div class="el-message-box__btns">' + _htmlCancel + _htmlConfirm + '</div></div></div>';
    var _confirm = $('#' + options.id);
    if (!_confirm.length) {
      $('body').append(confirmHtml);
    } else {
      _confirm.prop('outerHTML', confirmHtml);
    }
    _confirm = $('#' + options.id);

    // 关闭对话框函数
    function hide() {
      if (options.beforeHide()) {
        _confirm.addClass('hide');
        options.afterHide();
      }
    }

    // 按钮事件绑定
    _confirm.find('[u-type=cancel]').on('click', function () {
      options.cancel() && hide();
    });
    if (options.coverClick) {
      _confirm.on('click', function(){
        options.cancel() && hide();
      });
    }
    _confirm.find('[u-type=confirm]').on('click', function () {
      options.confirm() && hide();
    });

    // 显示对话框
    _confirm.removeClass('hide');
    options.afterShow();
  };
  console.log($.extend);
  console.log($extend);
  $.extend($extend);
};

export default {
  init: init,
  componentName: 'confirm',
  optionsName: 'confirmDefault'
}
