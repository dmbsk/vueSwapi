<template>
  <div class="table-grid-body">
    <input
      v-model="searchValue"
      :keyup="filteredList"
    >
    <div class="grid-table-head grid-table-item">
      <grid-head
        v-for="headName in gridHead"
        :key="headName"
        :head-name="headName"
      />
    </div>
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
import GridItem from './GridItem'
import GridHead from './GridHead'
export default {
  name: 'GridTable',
  components: { GridHead, GridItem },
  props: {
    gridData: {
      type: Array,
      required: true
    },
    gridKeys: {
      type: Array,
      required: true
    },
    gridHead: {
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
      .grid-table-head {
        display: flex;
      }
      .grid-table-item {
        display: grid;
        grid-template-columns: 0.75fr 0.5fr 0.5fr 1fr;
        max-width: 1400px;
        border-top: 1px solid black;
        &:first-of-type {
          border-left: 1px solid black;
        }
      }
    }

</style>
