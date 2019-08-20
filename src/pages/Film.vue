<template>
  <div class="film-wrapper center-center">
    <div v-if="(film || filmData) && !error">
      <h1 class="title">
        {{ filmData.title }}
      </h1>
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
        <b>Release date:&nbsp;</b> <p>{{ filmData.release_date }} ({{ calculatedDateDifference }} years ago)</p>
      </div>
      <div>
        <b>Opening crawl:&nbsp;</b> <p>{{ filmData.opening_crawl }}</p>
      </div>
    </div>
    <grid-table
      v-if="additionalInfo.characters.length"
      :grid-data="additionalInfo.characters"
      :grid-keys="['name', 'height', 'mass', 'hair_color', 'skin_color', 'eye_color', 'birth_year', 'gender' ]"
      :grid-head="['Name', 'Height', 'Mass', 'Hair', 'Skin', 'Eye', 'Birth', 'Gender' ]"
      grid-template-column="1fr 0.5fr 0.5fr 0.6fr 0.7fr 0.6fr 0.5fr 0.6fr"
      table-name="Characters"
      class="grid-table"
    />
    <grid-table
      v-if="additionalInfo.planets.length"
      :grid-data="additionalInfo.planets"
      :grid-keys="['name', 'climate', 'diameter', 'gravity', 'orbital_period', 'rotation_period','population', 'surface_water' , 'terrain']"
      :grid-head="['Name', 'Climate', 'Diameter', 'Gravity', 'Orbital p.', 'Rotation p.', 'Population', 'Surface water', 'Terrain' ]"
      grid-template-column="0.5fr 1fr 0.7fr 0.7fr 0.75fr 0.75fr 0.75fr 0.8fr 1.1fr"
      table-name="Planets"
      class="grid-table"
    />
    <grid-table
      v-if="additionalInfo.species.length"
      :grid-data="additionalInfo.species"
      :grid-keys="['name', 'classification', 'designation','average_lifespan', 'language', 'average_height', 'eye_colors', 'hair_colors', 'skin_colors']"
      :grid-head="['Name', 'Class.', 'Designation', 'Avg. lifespan', 'Language', 'Avg. height', 'Eye', 'Hair', 'Skin']"
      grid-template-column="0.5fr 0.55fr 0.7fr 0.8fr 0.8fr 0.7fr 1fr 1fr 1fr"
      table-name="Species"
      class="grid-table"
    />
    <grid-table
      v-if="additionalInfo.starships.length"
      :grid-data="additionalInfo.starships"
      :grid-keys="['name', 'model', 'manufacturer', 'length', 'starship_class', 'passengers', 'max_atmosphering_speed', 'hyperdrive_rating', 'crew', 'cost_in_credits', 'cargo_capacity', 'MGLT']"
      :grid-head="['Name', 'Model', 'Manufacturer', 'Length', 'Class', 'Passengers', 'Max speed', 'Hyperdrive', 'Crew size', 'Cost', 'Capacity', 'MGLT']"
      grid-template-column="1fr 1fr 1fr 0.7fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 0.5fr"
      table-name="Starships"
      class="grid-table"
    />
    <grid-table
      v-if="additionalInfo.vehicles.length"
      :grid-data="additionalInfo.vehicles"
      :grid-keys="['name', 'model', 'manufacturer', 'length', 'vehicle_class', 'passengers', 'max_atmosphering_speed', 'consumables', 'crew', 'cost_in_credits', 'cargo_capacity']"
      :grid-head="['Name', 'Model', 'Manufacturer', 'Length', 'Class', 'Passengers', 'Max speed', 'Consumables', 'Crew size', 'Cost', 'Capacity']"
      grid-template-column="1fr 1fr 1fr 0.7fr 1fr 1fr 1fr 0.9fr 0.9fr 0.6fr 0.7fr"
      table-name="Vehicles"
      class="grid-table"
    />
    <div class="comments">
      <comment-form />
      <comments />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import GridTable from '../components/GridTable/GridTable'
import Comments from '../components/Comments/Comments'
import CommentForm from '../components/CommentForm/CommentForm'
export default {
  name: 'Film',
  components: { CommentForm, Comments, GridTable },
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
  computed: {
    calculatedDateDifference () {
      const releaseTimestamp = new Date(Date.parse(this.filmData.release_date))
      const difference = new Date().getFullYear() - releaseTimestamp.getFullYear()
      return difference
    }
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
    flex-direction: column;
    .title {
      font-size: 3em;
    }
    @media screen and (max-width: 1400px) {
      max-width: calc(100% - 5px);
      width: calc(100% - 5px);
      margin-left: 5px;
    }
    div {
      margin: 5px 10px 0 5px;
      &:not(.flex) > p {
        margin-left: 10px;
      }
    }
    .grid-table {
      margin-top: 20px;
    }
    .comments {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin: 50px auto;
      width: 100%;
      max-width: 1000px;
    }
  }
</style>
