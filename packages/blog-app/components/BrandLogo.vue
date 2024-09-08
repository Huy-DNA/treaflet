<template>
  <div>
    <img
      src='assets/images/brand-logo.png'
      alt='treaflet brand logo'
      :width='imageSize(props.width)'
    />
  </div>
</template>

<script setup lang="ts">
  import { type ImageSize, imageSize } from 'utils/style-guide';

  const props = defineProps({
    width: {
      type: String as PropType<ImageSize>,
      default: 'normal',
    },
  });
</script>
