export default {
  bind(el, handler) {
    let interval = null;
    let startTime;
    const clear = (e) => {
      // 当mousedonw与mouseuo之间的事件间隔小于0.1秒时，额外触发一次（单击这种情况），
      // 大于0.1s的都有setInterval去触发执行了
      if (new Date() - startTime < 100) {
        handler(e);
      }
      clearInterval(interval);
      interval = null;
      document.removeEventListener('mouseup', clear);
    };
    // 给el绑上了mousedonw的事件
    el.addEventListener('mousedown', (e) => {
      // 限制左键
      if (e.button !== 0) return;
      startTime = new Date();
      // 在触发mousedown时，绑定了mouseup事件
      document.addEventListener('mouseup', clear);
      clearInterval(interval);
      // 每隔0.1s触发一次
      interval = setInterval(() => { handler(e) }, 100);
    });
  }
};
