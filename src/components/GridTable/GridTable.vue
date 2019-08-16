<template>
  <div class="table-grid-body">
    <div
      v-for="item in gridData.data.results"
      :key="item"
      class="table-grid-item-wrapper"
    >
      <grid-item :item-data="item" />
    </div>
  </div>
</template>

<script>
// import GridTableItem from './GridTableItem'
import GridItem from './GridItem'
export default {
  name: 'GridTable',
  components: { GridItem },
  //  components: { GridTableItem },
  props: {
    gridData: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
    .table-grid-body {
      display: grid;
      border-bottom: 1px solid black;
    }

</style>
