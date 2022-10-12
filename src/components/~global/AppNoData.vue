<template>
  <div
    class="flex column flex-center bg-loading-bg__table"
    style="height:300px"
  >
    <div>
      <q-icon
        :name="props.icon"
        :color="color"
        :size="props.size"
      />
    </div>
    <div :class="'text-' + props.color +' q-mt-sm'">
      {{ props.text }}
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  icon: { type: String, default: 'icon-mat-receipt_long' },
  color: { type: String, default: 'primary' },
  size: { type: String, default: '60px' },
  text: { type: String, default: 'Belum ada Data' }
})
</script>
