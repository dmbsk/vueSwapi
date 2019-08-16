<template>
  <div class="center-center">
    <grid-table grid-data="info" />
  </div>
</template>

<script>
import GridTable from '../components/GridTable/GridTable'
import axios from 'axios'
export default {
  name: 'Home',
  components: { GridTable },
  data () {
    return {
      info: null
    }
  },
  mounted () {
    axios
      .get(this.$apiLink + 'films')
      .then(response => (this.info = response))
  }
}
</script>

<style lang="scss" scoped>
    .center-center {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
