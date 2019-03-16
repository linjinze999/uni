<template>
  <div class="demo">
    <div>
      <slot></slot>
    </div>
    <div v-if="showCode" class="code">
      <div class="describe">
        {{ describe }}
      </div>
      <pre>
        <slot></slot>
      </pre>
    </div>
    <div>
        <div v-if="!showCode" class="show-code" @click="triggerShowCode">
          ▼<span class="text">显示代码</span>
        </div>
        <div v-if="showCode" class="show-code" @click="triggerShowCode">
          ▲<span class="text">隐藏代码</span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseDemo',
  props: ['describe'],
  data: {
    showCode: false
  },
  methods: {
    triggerShowCode: () => { this.showCode = !this.showCode; }
  }
}
</script>

<style scoped>
.demo {
  border: 1px solid #ebebeb;
  background-color: #ffffff;
  border-radius: 3px;
}
.code {
  background-color: #fafafa;
  border-top: 1px solid #ebebeb;
}
.code .describe {
  border: 1px solid #ebebeb;
  background-color: #ffffff;
  border-radius: 3px;
}
.show-code {
  text-align: center;
  border-top: 1px solid #ebebeb;
  cursor: pointer;
  color: #d3dce6;
}
.show-code .text {
  display: none;
}
.show-code:hover {
  background-color: rgba(0, 0, 255 , .5);
  color: #0000ff;
}
.show-code:hover .text{
  display: inline-block;
}
</style>
