<template>
  <div
    class="wrapper"
  >
    <div class="search-box">
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
    margin-bottom: 72px;
  }

  .search-box {
    position: relative;
  }

  .search-box__icon {
    position: absolute;
    top: 12px;
    left: 12px;
  }

  .search-box__box {
    border-radius: 16px;
    width: 50vw;
    border: 1px var(--slightly-dark-neutral) solid;
    padding: 8px;
    padding-left: 36px;
    padding-right: 16px;
    font-size: var(--font-normal);
  }
</style>
