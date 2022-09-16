<template>
  <q-btn-dropdown
    :color="color"
    :label="label"
  >
    <q-list>
      <slot name="content" />
    </q-list>
  </q-btn-dropdown>
</template>

<script setup>

defineProps({
  color: {
    type: String,
    default: 'primary'
  },
  label: {
    type: String,
    default: 'Dropdown Button'
  }
})
</script>
