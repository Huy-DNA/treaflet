<template>
  <div>
    <img
      src='assets/images/brand-logo.png'
      alt='treaflet brand logo'
      :width='imageSize(width)'
    />
  </div>
</template>

<script setup lang="ts">
  import { ImageSize, imageSize } from '@/style-guide';

  const props = defineProps<{
    width?: ImageSize;
  }>();

  const width = props.width || 'normal';
</script>
