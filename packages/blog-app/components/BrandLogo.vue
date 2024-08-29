<template>
  <img
    src='assets/images/brand-logo.png'
    alt='treaflet brand logo'
    :width='width'
  />
</template>

<script setup lang="ts">
  const props = defineProps<{
    width?: string;
  }>();

  const width = props.width || '16px';
</script>
