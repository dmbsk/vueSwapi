<template>
  <div class="grid-table-item">
    <div
      class="grid-table-item-column"
    >
      {{ itemData.title }}
    </div>
    <div
      class="grid-table-item-column"
    >
      {{ itemData.release_date }}
    </div>
    <div
      class="grid-table-item-column"
    >
      {{ itemData.director }}
    </div>
    <div
      class="grid-table-item-column"
    >
      {{ itemData.producer }}
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
    }
  }
}
</script>

<style lang="scss" scoped>
    .grid-table-item {
        display: grid;
        grid-template-columns: 0.75fr 0.5fr 0.5fr 1fr;
        max-width: 1400px;
        border-top: 1px solid black;
        .grid-table-item-column {
            display: flex;
            align-items: center;
            border-left: 1px solid black;
            min-height: 35px;
            padding: 0 5px;
            &:last-of-type {
                border-right: 1px solid black;
            }
        }
    }
</style>
