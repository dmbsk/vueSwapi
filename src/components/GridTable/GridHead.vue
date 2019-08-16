<template>
  <div class="grid-table-head-single">
    <b> {{ headName }} </b>
  </div>
</template>

<script>
export default {
  name: 'GridHead',
  props: {
    headName: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
    .grid-table-head-single {
        padding: 0 5px;
        &:not(:first-of-type) {
            border-left: 1px solid black;
        }
        &:last-of-type {
            border-right: 1px solid black;
        }
    }
</style>
