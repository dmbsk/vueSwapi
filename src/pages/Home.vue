<template>
  <div class="home">
    <h1>SWVUE</h1>
    <grid-table
      v-if="axiosDone && !error"
      :grid-data="info.data.results"
      :grid-keys="['episode_id', 'title', 'director', 'release_date', 'producer']"
      :grid-head="['Ep.', 'Title', 'Director', 'Release date', 'Producer']"
      link-name="film"
      grid-template-column="0.15fr 0.8fr 0.5fr 0.5fr 1fr"
    />
    <h2 v-if="!axiosDone && !error">
      Loading...
    </h2>
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
  mounted () {
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
      font-family: 'Source Code Pro', monospace;
      margin-top: 20px;
      height: 100vh;
      width: 100vw;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      position: relative;
      overflow-x: hidden;
      h1 {
        font-size: 5em;
        position: absolute;
        top: 2%;
        left: 50%;
        transform: translateX(-50%);
      }
      .table-grid-body {
        max-width: 1000px;
        width: 90%;
        font-size: 0.85em;

      }
      @media screen and (max-width: 750px) {
        align-items: flex-start;
        .table-grid-body {
          .table-grid-hide {
            margin: 0 0 0 1px;
            div.table-grid-item-wrapper a.table-grid-more {
              right: -2px;
            }
          }
        }
      }
    }
</style>
