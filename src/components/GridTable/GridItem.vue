<template>
  <div class="grid-table-item">
    <div
      class="grid-table-item-column"
    >
      {{ itemData.episode_id }}
    </div>
    <div
      class="grid-table-item-column"
    >
      {{ itemData.title }}
    </div>
    <div
      class="grid-table-item-column"
    >
      {{ itemData.director }}
    </div>
    <div
      class="grid-table-item-column"
    >
      {{ itemData.release_date }}
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
        }
    }
</style>
