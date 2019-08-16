<template>
  <div class="grid-table-item">
    <div
      v-for="item in itemData"
      :key="item"
      class="grid-table-col"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'GridTableItem',
  props: {
    itemData: {
      type: Object, // add validator later
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
    .grid-table-item {

    }
</style>
