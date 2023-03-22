<template>
  <router-view class="router-view" />
</template>

<script></script>

<style lang="less">
html {
  overflow-y: auto;
  overflow-x: hidden;
}
html,
body {
  width: 100%;
  overflow-x: hidden;
  min-height: 100vh;
}
.router-view {
  background-color: #f5f5f5;
  position: relative;
  margin: 0 auto;
  min-height: 100vh;
}
</style>
