# 对话框

::: demo bar

```html
<button onclick="confirm1()">弹窗</button>

<script>
function confirm1() {
  $.confirm({
    title: 'tip',
    content: 'Hello World!'
  });
}
</script>
```
:::
