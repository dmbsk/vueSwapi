<template>
  <div class="home">
    <grid-table
      v-if="axiosDone && !error"
      :grid-data="info.data.results"
      :grid-keys="['episode_id', 'title', 'director', 'release_date', 'producer']"
      :grid-head="['Ep.', 'Title', 'Director', 'Release date', 'Producer']"
      link-name="film"
      grid-leyout=""
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
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      @media screen and (max-width: 750px) {
        justify-content: left;
        .table-grid-body {
          min-width: 90%;
          margin: 5px;
        }
      }
    }
</style>
