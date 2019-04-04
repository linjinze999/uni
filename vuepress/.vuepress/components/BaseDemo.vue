<template>
  <div class="demo">
    <div class="source">
      <slot name="source"></slot>
    </div>
    <div class="code-cover">
      <transition name="demo-code-slid">
        <div v-if="showCode" class="code">
          <div class="describe">
            <slot></slot>
          </div>
          <slot name="highlight"></slot>
        </div>
      </transition>
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
  transition: .2s;
}

.code-cover {
  overflow: hidden;
}

.code {
  box-sizing: border-box;
  background-color: #fafafa;
  border-bottom: 1px solid #ebebeb;
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
  border-bottom: 1px solid #ebebeb;
}

.show-code {
  text-align: center;
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
<style>
.demo-code-slid-active, .demo-code-slid-leave-active {
  transition: all .6s;
}
.demo-code-slid-enter, .demo-code-slid-leave-to {
  margin-top: -100%;
  padding-top: 0;
  padding-bottom: 0;
}
</style>
