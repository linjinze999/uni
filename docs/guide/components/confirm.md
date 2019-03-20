# 对话框

::: demo bar

```html
<button onclick="confirm1()">弹窗</button>

<script>
function confirm1() {
  $.confirm({
    title: 'Tip',
    content: 'Hello World!'
  });
}
</script>
```
:::
