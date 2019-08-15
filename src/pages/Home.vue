<template>
  <div class="center-center">
    <HelloMessage message="Hello from home!" />
  </div>
</template>

<script>
import HelloMessage from '../components/HelloMessage'
export default {
  name: 'Home',
  components: { HelloMessage },
}
</script>

<style lang="scss" scoped>
    .center-center {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
