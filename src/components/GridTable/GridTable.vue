<template>
  <div class="table-grid-body">
    <input
      v-model="searchValue"
      :keyup="filteredList"
    >
    <div
      v-for="item in filteredList"
      :key="item.episode_id"
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
  props: {
    gridData: {
      type: Array,
      required: true
    },
    gridKeys: {
      type: Array,
      required: true
    }
  },
  data () {
    return ({
      searchValue: '',
      tableData: [...this.gridData]
    })
  },
  computed: {
    filteredList () {
      return this.tableData.filter((item) => (
        this.gridKeys.some((key) => (
          item[key].toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase())
        ))
      ))
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
