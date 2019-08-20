<template>
  <div
    v-if="show"
    class="table-grid-body"
  >
    <h2 v-if="tableName">
      {{ tableName }}
    </h2>
    <div class="table-grid-hide">
      <input
        v-model="searchValue"
        :keyup="filterList"
        placeholder="Search..."
        @click="toggleShow"
      >
      <b
        v-if="!orderList.length && searchValue"
        class="table-grid-noResults"
      >
        No results :(
      </b>
      <div
        v-if="orderList.length"
        class="grid-table-head grid-table-item"
        :style="{'grid-template-columns': gridTemplateColumn}"
      >
        <grid-head
          v-for="(headName, index) in gridHead"
          :key="headName"
          :head-name="headName"
          :column-id="index"
          @headClick="headWasClicked"
        />
      </div>
      <div
        v-for="(item, index) in orderList"
        :key="item.episode_id"
        class="table-grid-item-wrapper"
      >
        <grid-item
          :item-data="item"
          :grid-keys="gridKeys"
          :style="{'grid-template-columns': gridTemplateColumn}"
        />
        <router-link
          v-if="linkName"
          class="table-grid-more"
          :to="{
            name: linkName,
            params: {
              film: item,
              title: item.title
            },
            query: {
              id: index + 1
            }
          }"
        >
          More...
        </router-link>
      </div>
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
    },
    linkName: {
      type: String,
      default: null
    },
    gridTemplateColumn: {
      type: String,
      default: '35px 0.75fr 0.5fr 0.5fr 1fr'
    },
    show: {
      type: Boolean,
      default: true
    },
    tableName: {
      type: String,
      default: ''
    }
  },
  data () {
    return ({
      searchValue: '',
      tableData: this.gridData,
      order: {
        names: [],
        directions: []
      }
    })
  },
  computed: {
    orderList () {
      // const filteredList = this.filterList()
      // filteredList.forEach((item, index) => {
      //   for (const key in item) {
      //     if (!isNaN(item[key])) {
      //       filteredList[index][key] = parseInt(item[key])
      //     }
      //   }
      // })
      return _.orderBy(this.filterList(), this.order.names, this.order.directions)
    }
  },
  methods: {
    filterList () {
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
    },
    toggleShow () {

    }
  }
}
</script>

<style lang="scss" scoped>
    .table-grid-body {
      width: 100%;
      .table-grid-hide {
        display: grid;
        input {
          font-size: 1.5em;
          padding: 10px;
          text-align: center;
          border: 1px solid black;
          &:focus {
            outline: none;
          }
        }
        @media screen and (max-width: 750px){
          min-width: calc(100% - 10px);
          margin: 10px;
        }
        .table-grid-noResults {
          font-size: 3em;
          text-align: center;
          margin: 70px 0;
        }
        .grid-table-head {
          display: flex;
          border-bottom: 1px solid black;
          border-top: 1px solid black;
        }
        .grid-table-item {
          display: grid;
          &:first-of-type {
            border-left: 1px solid black;
          }
        }
        .table-grid-item-wrapper {
          position: relative;
          .table-grid-more {
            position: absolute;
            right: -10px;
            top: 50%;
            transform: translate(100%, -50%);
          }
        }
      }
    }

</style>
