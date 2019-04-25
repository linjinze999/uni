// 节流
export default function (fn, interval) {
  let last;
  let timer;
  interval = interval || 300;
  return function () {
    const that = this;
    const args = arguments;
    const now = +new Date();
    if (last && now - last < interval) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        last = now;
        fn.apply(that, args);
      }, interval);
    } else {
      last = now;
      fn.apply(that, args);
    }
  };
}
