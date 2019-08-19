<template>
  <div class="grid-table-item">
    <div
      v-for="(key, index) in gridKeys"
      :key="index"
      class="grid-table-item-column"
    >
      <p>
        {{ itemData[key] }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GridItem',
  props: {
    itemData: {
      type: Object,
      required: true
    },
    gridKeys: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
    .grid-table-item {
        .grid-table-item-column {
            display: flex;
            align-items: center;
            min-height: 35px;
            padding: 0 5px;
            &:last-of-type {
                border-right: 1px solid black;
            }
            &:not(:first-of-type) {
              border-left: 1px solid black;
            }
            p {
              word-break: break-all;
            }
        }
    }
</style>
