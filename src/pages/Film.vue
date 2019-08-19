<template>
  <div>
    <div v-if="(film || filmData) && !error">
      <h1>{{ filmData.title }}</h1>
      <div class="flex">
        <b>Episode id:&nbsp;</b> <p>{{ filmData.episode_id }}</p>
      </div>
      <div class="flex">
        <b>Director: &nbsp;</b> <p>{{ filmData.director }}</p>
      </div>
      <div class="flex">
        <b>Producer:&nbsp;</b> <p>{{ filmData.producer }}</p>
      </div>
      <div class="flex">
        <b>Release date:&nbsp;</b> <p>{{ filmData.release_date }}</p>
      </div>
      <div>
        <b>Opening crawl:&nbsp;</b> <p>{{ filmData.opening_crawl }}</p>
      </div>
    </div>
    <grid-table
      v-if="additionalInfo.characters"
      :grid-data="additionalInfo.characters"
      :grid-keys="['name', 'height', 'mass', 'hair_color', 'skin_color', 'eye_color', 'birth_year', 'gender' ]"
      :grid-head="['Name', 'Height', 'Mass', 'Hair', 'Skin', 'Eye', 'Birth', 'Gender' ]"
      grid-template-column="1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr"
    />
    <grid-table
      v-if="additionalInfo.planets"
      :grid-data="additionalInfo.planets"
      :grid-keys="['name', 'climate', 'diameter', 'gravity', 'orbital_period', 'rotation_period','population', 'surface_water' , 'terrain']"
      :grid-head="['Name', 'Climate', 'Diameter', 'Gravity', 'Orbital p.', 'Rotation p.', 'Population', 'Surface water', 'Terrain' ]"
      grid-template-column="1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr"
    />
    <grid-table
      v-if="additionalInfo.species"
      :grid-data="additionalInfo.species"
      :grid-keys="['name', 'classification', 'designation','average_lifespan', 'language', 'average_height', 'eye_colors', 'hair_colors', 'skin_colors']"
      :grid-head="['Name', 'Class.', 'Designation', 'Avg. lifespan', 'Language', 'Avg. height', 'Eye', 'Hair', 'Skin']"
      grid-template-column="1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr"
    />
    <grid-table
      v-if="additionalInfo.starships"
      :grid-data="additionalInfo.starships"
      :grid-keys="['name', 'model', 'manufacturer', 'length', 'starship_class', 'passengers', 'max_atmosphering_speed', 'hyperdrive_rating', 'crew', 'cost_in_credits', 'cargo_capacity', 'MGLT']"
      :grid-head="['Name', 'Model', 'Manufacturer', 'Length', 'Class', 'Passengers', 'Max speed', 'Hyperdrive', 'Crew size', 'Cost', 'Capacity', 'MGLT']"
      grid-template-column="1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr"
    />
    <grid-table
      v-if="additionalInfo.vehicles"
      :grid-data="additionalInfo.vehicles"
      :grid-keys="['name', 'model', 'manufacturer', 'length', 'vehicle_class', 'passengers', 'max_atmosphering_speed', 'consumables', 'crew', 'cost_in_credits', 'cargo_capacity']"
      :grid-head="['Name', 'Model', 'Manufacturer', 'Length', 'Class', 'Passengers', 'Max speed', 'Consumables', 'Crew size', 'Cost', 'Capacity']"
      grid-template-column="1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr"
    />
  </div>
</template>

<script>
import axios from 'axios'
import GridTable from '../components/GridTable/GridTable'
export default {
  name: 'Film',
  components: { GridTable },
  props: {
    film: {
      type: Object,
      default: null
    }
  },
  data () {
    return ({
      filmData: this.film || this.getFilmInfo(),
      axiosDone: false,
      error: null,
      additionalInfo: {
        characters: [],
        planets: [],
        starships: [],
        vehicles: [],
        species: []
      }
    })
  },
  mounted () {
    if (this.filmData) {
      this.setAdditionalInfo(['characters', 'planets', 'starships', 'vehicles', 'species'])
    }
  },
  methods: {
    getFilmInfo () {
      axios
        .get(`${this.$apiLink}films/${this.$route.query.id}`)
        .then(response => {
          this.axiosDone = true
          this.filmData = response.data
        })
        .catch(error => {
          console.log(error)
          this.error = error
          return null
        })
        .then(() => {
          this.setAdditionalInfo(['characters', 'planets', 'starships', 'vehicles', 'species'])
        })
    },
    getOtherInfo (apiArr, key) {
      apiArr.forEach(item => {
        axios
          .get(item)
          .then(response => {
            this.additionalInfo[key].push(response.data)
          })
          .catch(error => {
            console.log(error)
            this.error = error
          })
      })
    },
    setAdditionalInfo (keys) {
      keys.forEach(key => {
        this.getOtherInfo(this.filmData[key], key)
      })
    },
    readFromProps () {
      this.setAdditionalInfo(['characters', 'planets', 'starships', 'vehicles', 'species'])
    }
  }
}
</script>

<style lang="scss" scoped>
  div {
    max-width: 1400px;
    margin: 0 auto;
    div {
      margin: 5px 10px 0 5px;
      &:not(.flex) > p {
        margin-left: 10px;
      }
    }
  }
</style>
