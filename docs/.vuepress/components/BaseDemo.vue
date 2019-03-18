<template>
  <div class="demo">
    <div class="source">
      <slot name="source"></slot>
    </div>
    <div v-show="showCode" class="code">
      <div class="describe">
        <slot></slot>
      </div>
      <slot name="highlight"></slot>
    </div>
    <div>
      <div class="show-code" @click="triggerShowCode">
        <span class="control">{{ icon }}<span class="text">{{ text }}</span></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseDemo',
  props: ['describe'],
  data: function () {
    return {
      showCode: false
    };
  },
  computed: {
    icon: function () {
      return this.showCode ? '▲' : '▼';
    },
    text: function () {
      return this.showCode ? '隐藏代码' : '显示代码';
    }
  },
  methods: {
    triggerShowCode: function () {
      this.showCode = !this.showCode;
    }
  }
};
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
  padding: 24px;
  overflow: hidden;
}

.code .describe {
  border: 1px solid #ebebeb;
  background-color: #ffffff;
  border-radius: 3px;
  padding: 20px;
}

.source {
  padding: 24px;
}

.show-code {
  text-align: center;
  border-top: 1px solid #ebebeb;
  cursor: pointer;
  color: #d3dce6;
  height: 44px;
  line-height: 44px;
  font-size: 14px;
}

.show-code .control {
  transition: .3s;
}

.show-code .text {
  display: none;
}

.show-code:hover {
  color: #409EFF;
  background-color: #f9fafc;
}

.show-code:hover .text {
  display: inline-block;
}
</style>
