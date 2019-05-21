$.fn.select.defaults = $.extend(true, {}, $.fn.select.defaults, {
  placeholder: '请选择',
  noMatchText: '无匹配数据',
  noDataText: '无数据'
});

$.fn.transfer.defaults = $.extend(true, {}, $.fn.transfer.defaults, {
  filterPlaceholder: '请输入搜索内容',
  titles: ['列表1', '列表2'],
  buttonTexts: ['', ''],
  noData: '无数据',
  noFilter: '无匹配数据'
});

$.dialogDefaults = $.extend(true, {}, $.dialogDefaults, {
  title: '提示',
  labelConfirm: '确定',
  labelCancel: '取消'
});
