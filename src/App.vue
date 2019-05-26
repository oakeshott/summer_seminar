<template>
  <v-app id="app">
    <v-toolbar dark color="primary">
      <v-toolbar-side-icon></v-toolbar-side-icon>

      <v-toolbar-title class="white--text">Selfish routing</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon v-on:click="reload">
        <v-icon>refresh</v-icon>
      </v-btn>

    </v-toolbar>
    <router-view/>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  methods: {
    reload: function () {
      window.location.reload()
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#map {
  margin-top: 60px;
}
div.tooltip {
  position: absolute;
  text-align: center;
  width: 160px;
  height: 80px;
  padding: 2px;
  font: 14px sans-serif;
  background: #696969;
  border: 0px;
  border-radius: 8px;
  pointer-events: none;
}
div.tooltip span {
  color: #f5f5f5
}
</style>
