<template>
  <div
    class="grid-table-head-single"
    :columnId="columnId"
    @click="handleClick"
  >
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
    },
    columnId: {
      type: Number,
      required: true
    }
  },
  methods: {
    handleClick (headEvent) {
      this.$emit('headClick', headEvent)
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
        b {
            pointer-events: none;
            position: relative;
            word-break: break-all;
            @media screen and (max-width: 750px) {
              font-size: 0.75em;
            }
            &:before {
                content: '';
                width: 0;
                height: 0;
                position: absolute;
                left: 110%;
                top: 50%;
                transform: translateY(-50%);
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;

                border-bottom: 5px solid black;
                transition: opacity .3s, transform .3s .3s;
                opacity: 0;
            }
        }
        &.sort-asc b:before {
            opacity: 1;
            transition: opacity .3s;
        }
        &.sort-desc b:before {
            transform: translateY(-50%) rotateZ(180deg);
            transition: transform .3s;
            opacity: 1;
        }
    }
</style>
