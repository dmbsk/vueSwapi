<template>
  <div class="center-center home">
    <grid-table
      v-if="axiosDone && !error"
      :grid-data="info.data.results"
      :grid-keys="['title', 'director', 'release_date', 'producer']"
      :grid-head="['Title', 'Director', 'Release date', 'Producer']"
    />
  </div>
</template>

<script>
import axios from 'axios'
import GridTable from '../components/GridTable/GridTable'
export default {
  name: 'Home',
  components: { GridTable },
  data () {
    return {
      info: {},
      error: false,
      axiosDone: false
    }
  },
  beforeMount () {
    axios
      .get(this.$apiLink + 'films')
      .then(response => {
        this.axiosDone = true
        this.info = response
      })
      .catch(error => {
        console.log(error)
        this.error = true
      })
  }
}
</script>

<style lang="scss">
    .center-center {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .home {
      margin-top: 20px;
    }
</style>
