<template>
  <div class="table-grid-body">
    <input
      v-model="searchValue"
      :keyup="filteredList"
    >
    <div class="grid-table-head grid-table-item">
      <grid-head
        v-for="(headName, index) in gridHead"
        :key="headName"
        :head-name="headName"
        :column-id="index"
        @headClick="headWasClicked"
      />
    </div>
    <div
      v-for="item in orderList"
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
import Vue from 'vue'
import _ from 'lodash'
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
      tableData: [...this.gridData],
      order: {
        names: [],
        directions: []
      }
    })
  },
  computed: {
    orderList () {
      return _.orderBy(this.filteredList(), this.order.names, this.order.directions)
    }
  },
  methods: {
    filteredList () {
      return this.tableData.filter((item) => (
        this.gridKeys.some((key) => {
          if (typeof (item[key]) !== 'number') {
            return item[key].toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase())
          }
          return item[key].toLocaleString().toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase())
        })
      ))
    },
    headWasClicked (event) {
      const columnId = event.target.getAttribute('columnId')
      const columnName = this.gridKeys[columnId]
      const index = this.order.names.indexOf(columnName)
      if (index === -1) {
        this.order.names.push(columnName)
        this.order.directions.push('asc')
        event.target.classList.add('sort-asc')
      } else {
        if (this.order.directions[index] === 'asc') {
          this.order.directions[index] = 'desc'
          Vue.set(this.order, 'directions', [...this.order.directions])
          event.target.classList.add('sort-desc')
          event.target.classList.remove('sort-asc')
        } else {
          this.order.directions.splice(index, 1)
          this.order.names.splice(index, 1)
          event.target.classList.remove('sort-desc')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    .table-grid-body {
      display: grid;
      border-bottom: 1px solid black;
      min-width: 500px;
      .grid-table-head {
        display: flex;
      }
      .grid-table-item {
        display: grid;
        grid-template-columns: 35px 0.75fr 0.5fr 0.5fr 1fr;
        border-top: 1px solid black;
        &:first-of-type {
          border-left: 1px solid black;
        }
      }
    }

</style>
