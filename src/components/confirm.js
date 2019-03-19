const init = function($, componentName, optionsName){
  let $extend = {};
  $extend[optionsName] = {
    id: 'u-confirm-0',
    title: '提示',
    content: '',
    okLabel: '确认'
  };
  $extend[componentName] = function(options){
    options = $.extend(true, {}, $[optionsName], options || {});
    var alertHtml = '<div class="el-message-box__wrapper hide" id="' + options.id + '">' +
      '<div class="el-message-box">' +
      '<div class="el-message-box__header">' +
      '<div class="el-message-box__title">' + options.title + '</div>' +
      '<span class="el-message-box__headerbtn">&times;</span>' +
      '</div>' +
      '<div class="el-message-box__content">' + options.content + '</div>' +
      '<div class="el-message-box__btns">' +
      '<button class="el-button el-button--default el-button--small el-button--primary ">' + options.okLabel + '</button>' +
      '</div>' +
      '</div>' +
      '</div>';
    let _confirm = $('#' + options.id);
    if (!_confirm.length) {
      $('body').append(alertHtml);
    } else {
      _confirm.prop('outerHTML', alertHtml);
    }
    _confirm = $('#' + options.id);
    _confirm.find('.close,.ok').on('click', function () {
      _confirm.addClass('hide');
    });
    _confirm.removeClass('hide');
  };
  $.extend($extend);
}

export default {
  init: init,
  componentName: 'confirm',
  optionsName: 'confirmDefault'
}
