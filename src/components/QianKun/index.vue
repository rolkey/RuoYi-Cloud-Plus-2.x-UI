<template>
  <div class="app-main" id="microApps">
    <div
      class="child-main"
      v-show="microAppIndex === index"
      v-for="(item, index) in microAppList"
      :key="item.name"
      :id="microId + '-' + item.name"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { microAppList, getMicroAppIndex } from '@/micro/appList';
import { createMicroApp } from '@/micro/microApp';
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';

// 定义props类型
interface Props {
  microId: string;
}

const route = useRoute();
const microAppIndex = computed<number>(() => getMicroAppIndex(route.path));
const props = defineProps<Props>();

watch(
  () => microAppIndex.value,
  (val: number) => {
    if (val > -1) {
      createMicroApp(route.path, props.microId);
    }
  },
  { immediate: true }
);

defineExpose({
  showMicroApp: microAppIndex.value > -1
});
</script>

<style lang="scss" scoped>
.child-main {
  min-height: var(--min-height-value);
}
</style>
