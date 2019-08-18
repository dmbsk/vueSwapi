<template>
  <div v-if="axiosDone && !error">
    {{ filmData }}
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Film',
  props: {
    film: {
      type: Object
    }
  },
  data () {
    return ({
      filmData: this.film || this.getFilmInfo(),
      axiosDone: true,
      error: null
    })
  },
  methods: {
    getFilmInfo () {
      this.axiosDone = false
      axios
        .get(`${this.$apiLink}films/${this.$route.query.id}`)
        .then(response => {
          this.axiosDone = true
          this.filmData = response.data
        })
        .catch(error => {
          console.log(error)
          this.error = error
        })
    }
  }
}
</script>

<style scoped>

</style>
