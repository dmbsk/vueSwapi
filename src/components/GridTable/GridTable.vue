<template>
  <div class="table-grid-body">
    <GridTableItem />
  </div>
</template>

<script>
import GridTableItem from './GridTableItem'
export default {
  name: 'GridTable',
  components: { GridTableItem },
  props: {
    gridData: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
    .table-grid-body {
        display: grid;
    }
</style>
