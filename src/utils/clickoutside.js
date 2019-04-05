var uNodeList = [];
var uId = 0;
window.$(document).on('click', function (e) {
  window.$.each(uNodeList, function (index, node) {
    node.out(e) && node.handler();
  });
});

export default {
  bind: function (out, handler) {
    var _id = uId++;
    uNodeList.push({
      id: _id,
      out: out,
      handler: handler
    });
    return _id;
  },
  unbind: function (id) {
    var len = uNodeList.length;
    for (var i = 0; i < len; i++) {
      if (uNodeList[i].id === id) {
        uNodeList.splice(i, 1);
        return true;
      }
    }
    return false;
  }
};
