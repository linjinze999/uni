// 防抖
export default function (fn, delay) {
  delay = delay || 300;
  let timer;
  return function () {
    const that = this;
    const args = arguments;
    timer && clearTimeout(timer);
    timer = setTimeout(function () {
      timer = null;
      fn.apply(that, args);
    }, delay);
  };
}
