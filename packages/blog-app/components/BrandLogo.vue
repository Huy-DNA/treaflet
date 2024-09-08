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
  import { type ImageSize, imageSize } from 'utils/style-guide';

  const props = defineProps({
    width: {
      type: Object as PropType<ImageSize>,
    },
  });

  const width = props.width || 'normal';
</script>
