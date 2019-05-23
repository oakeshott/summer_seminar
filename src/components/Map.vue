<template>
<div id="map">
  <DataViz/>
  <Form/>
  <Result/>
</div>
</template>

<script>
import DataViz from './DataViz.vue'
import Form from './Form.vue'
import Result from './Result.vue'
export default {
  components: {
    DataViz,
    Form,
    Result
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
html, body, #app, main, #map { height: 100%; width: 100%; }
body { margin: 0 }
</style>
