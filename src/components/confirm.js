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
    var alertHtml = '<div class="modal-cover hide" id="' + options.id + '">' +
      '<div class="modal">' +
      '<div class="header">' +
      '<div class="title">' + options.title + '</div>' +
      '<span class="close">&times;</span>' +
      '</div>' +
      '<div class="main">' + options.content + '</div>' +
      '<div class="footer">' +
      '<button class="ok">' + options.okLabel + '</button>' +
      '</div>' +
      '</div>' +
      '</div>';
    let _confirm = $('#' + options.id);
    if (!_alert.length) {
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
