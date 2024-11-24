<template>
  <div
    class="wrapper"
  >
    <div class="search-box">
      <div :style="{ position: 'relative' }">
        <font-awesome-icon :icon="faSearch" class="search-box__icon" width="16px" />
        <input
          type="search"
          class="search-box__box"
          placeholder="Search for a post"
          v-model="searchText"
          @input="onInput"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { faSearch } from '@fortawesome/free-solid-svg-icons';
  const emits = defineEmits(['search']);

  const searchText = ref('');

  function onInput () {
    emits('search', searchText.value);
  }
</script>

<style scoped>
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .search-box {
    display: flex;
    justify-content: center;
  }

  .search-box__icon {
    position: absolute;
    top: 12px;
    left: 12px;
  }

  .search-box__box {
    width: max(400px, 50vw);
    border: 1px var(--slightly-dark-neutral) solid;
    border-top: none;
    border-right: none;
    border-left: none;
    padding: 8px;
    padding-left: 48px;
    padding-right: 16px;
    font-size: var(--font-normal);
  }
</style>
