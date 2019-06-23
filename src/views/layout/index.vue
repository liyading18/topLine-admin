<template>
  <div>
    <AppHeader/>
    <AppSide/>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader'
import AppSide from './components/AppSide'

export default {
  name: 'AppLayout',
  components: {
    AppHeader,
    AppSide
  },
  data() {
    return {

    }
  }
}
</script>

<style lang='less' scoped>
</style>
