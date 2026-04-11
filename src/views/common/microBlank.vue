<template>
  <div class="micro-blank-page">
    <div :id="containerId" class="micro-container" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { createMicroApp, unmountMicroApp, findMicroAppByPath } from '@/micro';

const route = useRoute();

const containerId = computed(() => {
  const redirect = route.query.redirect as string;
  if (redirect?.startsWith('/his')) return 'his';
  return 'default';
});

const microAppInfo = computed(() => {
  const redirect = route.query.redirect as string;
  return findMicroAppByPath(redirect || route.path);
});

onMounted(async () => {
  if (microAppInfo.value) {
    await createMicroApp(route.query.redirect as string || route.path, 'main');
  }
});

onUnmounted(() => {
  if (microAppInfo.value) {
    unmountMicroApp('main', microAppInfo.value.name);
  }
});

watch(
  () => route.query.redirect,
  async (newPath) => {
    if (newPath && microAppInfo.value) {
      await createMicroApp(newPath as string, 'main');
    }
  }
);
</script>

<style lang="scss" scoped>
.micro-blank-page {
  width: 100%;
  height: calc(100vh - 84px);
  overflow: hidden;
}

.micro-container {
  width: 100%;
  height: 100%;
}
</style>
