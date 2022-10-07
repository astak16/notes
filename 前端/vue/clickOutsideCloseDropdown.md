```vue
<template>
  <div class="dropdown" ref="dropdownRef" />
</template>

<script lang="ts">
export default defineComponent({
  /**
   * 1. 在 document 上监听点击事件，组件销毁的时候再将事件移除，事件回调函数定义为 handler
   * 
   * 2. 在 dom 元素中使用 ref，ref 的名字需要和 setup 中设置的一样
   * 
   * 3. 通过 handler 中用 contains 判断点击的元素是否是 elementRef.value
   *
   * 4. 由于 setup 只执行一次，需要使用 watch 监听第 3 步中的数据变化，以此来实现点击页面其他区域关闭下拉框
   * **/
  setup() {
    const dropdownRef = ref<null | HTMLElement>(null);

    const useClickOutside = (elementRef: Ref<null | HTMLElement>) => {
      const isClickOutSide = ref(false);
      const handler = (e: MouseEvent) => {
        if (elementRef.value) {
          if (elementRef.value.contains(e.target as HTMLElement)) {
            isClickOutSide.value = false;
          } else {
            isClickOutSide.value = true;
          }
        }
      };

      onMounted(() => document.addEventListener("click", handler));
      onUnmounted(() => document.removeEventListener("click", handler));

      return isClickOutSide;
    };

    const isClickOutside = useClickOutside(dropdownRef);

    watch(isClickOutside, () => {
      // ... 业务逻辑
    });
    return {
      dropdownRef,
    };
  },
});
</script>
```