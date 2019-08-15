<template>
  <h1 @click="alert">{{ message }}</h1>
</template>

<script>
export default {
  name: 'HelloMessage',
  props: {
    message: {
      type: String,
      default: 'Hello'
    }
  },
  methods: {
    alert: () => { alert('Hello!') }
  }
}
</script>

<style scoped>

</style>
